import http from 'node:http';
import { createHash, randomBytes } from 'node:crypto';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Redis from 'ioredis';
import { isTenantAllowed, reconcileActiveTenant, selectDefaultTenantId } from './tenant-access.js';

const port = Number(process.env.PORT ?? 5173);
const webPublicOrigin = process.env.WEB_PUBLIC_ORIGIN?.replace(/\/$/, '') ?? 'http://localhost:5173';
const apiInternalUrl = process.env.API_INTERNAL_URL?.replace(/\/$/, '') ?? 'http://localhost:3000';
const keycloakBrowserUrl = process.env.KEYCLOAK_BROWSER_URL?.replace(/\/$/, '') ?? 'http://localhost:8080';
const keycloakInternalUrl = process.env.KEYCLOAK_INTERNAL_URL?.replace(/\/$/, '') ?? 'http://localhost:8080';
const keycloakRealm = process.env.KEYCLOAK_REALM?.trim() || 'rh';
const keycloakClientId = process.env.KEYCLOAK_CLIENT_ID?.trim() || 'rh-web';
const sessionCookieName = process.env.WEB_SESSION_COOKIE_NAME?.trim() || 'rh.web.session';
const sessionStorePath = process.env.WEB_SESSION_STORE_PATH?.trim() || '';
const redisUrl = process.env.WEB_REDIS_URL?.trim() || 'redis://redis:6379';
const sessionRedisKeyPrefix = 'rh:web:session:';
const sessionRedisIndexKey = 'rh:web:sessions';
const cookieSecure = webPublicOrigin.startsWith('https://');
const sessionMaxAgeSeconds = Number(process.env.WEB_SESSION_MAX_AGE_SECONDS ?? 60 * 60 * 24 * 7);
const sessionIdleTimeoutSeconds = Number(process.env.WEB_SESSION_IDLE_TIMEOUT_SECONDS ?? 60 * 60 * 8);
const refreshMarginMs = 60_000;
const distDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../dist');

function logEvent(level, event, details = {}) {
  const payload = JSON.stringify({
    app: 'rh-web',
    level,
    event,
    at: new Date().toISOString(),
    ...details,
  });

  if (level === 'error') {
    console.error(payload);
    return;
  }

  if (level === 'warn') {
    console.warn(payload);
    return;
  }

  console.log(payload);
}

const sessions = new Map();
const oauthStates = new Map();
const refreshLocks = new Map();
const sessionStoreState = {
  lastRedisLoadAt: 0,
  lastRedisWriteAt: 0,
  lastRedisHealthyAt: 0,
  lastRedisDriftAt: 0,
  redisIndexedSessions: 0,
  redisLoadedSessions: 0,
};
let sessionStoreWriteChain = Promise.resolve();
let cleanupTimer = null;
let redisConnectPromise = null;
const redis = new Redis(redisUrl, {
  lazyConnect: true,
  maxRetriesPerRequest: 1,
  enableReadyCheck: true,
});

redis.on('connect', () => {
  logEvent('info', 'bff.redis_connected');
});

redis.on('ready', () => {
  logEvent('info', 'bff.redis_ready');
});

redis.on('close', () => {
  logEvent('warn', 'bff.redis_closed');
});

redis.on('reconnecting', (delay) => {
  logEvent('warn', 'bff.redis_reconnecting', { delay });
});

redis.on('error', (error) => {
  logEvent('error', 'bff.redis_error', {
    message: error instanceof Error ? error.message : String(error),
  });
});

function decodeJwtPayload(token) {
  const parts = token.split('.');
  if (parts.length < 2) {
    return null;
  }

  try {
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const padding = '='.repeat((4 - (base64.length % 4)) % 4);
    return JSON.parse(Buffer.from(`${base64}${padding}`, 'base64').toString('utf8'));
  } catch {
    return null;
  }
}

function collectRoles(payload) {
  const roles = new Set();
  const directRoles = payload.rh_roles;
  if (typeof directRoles === 'string') {
    roles.add(directRoles);
  } else if (Array.isArray(directRoles)) {
    for (const role of directRoles) {
      if (typeof role === 'string' && role.trim()) {
        roles.add(role);
      }
    }
  }

  const realmRoles = payload.realm_access?.roles;
  if (Array.isArray(realmRoles)) {
    for (const role of realmRoles) {
      if (typeof role === 'string' && role.trim()) {
        roles.add(role);
      }
    }
  }

  return Array.from(roles);
}

