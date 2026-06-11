ALTER TABLE "api_integration_requests"
ADD COLUMN "attempts" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN "dlqReason" TEXT,
ADD COLUMN "lastAttemptAt" TIMESTAMP(3),
ADD COLUMN "dlqAt" TIMESTAMP(3);
