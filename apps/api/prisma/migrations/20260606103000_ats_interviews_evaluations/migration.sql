-- CreateTable
CREATE TABLE "recruitment_interviews" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "companyId" TEXT,
    "vacancyRequestId" TEXT NOT NULL,
    "candidateId" TEXT NOT NULL,
    "scheduledAt" TIMESTAMP(3) NOT NULL,
    "completedAt" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'scheduled',
    "interviewerName" TEXT,
    "location" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "recruitment_interviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recruitment_candidate_evaluations" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "companyId" TEXT,
    "vacancyRequestId" TEXT NOT NULL,
    "candidateId" TEXT NOT NULL,
    "interviewId" TEXT,
    "evaluatorName" TEXT,
    "score" INTEGER NOT NULL,
    "recommendation" TEXT NOT NULL,
    "evaluatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "recruitment_candidate_evaluations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "recruitment_interviews_tenantId_vacancyRequestId_idx" ON "recruitment_interviews"("tenantId", "vacancyRequestId");

-- CreateIndex
CREATE INDEX "recruitment_interviews_tenantId_candidateId_idx" ON "recruitment_interviews"("tenantId", "candidateId");

-- CreateIndex
CREATE INDEX "recruitment_interviews_tenantId_status_idx" ON "recruitment_interviews"("tenantId", "status");

-- CreateIndex
CREATE INDEX "recruitment_candidate_evaluations_tenantId_vacancyRequestId_idx" ON "recruitment_candidate_evaluations"("tenantId", "vacancyRequestId");

-- CreateIndex
CREATE INDEX "recruitment_candidate_evaluations_tenantId_candidateId_idx" ON "recruitment_candidate_evaluations"("tenantId", "candidateId");

-- CreateIndex
CREATE INDEX "recruitment_candidate_evaluations_tenantId_interviewId_idx" ON "recruitment_candidate_evaluations"("tenantId", "interviewId");

-- AddForeignKey
ALTER TABLE "recruitment_interviews" ADD CONSTRAINT "recruitment_interviews_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recruitment_interviews" ADD CONSTRAINT "recruitment_interviews_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recruitment_interviews" ADD CONSTRAINT "recruitment_interviews_vacancyRequestId_fkey" FOREIGN KEY ("vacancyRequestId") REFERENCES "recruitment_vacancy_requests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recruitment_interviews" ADD CONSTRAINT "recruitment_interviews_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "recruitment_candidates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recruitment_candidate_evaluations" ADD CONSTRAINT "recruitment_candidate_evaluations_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recruitment_candidate_evaluations" ADD CONSTRAINT "recruitment_candidate_evaluations_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recruitment_candidate_evaluations" ADD CONSTRAINT "recruitment_candidate_evaluations_vacancyRequestId_fkey" FOREIGN KEY ("vacancyRequestId") REFERENCES "recruitment_vacancy_requests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recruitment_candidate_evaluations" ADD CONSTRAINT "recruitment_candidate_evaluations_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "recruitment_candidates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recruitment_candidate_evaluations" ADD CONSTRAINT "recruitment_candidate_evaluations_interviewId_fkey" FOREIGN KEY ("interviewId") REFERENCES "recruitment_interviews"("id") ON DELETE SET NULL ON UPDATE CASCADE;
