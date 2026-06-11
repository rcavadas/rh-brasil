ALTER TABLE "time_sheet_payroll_event_batches"
ADD COLUMN "erpStatus" TEXT,
ADD COLUMN "erpReceiptNumber" TEXT,
ADD COLUMN "erpSentBy" TEXT,
ADD COLUMN "erpSentAt" TIMESTAMP(3);
