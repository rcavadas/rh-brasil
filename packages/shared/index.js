import path from 'node:path';

export const PLATFORM_HEALTH_TARGETS = [
  'http://127.0.0.1:3000/api/health',
  'http://127.0.0.1:5173/health',
  'http://127.0.0.1:8080/realms/rh/.well-known/openid-configuration',
  'http://127.0.0.1:9000/minio/health/ready',
];

export const PLATFORM_TELEMETRY_URL = 'http://127.0.0.1:3000/api/v1/platform/telemetry';

export function parseComposePs(output) {
  return String(output || '')
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((line) => line.startsWith('{'))
    .map((line) => JSON.parse(line));
}

export async function fetchTextJson(url, headers = {}) {
  const response = await fetch(url, { headers });
  return {
    url,
    ok: response.ok,
    status: response.status,
    body: await response.text(),
  };
}

export function isServiceHealthy(service) {
  const state = String(service?.State ?? '').toLowerCase();
  const health = String(service?.Health ?? '').toLowerCase();
  return (state === 'running' || state === 'healthy') && (!health || health === 'healthy');
}

export function derivePlatformBackupRoot(cwd) {
  return path.resolve(cwd, 'backups', 'platform');
}

export function derivePlatformBackupDir(cwd, timestamp = new Date().toISOString().replace(/[:.]/g, '-')) {
  return path.join(derivePlatformBackupRoot(cwd), timestamp);
}

export function derivePlatformBackupArtifacts(backupDir) {
  return {
    postgresDumpPath: path.join(backupDir, 'postgres.sql'),
    minioDataPath: path.join(backupDir, 'minio-data'),
    bffBackupPath: path.join(backupDir, 'bff-sessions.json'),
    manifestPath: path.join(backupDir, 'manifest.json'),
  };
}

export function buildPlatformBackupManifest({ composeFile, backupDir, timestamp, artifacts }) {
  return {
    createdAt: new Date(timestamp).toISOString(),
    composeFile,
    artifacts: {
      postgres: path.basename(artifacts.postgresDumpPath),
      minio: path.basename(artifacts.minioDataPath),
      bffSessions: path.basename(artifacts.bffBackupPath),
    },
    services: ['postgres', 'redis', 'keycloak', 'minio', 'api', 'web', 'worker'],
    backupDir,
  };
}

export function validatePlatformBackupManifest(manifest) {
  if (!manifest || typeof manifest !== 'object') {
    throw new Error('Backup manifest inválido.');
  }

  if (typeof manifest.createdAt !== 'string' || !manifest.createdAt) {
    throw new Error('Backup manifest precisa de createdAt.');
  }

  if (!manifest.artifacts || typeof manifest.artifacts !== 'object') {
    throw new Error('Backup manifest precisa de artifacts.');
  }

  return manifest;
}

export function formatPlatformRestoreDryRun(manifest) {
  const validated = validatePlatformBackupManifest(manifest);
  return {
    createdAt: validated.createdAt,
    artifacts: Object.values(validated.artifacts).join(', '),
  };
}

export function parseConfigPairs(output) {
  const lines = String(output || '').trim().split(/\r?\n/);
  const pairs = new Map();

  for (let i = 0; i < lines.length; i += 2) {
    const key = lines[i]?.trim();
    const value = lines[i + 1]?.trim();
    if (key) {
      pairs.set(key, value ?? '');
    }
  }

  return pairs;
}

export function assertRedisPlatformPolicy(config) {
  if (config.get('appendonly') !== 'yes') {
    throw new Error('redis appendonly must be enabled');
  }

  if (config.get('appendfsync') !== 'everysec') {
    throw new Error('redis appendfsync must be everysec');
  }

  if (config.get('maxmemory-policy') !== 'noeviction') {
    throw new Error('redis maxmemory-policy must be noeviction');
  }

  return true;
}

export function selectStaleSnapshots(snapshots, retentionCount) {
  const count = Math.max(1, Number(retentionCount ?? 7));
  return [...snapshots]
    .sort((a, b) => (b.mtimeMs ?? 0) - (a.mtimeMs ?? 0))
    .slice(count);
}

export function shouldRunBackup(lastBackupAt, now, backupIntervalMs) {
  return lastBackupAt === 0 || now - lastBackupAt >= backupIntervalMs;
}

export function shouldRunVerify(lastVerifyAt, now, verifyIntervalMs) {
  return lastVerifyAt === 0 || now - lastVerifyAt >= verifyIntervalMs;
}
