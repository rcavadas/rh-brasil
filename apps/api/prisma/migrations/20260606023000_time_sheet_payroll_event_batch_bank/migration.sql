ALTER TABLE "time_sheet_payroll_event_batches"
ADD COLUMN "bankStatus" TEXT,
ADD COLUMN "bankReceiptNumber" TEXT,
ADD COLUMN "bankSentBy" TEXT,
ADD COLUMN "bankSentAt" TIMESTAMP(3);
