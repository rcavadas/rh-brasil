import assert from 'node:assert/strict';
import { test } from 'node:test';
import { isServiceHealthy, parseComposePs, PLATFORM_HEALTH_TARGETS, PLATFORM_TELEMETRY_URL } from './platform-health.mjs';

test('parseComposePs keeps only json compose lines', () => {
  const parsed = parseComposePs(`
    garbage
    {"Service":"api","State":"running","Health":"healthy"}
    {"Service":"redis","State":"running","Health":"healthy"}
  `);

  assert.equal(parsed.length, 2);
  assert.equal(parsed[0]?.Service, 'api');
  assert.equal(parsed[1]?.Service, 'redis');
});

test('isServiceHealthy accepts running or healthy services only', () => {
  assert.equal(isServiceHealthy({ State: 'running', Health: 'healthy' }), true);
  assert.equal(isServiceHealthy({ State: 'healthy', Health: '' }), true);
  assert.equal(isServiceHealthy({ State: 'exited', Health: 'healthy' }), false);
  assert.equal(isServiceHealthy({ State: 'running', Health: 'starting' }), false);
});

test('platform health targets include api, portal, keycloak and minio', () => {
  assert.equal(PLATFORM_HEALTH_TARGETS.length, 4);
  assert.ok(PLATFORM_HEALTH_TARGETS.some((target) => target.includes('/api/health')));
  assert.ok(PLATFORM_HEALTH_TARGETS.some((target) => target.includes('/health')));
  assert.ok(PLATFORM_HEALTH_TARGETS.some((target) => target.includes('/realms/rh/.well-known/openid-configuration')));
  assert.ok(PLATFORM_HEALTH_TARGETS.some((target) => target.includes('/minio/health/ready')));
});

test('telemetry url is explicit and stable', () => {
  assert.equal(PLATFORM_TELEMETRY_URL, 'http://127.0.0.1:3000/api/v1/platform/telemetry');
});
