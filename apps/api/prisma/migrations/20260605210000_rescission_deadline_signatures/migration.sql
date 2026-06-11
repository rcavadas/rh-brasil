-- Add payment deadline tracking for rescissions.
ALTER TABLE "rescission_requests"
ADD COLUMN "paymentDueAt" TIMESTAMP(3);

-- Add electronic signature tracking for rescission documents.
ALTER TABLE "rescission_documents"
ADD COLUMN "signedBy" TEXT,
ADD COLUMN "signedAt" TIMESTAMP(3),
ADD COLUMN "signatureMethod" TEXT;
