-- CreateTable
CREATE TABLE "vacation_balances" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "referenceStart" TIMESTAMP(3) NOT NULL,
    "referenceEnd" TIMESTAMP(3) NOT NULL,
    "accruedDays" INTEGER NOT NULL DEFAULT 30,
    "takenDays" INTEGER NOT NULL DEFAULT 0,
    "availableDays" INTEGER NOT NULL DEFAULT 30,
    "status" TEXT NOT NULL DEFAULT 'open',
    "notes" TEXT,
    "createdBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vacation_balances_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vacation_requests" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "vacationBalanceId" TEXT NOT NULL,
    "plannedStart" TIMESTAMP(3) NOT NULL,
    "plannedEnd" TIMESTAMP(3) NOT NULL,
    "requestedDays" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'requested',
    "notes" TEXT,
    "requestedBy" TEXT,
    "requestedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "decidedBy" TEXT,
    "decidedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vacation_requests_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "vacation_balances_tenantId_employeeId_referenceStart_referenceEnd_key" ON "vacation_balances"("tenantId", "employeeId", "referenceStart", "referenceEnd");

-- CreateIndex
CREATE INDEX "vacation_balances_tenantId_status_idx" ON "vacation_balances"("tenantId", "status");

-- CreateIndex
CREATE INDEX "vacation_requests_tenantId_employeeId_idx" ON "vacation_requests"("tenantId", "employeeId");

-- CreateIndex
CREATE INDEX "vacation_requests_tenantId_status_idx" ON "vacation_requests"("tenantId", "status");

-- AddForeignKey
ALTER TABLE "vacation_balances" ADD CONSTRAINT "vacation_balances_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vacation_balances" ADD CONSTRAINT "vacation_balances_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vacation_requests" ADD CONSTRAINT "vacation_requests_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vacation_requests" ADD CONSTRAINT "vacation_requests_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vacation_requests" ADD CONSTRAINT "vacation_requests_vacationBalanceId_fkey" FOREIGN KEY ("vacationBalanceId") REFERENCES "vacation_balances"("id") ON DELETE CASCADE ON UPDATE CASCADE;
