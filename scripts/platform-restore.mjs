import fs from 'node:fs/promises';
import path from 'node:path';
import { execFileSync, spawnSync } from 'node:child_process';
import { derivePlatformBackupArtifacts } from './platform-backup-format.mjs';
import { formatPlatformRestoreDryRun, validatePlatformBackupManifest } from './platform-restore-format.mjs';

const composeFile = path.resolve(process.cwd(), 'infra', 'docker-compose.yml');
const backupDir = process.env.PLATFORM_BACKUP_DIR?.trim();
if (!backupDir) {
  throw new Error('PLATFORM_BACKUP_DIR e obrigatorio para restore.');
}

const apply = process.argv.includes('--apply');
const { postgresDumpPath, minioDataPath, bffBackupPath } = derivePlatformBackupArtifacts(backupDir);

function runComposeExec(service, args, input) {
  return spawnSync('docker', ['compose', '-f', composeFile, 'exec', '-T', service, ...args], {
    input,
    encoding: 'buffer',
    maxBuffer: 50 * 1024 * 1024,
  });
}

async function main() {
  const manifestRaw = await fs.readFile(path.join(backupDir, 'manifest.json'), 'utf8');
  const manifest = validatePlatformBackupManifest(JSON.parse(manifestRaw));

  if (!apply) {
    const summary = formatPlatformRestoreDryRun(manifest);
    console.log(`restore dry-run validated for backup created at ${summary.createdAt}`);
    console.log(`artifacts: ${summary.artifacts}`);
    return;
  }

  const postgresDump = await fs.readFile(postgresDumpPath);
  const postgresResult = runComposeExec('postgres', ['psql', '-U', 'rh', '-d', 'rh'], postgresDump);
  if (postgresResult.status !== 0) {
    throw new Error(`postgres restore failed: ${postgresResult.stderr?.toString() || 'unknown error'}`);
  }

  execFileSync('docker', ['compose', '-f', composeFile, 'cp', `${minioDataPath}/.`, 'minio:/data'], {
    stdio: 'inherit',
  });

  execFileSync(process.execPath, [path.resolve(process.cwd(), 'scripts', 'bff-session-restore.mjs')], {
    env: {
      ...process.env,
      BFF_SESSION_BACKUP_PATH: bffBackupPath,
    },
    stdio: 'inherit',
  });

  console.log(`restored platform backup from ${backupDir}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
