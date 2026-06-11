import fs from 'node:fs/promises';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import Redis from 'ioredis';

const redisUrl = process.env.REDIS_URL?.trim() || 'redis://localhost:6379';
const sessionPrefix = process.env.BFF_SESSION_PREFIX?.trim() || 'rh:web:session:';
const indexKey = process.env.BFF_SESSION_INDEX_KEY?.trim() || 'rh:web:sessions';
const defaultTtlSeconds = Number(process.env.BFF_SESSION_DEFAULT_TTL_SECONDS ?? 28800);
const tempSuffix = randomUUID().replace(/-/g, '');
const backupPath = process.env.BFF_SESSION_BACKUP_PATH?.trim()
  || path.resolve(process.cwd(), 'backups', `bff-session-verify-${new Date().toISOString().replace(/[:.]/g, '-')}-${tempSuffix}.json`);
const restoreScript = path.resolve(process.cwd(), 'scripts', 'bff-session-restore.mjs');
const backupScript = path.resolve(process.cwd(), 'scripts', 'bff-session-backup.mjs');
const targetSessionPrefix = `rh:web:verify:${tempSuffix}:session:`;
const targetIndexKey = `rh:web:verify:sessions:${tempSuffix}`;

const redis = new Redis(redisUrl, {
  lazyConnect: false,
  maxRetriesPerRequest: 1,
  enableReadyCheck: true,
});

function runScript(scriptPath, extraEnv = {}) {
  execFileSync(process.execPath, [scriptPath], {
    env: {
      ...process.env,
      REDIS_URL: redisUrl,
      BFF_SESSION_BACKUP_PATH: backupPath,
      BFF_SESSION_PREFIX: sessionPrefix,
      BFF_SESSION_INDEX_KEY: indexKey,
      BFF_SESSION_TARGET_PREFIX: targetSessionPrefix,
      BFF_SESSION_TARGET_INDEX_KEY: targetIndexKey,
      BFF_SESSION_DEFAULT_TTL_SECONDS: String(defaultTtlSeconds),
      ...extraEnv,
    },
    stdio: 'inherit',
  });
}

async function cleanupTempStore() {
  const sessionIds = await redis.smembers(targetIndexKey);
  if (sessionIds.length > 0) {
    const pipeline = redis.pipeline();
    for (const sessionId of sessionIds) {
      pipeline.del(`${targetSessionPrefix}${sessionId}`);
    }
    pipeline.del(targetIndexKey);
    await pipeline.exec();
  }
}

async function main() {
  await fs.mkdir(path.dirname(backupPath), { recursive: true });
  await cleanupTempStore();

  try {
    runScript(backupScript);

    const backup = JSON.parse(await fs.readFile(backupPath, 'utf8'));
    const expectedCount = Array.isArray(backup?.sessions) ? backup.sessions.length : 0;

    runScript(restoreScript);

    const indexedCount = await redis.scard(targetIndexKey);
    if (indexedCount !== expectedCount) {
      throw new Error(`Restore verification failed: expected ${expectedCount} sessions, found ${indexedCount}.`);
    }

    const sessionIds = await redis.smembers(targetIndexKey);
    const keys = sessionIds.map((sessionId) => `${targetSessionPrefix}${sessionId}`);
    const values = keys.length > 0 ? await redis.mget(keys) : [];
    const missingValues = values.filter((value) => !value);
    if (missingValues.length > 0) {
      throw new Error('Restore verification failed: at least one restored session is missing.');
    }

    console.log(`verified ${indexedCount} sessions with backup/restore round-trip`);
  } finally {
    await cleanupTempStore();
    await fs.unlink(backupPath).catch(() => undefined);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}).finally(async () => {
  await redis.quit().catch(() => undefined);
});
