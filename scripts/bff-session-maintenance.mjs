import fs from 'node:fs/promises';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { selectStaleSnapshots, shouldRunBackup, shouldRunVerify } from './bff-maintenance-policy.mjs';

const backupScript = path.resolve(process.cwd(), 'scripts', 'bff-session-backup.mjs');
const verifyScript = path.resolve(process.cwd(), 'scripts', 'bff-session-verify.mjs');
const backupDir = path.resolve(process.cwd(), 'backups');
const statePath = process.env.BFF_SESSION_MAINTENANCE_STATE_PATH?.trim()
  || path.resolve(backupDir, 'bff-session-maintenance-state.json');
const retentionCount = Math.max(1, Number(process.env.BFF_SESSION_BACKUP_RETENTION_COUNT ?? 7));
const backupIntervalMs = Math.max(60_000, Number(process.env.BFF_SESSION_BACKUP_INTERVAL_SECONDS ?? 86_400) * 1000);
const verifyIntervalMs = Math.max(300_000, Number(process.env.BFF_SESSION_VERIFY_INTERVAL_SECONDS ?? 604_800) * 1000);
const tickIntervalMs = Math.max(60_000, Number(process.env.BFF_SESSION_MAINTENANCE_TICK_SECONDS ?? 300) * 1000);
const once = process.argv.includes('--once');

const state = {
  createdAt: new Date().toISOString(),
  lastBackupAt: 0,
  lastVerifyAt: 0,
  lastErrorAt: 0,
  lastRunAt: 0,
};

function log(message) {
  console.log(`[bff-maintenance] ${new Date().toISOString()} ${message}`);
}

function runScript(scriptPath) {
  execFileSync(process.execPath, [scriptPath], {
    stdio: 'inherit',
    env: {
      ...process.env,
    },
  });
}

async function loadState() {
  try {
    const raw = await fs.readFile(statePath, 'utf8');
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object') {
      state.lastBackupAt = Number(parsed.lastBackupAt) || 0;
      state.lastVerifyAt = Number(parsed.lastVerifyAt) || 0;
      state.lastErrorAt = Number(parsed.lastErrorAt) || 0;
      state.lastRunAt = Number(parsed.lastRunAt) || 0;
    }
  } catch (error) {
    if (error?.code !== 'ENOENT') {
      throw error;
    }
  }
}

async function persistState() {
  await fs.mkdir(path.dirname(statePath), { recursive: true });
  await fs.writeFile(statePath, JSON.stringify(state, null, 2));
}

async function cleanupSnapshots() {
  const entries = await fs.readdir(backupDir, { withFileTypes: true }).catch(() => []);
  const snapshots = [];

  for (const entry of entries) {
    if (!entry.isFile()) {
      continue;
    }

    if (!/^bff-sessions-.*\.json$/i.test(entry.name)) {
      continue;
    }

    const fullPath = path.join(backupDir, entry.name);
    const stats = await fs.stat(fullPath).catch(() => null);
    if (!stats) {
      continue;
    }

    snapshots.push({
      fullPath,
      mtimeMs: stats.mtimeMs,
    });
  }

  const staleSnapshots = selectStaleSnapshots(snapshots, retentionCount);

  for (const snapshot of staleSnapshots) {
    await fs.unlink(snapshot.fullPath).catch(() => undefined);
  }

  if (staleSnapshots.length > 0) {
    log(`retention cleaned ${staleSnapshots.length} snapshot(s), kept ${Math.min(retentionCount, snapshots.length)}`);
  }
}

async function doBackup() {
  log('running backup');
  runScript(backupScript);
  state.lastBackupAt = Date.now();
  state.lastRunAt = state.lastBackupAt;
  await persistState();
  await cleanupSnapshots();
}

async function doVerify() {
  log('running verify');
  runScript(verifyScript);
  state.lastVerifyAt = Date.now();
  state.lastRunAt = state.lastVerifyAt;
  await persistState();
}

async function cycle() {
  const now = Date.now();
  if (shouldRunBackup(state.lastBackupAt, now, backupIntervalMs)) {
    await doBackup();
  }

  if (shouldRunVerify(state.lastVerifyAt, now, verifyIntervalMs)) {
    await doVerify();
  }
}

async function daemon() {
  await fs.mkdir(backupDir, { recursive: true });
  await loadState();
  await persistState();

  while (true) {
    try {
      await cycle();
    } catch (error) {
      state.lastErrorAt = Date.now();
      await persistState().catch(() => undefined);
      log(`error: ${error?.message || error}`);
    }

    await new Promise((resolve) => setTimeout(resolve, tickIntervalMs));
  }
}

async function main() {
  await fs.mkdir(backupDir, { recursive: true });
  await loadState();

  if (once) {
    await doBackup();
    await doVerify();
    return;
  }

  await daemon();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
