-- CreateTable
CREATE TABLE "recruitment_vacancy_requests" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "companyId" TEXT,
    "code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "department" TEXT,
    "headcount" INTEGER NOT NULL DEFAULT 1,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "requestedBy" TEXT,
    "requestedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "approvedBy" TEXT,
    "approvedAt" TIMESTAMP(3),
    "publishedBy" TEXT,
    "publishedAt" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "recruitment_vacancy_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recruitment_candidates" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "companyId" TEXT,
    "vacancyRequestId" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "source" TEXT,
    "status" TEXT NOT NULL DEFAULT 'active',
    "stage" TEXT NOT NULL DEFAULT 'applied',
    "appliedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "movedBy" TEXT,
    "movedAt" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "recruitment_candidates_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "recruitment_vacancy_requests_tenantId_code_key" ON "recruitment_vacancy_requests"("tenantId", "code");

-- CreateIndex
CREATE INDEX "recruitment_vacancy_requests_tenantId_status_idx" ON "recruitment_vacancy_requests"("tenantId", "status");

-- CreateIndex
CREATE INDEX "recruitment_candidates_tenantId_vacancyRequestId_idx" ON "recruitment_candidates"("tenantId", "vacancyRequestId");

-- CreateIndex
CREATE INDEX "recruitment_candidates_tenantId_stage_idx" ON "recruitment_candidates"("tenantId", "stage");

-- AddForeignKey
ALTER TABLE "recruitment_vacancy_requests" ADD CONSTRAINT "recruitment_vacancy_requests_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recruitment_vacancy_requests" ADD CONSTRAINT "recruitment_vacancy_requests_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recruitment_candidates" ADD CONSTRAINT "recruitment_candidates_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recruitment_candidates" ADD CONSTRAINT "recruitment_candidates_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recruitment_candidates" ADD CONSTRAINT "recruitment_candidates_vacancyRequestId_fkey" FOREIGN KEY ("vacancyRequestId") REFERENCES "recruitment_vacancy_requests"("id") ON DELETE CASCADE ON UPDATE CASCADE;
