-- Link approved thirteenth salary calculations to payroll batches
ALTER TABLE "thirteenth_salary_calculations"
ADD COLUMN "payrollBatchId" TEXT,
ADD COLUMN "payrollStatus" TEXT,
ADD COLUMN "payrollReceiptNumber" TEXT,
ADD COLUMN "payrollSentBy" TEXT,
ADD COLUMN "payrollSentAt" TIMESTAMP(3);

ALTER TABLE "thirteenth_salary_calculations"
ADD CONSTRAINT "thirteenth_salary_calculations_payrollBatchId_fkey"
FOREIGN KEY ("payrollBatchId") REFERENCES "time_sheet_payroll_event_batches"("id") ON DELETE SET NULL ON UPDATE CASCADE;
