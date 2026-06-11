import { randomUUID } from 'node:crypto';

export type WorkerLogLevel = 'info' | 'warn' | 'error';

export function buildWorkerLogPayload(
  level: WorkerLogLevel,
  event: string,
  details: Record<string, unknown> = {},
  at = new Date().toISOString(),
): Record<string, unknown> {
  return {
    app: 'rh-worker',
    level,
    event,
    at,
    ...details,
  };
}

export function buildAcceptedEsocialResponse(
  eventCode: string,
  transmissionId: string,
  now = new Date(),
  protocol = randomUUID(),
): {
  receiptNumber: string;
  protocol: string;
  status: 'accepted';
  eventCode: string;
} {
  return {
    receiptNumber: `REC-${eventCode}-${now.getTime()}-${transmissionId.slice(0, 8)}`,
    protocol,
    status: 'accepted',
    eventCode,
  };
}
