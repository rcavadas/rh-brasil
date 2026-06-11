import { execFileSync } from 'node:child_process';
import { assertRedisPlatformPolicy, parseConfigPairs } from './redis-platform-policy.mjs';

function runCompose(args) {
  return execFileSync('docker', ['compose', '-f', 'infra/docker-compose.yml', ...args], {
    encoding: 'utf8',
  });
}

const output = runCompose(['exec', '-T', 'redis', 'redis-cli', 'CONFIG', 'GET', 'appendonly', 'appendfsync', 'maxmemory-policy']);
const config = parseConfigPairs(output);
assertRedisPlatformPolicy(config);

console.log('redis platform policy ok');
