import { BadRequestException, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { createPublicKey, verify as verifySignature } from 'node:crypto';

export type AuthRole = 'admin' | 'rh' | 'manager' | 'employee' | 'auditor';
export type AuthSource = 'headers' | 'oidc';
export type AuthMode = 'headers' | 'mixed' | 'oidc';
type JsonWebKeyLike = Record<string, unknown> & {
  kid?: string;
  alg?: string;
  use?: string;
};

export type AuthContext = {
  userId: string;
  role: AuthRole;
  tenantId?: string;
  source: AuthSource;
  subject?: string;
};

export const AUTH_META_KEY = 'rh:auth:roles';
export const PUBLIC_META_KEY = 'rh:auth:public';
const ROLE_PRIORITY: AuthRole[] = ['admin', 'rh', 'manager', 'auditor', 'employee'];

export type AuthzConfig = {
  mode: AuthMode;
  issuerUrl?: string;
  jwksUrl?: string;
  audience?: string;
  roleClaimPath: string;
  tenantClaimPath: string;
  userIdClaimPath: string;
  clockToleranceSeconds: number;
};

type JwtHeader = {
  alg?: string;
  kid?: string;
  typ?: string;
};

type JwtClaims = Record<string, unknown>;

type OpenIdDiscovery = {
  issuer: string;
  jwks_uri: string;
};

type JwksDocument = {
  keys: JsonWebKeyLike[];
};

const discoveryCache = new Map<string, Promise<OpenIdDiscovery>>();
const jwksCache = new Map<string, Promise<JwksDocument>>();

export function parseAuthHeaderValue(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}

export function parseAuthContext(headers: Record<string, string | string[] | undefined>): AuthContext {
  const userId = parseAuthHeaderValue(headers['x-rh-user-id']);
  const roleRaw = parseAuthHeaderValue(headers['x-rh-role']);
  const tenantId = parseAuthHeaderValue(headers['x-rh-tenant-id']);

  if (!userId) {
    throw new UnauthorizedException('x-rh-user-id header is required');
  }

  if (!roleRaw) {
    throw new UnauthorizedException('x-rh-role header is required');
  }

  const role = normalizeRole(roleRaw);
  if (!role) {
    throw new BadRequestException(`unsupported role ${roleRaw}`);
  }

  return { userId, role, tenantId, source: 'headers' };
}

export function readAuthzConfig(env: NodeJS.ProcessEnv = process.env): AuthzConfig {
  const mode = normalizeAuthMode(env.AUTH_MODE) ?? 'mixed';

  return {
    mode,
    issuerUrl: normalizeUrl(env.OIDC_ISSUER_URL),
    jwksUrl: normalizeUrl(env.OIDC_JWKS_URL),
    audience: env.OIDC_AUDIENCE?.trim() || undefined,
    roleClaimPath: env.OIDC_ROLE_CLAIM?.trim() || 'rh_roles',
    tenantClaimPath: env.OIDC_TENANT_CLAIM?.trim() || 'tenant_id',
    userIdClaimPath: env.OIDC_USER_ID_CLAIM?.trim() || 'sub',
    clockToleranceSeconds: Number(env.OIDC_CLOCK_TOLERANCE_SECONDS ?? 30),
  };
}

export function normalizeRole(value: string): AuthRole | undefined {
  const normalized = value.trim().toLowerCase();
  switch (normalized) {
    case 'admin':
    case 'rh':
    case 'manager':
    case 'employee':
    case 'auditor':
      return normalized;
    default:
      return undefined;
  }
}

export function normalizeAuthMode(value: string | undefined): AuthMode | undefined {
  const normalized = value?.trim().toLowerCase();
  switch (normalized) {
    case 'headers':
    case 'mixed':
    case 'oidc':
      return normalized;
    default:
      return undefined;
  }
}

export function canAccessRole(role: AuthRole, allowedRoles: AuthRole[] | undefined): boolean {
  if (!allowedRoles || allowedRoles.length === 0) {
    return true;
  }

  return allowedRoles.includes(role);
}

export function assertTenantScope(auth: AuthContext, tenantId: string | undefined): void {
  if (!tenantId) {
    return;
  }

  if (!auth.tenantId) {
    throw new UnauthorizedException('x-rh-tenant-id header is required for tenant scoped routes');
  }

  if (auth.tenantId && auth.tenantId !== tenantId) {
    throw new ForbiddenException('tenant scope does not match');
  }
}

export function parseBearerToken(headers: Record<string, string | string[] | undefined>): string | undefined {
  const authorization = parseAuthHeaderValue(headers.authorization);
  if (!authorization) {
    return undefined;
  }

  const match = /^Bearer\s+(.+)$/i.exec(authorization);
  return match?.[1]?.trim() || undefined;
}

export async function resolveAuthContext(
  headers: Record<string, string | string[] | undefined>,
  config: AuthzConfig = readAuthzConfig(),
  fetchImpl: typeof fetch = globalThis.fetch,
): Promise<AuthContext> {
  const bearerToken = parseBearerToken(headers);

  if (bearerToken && config.mode !== 'headers') {
    const auth = await verifyOidcToken(bearerToken, config, fetchImpl);
    return mergeTenantScope(auth, headers, config.mode);
  }

  if (config.mode === 'oidc') {
    throw new UnauthorizedException('Authorization Bearer token is required');
  }

  return parseAuthContext(headers);
}

function mergeTenantScope(
  auth: AuthContext,
  headers: Record<string, string | string[] | undefined>,
  mode: AuthMode,
): AuthContext {
  if (mode === 'oidc') {
    return auth;
  }

  const headerTenantId = parseAuthHeaderValue(headers['x-rh-tenant-id']);
  if (!headerTenantId) {
    return auth;
  }

  if (auth.tenantId && auth.tenantId !== headerTenantId) {
    throw new ForbiddenException('tenant scope does not match');
  }

  return auth.tenantId ? auth : { ...auth, tenantId: headerTenantId };
}

export async function verifyOidcToken(
  token: string,
  config: AuthzConfig,
  fetchImpl: typeof fetch = globalThis.fetch,
): Promise<AuthContext> {
  if (!config.issuerUrl) {
    throw new BadRequestException('OIDC_ISSUER_URL is required for OIDC auth');
  }

  const [encodedHeader, encodedPayload, encodedSignature] = token.split('.');
  if (!encodedHeader || !encodedPayload || !encodedSignature) {
    throw new UnauthorizedException('invalid bearer token format');
  }

  const header = decodeJwtSegment<JwtHeader>(encodedHeader, 'JWT header');
  if (header.alg !== 'RS256') {
    throw new UnauthorizedException(`unsupported JWT algorithm ${header.alg ?? 'missing'}`);
  }

  const claims = decodeJwtSegment<JwtClaims>(encodedPayload, 'JWT payload');
  const discovery = await fetchOpenIdDiscovery(config.issuerUrl, fetchImpl);

  if (claims.iss !== discovery.issuer) {
    throw new UnauthorizedException('token issuer does not match OIDC issuer');
  }

  if (config.audience) {
    assertAudience(claims.aud, config.audience);
  }

  const now = Math.floor(Date.now() / 1000);
  const exp = asNumber(claims.exp);
  const nbf = asNumber(claims.nbf);
  const tolerance = Number.isFinite(config.clockToleranceSeconds) ? config.clockToleranceSeconds : 30;

  if (nbf !== undefined && now + tolerance < nbf) {
    throw new UnauthorizedException('token is not active yet');
  }

  if (exp !== undefined && now - tolerance >= exp) {
    throw new UnauthorizedException('token is expired');
  }

  const jwksUri = config.jwksUrl ?? discovery.jwks_uri;
  const jwk = await findJwkForToken(jwksUri, header.kid, fetchImpl);
  const publicKey = createPublicKey({ key: jwk, format: 'jwk' });
  const signature = decodeBase64Url(encodedSignature);
  const signingInput = Buffer.from(`${encodedHeader}.${encodedPayload}`);
  const verified = verifySignature('RSA-SHA256', signingInput, publicKey, signature);

  if (!verified) {
    throw new UnauthorizedException('token signature is invalid');
  }

  const role = readRoleClaim(claims, config);
  const userId = readClaimValue(claims, config.userIdClaimPath);
  if (!userId) {
    throw new UnauthorizedException('token is missing a user identifier');
  }

  const tenantId = readClaimValue(claims, config.tenantClaimPath);

  return {
    userId,
    role,
    tenantId,
    source: 'oidc',
    subject: readClaimValue(claims, 'sub'),
  };
}

function normalizeUrl(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  if (!trimmed) {
    return undefined;
  }

  return trimmed.replace(/\/+$/, '');
}

function decodeJwtSegment<T>(segment: string, label: string): T {
  try {
    const json = Buffer.from(segment, 'base64url').toString('utf8');
    return JSON.parse(json) as T;
  } catch {
    throw new UnauthorizedException(`invalid ${label}`);
  }
}

function decodeBase64Url(value: string): Buffer {
  try {
    return Buffer.from(value, 'base64url');
  } catch {
    throw new UnauthorizedException('invalid JWT signature encoding');
  }
}

function asNumber(value: unknown): number | undefined {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }

  return undefined;
}

