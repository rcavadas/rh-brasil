ALTER TABLE "time_sheet_payroll_event_batches"
ADD COLUMN "payrollReceiptNumber" TEXT,
ADD COLUMN "sentBy" TEXT,
ADD COLUMN "sentAt" TIMESTAMP(3);
