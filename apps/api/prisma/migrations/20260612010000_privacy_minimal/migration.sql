CREATE TABLE "privacy_consents" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "subjectType" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "purpose" TEXT NOT NULL,
    "scope" TEXT,
    "status" TEXT NOT NULL DEFAULT 'accepted',
    "grantedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "revokedAt" TIMESTAMP(3),
    "expiresAt" TIMESTAMP(3),
    "notes" TEXT,
    "recordedBy" TEXT,
    "revokedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "privacy_consents_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "data_subject_requests" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "subjectType" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "requestType" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'open',
    "requestedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resolvedAt" TIMESTAMP(3),
    "responseSummary" TEXT,
    "notes" TEXT,
    "requestedBy" TEXT,
    "resolvedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "data_subject_requests_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "privacy_consents_tenantId_subjectType_subjectId_idx" ON "privacy_consents"("tenantId", "subjectType", "subjectId");
CREATE INDEX "privacy_consents_tenantId_status_idx" ON "privacy_consents"("tenantId", "status");

CREATE INDEX "data_subject_requests_tenantId_subjectType_subjectId_idx" ON "data_subject_requests"("tenantId", "subjectType", "subjectId");
CREATE INDEX "data_subject_requests_tenantId_status_idx" ON "data_subject_requests"("tenantId", "status");

ALTER TABLE "privacy_consents" ADD CONSTRAINT "privacy_consents_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "data_subject_requests" ADD CONSTRAINT "data_subject_requests_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