function getProfileFromToken(token) {
  const payload = decodeJwtPayload(token);
  if (!payload) {
    return {
      subject: 'unknown',
      displayName: 'unknown',
      roles: [],
      role: 'unknown',
    };
  }

  const subject = typeof payload.sub === 'string' && payload.sub.trim() ? payload.sub : 'unknown';
  const displayName =
    (typeof payload.name === 'string' && payload.name.trim() ? payload.name : undefined) ??
    (typeof payload.preferred_username === 'string' && payload.preferred_username.trim()
      ? payload.preferred_username
      : undefined) ??
    subject;
  const roles = collectRoles(payload);

  return {
    subject,
    displayName,
    roles,
    role: roles[0] ?? 'unknown',
  };
}

function isTokenExpiringSoon(expiresAt) {
  if (!expiresAt) {
    return true;
  }

  return Date.now() >= expiresAt - refreshMarginMs;
}

function randomString(size = 32) {
  return randomBytes(size).toString('base64url');
}

function base64UrlEncode(buffer) {
  return Buffer.from(buffer).toString('base64url');
}

async function createCodeChallenge(verifier) {
  const digest = createHash('sha256').update(verifier).digest();
  return base64UrlEncode(digest);
}

function parseCookies(cookieHeader) {
  const cookies = new Map();
  if (!cookieHeader) {
    return cookies;
  }

  const parts = cookieHeader.split(';');
  for (const part of parts) {
    const separatorIndex = part.indexOf('=');
    if (separatorIndex < 0) {
      continue;
    }

    const name = part.slice(0, separatorIndex).trim();
    const value = part.slice(separatorIndex + 1).trim();
    if (name) {
      cookies.set(name, decodeURIComponent(value));
    }
  }

  return cookies;
}

function serializeCookie(name, value, options = {}) {
  const parts = [`${name}=${encodeURIComponent(value)}`];
  parts.push('Path=/');
  parts.push('HttpOnly');
  parts.push('SameSite=Lax');

  if (options.maxAgeSeconds) {
    parts.push(`Max-Age=${Math.max(0, Math.floor(options.maxAgeSeconds))}`);
  }

  if (cookieSecure) {
    parts.push('Secure');
  }

  return parts.join('; ');
}

function clearCookie(name) {
  const parts = [`${name}=`, 'Path=/', 'HttpOnly', 'SameSite=Lax', 'Max-Age=0'];
  if (cookieSecure) {
    parts.push('Secure');
  }
  return parts.join('; ');
}

function sendJson(res, statusCode, payload, extraHeaders = {}) {
  res.writeHead(statusCode, {
    'content-type': 'application/json; charset=utf-8',
    ...extraHeaders,
  });
  res.end(JSON.stringify(payload));
}

function sendText(res, statusCode, body, extraHeaders = {}) {
  res.writeHead(statusCode, {
    'content-type': 'text/plain; charset=utf-8',
    ...extraHeaders,
  });
  res.end(body);
}

function redirect(res, location, extraHeaders = {}) {
  res.writeHead(302, {
    location,
    ...extraHeaders,
  });
  res.end();
}

function getSessionIdFromRequest(req) {
  const cookies = parseCookies(req.headers.cookie ?? '');
  return cookies.get(sessionCookieName) ?? '';
}

function getRedisSessionKey(sessionId) {
  return `${sessionRedisKeyPrefix}${sessionId}`;
}

async function ensureRedisConnection() {
  if (redis.status === 'ready') {
    return;
  }

  if (!redisConnectPromise) {
    redisConnectPromise = redis
      .connect()
      .catch((error) => {
        redisConnectPromise = null;
        throw error;
      })
      .then(() => {
        redisConnectPromise = null;
      });
  }

  await redisConnectPromise;
}

