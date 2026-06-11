-- CreateTable
CREATE TABLE "occupational_health_esocial_transmissions" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "subjectType" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "companyId" TEXT,
    "employeeId" TEXT,
    "environmentId" TEXT,
    "catId" TEXT,
    "examId" TEXT,
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

    CONSTRAINT "occupational_health_esocial_transmissions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "oh_esocial_tx_tenant_subject_event_key" ON "occupational_health_esocial_transmissions"("tenantId", "subjectType", "subjectId", "eventCode");

-- CreateIndex
CREATE INDEX "oh_esocial_tx_tenant_subject_idx" ON "occupational_health_esocial_transmissions"("tenantId", "subjectType", "subjectId");

-- CreateIndex
CREATE INDEX "oh_esocial_tx_tenant_status_idx" ON "occupational_health_esocial_transmissions"("tenantId", "status");

-- AddForeignKey
ALTER TABLE "occupational_health_esocial_transmissions" ADD CONSTRAINT "oh_esocial_tx_tenant_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
