import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  assertRedisPlatformPolicy,
  buildPlatformBackupManifest,
  derivePlatformBackupArtifacts,
  derivePlatformBackupDir,
  formatPlatformRestoreDryRun,
  isServiceHealthy,
  parseComposePs,
  parseConfigPairs,
  selectStaleSnapshots,
  shouldRunBackup,
  shouldRunVerify,
  validatePlatformBackupManifest,
} from './index.js';

test('shared helpers parse and validate platform health and backup contracts', () => {
  const parsed = parseComposePs(`
    {"Service":"api","State":"running","Health":"healthy"}
  `);
  assert.equal(parsed.length, 1);
  assert.equal(isServiceHealthy(parsed[0]), true);

  const backupDir = derivePlatformBackupDir('F:/projetos/rh', '2026-06-06T19-30-00-000Z');
  const artifacts = derivePlatformBackupArtifacts(backupDir);
  const manifest = buildPlatformBackupManifest({
    composeFile: 'F:/projetos/rh/infra/docker-compose.yml',
    backupDir,
    timestamp: '2026-06-06T19:30:00.000Z',
    artifacts,
  });
  assert.equal(validatePlatformBackupManifest(manifest).createdAt, '2026-06-06T19:30:00.000Z');
  assert.equal(formatPlatformRestoreDryRun(manifest).artifacts, 'postgres.sql, minio-data, bff-sessions.json');
  assert.equal(backupDir.replaceAll('\\', '/'), 'F:/projetos/rh/backups/platform/2026-06-06T19-30-00-000Z');
});

test('shared helpers parse redis policy and maintenance cadence', () => {
  const config = parseConfigPairs(`
appendonly
yes
appendfsync
everysec
maxmemory-policy
noeviction
`);
  assert.equal(assertRedisPlatformPolicy(config), true);
  assert.equal(shouldRunBackup(0, 10_000, 60_000), true);
  assert.equal(shouldRunVerify(10_000, 20_000, 300_000), false);
  assert.equal(selectStaleSnapshots([{ name: 'a', mtimeMs: 1 }, { name: 'b', mtimeMs: 2 }], 1).length, 1);
});
