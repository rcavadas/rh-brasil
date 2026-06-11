import assert from 'node:assert/strict';
import { test } from 'node:test';
import { assertRedisPlatformPolicy, parseConfigPairs } from './redis-platform-policy.mjs';

test('parseConfigPairs reads redis config pairs two lines at a time', () => {
  const config = parseConfigPairs(`
appendonly
yes
appendfsync
everysec
maxmemory-policy
noeviction
`);

  assert.equal(config.get('appendonly'), 'yes');
  assert.equal(config.get('appendfsync'), 'everysec');
  assert.equal(config.get('maxmemory-policy'), 'noeviction');
});

test('assertRedisPlatformPolicy enforces the local redis contract', () => {
  assert.equal(
    assertRedisPlatformPolicy(
      new Map([
        ['appendonly', 'yes'],
        ['appendfsync', 'everysec'],
        ['maxmemory-policy', 'noeviction'],
      ]),
    ),
    true,
  );

  assert.throws(
    () => assertRedisPlatformPolicy(new Map([['appendonly', 'no']])),
    /appendonly/,
  );
});
