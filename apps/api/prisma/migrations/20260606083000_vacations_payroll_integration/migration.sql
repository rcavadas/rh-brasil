-- Link paid vacation requests to payroll batches
ALTER TABLE "vacation_requests"
ADD COLUMN "payrollBatchId" TEXT,
ADD COLUMN "payrollStatus" TEXT,
ADD COLUMN "payrollReceiptNumber" TEXT,
ADD COLUMN "payrollSentBy" TEXT,
ADD COLUMN "payrollSentAt" TIMESTAMP(3);

ALTER TABLE "vacation_requests"
ADD CONSTRAINT "vacation_requests_payrollBatchId_fkey"
FOREIGN KEY ("payrollBatchId") REFERENCES "time_sheet_payroll_event_batches"("id") ON DELETE SET NULL ON UPDATE CASCADE;
