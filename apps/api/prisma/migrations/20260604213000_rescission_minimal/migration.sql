-- CreateTable
CREATE TABLE "rescission_requests" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "terminationRequestId" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "requestedBy" TEXT,
    "requestedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "closedBy" TEXT,
    "closedAt" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rescission_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rescission_history" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "rescissionRequestId" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "fromStatus" TEXT,
    "toStatus" TEXT,
    "actor" TEXT,
    "occurredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "details" JSONB NOT NULL,

    CONSTRAINT "rescission_history_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "rescission_requests_terminationRequestId_key" ON "rescission_requests"("terminationRequestId");

-- CreateIndex
CREATE INDEX "rescission_requests_tenantId_employeeId_idx" ON "rescission_requests"("tenantId", "employeeId");

-- CreateIndex
CREATE INDEX "rescission_requests_tenantId_status_idx" ON "rescission_requests"("tenantId", "status");

-- CreateIndex
CREATE INDEX "rescission_history_tenantId_rescissionRequestId_idx" ON "rescission_history"("tenantId", "rescissionRequestId");

-- AddForeignKey
ALTER TABLE "rescission_requests" ADD CONSTRAINT "rescission_requests_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rescission_requests" ADD CONSTRAINT "rescission_requests_terminationRequestId_fkey" FOREIGN KEY ("terminationRequestId") REFERENCES "termination_requests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rescission_requests" ADD CONSTRAINT "rescission_requests_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rescission_history" ADD CONSTRAINT "rescission_history_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rescission_history" ADD CONSTRAINT "rescission_history_rescissionRequestId_fkey" FOREIGN KEY ("rescissionRequestId") REFERENCES "rescission_requests"("id") ON DELETE CASCADE ON UPDATE CASCADE;