async function isRedisHealthy() {
  try {
    await ensureRedisConnection();
    const pong = await redis.ping();
    if (pong === 'PONG') {
      sessionStoreState.lastRedisHealthyAt = Date.now();
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

function getSessionStoreSnapshot(redisHealthy) {
  return {
    redis: redisHealthy ? 'ok' : 'down',
    sessionsInMemory: sessions.size,
    sessionsIndexed: sessionStoreState.redisIndexedSessions,
    sessionsLoaded: sessionStoreState.redisLoadedSessions,
    lastRedisLoadAt: sessionStoreState.lastRedisLoadAt,
    lastRedisWriteAt: sessionStoreState.lastRedisWriteAt,
    lastRedisHealthyAt: sessionStoreState.lastRedisHealthyAt,
    lastRedisDriftAt: sessionStoreState.lastRedisDriftAt,
  };
}

function getSessionRecord(sessionId) {
  if (!sessionId) {
    return null;
  }

  const record = sessions.get(sessionId) ?? null;
  if (!record) {
    return null;
  }

  if (isSessionIdleExpired(record)) {
    sessions.delete(sessionId);
    void scheduleSessionStoreWrite();
    return null;
  }

  const touchedRecord = touchSessionRecord(record);
  if (touchedRecord !== record) {
    sessions.set(sessionId, touchedRecord);
    void scheduleSessionStoreWrite();
  }

  return touchedRecord;
}

function isSessionIdleExpired(record) {
  const idleTimeoutMs = Math.max(1, sessionIdleTimeoutSeconds) * 1000;
  const lastSeenAt = Number(record?.lastSeenAt ?? record?.updatedAt ?? 0);
  if (!Number.isFinite(lastSeenAt) || lastSeenAt <= 0) {
    return true;
  }

  return Date.now() - lastSeenAt > idleTimeoutMs;
}

function touchSessionRecord(record) {
  const now = Date.now();
  if (record.lastSeenAt && now - Number(record.lastSeenAt) < 15_000) {
    return record;
  }

  return {
    ...record,
    lastSeenAt: now,
  };
}

function persistSession(sessionId, record) {
  sessions.set(sessionId, touchSessionRecord(record));
  void scheduleSessionStoreWrite();
}

function removeSession(sessionId) {
  sessions.delete(sessionId);
  void redis.del(getRedisSessionKey(sessionId)).catch((error) => {
    console.error('Failed to delete Redis session record', error);
  });
  void scheduleSessionStoreWrite();
}

async function loadSessionsFromRedis() {
  try {
    await ensureRedisConnection();
  } catch (error) {
    console.error('Failed to connect to Redis session store', error);
    return false;
  }

  try {
    sessions.clear();
    const indexedSessionIds = await redis.smembers(sessionRedisIndexKey);
    sessionStoreState.redisIndexedSessions = indexedSessionIds.length;
    const sessionIds =
      indexedSessionIds.length > 0
        ? indexedSessionIds
        : (await redis.keys(`${sessionRedisKeyPrefix}*`)).map((key) => key.slice(sessionRedisKeyPrefix.length));

    if (sessionIds.length > 0 && indexedSessionIds.length === 0) {
      await redis
        .sadd(sessionRedisIndexKey, sessionIds)
        .catch((error) => console.error('Failed to rebuild Redis session index', error));
    }

    if (sessionIds.length === 0) {
      pruneExpiredSessions();
      return true;
    }

    const keys = sessionIds.map((sessionId) => getRedisSessionKey(sessionId));
    const values = await redis.mget(keys);
    let loadedCount = 0;
    for (let index = 0; index < keys.length; index += 1) {
      const key = keys[index];
      const raw = values[index];
      if (!raw) {
        continue;
      }

      try {
        const sessionId = key.slice(sessionRedisKeyPrefix.length);
        const parsed = JSON.parse(raw);
        sessions.set(sessionId, {
          ...parsed,
          lastSeenAt: Number(parsed.lastSeenAt ?? Date.now()),
        });
        loadedCount += 1;
      } catch (error) {
        console.error('Failed to parse Redis session record', error);
      }
    }

    sessionStoreState.redisLoadedSessions = loadedCount;
    sessionStoreState.lastRedisLoadAt = Date.now();
    if (indexedSessionIds.length !== loadedCount) {
      sessionStoreState.lastRedisDriftAt = Date.now();
      console.warn('BFF Redis session index drift detected', {
        indexed: indexedSessionIds.length,
        loaded: loadedCount,
      });
      void scheduleSessionStoreWrite();
    }

    pruneExpiredSessions();
    return true;
  } catch (error) {
    console.error('Failed to load Redis session store', error);
    return false;
  }
}

async function loadLegacySessionStore() {
  if (!sessionStorePath) {
    return false;
  }

  try {
    const raw = await readFile(sessionStorePath, 'utf8');
    if (!raw.trim()) {
      return false;
    }

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed.sessions)) {
      return false;
    }

    sessions.clear();
    for (const entry of parsed.sessions) {
      if (!Array.isArray(entry) || entry.length !== 2) {
        continue;
      }

      const [sessionId, record] = entry;
      if (typeof sessionId === 'string' && record && typeof record === 'object') {
        sessions.set(sessionId, {
          ...record,
          lastSeenAt: Number(record.lastSeenAt ?? Date.now()),
        });
      }
    }

    pruneExpiredSessions();
    return sessions.size > 0;
  } catch (error) {
    if (error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT') {
      return false;
    }

    console.error('Failed to load legacy BFF session store', error);
    return false;
  }
}

async function loadSessionStore() {
  const redisLoaded = await loadSessionsFromRedis();
  if (redisLoaded && sessions.size > 0) {
    return;
  }

  const legacyLoaded = await loadLegacySessionStore();
  if (!legacyLoaded) {
    return;
  }

  await flushSessionStore();
}

async function flushSessionStore() {
  const ttlSeconds = Math.max(1, sessionIdleTimeoutSeconds);
  const pipeline = redis.pipeline();
  const sessionIds = Array.from(sessions.keys());

  pipeline.del(sessionRedisIndexKey);

  for (const [sessionId, record] of sessions.entries()) {
    const key = getRedisSessionKey(sessionId);
    pipeline.set(key, JSON.stringify(record), 'EX', ttlSeconds);
  }

  if (sessionIds.length > 0) {
    pipeline.sadd(sessionRedisIndexKey, sessionIds);
  }

  try {
    await pipeline.exec();
    sessionStoreState.redisIndexedSessions = sessionIds.length;
    sessionStoreState.redisLoadedSessions = sessions.size;
    sessionStoreState.lastRedisWriteAt = Date.now();
  } catch (error) {
    console.error('Failed to persist Redis session store', error);
  }
}

function scheduleSessionStoreWrite() {
  sessionStoreWriteChain = sessionStoreWriteChain
    .catch(() => undefined)
    .then(() => flushSessionStore())
    .catch((error) => {
      console.error('Failed to persist BFF session store', error);
    });

  return sessionStoreWriteChain;
}

function pruneExpiredSessions() {
  let removed = false;
  for (const [sessionId, record] of sessions.entries()) {
    if (isSessionIdleExpired(record)) {
      sessions.delete(sessionId);
      removed = true;
    }
  }

  if (removed) {
    void scheduleSessionStoreWrite();
  }
}

function startSessionCleanupLoop() {
  if (cleanupTimer) {
    return;
  }

  cleanupTimer = setInterval(() => {
    pruneExpiredSessions();
  }, 60_000);
  cleanupTimer.unref?.();
}

await loadSessionStore();
startSessionCleanupLoop();

function buildAuthorizeUrl(redirectUri, state, codeChallenge) {
  const url = new URL(`${keycloakBrowserUrl}/realms/${keycloakRealm}/protocol/openid-connect/auth`);
  url.searchParams.set('client_id', keycloakClientId);
  url.searchParams.set('redirect_uri', redirectUri);
  url.searchParams.set('response_type', 'code');
  url.searchParams.set('scope', 'openid profile email');
  url.searchParams.set('state', state);
  url.searchParams.set('code_challenge', codeChallenge);
  url.searchParams.set('code_challenge_method', 'S256');
  return url.toString();
}

function buildLogoutUrl(redirectUri, idToken) {
  const url = new URL(`${keycloakBrowserUrl}/realms/${keycloakRealm}/protocol/openid-connect/logout`);
  url.searchParams.set('post_logout_redirect_uri', redirectUri);
  if (idToken) {
    url.searchParams.set('id_token_hint', idToken);
  }
  return url.toString();
}

async function exchangeCodeForToken(code, verifier, redirectUri) {
  const response = await fetch(`${keycloakInternalUrl}/realms/${keycloakRealm}/protocol/openid-connect/token`, {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: keycloakClientId,
      code,
      code_verifier: verifier,
      redirect_uri: redirectUri,
    }),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Falha ao trocar o code OIDC (${response.status})`);
  }

  return response.json();
}

async function refreshAccessToken(record) {
  if (!record.refreshToken) {
    throw new Error('Refresh token ausente.');
  }

  const response = await fetch(`${keycloakInternalUrl}/realms/${keycloakRealm}/protocol/openid-connect/token`, {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: keycloakClientId,
      refresh_token: record.refreshToken,
    }),
  });

  if (!response.ok) {
    const message = await response.text();
    const error = new Error(message || `Falha ao renovar a sessao (${response.status})`);
    error.status = response.status;
    error.code = 'OIDC_REFRESH_FAILED';
    throw error;
  }

  return response.json();
}

function parseTokenResponse(tokens, previousRecord = null) {
  const payload = decodeJwtPayload(tokens.access_token ?? previousRecord?.accessToken ?? '');
  const idPayload = decodeJwtPayload(tokens.id_token ?? previousRecord?.idToken ?? '');
  const profileSource = idPayload ?? payload ?? {};
  const profile = {
    subject:
      (typeof profileSource.sub === 'string' && profileSource.sub.trim() ? profileSource.sub : undefined) ??
      (typeof payload?.sub === 'string' && payload.sub.trim() ? payload.sub : undefined) ??
      'unknown',
    displayName:
      (typeof profileSource.name === 'string' && profileSource.name.trim() ? profileSource.name : undefined) ??
      (typeof profileSource.preferred_username === 'string' && profileSource.preferred_username.trim()
        ? profileSource.preferred_username
        : undefined) ??
      (typeof payload?.preferred_username === 'string' && payload.preferred_username.trim()
        ? payload.preferred_username
        : undefined) ??
      'unknown',
    roles: collectRoles(payload ?? profileSource),
    role: collectRoles(payload ?? profileSource)[0] ?? 'unknown',
  };

  return {
    accessToken: tokens.access_token ?? previousRecord?.accessToken ?? '',
    refreshToken: tokens.refresh_token ?? previousRecord?.refreshToken ?? '',
    idToken: tokens.id_token ?? previousRecord?.idToken ?? '',
    expiresAt: Date.now() + Math.max(1, Number(tokens.expires_in ?? 300)) * 1000,
    profile,
  };
}

async function loadTenantAccess(accessToken) {
  const response = await fetch(`${apiInternalUrl}/api/v1/tenants/me/access`, {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const message = await response.text();
    const error = new Error(message || `Falha ao carregar tenants (${response.status})`);
    error.status = response.status;
    throw error;
  }

  return response.json();
}

async function ensureSession(sessionId) {
  if (sessionId && !sessions.has(sessionId)) {
    await loadSessionsFromRedis();
  }

  const record = getSessionRecord(sessionId);
  if (!record) {
    return null;
  }

  if (isSessionIdleExpired(record)) {
    removeSession(sessionId);
    return null;
  }

  if (!record.refreshToken || !isTokenExpiringSoon(record.expiresAt)) {
    return record;
  }

  const locked = refreshLocks.get(sessionId);
  if (locked) {
    return locked;
  }

  const refreshPromise = refreshAccessToken(record)
    .then((tokens) => {
      const nextRecord = {
        ...record,
        ...parseTokenResponse(tokens, record),
      };
      persistSession(sessionId, nextRecord);
      return nextRecord;
    })
    .catch((error) => {
      removeSession(sessionId);
      if (error && typeof error === 'object' && (error.status === 400 || error.status === 401 || error.code === 'OIDC_REFRESH_FAILED')) {
        return null;
      }
      throw error;
    })
    .finally(() => {
      refreshLocks.delete(sessionId);
    });

  refreshLocks.set(sessionId, refreshPromise);
  return refreshPromise;
}

async function loadSessionSnapshot(sessionId) {
  const record = await ensureSession(sessionId);
  if (!record) {
    return {
      authenticated: false,
      profile: null,
      expiresAt: 0,
      activeTenantId: '',
      tenants: [],
    };
  }

  const tenants = await loadTenantAccess(record.accessToken);
  const reconciled = reconcileActiveTenant(tenants, record.activeTenantId ?? '');
  if (reconciled.stale) {
    persistSession(sessionId, {
      ...record,
      activeTenantId: '',
    });
  }
  return {
    authenticated: true,
    profile: record.profile,
    expiresAt: record.expiresAt,
    activeTenantId: reconciled.activeTenantId,
    tenants,
  };
}

async function readRequestBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  return Buffer.concat(chunks);
}

async function proxyApiRequest(req, res, pathname, sessionId) {
  const record = await ensureSession(sessionId);
  if (!record) {
    sendJson(res, 401, { message: 'Sessao ausente.' });
    return;
  }

  const method = req.method ?? 'GET';
  const requestBody = method === 'GET' || method === 'HEAD' ? null : await readRequestBody(req);
  const targetUrl = new URL(pathname + (req.url?.includes('?') ? req.url.slice(req.url.indexOf('?')) : ''), apiInternalUrl);
  const headers = new Headers();

  for (const [name, value] of Object.entries(req.headers)) {
    if (!value) {
      continue;
    }

    const lower = name.toLowerCase();
    if (
      [
        'host',
        'cookie',
        'content-length',
        'connection',
        'transfer-encoding',
        'keep-alive',
        'proxy-authenticate',
        'proxy-authorization',
        'te',
        'trailer',
        'upgrade',
        'authorization',
        'x-rh-tenant-id',
      ].includes(lower)
    ) {
      continue;
    }

    headers.set(name, Array.isArray(value) ? value.join(', ') : value);
  }

  headers.set('authorization', `Bearer ${record.accessToken}`);
  if (record.activeTenantId) {
    const tenants = await loadTenantAccess(record.accessToken);
    const reconciled = reconcileActiveTenant(tenants, record.activeTenantId);
    if (reconciled.stale) {
      persistSession(sessionId, {
        ...record,
        activeTenantId: '',
      });
      sendJson(res, 403, { message: 'Tenant ativo nao esta mais disponivel para a sessao.' });
      return;
    }

    headers.set('x-rh-tenant-id', reconciled.activeTenantId);
  }

  const attemptRequest = async (accessToken) => {
    headers.set('authorization', `Bearer ${accessToken}`);
    const response = await fetch(targetUrl, {
      method,
      headers,
      body: requestBody && requestBody.length > 0 ? requestBody : undefined,
    });
    return response;
  };

  let response;
  try {
    response = await attemptRequest(record.accessToken);
    if (response.status === 401) {
      const refreshed = await ensureSession(sessionId);
      if (!refreshed) {
        sendJson(res, 401, { message: 'Sessao expirada.' });
        return;
      }
      response = await attemptRequest(refreshed.accessToken);
    }
  } catch (error) {
    logEvent('error', 'bff.proxy_failed', {
      method,
      target: targetUrl.toString(),
      message: error instanceof Error ? error.message : String(error),
    });
    throw error;
  }

  const responseHeaders = {};
  const contentType = response.headers.get('content-type');
  if (contentType) {
    responseHeaders['content-type'] = contentType;
  }

  const body = Buffer.from(await response.arrayBuffer());
  res.writeHead(response.status, responseHeaders);
  res.end(body);
}

async function handleActiveTenantUpdate(req, res, sessionId) {
  const record = await ensureSession(sessionId);
  if (!record) {
    sendJson(res, 401, { message: 'Sessao ausente.' });
    return;
  }

  const raw = await readRequestBody(req);
  let payload = {};
  try {
    payload = JSON.parse(raw.toString('utf8') || '{}');
  } catch {
    sendJson(res, 400, { message: 'Body invalido.' });
    return;
  }

  const tenantId = typeof payload.tenantId === 'string' ? payload.tenantId.trim() : '';
  if (!tenantId) {
    sendJson(res, 400, { message: 'tenantId e obrigatorio.' });
    return;
  }

  const tenants = await loadTenantAccess(record.accessToken);
  const allowed = isTenantAllowed(tenants, tenantId);
  if (!allowed) {
    sendJson(res, 403, { message: 'Tenant nao disponivel para o subject atual.' });
    return;
  }

  const nextRecord = {
    ...record,
    activeTenantId: tenantId,
  };
  persistSession(sessionId, nextRecord);
  sendJson(res, 200, {
    activeTenantId: tenantId,
  });
}

async function handleAuthLogin(req, res) {
  const redirectUri = `${webPublicOrigin}/auth/callback`;
  const state = randomString(16);
  const verifier = randomString(48);
  const codeChallenge = await createCodeChallenge(verifier);

  oauthStates.set(state, {
    verifier,
    createdAt: Date.now(),
  });

  redirect(res, buildAuthorizeUrl(redirectUri, state, codeChallenge));
}

async function handleAuthCallback(req, res, url) {
  const code = url.searchParams.get('code') ?? '';
  const state = url.searchParams.get('state') ?? '';
  const stateRecord = oauthStates.get(state);

  if (!code || !state || !stateRecord) {
    sendText(res, 400, 'Retorno OIDC invalido.');
    return;
  }

  oauthStates.delete(state);

  const tokens = await exchangeCodeForToken(code, stateRecord.verifier, `${webPublicOrigin}/auth/callback`);
  const sessionId = randomString(24);
  const tenants = await loadTenantAccess(tokens.access_token);
  const activeTenantId = selectDefaultTenantId(tenants);
  const nextRecord = {
    ...parseTokenResponse(tokens),
    activeTenantId,
  };

  persistSession(sessionId, nextRecord);

  res.writeHead(302, {
    'set-cookie': serializeCookie(sessionCookieName, sessionId, { maxAgeSeconds: sessionMaxAgeSeconds }),
    location: '/',
  });
  res.end();
}

async function handleAuthLogout(req, res) {
  const sessionId = getSessionIdFromRequest(req);
  const record = getSessionRecord(sessionId);
  if (sessionId) {
    removeSession(sessionId);
  }

  const logoutTarget = record?.idToken
    ? buildLogoutUrl(`${webPublicOrigin}/`, record.idToken)
    : `${webPublicOrigin}/`;

  res.writeHead(302, {
    'set-cookie': clearCookie(sessionCookieName),
    location: logoutTarget,
  });
  res.end();
}

async function serveStatic(req, res, url) {
  const pathname = decodeURIComponent(url.pathname);
  if (pathname === '/health') {
    sendJson(res, 200, { status: 'ok' });
    return;
  }

  if (pathname.startsWith('/assets/')) {
    const assetPath = path.join(distDir, pathname);
    try {
      const assetStat = await stat(assetPath);
      if (!assetStat.isFile()) {
        throw new Error('asset missing');
      }

      const bytes = await readFile(assetPath);
      const contentType = pathname.endsWith('.css')
        ? 'text/css; charset=utf-8'
        : pathname.endsWith('.js')
          ? 'application/javascript; charset=utf-8'
          : 'application/octet-stream';
      res.writeHead(200, { 'content-type': contentType, 'cache-control': 'public, max-age=31536000, immutable' });
      res.end(bytes);
      return;
    } catch {
      sendText(res, 404, 'Asset not found.');
      return;
    }
  }

  try {
    const html = await readFile(path.join(distDir, 'index.html'));
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    res.end(html);
  } catch {
    sendText(res, 500, 'Build do portal indisponivel.');
  }
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url ?? '/', webPublicOrigin);
    const sessionId = getSessionIdFromRequest(req);

    if (req.method === 'GET' && url.pathname === '/health') {
      const redisHealthy = await isRedisHealthy();
      sendJson(res, redisHealthy ? 200 : 503, {
        status: redisHealthy ? 'ok' : 'degraded',
        ...getSessionStoreSnapshot(redisHealthy),
      });
      return;
    }

    if (req.method === 'GET' && url.pathname === '/api/session-store') {
      const redisHealthy = await isRedisHealthy();
      sendJson(res, redisHealthy ? 200 : 503, getSessionStoreSnapshot(redisHealthy));
      return;
    }

    if (req.method === 'GET' && url.pathname === '/auth/login') {
      await handleAuthLogin(req, res);
      return;
    }

    if (req.method === 'GET' && url.pathname === '/auth/callback') {
      await handleAuthCallback(req, res, url);
      return;
    }

    if (req.method === 'GET' && url.pathname === '/auth/logout') {
      await handleAuthLogout(req, res);
      return;
    }

    if (req.method === 'GET' && url.pathname === '/api/session') {
      const snapshot = await loadSessionSnapshot(sessionId);
      sendJson(res, 200, snapshot);
      return;
    }

    if (req.method === 'POST' && url.pathname === '/api/session/active-tenant') {
      await handleActiveTenantUpdate(req, res, sessionId);
      return;
    }

    if (url.pathname.startsWith('/api/')) {
      await proxyApiRequest(req, res, url.pathname, sessionId);
      return;
    }

    await serveStatic(req, res, url);
  } catch (error) {
    logEvent('error', 'bff.request_failed', {
      message: error instanceof Error ? error.message : String(error),
    });
    const message = error instanceof Error ? error.message : 'Erro inesperado.';
    sendJson(res, 500, { message });
  }
});

server.listen(port, '0.0.0.0', () => {
  logEvent('info', 'bff.started', { port });
});
