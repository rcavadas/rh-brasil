import fs from 'node:fs/promises';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { buildPlatformBackupManifest, derivePlatformBackupArtifacts, derivePlatformBackupDir } from './platform-backup-format.mjs';

const composeFile = path.resolve(process.cwd(), 'infra', 'docker-compose.yml');
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const backupDir = process.env.PLATFORM_BACKUP_DIR?.trim() || derivePlatformBackupDir(process.cwd(), timestamp);
const { postgresDumpPath, minioDataPath, bffBackupPath, manifestPath } = derivePlatformBackupArtifacts(backupDir);

function runComposeExec(service, args, options = {}) {
  return execFileSync('docker', ['compose', '-f', composeFile, 'exec', '-T', service, ...args], {
    encoding: 'buffer',
    maxBuffer: 50 * 1024 * 1024,
    ...options,
  });
}

async function main() {
  await fs.mkdir(backupDir, { recursive: true });

  const postgresDump = runComposeExec('postgres', ['pg_dump', '-U', 'rh', '-d', 'rh']);
  await fs.writeFile(postgresDumpPath, postgresDump);

  await fs.mkdir(minioDataPath, { recursive: true });
  execFileSync('docker', ['compose', '-f', composeFile, 'cp', 'minio:/data/.', minioDataPath], {
    stdio: 'inherit',
  });

  execFileSync(process.execPath, [path.resolve(process.cwd(), 'scripts', 'bff-session-backup.mjs')], {
    env: {
      ...process.env,
      BFF_SESSION_BACKUP_PATH: bffBackupPath,
    },
    stdio: 'inherit',
  });

  const manifest = buildPlatformBackupManifest({
    composeFile,
    backupDir,
    timestamp: new Date().toISOString(),
    artifacts: { postgresDumpPath, minioDataPath, bffBackupPath },
  });

  await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(backupDir);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
