import assert from 'node:assert/strict';
import { test } from 'node:test';
import { selectStaleSnapshots, shouldRunBackup, shouldRunVerify } from './bff-maintenance-policy.mjs';

test('selectStaleSnapshots keeps the newest snapshots first and trims by retention', () => {
  const stale = selectStaleSnapshots(
    [
      { name: 'old', mtimeMs: 1000 },
      { name: 'mid', mtimeMs: 2000 },
      { name: 'new', mtimeMs: 3000 },
      { name: 'newest', mtimeMs: 4000 },
    ],
    2,
  );

  assert.deepEqual(stale.map((item) => item.name), ['mid', 'old']);
});

test('shouldRunBackup and shouldRunVerify are interval based', () => {
  assert.equal(shouldRunBackup(0, 10_000, 60_000), true);
  assert.equal(shouldRunBackup(10_000, 50_000, 60_000), false);
  assert.equal(shouldRunBackup(10_000, 80_000, 60_000), true);

  assert.equal(shouldRunVerify(0, 10_000, 300_000), true);
  assert.equal(shouldRunVerify(10_000, 100_000, 300_000), false);
  assert.equal(shouldRunVerify(10_000, 400_000, 300_000), true);
});
