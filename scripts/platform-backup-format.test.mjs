import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  buildPlatformBackupManifest,
  derivePlatformBackupArtifacts,
  derivePlatformBackupDir,
  derivePlatformBackupRoot,
} from './platform-backup-format.mjs';

test('derivePlatformBackupDir nests snapshots under backups/platform', () => {
  const dir = derivePlatformBackupDir('F:/projetos/rh', '2026-06-06T19-30-00-000Z');
  assert.equal(dir.replaceAll('\\', '/'), 'F:/projetos/rh/backups/platform/2026-06-06T19-30-00-000Z');
});

test('derivePlatformBackupArtifacts returns stable artifact names', () => {
  const artifacts = derivePlatformBackupArtifacts('F:/projetos/rh/backups/platform/2026-06-06T19-30-00-000Z');
  assert.equal(artifacts.postgresDumpPath.replaceAll('\\', '/'), 'F:/projetos/rh/backups/platform/2026-06-06T19-30-00-000Z/postgres.sql');
  assert.equal(artifacts.minioDataPath.replaceAll('\\', '/'), 'F:/projetos/rh/backups/platform/2026-06-06T19-30-00-000Z/minio-data');
  assert.equal(artifacts.bffBackupPath.replaceAll('\\', '/'), 'F:/projetos/rh/backups/platform/2026-06-06T19-30-00-000Z/bff-sessions.json');
  assert.equal(artifacts.manifestPath.replaceAll('\\', '/'), 'F:/projetos/rh/backups/platform/2026-06-06T19-30-00-000Z/manifest.json');
});

test('buildPlatformBackupManifest stores service and artifact metadata', () => {
  const artifacts = derivePlatformBackupArtifacts('F:/projetos/rh/backups/platform/2026-06-06T19-30-00-000Z');
  const manifest = buildPlatformBackupManifest({
    composeFile: 'F:/projetos/rh/infra/docker-compose.yml',
    backupDir: 'F:/projetos/rh/backups/platform/2026-06-06T19-30-00-000Z',
    timestamp: '2026-06-06T19:30:00.000Z',
    artifacts,
  });

  assert.equal(manifest.createdAt, '2026-06-06T19:30:00.000Z');
  assert.equal(manifest.composeFile, 'F:/projetos/rh/infra/docker-compose.yml');
  assert.equal(manifest.backupDir, 'F:/projetos/rh/backups/platform/2026-06-06T19-30-00-000Z');
  assert.equal(manifest.artifacts.postgres, 'postgres.sql');
  assert.equal(manifest.artifacts.minio, 'minio-data');
  assert.equal(manifest.artifacts.bffSessions, 'bff-sessions.json');
  assert.deepEqual(manifest.services, ['postgres', 'redis', 'keycloak', 'minio', 'api', 'web', 'worker']);
});

test('derivePlatformBackupRoot points to backups/platform', () => {
  const root = derivePlatformBackupRoot('F:/projetos/rh');
  assert.equal(root.replaceAll('\\', '/'), 'F:/projetos/rh/backups/platform');
});
