-- CreateTable
CREATE TABLE "privacy_anonymization_jobs" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "subjectType" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "datasetName" TEXT NOT NULL,
    "maskingLevel" TEXT NOT NULL DEFAULT 'strict',
    "status" TEXT NOT NULL DEFAULT 'completed',
    "notes" TEXT,
    "executedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "privacy_anonymization_jobs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "retention_rules" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "subjectType" TEXT NOT NULL,
    "purpose" TEXT NOT NULL,
    "ruleExpression" TEXT NOT NULL,
    "action" TEXT NOT NULL DEFAULT 'retain',
    "status" TEXT NOT NULL DEFAULT 'draft',
    "legalHold" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,
    "createdBy" TEXT,
    "appliedBy" TEXT,
    "appliedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "retention_rules_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "privacy_anonymization_jobs_tenantId_subjectType_subjectId_idx" ON "privacy_anonymization_jobs"("tenantId", "subjectType", "subjectId");

-- CreateIndex
CREATE INDEX "privacy_anonymization_jobs_tenantId_status_idx" ON "privacy_anonymization_jobs"("tenantId", "status");

-- CreateIndex
CREATE INDEX "retention_rules_tenantId_subjectType_purpose_idx" ON "retention_rules"("tenantId", "subjectType", "purpose");

-- CreateIndex
CREATE INDEX "retention_rules_tenantId_status_idx" ON "retention_rules"("tenantId", "status");

-- AddForeignKey
ALTER TABLE "privacy_anonymization_jobs" ADD CONSTRAINT "privacy_anonymization_jobs_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "retention_rules" ADD CONSTRAINT "retention_rules_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
