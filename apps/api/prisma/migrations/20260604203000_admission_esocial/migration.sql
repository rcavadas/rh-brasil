CREATE TABLE "admission_esocial_transmissions" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "admissionRequestId" TEXT NOT NULL,
    "admissionContractId" TEXT,
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

    CONSTRAINT "admission_esocial_transmissions_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "admission_esocial_transmissions_admissionRequestId_eventCode_key" ON "admission_esocial_transmissions"("admissionRequestId", "eventCode");
CREATE INDEX "admission_esocial_transmissions_tenantId_admissionRequestId_idx" ON "admission_esocial_transmissions"("tenantId", "admissionRequestId");
CREATE INDEX "admission_esocial_transmissions_tenantId_status_idx" ON "admission_esocial_transmissions"("tenantId", "status");

ALTER TABLE "admission_esocial_transmissions" ADD CONSTRAINT "admission_esocial_transmissions_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "admission_esocial_transmissions" ADD CONSTRAINT "admission_esocial_transmissions_admissionRequestId_fkey" FOREIGN KEY ("admissionRequestId") REFERENCES "admission_requests"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "admission_esocial_transmissions" ADD CONSTRAINT "admission_esocial_transmissions_admissionContractId_fkey" FOREIGN KEY ("admissionContractId") REFERENCES "admission_contracts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