function assertAudience(audience: unknown, expected: string): void {
  if (typeof audience === 'string' && audience === expected) {
    return;
  }

  if (Array.isArray(audience) && audience.some((item) => item === expected)) {
    return;
  }

  throw new UnauthorizedException('token audience does not match');
}

function readRoleClaim(claims: JwtClaims, config: AuthzConfig): AuthRole {
  const directClaim = readNestedClaim(claims, config.roleClaimPath);
  const candidateRoles = [
    ...collectRoleValues(directClaim),
    ...collectRoleValues(readNestedClaim(claims, 'role')),
    ...collectRoleValues(readNestedClaim(claims, 'roles')),
    ...collectRoleValues(readNestedClaim(claims, 'realm_access.roles')),
    ...collectRoleValues(readNestedClaim(claims, 'resource_access.rh.roles')),
  ];

  const normalized = candidateRoles
    .map((value) => normalizeRole(value))
    .filter((value): value is AuthRole => Boolean(value));

  const chosen = ROLE_PRIORITY.find((role) => normalized.includes(role));
  if (!chosen) {
    throw new UnauthorizedException('token does not contain a supported role');
  }

  return chosen;
}

function collectRoleValues(value: unknown): string[] {
  if (typeof value === 'string') {
    return [value];
  }

  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === 'string');
  }

  return [];
}

