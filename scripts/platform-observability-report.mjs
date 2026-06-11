import fs from 'node:fs/promises';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fetchTextJson, parseComposePs, PLATFORM_HEALTH_TARGETS } from './platform-health.mjs';

const composeFile = path.resolve(process.cwd(), 'infra', 'docker-compose.yml');
const reportPath = process.env.PLATFORM_OBSERVABILITY_REPORT_PATH?.trim()
  || path.resolve(process.cwd(), 'backups', `platform-observability-${new Date().toISOString().replace(/[:.]/g, '-')}.json`);

async function main() {
  const psOutput = execFileSync('docker', ['compose', '-f', composeFile, 'ps', '--format', 'json'], {
    encoding: 'utf8',
    maxBuffer: 20 * 1024 * 1024,
  });
  const services = parseComposePs(psOutput);

  const health = [];
  for (const target of PLATFORM_HEALTH_TARGETS) {
    try {
      health.push(await fetchTextJson(target));
    } catch (error) {
      health.push({
        url: target,
        ok: false,
        status: 0,
        error: error?.message || String(error),
      });
    }
  }

  const report = {
    createdAt: new Date().toISOString(),
    composeFile,
    services,
    health,
  };

  await fs.mkdir(path.dirname(reportPath), { recursive: true });
  await fs.writeFile(reportPath, JSON.stringify(report, null, 2));
  console.log(reportPath);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
