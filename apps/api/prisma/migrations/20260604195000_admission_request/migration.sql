-- CreateTable
CREATE TABLE "admission_requests" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "personId" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "requestedBy" TEXT,
    "requestedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admission_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admission_history" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "admissionRequestId" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "fromStatus" TEXT,
    "toStatus" TEXT,
    "actor" TEXT,
    "occurredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "details" JSONB NOT NULL,

    CONSTRAINT "admission_history_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "admission_requests_tenantId_status_idx" ON "admission_requests"("tenantId", "status");

-- CreateIndex
CREATE INDEX "admission_requests_tenantId_employeeId_idx" ON "admission_requests"("tenantId", "employeeId");

-- CreateIndex
CREATE INDEX "admission_history_tenantId_admissionRequestId_idx" ON "admission_history"("tenantId", "admissionRequestId");

-- AddForeignKey
ALTER TABLE "admission_requests" ADD CONSTRAINT "admission_requests_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admission_requests" ADD CONSTRAINT "admission_requests_personId_fkey" FOREIGN KEY ("personId") REFERENCES "persons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admission_requests" ADD CONSTRAINT "admission_requests_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admission_requests" ADD CONSTRAINT "admission_requests_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admission_history" ADD CONSTRAINT "admission_history_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admission_history" ADD CONSTRAINT "admission_history_admissionRequestId_fkey" FOREIGN KEY ("admissionRequestId") REFERENCES "admission_requests"("id") ON DELETE CASCADE ON UPDATE CASCADE;
