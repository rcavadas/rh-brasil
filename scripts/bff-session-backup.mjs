import fs from 'node:fs/promises';
import path from 'node:path';
import Redis from 'ioredis';

const redisUrl = process.env.REDIS_URL?.trim() || 'redis://localhost:6379';
const sessionPrefix = process.env.BFF_SESSION_PREFIX?.trim() || 'rh:web:session:';
const indexKey = process.env.BFF_SESSION_INDEX_KEY?.trim() || 'rh:web:sessions';
const outputPath = process.env.BFF_SESSION_BACKUP_PATH?.trim() || path.resolve(process.cwd(), 'backups', `bff-sessions-${new Date().toISOString().replace(/[:.]/g, '-')}.json`);

const redis = new Redis(redisUrl, {
  lazyConnect: false,
  maxRetriesPerRequest: 1,
  enableReadyCheck: true,
});

async function main() {
  const sessionIds = await redis.smembers(indexKey);
  const sessions = [];

  for (const sessionId of sessionIds) {
    const key = `${sessionPrefix}${sessionId}`;
    const [raw, ttlSeconds] = await Promise.all([
      redis.get(key),
      redis.ttl(key),
    ]);

    if (!raw) {
      continue;
    }

    sessions.push({
      sessionId,
      ttlSeconds,
      value: JSON.parse(raw),
    });
  }

  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, JSON.stringify({
    createdAt: new Date().toISOString(),
    redisUrl,
    indexKey,
    sessionPrefix,
    sessionCount: sessions.length,
    sessions,
  }, null, 2));

  console.log(outputPath);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}).finally(async () => {
  await redis.quit().catch(() => undefined);
});