function readClaimValue(claims: JwtClaims, path: string): string | undefined {
  const value = readNestedClaim(claims, path);
  if (typeof value === 'string' && value.trim()) {
    return value;
  }

  return undefined;
}

function readNestedClaim(claims: JwtClaims, path: string): unknown {
  return path.split('.').reduce<unknown>((current, segment) => {
    if (!current || typeof current !== 'object' || Array.isArray(current)) {
      return undefined;
    }

    return (current as Record<string, unknown>)[segment];
  }, claims);
}

async function fetchOpenIdDiscovery(issuerUrl: string, fetchImpl: typeof fetch): Promise<OpenIdDiscovery> {
  const normalizedIssuer = normalizeUrl(issuerUrl);
  if (!normalizedIssuer) {
    throw new BadRequestException('OIDC_ISSUER_URL is required for OIDC auth');
  }

  const cached = discoveryCache.get(normalizedIssuer);
  if (cached) {
    return cached;
  }

  const promise = (async () => {
    try {
      const response = await fetchImpl(`${normalizedIssuer}/.well-known/openid-configuration`);
      if (!response.ok) {
        throw new UnauthorizedException('unable to load OIDC discovery document');
      }

      const discovery = (await response.json()) as OpenIdDiscovery;
      if (!discovery.issuer || !discovery.jwks_uri) {
        throw new UnauthorizedException('OIDC discovery document is incomplete');
      }

      return discovery;
    } catch (error) {
      discoveryCache.delete(normalizedIssuer);
      throw error;
    }
  })();

  discoveryCache.set(normalizedIssuer, promise);
  return promise;
}

async function findJwkForToken(jwksUri: string, kid: string | undefined, fetchImpl: typeof fetch): Promise<JsonWebKeyLike> {
  const cached = jwksCache.get(jwksUri);
  if (cached) {
    const jwks = await cached;
    return selectJwk(jwks, kid);
  }

  const promise = (async () => {
    try {
      const response = await fetchImpl(jwksUri);
      if (!response.ok) {
        throw new UnauthorizedException('unable to load OIDC JWKS');
      }

      const jwks = (await response.json()) as JwksDocument;
      if (!Array.isArray(jwks.keys) || jwks.keys.length === 0) {
        throw new UnauthorizedException('OIDC JWKS does not contain public keys');
      }

      return jwks;
    } catch (error) {
      jwksCache.delete(jwksUri);
      throw error;
    }
  })();

  jwksCache.set(jwksUri, promise);
  const jwks = await promise;
  return selectJwk(jwks, kid);
}

function selectJwk(jwks: JwksDocument, kid: string | undefined): JsonWebKeyLike {
  if (kid) {
    const match = jwks.keys.find((key) => key.kid === kid);
    if (match) {
      return match;
    }
  }

  if (jwks.keys.length === 1) {
    return jwks.keys[0];
  }

  throw new UnauthorizedException('OIDC JWKS key not found for token');
}
