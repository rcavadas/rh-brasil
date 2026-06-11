import assert from 'node:assert/strict';
import { test } from 'node:test';
import { formatPlatformRestoreDryRun, validatePlatformBackupManifest } from './platform-restore-format.mjs';

test('validatePlatformBackupManifest requires a manifest object', () => {
  assert.throws(() => validatePlatformBackupManifest(null), /Backup manifest inválido/);
  assert.throws(() => validatePlatformBackupManifest({}), /createdAt/);
  assert.throws(() => validatePlatformBackupManifest({ createdAt: '2026-06-06T19:30:00.000Z' }), /artifacts/);
});

test('formatPlatformRestoreDryRun returns stable dry-run text inputs', () => {
  const summary = formatPlatformRestoreDryRun({
    createdAt: '2026-06-06T19:30:00.000Z',
    artifacts: {
      postgres: 'postgres.sql',
      minio: 'minio-data',
      bffSessions: 'bff-sessions.json',
    },
  });

  assert.equal(summary.createdAt, '2026-06-06T19:30:00.000Z');
  assert.equal(summary.artifacts, 'postgres.sql, minio-data, bff-sessions.json');
});
