-- CreateTable
CREATE TABLE "recruitment_proposals" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "companyId" TEXT,
    "vacancyRequestId" TEXT NOT NULL,
    "candidateId" TEXT NOT NULL,
    "salaryBaseCents" INTEGER,
    "startAt" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'proposed',
    "notes" TEXT,
    "convertedAt" TIMESTAMP(3),
    "convertedBy" TEXT,
    "admissionRequestId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "recruitment_proposals_pkey" PRIMARY KEY ("id")
);

-- AlterTable
ALTER TABLE "admission_requests" ADD COLUMN     "sourceCandidateId" TEXT,
ADD COLUMN     "sourceProposalId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "recruitment_proposals_tenantId_candidateId_key" ON "recruitment_proposals"("tenantId", "candidateId");

-- CreateIndex
CREATE INDEX "recruitment_proposals_tenantId_vacancyRequestId_idx" ON "recruitment_proposals"("tenantId", "vacancyRequestId");

-- CreateIndex
CREATE INDEX "recruitment_proposals_tenantId_status_idx" ON "recruitment_proposals"("tenantId", "status");

-- CreateIndex
CREATE INDEX "admission_requests_tenantId_sourceCandidateId_idx" ON "admission_requests"("tenantId", "sourceCandidateId");

-- CreateIndex
CREATE INDEX "admission_requests_tenantId_sourceProposalId_idx" ON "admission_requests"("tenantId", "sourceProposalId");

-- AddForeignKey
ALTER TABLE "recruitment_proposals" ADD CONSTRAINT "recruitment_proposals_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recruitment_proposals" ADD CONSTRAINT "recruitment_proposals_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recruitment_proposals" ADD CONSTRAINT "recruitment_proposals_vacancyRequestId_fkey" FOREIGN KEY ("vacancyRequestId") REFERENCES "recruitment_vacancy_requests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recruitment_proposals" ADD CONSTRAINT "recruitment_proposals_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "recruitment_candidates"("id") ON DELETE CASCADE ON UPDATE CASCADE;
