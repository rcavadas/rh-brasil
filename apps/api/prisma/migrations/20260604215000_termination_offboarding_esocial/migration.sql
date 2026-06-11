-- CreateTable
CREATE TABLE "termination_offboardings" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "terminationRequestId" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "requestedBy" TEXT,
    "requestedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "closedBy" TEXT,
    "closedAt" TIMESTAMP(3),
    "cancelledBy" TEXT,
    "cancelledAt" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "termination_offboardings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "termination_offboarding_history" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "terminationOffboardingId" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "fromStatus" TEXT,
    "toStatus" TEXT,
    "actor" TEXT,
    "occurredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "details" JSONB NOT NULL,

    CONSTRAINT "termination_offboarding_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "termination_esocial_transmissions" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "terminationRequestId" TEXT NOT NULL,
    "terminationOffboardingId" TEXT NOT NULL,
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

    CONSTRAINT "termination_esocial_transmissions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "termination_offboardings_terminationRequestId_key" ON "termination_offboardings"("terminationRequestId");

-- CreateIndex
CREATE INDEX "termination_offboardings_tenantId_employeeId_idx" ON "termination_offboardings"("tenantId", "employeeId");

-- CreateIndex
CREATE INDEX "termination_offboardings_tenantId_status_idx" ON "termination_offboardings"("tenantId", "status");

-- CreateIndex
CREATE INDEX "termination_offboarding_history_tenantId_terminationOffboardingId_idx" ON "termination_offboarding_history"("tenantId", "terminationOffboardingId");

-- CreateIndex
CREATE UNIQUE INDEX "termination_esocial_transmissions_terminationRequestId_eventCode_key" ON "termination_esocial_transmissions"("terminationRequestId", "eventCode");

-- CreateIndex
CREATE INDEX "termination_esocial_transmissions_tenantId_terminationRequestId_idx" ON "termination_esocial_transmissions"("tenantId", "terminationRequestId");

-- CreateIndex
CREATE INDEX "termination_esocial_transmissions_tenantId_status_idx" ON "termination_esocial_transmissions"("tenantId", "status");

-- AddForeignKey
ALTER TABLE "termination_offboardings" ADD CONSTRAINT "termination_offboardings_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "termination_offboardings" ADD CONSTRAINT "termination_offboardings_terminationRequestId_fkey" FOREIGN KEY ("terminationRequestId") REFERENCES "termination_requests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "termination_offboardings" ADD CONSTRAINT "termination_offboardings_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "termination_offboarding_history" ADD CONSTRAINT "termination_offboarding_history_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "termination_offboarding_history" ADD CONSTRAINT "termination_offboarding_history_terminationOffboardingId_fkey" FOREIGN KEY ("terminationOffboardingId") REFERENCES "termination_offboardings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "termination_esocial_transmissions" ADD CONSTRAINT "termination_esocial_transmissions_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "termination_esocial_transmissions" ADD CONSTRAINT "termination_esocial_transmissions_terminationRequestId_fkey" FOREIGN KEY ("terminationRequestId") REFERENCES "termination_requests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "termination_esocial_transmissions" ADD CONSTRAINT "termination_esocial_transmissions_terminationOffboardingId_fkey" FOREIGN KEY ("terminationOffboardingId") REFERENCES "termination_offboardings"("id") ON DELETE CASCADE ON UPDATE CASCADE;
