import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fetchTextJson, isServiceHealthy, parseComposePs, PLATFORM_HEALTH_TARGETS, PLATFORM_TELEMETRY_URL } from './platform-health.mjs';

const composeFile = path.resolve(process.cwd(), 'infra', 'docker-compose.yml');

async function main() {
  const psOutput = execFileSync('docker', ['compose', '-f', composeFile, 'ps', '--format', 'json'], {
    encoding: 'utf8',
    maxBuffer: 20 * 1024 * 1024,
  });

  const services = parseComposePs(psOutput);
  const degradedServices = services.filter((service) => !isServiceHealthy(service));

  const healthChecks = [
    await fetchTextJson(PLATFORM_HEALTH_TARGETS[0]),
    await fetchTextJson(PLATFORM_HEALTH_TARGETS[1]),
    await fetchTextJson(PLATFORM_HEALTH_TARGETS[2]),
    await fetchTextJson(PLATFORM_HEALTH_TARGETS[3]),
    await fetchTextJson(PLATFORM_TELEMETRY_URL, {
      'x-rh-user-id': 'platform-alerts',
      'x-rh-role': 'admin',
    }),
  ];

  const degradedChecks = healthChecks.filter((check) => !check.ok);

  if (degradedServices.length > 0 || degradedChecks.length > 0) {
    console.error(JSON.stringify({
      status: 'degraded',
      degradedServices: degradedServices.map((service) => ({
        name: service.Service,
        state: service.State,
        health: service.Health,
      })),
      degradedChecks: degradedChecks.map((check) => ({
        url: check.url,
        status: check.status,
      })),
    }, null, 2));
    process.exitCode = 1;
    return;
  }

  console.log(JSON.stringify({
    status: 'ok',
    services: services.length,
    checks: healthChecks.length,
  }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
