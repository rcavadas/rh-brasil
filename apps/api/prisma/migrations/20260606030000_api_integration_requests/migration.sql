CREATE TABLE "api_integration_requests" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "integrationType" TEXT NOT NULL,
    "operation" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'requested',
    "subject" TEXT,
    "externalReference" TEXT,
    "payload" JSONB,
    "response" JSONB,
    "failureReason" TEXT,
    "requestedBy" TEXT,
    "requestedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "api_integration_requests_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "api_integration_request_histories" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "requestId" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "details" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "api_integration_request_histories_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "api_integration_requests_tenantId_integrationType_status_idx" ON "api_integration_requests"("tenantId", "integrationType", "status");
CREATE INDEX "api_integration_requests_tenantId_requestedAt_idx" ON "api_integration_requests"("tenantId", "requestedAt");
CREATE INDEX "api_integration_request_histories_tenantId_requestId_idx" ON "api_integration_request_histories"("tenantId", "requestId");

ALTER TABLE "api_integration_requests" ADD CONSTRAINT "api_integration_requests_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "api_integration_request_histories" ADD CONSTRAINT "api_integration_request_histories_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "api_integration_request_histories" ADD CONSTRAINT "api_integration_request_histories_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "api_integration_requests"("id") ON DELETE CASCADE ON UPDATE CASCADE;
