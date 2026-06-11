import { Prisma, PrismaClient } from '@prisma/client';
import { Queue, Worker } from 'bullmq';
import { buildAcceptedEsocialResponse, buildWorkerLogPayload, type WorkerLogLevel } from './worker-policy.js';

const redisConfig = new URL(process.env.REDIS_URL ?? 'redis://localhost:6379');
const connection = {
  host: redisConfig.hostname,
  port: Number(redisConfig.port || '6379'),
  password: redisConfig.password || undefined,
};

const prisma = new PrismaClient();
const queue = new Queue('rh-events', { connection });

function logEvent(level: WorkerLogLevel, event: string, details: Record<string, unknown> = {}): void {
  const payload = JSON.stringify(buildWorkerLogPayload(level, event, details));

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

const worker = new Worker(
  'rh-events',
  async (job) => {
    const { transmissionId } = job.data as { transmissionId: string };

    if (job.name === 'occupational_health.esocial.transmit') {
      const transmission = await prisma.occupationalHealthEsocialTransmission.findUnique({
        where: { id: transmissionId },
      });

      if (!transmission) {
        throw new Error(`Occupational health eSocial transmission ${transmissionId} not found`);
      }

      const now = new Date();
      const response = buildAcceptedEsocialResponse(transmission.eventCode, transmission.id, now);
      const receiptNumber = response.receiptNumber;

      await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
        await tx.occupationalHealthEsocialTransmission.update({
          where: { id: transmissionId },
          data: {
            status: 'sent',
            receiptNumber,
            response,
            sentAt: now,
            processedAt: now,
            attempts: transmission.attempts + 1,
            errorMessage: null,
          },
        });

        await tx.auditEvent.create({
          data: {
            tenantId: transmission.tenantId,
            action: 'occupational_health.esocial.sent',
            entityType: 'occupationalHealthEsocialTransmission',
            entityId: transmissionId,
            occurredAt: now,
            details: {
              subjectType: transmission.subjectType,
              subjectId: transmission.subjectId,
              transmissionId,
              eventCode: transmission.eventCode,
              receiptNumber,
              protocol: response.protocol,
              status: 'sent',
            },
          },
        });
      });

      return response;
    }

    if (job.name === 'vacation.esocial.transmit') {
      const transmission = await prisma.vacationEsocialTransmission.findUnique({
        where: { id: transmissionId },
      });

      if (!transmission) {
        throw new Error(`Vacation eSocial transmission ${transmissionId} not found`);
      }

      const now = new Date();
      const response = buildAcceptedEsocialResponse(transmission.eventCode, transmission.id, now);
      const receiptNumber = response.receiptNumber;

      await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
        await tx.vacationEsocialTransmission.update({
          where: { id: transmissionId },
          data: {
            status: 'sent',
            receiptNumber,
            response,
            sentAt: now,
            processedAt: now,
            attempts: transmission.attempts + 1,
            errorMessage: null,
          },
        });

        await tx.auditEvent.create({
          data: {
            tenantId: transmission.tenantId,
            action: 'vacation.esocial.sent',
            entityType: 'vacationEsocialTransmission',
            entityId: transmissionId,
            occurredAt: now,
            details: {
              vacationRequestId: transmission.vacationRequestId,
              transmissionId,
              eventCode: transmission.eventCode,
              receiptNumber,
              protocol: response.protocol,
              status: 'sent',
            },
          },
        });
      });

      return response;
    }

    if (job.name === 'termination.esocial.transmit') {
      const transmission = await prisma.terminationEsocialTransmission.findUnique({
        where: { id: transmissionId },
      });

      if (!transmission) {
        throw new Error(`Termination eSocial transmission ${transmissionId} not found`);
      }

      const now = new Date();
      const response = buildAcceptedEsocialResponse(transmission.eventCode, transmission.id, now);
      const receiptNumber = response.receiptNumber;

      await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
        await tx.terminationEsocialTransmission.update({
          where: { id: transmissionId },
          data: {
            status: 'sent',
            receiptNumber,
            response,
            sentAt: now,
            processedAt: now,
            attempts: transmission.attempts + 1,
            errorMessage: null,
          },
        });

        await tx.terminationHistory.create({
          data: {
            tenantId: transmission.tenantId,
            terminationRequestId: transmission.terminationRequestId,
            eventType: 'termination.esocial.sent',
            fromStatus: transmission.status,
            toStatus: 'sent',
            occurredAt: now,
            details: {
              terminationId: transmission.terminationRequestId,
              offboardingId: transmission.terminationOffboardingId,
              transmissionId,
              eventCode: transmission.eventCode,
              receiptNumber,
              protocol: response.protocol,
              status: 'sent',
            },
          },
        });

        await tx.auditEvent.create({
          data: {
            tenantId: transmission.tenantId,
            action: 'termination.esocial.sent',
            entityType: 'terminationEsocialTransmission',
            entityId: transmissionId,
            occurredAt: now,
            details: {
              terminationId: transmission.terminationRequestId,
              offboardingId: transmission.terminationOffboardingId,
              transmissionId,
              eventCode: transmission.eventCode,
              receiptNumber,
              protocol: response.protocol,
              status: 'sent',
            },
          },
        });
      });

      return response;
    }

    if (job.name !== 'admission.esocial.transmit') {
      return { ok: true, skipped: true, jobName: job.name };
    }

    const transmission = await prisma.admissionEsocialTransmission.findUnique({
      where: { id: transmissionId },
    });

    if (!transmission) {
      throw new Error(`Admission eSocial transmission ${transmissionId} not found`);
    }

    const now = new Date();
    const response = buildAcceptedEsocialResponse(transmission.eventCode, transmission.id, now);
    const receiptNumber = response.receiptNumber;

    await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      await tx.admissionEsocialTransmission.update({
        where: { id: transmissionId },
        data: {
          status: 'sent',
          receiptNumber,
          response,
          sentAt: now,
          processedAt: now,
          attempts: transmission.attempts + 1,
          errorMessage: null,
        },
      });

      await tx.admissionHistory.create({
        data: {
          tenantId: transmission.tenantId,
          admissionRequestId: transmission.admissionRequestId,
          eventType: 'admission.esocial.sent',
          fromStatus: transmission.status,
          toStatus: 'sent',
          occurredAt: now,
          details: {
            admissionId: transmission.admissionRequestId,
            transmissionId,
            eventCode: transmission.eventCode,
            receiptNumber,
            protocol: response.protocol,
            status: 'sent',
          },
        },
      });

      await tx.auditEvent.create({
        data: {
          tenantId: transmission.tenantId,
          action: 'admission.esocial.sent',
          entityType: 'admissionEsocialTransmission',
          entityId: transmissionId,
          occurredAt: now,
          details: {
            admissionId: transmission.admissionRequestId,
            transmissionId,
            eventCode: transmission.eventCode,
            receiptNumber,
            protocol: response.protocol,
            status: 'sent',
          },
        },
      });
    });

    return response;
  },
  { connection },
);

