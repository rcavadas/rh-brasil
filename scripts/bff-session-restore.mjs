import fs from 'node:fs/promises';
import Redis from 'ioredis';

const backupPath = process.env.BFF_SESSION_BACKUP_PATH?.trim();
if (!backupPath) {
  throw new Error('BFF_SESSION_BACKUP_PATH e obrigatorio para restore.');
}

const redisUrl = process.env.REDIS_URL?.trim() || 'redis://localhost:6379';
const sessionPrefix = process.env.BFF_SESSION_PREFIX?.trim() || 'rh:web:session:';
const indexKey = process.env.BFF_SESSION_INDEX_KEY?.trim() || 'rh:web:sessions';
const targetSessionPrefix = process.env.BFF_SESSION_TARGET_PREFIX?.trim() || sessionPrefix;
const targetIndexKey = process.env.BFF_SESSION_TARGET_INDEX_KEY?.trim() || indexKey;
const defaultTtlSeconds = Number(process.env.BFF_SESSION_DEFAULT_TTL_SECONDS ?? 28800);
const dryRun = /^(1|true|yes)$/i.test(process.env.BFF_SESSION_DRY_RUN?.trim() || '');

const redis = new Redis(redisUrl, {
  lazyConnect: false,
  maxRetriesPerRequest: 1,
  enableReadyCheck: true,
});

async function main() {
  const raw = await fs.readFile(backupPath, 'utf8');
  const backup = JSON.parse(raw);
  if (!backup || !Array.isArray(backup.sessions)) {
    throw new Error('Backup invalido.');
  }

  if (dryRun) {
    console.log(`dry-run restore validated for ${backup.sessions.length} sessions from ${backupPath}`);
    return;
  }

  const existingIds = await redis.smembers(targetIndexKey);
  const pipeline = redis.pipeline();
  for (const sessionId of existingIds) {
    pipeline.del(`${targetSessionPrefix}${sessionId}`);
  }
  pipeline.del(targetIndexKey);

  for (const session of backup.sessions) {
    if (!session || typeof session.sessionId !== 'string' || !session.value) {
      continue;
    }

    const ttlSeconds = Number.isFinite(session.ttlSeconds) && session.ttlSeconds > 0 ? Math.floor(session.ttlSeconds) : defaultTtlSeconds;
    pipeline.set(`${targetSessionPrefix}${session.sessionId}`, JSON.stringify(session.value), 'EX', ttlSeconds);
    pipeline.sadd(targetIndexKey, session.sessionId);
  }

  await pipeline.exec();
  console.log(`restored ${backup.sessions.length} sessions from ${backupPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}).finally(async () => {
  await redis.quit().catch(() => undefined);
});
