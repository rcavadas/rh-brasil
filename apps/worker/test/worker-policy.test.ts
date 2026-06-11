import assert from 'node:assert/strict';
import { test } from 'node:test';
import { buildAcceptedEsocialResponse, buildWorkerLogPayload } from '../src/worker-policy.js';

test('buildWorkerLogPayload preserves worker log contract', () => {
  const payload = buildWorkerLogPayload('info', 'worker.started', { service: 'rh-worker' }, '2026-06-06T19:40:00.000Z');

  assert.deepEqual(payload, {
    app: 'rh-worker',
    level: 'info',
    event: 'worker.started',
    at: '2026-06-06T19:40:00.000Z',
    service: 'rh-worker',
  });
});

test('buildAcceptedEsocialResponse derives stable receipt format', () => {
  const response = buildAcceptedEsocialResponse(
    'S-2200',
    '12345678-1234-5678-1234-567812345678',
    new Date('2026-06-06T19:40:00.000Z'),
    'protocol-1',
  );

  assert.deepEqual(response, {
    receiptNumber: 'REC-S-2200-1780774800000-12345678',
    protocol: 'protocol-1',
    status: 'accepted',
    eventCode: 'S-2200',
  });
});
