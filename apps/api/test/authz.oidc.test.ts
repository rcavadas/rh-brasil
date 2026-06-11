import assert from 'node:assert/strict';
import { generateKeyPairSync, sign } from 'node:crypto';
import { test } from 'node:test';
import { resolveAuthContext, verifyOidcToken, type AuthzConfig } from '../src/authz.js';

type JwkLike = Record<string, unknown> & {
  kid?: string;
  use?: string;
  alg?: string;
};

function base64UrlJson(value: unknown): string {
  return Buffer.from(JSON.stringify(value)).toString('base64url');
}

function signJwt(privateKey: any, header: unknown, payload: unknown): string {
  const signingInput = `${base64UrlJson(header)}.${base64UrlJson(payload)}`;
  const signature = sign('RSA-SHA256', Buffer.from(signingInput), privateKey).toString('base64url');
  return `${signingInput}.${signature}`;
}

function createOidcFetchMock(issuerUrl: string, jwk: JwkLike) {
  const discovery = {
    issuer: issuerUrl,
    jwks_uri: `${issuerUrl}/protocol/openid-connect/certs`,
  };

  return async (url: string) => {
    if (url === `${issuerUrl}/.well-known/openid-configuration`) {
      return {
        ok: true,
        json: async () => discovery,
      } as Response;
    }

    if (url === discovery.jwks_uri) {
      return {
        ok: true,
        json: async () => ({ keys: [jwk] }),
      } as Response;
    }

    throw new Error(`unexpected url ${url}`);
  };
}

test('verifyOidcToken resolves a signed token into an auth context', async () => {
  const { publicKey, privateKey } = generateKeyPairSync('rsa', { modulusLength: 2048 });
  const issuerUrl = 'https://issuer-mixed.example';
  const audience = 'rh-api';
  const jwk = publicKey.export({ format: 'jwk' }) as JwkLike;
  jwk.kid = 'kid-1';
  jwk.use = 'sig';
  jwk.alg = 'RS256';

  const token = signJwt(
    privateKey,
    { alg: 'RS256', kid: jwk.kid, typ: 'JWT' },
    {
      iss: issuerUrl,
      aud: audience,
      sub: 'user-oidc-1',
      tenant_id: 'tenant-oidc-1',
      rh_roles: ['auditor', 'admin'],
      exp: Math.floor(Date.now() / 1000) + 60,
      nbf: Math.floor(Date.now() / 1000) - 10,
    },
  );

  const config: AuthzConfig = {
    mode: 'oidc',
    issuerUrl,
    audience,
    roleClaimPath: 'rh_roles',
    tenantClaimPath: 'tenant_id',
    userIdClaimPath: 'sub',
    clockToleranceSeconds: 0,
  };

  const auth = await verifyOidcToken(token, config, createOidcFetchMock(issuerUrl, jwk));

  assert.equal(auth.source, 'oidc');
  assert.equal(auth.userId, 'user-oidc-1');
  assert.equal(auth.tenantId, 'tenant-oidc-1');
  assert.equal(auth.role, 'admin');
  assert.equal(auth.subject, 'user-oidc-1');
});

test('resolveAuthContext prefers bearer tokens in mixed mode', async () => {
  const { publicKey, privateKey } = generateKeyPairSync('rsa', { modulusLength: 2048 });
  const issuerUrl = 'https://issuer.example';
  const audience = 'rh-api';
  const jwk = publicKey.export({ format: 'jwk' }) as JwkLike;
  jwk.kid = 'kid-2';
  jwk.use = 'sig';
  jwk.alg = 'RS256';

  const token = signJwt(
    privateKey,
    { alg: 'RS256', kid: jwk.kid, typ: 'JWT' },
    {
      iss: issuerUrl,
      aud: audience,
      sub: 'user-mixed-1',
      tenant_id: 'tenant-mixed-1',
      rh_roles: ['rh'],
      exp: Math.floor(Date.now() / 1000) + 60,
      nbf: Math.floor(Date.now() / 1000) - 10,
    },
  );

  const config: AuthzConfig = {
    mode: 'mixed',
    issuerUrl,
    audience,
    roleClaimPath: 'rh_roles',
    tenantClaimPath: 'tenant_id',
    userIdClaimPath: 'sub',
    clockToleranceSeconds: 0,
  };

  const auth = await resolveAuthContext(
    {
      authorization: `Bearer ${token}`,
      'x-rh-user-id': 'header-user',
      'x-rh-role': 'admin',
    },
    config,
    createOidcFetchMock(issuerUrl, jwk),
  );

  assert.equal(auth.source, 'oidc');
  assert.equal(auth.userId, 'user-mixed-1');
  assert.equal(auth.role, 'rh');
  assert.equal(auth.tenantId, 'tenant-mixed-1');
});

test('resolveAuthContext supplements tenant scope from headers in mixed mode', async () => {
  const { publicKey, privateKey } = generateKeyPairSync('rsa', { modulusLength: 2048 });
  const issuerUrl = 'https://issuer-tenant.example';
  const jwk = publicKey.export({ format: 'jwk' }) as JwkLike;
  jwk.kid = 'kid-tenant';
  jwk.use = 'sig';
  jwk.alg = 'RS256';

  const token = signJwt(
    privateKey,
    { alg: 'RS256', kid: jwk.kid, typ: 'JWT' },
    {
      iss: issuerUrl,
      sub: 'user-tenant-1',
      rh_roles: ['auditor'],
      exp: Math.floor(Date.now() / 1000) + 60,
      nbf: Math.floor(Date.now() / 1000) - 10,
    },
  );

  const config: AuthzConfig = {
    mode: 'mixed',
    issuerUrl,
    roleClaimPath: 'rh_roles',
    tenantClaimPath: 'tenant_id',
    userIdClaimPath: 'sub',
    clockToleranceSeconds: 0,
  };

  const auth = await resolveAuthContext(
    {
      authorization: `Bearer ${token}`,
      'x-rh-tenant-id': 'tenant-from-header',
    },
    config,
    createOidcFetchMock(issuerUrl, jwk),
  );

  assert.equal(auth.source, 'oidc');
  assert.equal(auth.userId, 'user-tenant-1');
  assert.equal(auth.role, 'auditor');
  assert.equal(auth.tenantId, 'tenant-from-header');
});
