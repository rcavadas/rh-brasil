-- CreateTable
CREATE TABLE "termination_requests" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "reason" TEXT NOT NULL,
    "effectiveAt" TIMESTAMP(3) NOT NULL,
    "noticeType" TEXT,
    "requestedBy" TEXT,
    "requestedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "approvedBy" TEXT,
    "approvedAt" TIMESTAMP(3),
    "effectiveBy" TEXT,
    "effectiveOn" TIMESTAMP(3),
    "cancelledBy" TEXT,
    "cancelledAt" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "termination_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "termination_history" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "terminationRequestId" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "fromStatus" TEXT,
    "toStatus" TEXT,
    "actor" TEXT,
    "occurredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "details" JSONB NOT NULL,

    CONSTRAINT "termination_history_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "termination_requests_tenantId_employeeId_idx" ON "termination_requests"("tenantId", "employeeId");

-- CreateIndex
CREATE INDEX "termination_requests_tenantId_status_idx" ON "termination_requests"("tenantId", "status");

-- CreateIndex
CREATE INDEX "termination_history_tenantId_terminationRequestId_idx" ON "termination_history"("tenantId", "terminationRequestId");

-- AddForeignKey
ALTER TABLE "termination_requests" ADD CONSTRAINT "termination_requests_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "termination_requests" ADD CONSTRAINT "termination_requests_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "termination_history" ADD CONSTRAINT "termination_history_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "termination_history" ADD CONSTRAINT "termination_history_terminationRequestId_fkey" FOREIGN KEY ("terminationRequestId") REFERENCES "termination_requests"("id") ON DELETE CASCADE ON UPDATE CASCADE;