worker.on('completed', (job) => {
  logEvent('info', 'worker.job_completed', {
    jobId: job.id,
    jobName: job.name,
  });
});

worker.on('failed', async (job, error) => {
  logEvent('error', 'worker.job_failed', {
    jobId: job?.id,
    jobName: job?.name,
    message: error instanceof Error ? error.message : String(error),
  });

  if (!job) {
    return;
  }

  const { transmissionId } = job.data as { transmissionId: string };

  if (job.name === 'occupational_health.esocial.transmit') {
    const transmission = await prisma.occupationalHealthEsocialTransmission.findUnique({
      where: { id: transmissionId },
    });

    if (!transmission) {
      return;
    }

    const now = new Date();
    await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      await tx.occupationalHealthEsocialTransmission.update({
        where: { id: transmissionId },
        data: {
          status: 'failed',
          errorMessage: error instanceof Error ? error.message : String(error),
          processedAt: now,
          attempts: transmission.attempts + 1,
        },
      });

      await tx.auditEvent.create({
        data: {
          tenantId: transmission.tenantId,
          action: 'occupational_health.esocial.failed',
          entityType: 'occupationalHealthEsocialTransmission',
          entityId: transmissionId,
          occurredAt: now,
          details: {
            subjectType: transmission.subjectType,
            subjectId: transmission.subjectId,
            transmissionId,
            eventCode: transmission.eventCode,
            errorMessage: error instanceof Error ? error.message : String(error),
            status: 'failed',
          },
        },
      });
    });

    return;
  }

  if (job.name === 'termination.esocial.transmit') {
    const transmission = await prisma.terminationEsocialTransmission.findUnique({
      where: { id: transmissionId },
    });

    if (!transmission) {
      return;
    }

    const now = new Date();
    await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      await tx.terminationEsocialTransmission.update({
        where: { id: transmissionId },
        data: {
          status: 'failed',
          errorMessage: error instanceof Error ? error.message : String(error),
          processedAt: now,
          attempts: transmission.attempts + 1,
        },
      });

      await tx.terminationHistory.create({
        data: {
          tenantId: transmission.tenantId,
          terminationRequestId: transmission.terminationRequestId,
          eventType: 'termination.esocial.failed',
          fromStatus: transmission.status,
          toStatus: 'failed',
          occurredAt: now,
          details: {
            terminationId: transmission.terminationRequestId,
            offboardingId: transmission.terminationOffboardingId,
            transmissionId,
            eventCode: transmission.eventCode,
            errorMessage: error instanceof Error ? error.message : String(error),
            status: 'failed',
          },
        },
      });

      await tx.auditEvent.create({
        data: {
          tenantId: transmission.tenantId,
          action: 'termination.esocial.failed',
          entityType: 'terminationEsocialTransmission',
          entityId: transmissionId,
          occurredAt: now,
          details: {
            terminationId: transmission.terminationRequestId,
            offboardingId: transmission.terminationOffboardingId,
            transmissionId,
            eventCode: transmission.eventCode,
            errorMessage: error instanceof Error ? error.message : String(error),
            status: 'failed',
          },
        },
      });
    });

    return;
  }

  if (job.name === 'vacation.esocial.transmit') {
    const transmission = await prisma.vacationEsocialTransmission.findUnique({
      where: { id: transmissionId },
    });

    if (!transmission) {
      return;
    }

    const now = new Date();
    await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      await tx.vacationEsocialTransmission.update({
        where: { id: transmissionId },
        data: {
          status: 'failed',
          errorMessage: error instanceof Error ? error.message : String(error),
          processedAt: now,
          attempts: transmission.attempts + 1,
        },
      });

      await tx.auditEvent.create({
        data: {
          tenantId: transmission.tenantId,
          action: 'vacation.esocial.failed',
          entityType: 'vacationEsocialTransmission',
          entityId: transmissionId,
          occurredAt: now,
          details: {
            vacationRequestId: transmission.vacationRequestId,
            transmissionId,
            eventCode: transmission.eventCode,
            errorMessage: error instanceof Error ? error.message : String(error),
            status: 'failed',
          },
        },
      });
    });

    return;
  }

  if (job.name !== 'admission.esocial.transmit') {
    return;
  }

  const transmission = await prisma.admissionEsocialTransmission.findUnique({
    where: { id: transmissionId },
  });

  if (!transmission) {
    return;
  }

  const now = new Date();
  await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
    await tx.admissionEsocialTransmission.update({
      where: { id: transmissionId },
      data: {
        status: 'failed',
        errorMessage: error instanceof Error ? error.message : String(error),
        processedAt: now,
        attempts: transmission.attempts + 1,
      },
    });

    await tx.admissionHistory.create({
      data: {
        tenantId: transmission.tenantId,
        admissionRequestId: transmission.admissionRequestId,
        eventType: 'admission.esocial.failed',
        fromStatus: transmission.status,
        toStatus: 'failed',
        occurredAt: now,
        details: {
          admissionId: transmission.admissionRequestId,
          transmissionId,
          eventCode: transmission.eventCode,
          errorMessage: error instanceof Error ? error.message : String(error),
          status: 'failed',
        },
      },
    });

    await tx.auditEvent.create({
      data: {
        tenantId: transmission.tenantId,
        action: 'admission.esocial.failed',
        entityType: 'admissionEsocialTransmission',
        entityId: transmissionId,
        occurredAt: now,
        details: {
          admissionId: transmission.admissionRequestId,
          transmissionId,
          eventCode: transmission.eventCode,
          errorMessage: error instanceof Error ? error.message : String(error),
          status: 'failed',
        },
      },
    });
  });
});

async function bootstrap(): Promise<void> {
  await queue.waitUntilReady();
  await worker.waitUntilReady();
  logEvent('info', 'worker.started');
}

async function shutdown(): Promise<void> {
  await worker.close();
  await queue.close();
  await prisma.$disconnect();
  logEvent('info', 'worker.stopped');
}

process.on('SIGTERM', () => {
  shutdown().catch((error) => {
    console.error('Failed to shutdown worker', error);
  });
});

process.on('SIGINT', () => {
  shutdown().catch((error) => {
    console.error('Failed to shutdown worker', error);
  });
});

bootstrap().catch((error) => {
  logEvent('error', 'worker.bootstrap_failed', {
    message: error instanceof Error ? error.message : String(error),
  });
  process.exitCode = 1;
});
