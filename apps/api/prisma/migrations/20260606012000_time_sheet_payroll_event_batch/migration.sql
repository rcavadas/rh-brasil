CREATE TABLE "time_sheet_payroll_event_batches" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "sourcePeriodStart" TIMESTAMP(3) NOT NULL,
    "sourcePeriodEnd" TIMESTAMP(3) NOT NULL,
    "payrollPeriod" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'consolidated',
    "totalMinutes" INTEGER NOT NULL,
    "totalAmountCents" INTEGER NOT NULL,
    "notes" TEXT,
    "consolidatedBy" TEXT,
    "consolidatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "approvedBy" TEXT,
    "approvedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "time_sheet_payroll_event_batches_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "time_sheet_payroll_event_batch_items" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "batchId" TEXT NOT NULL,
    "sourceEventType" TEXT NOT NULL,
    "sourceEventId" TEXT NOT NULL,
    "payrollRubricCode" TEXT NOT NULL,
    "quantityMinutes" INTEGER NOT NULL,
    "amountCents" INTEGER NOT NULL,
    "referenceDate" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "reason" TEXT,
    "sourceReference" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "time_sheet_payroll_event_batch_items_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "time_sheet_payroll_event_batches_tenantId_employeeId_payrollPe_idx" ON "time_sheet_payroll_event_batches"("tenantId", "employeeId", "payrollPeriod");
CREATE INDEX "time_sheet_payroll_event_batches_tenantId_status_idx" ON "time_sheet_payroll_event_batches"("tenantId", "status");
CREATE INDEX "time_sheet_payroll_event_batch_items_tenantId_batchId_idx" ON "time_sheet_payroll_event_batch_items"("tenantId", "batchId");

ALTER TABLE "time_sheet_payroll_event_batches" ADD CONSTRAINT "time_sheet_payroll_event_batches_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "time_sheet_payroll_event_batches" ADD CONSTRAINT "time_sheet_payroll_event_batches_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "time_sheet_payroll_event_batches" ADD CONSTRAINT "time_sheet_payroll_event_batches_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "time_sheet_payroll_event_batch_items" ADD CONSTRAINT "time_sheet_payroll_event_batch_items_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "time_sheet_payroll_event_batch_items" ADD CONSTRAINT "time_sheet_payroll_event_batch_items_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "time_sheet_payroll_event_batches"("id") ON DELETE CASCADE ON UPDATE CASCADE;
