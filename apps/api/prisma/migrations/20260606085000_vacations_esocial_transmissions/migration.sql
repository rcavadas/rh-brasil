-- Vacation eSocial transmissions
CREATE TABLE "vacation_esocial_transmissions" (
  "id" TEXT NOT NULL,
  "tenantId" TEXT NOT NULL,
  "vacationRequestId" TEXT NOT NULL,
  "eventCode" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'queued',
  "payload" JSONB NOT NULL,
  "receiptNumber" TEXT,
  "response" JSONB,
  "errorMessage" TEXT,
  "queuedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "sentAt" TIMESTAMP(3),
  "processedAt" TIMESTAMP(3),
  "attempts" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "vacation_esocial_transmissions_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "vacation_esocial_transmissions_vacationRequestId_eventCode_key" ON "vacation_esocial_transmissions"("vacationRequestId", "eventCode");
CREATE INDEX "vacation_esocial_transmissions_tenantId_vacationRequestId_idx" ON "vacation_esocial_transmissions"("tenantId", "vacationRequestId");
CREATE INDEX "vacation_esocial_transmissions_tenantId_status_idx" ON "vacation_esocial_transmissions"("tenantId", "status");

ALTER TABLE "vacation_esocial_transmissions"
ADD CONSTRAINT "vacation_esocial_transmissions_tenantId_fkey"
FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "vacation_esocial_transmissions"
ADD CONSTRAINT "vacation_esocial_transmissions_vacationRequestId_fkey"
FOREIGN KEY ("vacationRequestId") REFERENCES "vacation_requests"("id") ON DELETE CASCADE ON UPDATE CASCADE;
