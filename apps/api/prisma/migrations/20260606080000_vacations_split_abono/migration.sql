-- Add vacation split and pecuniary abono support
ALTER TABLE "vacation_requests"
ADD COLUMN "consumedDays" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN "abonoDays" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN "salaryBaseCents" INTEGER,
ADD COLUMN "vacationAmountCents" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN "abonoAmountCents" INTEGER NOT NULL DEFAULT 0;

CREATE TABLE "vacation_request_periods" (
  "id" TEXT NOT NULL,
  "tenantId" TEXT NOT NULL,
  "vacationRequestId" TEXT NOT NULL,
  "sequence" INTEGER NOT NULL,
  "plannedStart" TIMESTAMP(3) NOT NULL,
  "plannedEnd" TIMESTAMP(3) NOT NULL,
  "requestedDays" INTEGER NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "vacation_request_periods_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "vacation_request_periods_vacationRequestId_sequence_key" ON "vacation_request_periods"("vacationRequestId", "sequence");
CREATE INDEX "vacation_request_periods_tenantId_vacationRequestId_idx" ON "vacation_request_periods"("tenantId", "vacationRequestId");

ALTER TABLE "vacation_request_periods"
ADD CONSTRAINT "vacation_request_periods_tenantId_fkey"
FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "vacation_request_periods"
ADD CONSTRAINT "vacation_request_periods_vacationRequestId_fkey"
FOREIGN KEY ("vacationRequestId") REFERENCES "vacation_requests"("id") ON DELETE CASCADE ON UPDATE CASCADE;
