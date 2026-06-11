-- CreateTable
CREATE TABLE "rescission_calculations" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "rescissionRequestId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'calculated',
    "referenceSalaryCents" INTEGER,
    "noticeAmountCents" INTEGER NOT NULL DEFAULT 0,
    "salaryBalanceAmountCents" INTEGER NOT NULL DEFAULT 0,
    "vacationAmountCents" INTEGER NOT NULL DEFAULT 0,
    "thirteenthAmountCents" INTEGER NOT NULL DEFAULT 0,
    "fgtsAmountCents" INTEGER NOT NULL DEFAULT 0,
    "fgtsPenaltyAmountCents" INTEGER NOT NULL DEFAULT 0,
    "deductionsAmountCents" INTEGER NOT NULL DEFAULT 0,
    "grossAmountCents" INTEGER NOT NULL,
    "netAmountCents" INTEGER NOT NULL,
    "notes" TEXT,
    "calculatedBy" TEXT,
    "calculatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rescission_calculations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rescission_documents" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "rescissionRequestId" TEXT NOT NULL,
    "calculationId" TEXT,
    "documentType" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'generated',
    "content" JSONB NOT NULL,
    "generatedBy" TEXT,
    "generatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rescission_documents_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "rescission_calculations_rescissionRequestId_key" ON "rescission_calculations"("rescissionRequestId");

-- CreateIndex
CREATE INDEX "rescission_calculations_tenantId_rescissionRequestId_idx" ON "rescission_calculations"("tenantId", "rescissionRequestId");

-- CreateIndex
CREATE UNIQUE INDEX "rescission_documents_rescissionRequestId_documentType_key" ON "rescission_documents"("rescissionRequestId", "documentType");

-- CreateIndex
CREATE INDEX "rescission_documents_tenantId_rescissionRequestId_idx" ON "rescission_documents"("tenantId", "rescissionRequestId");

-- CreateIndex
CREATE INDEX "rescission_documents_tenantId_documentType_idx" ON "rescission_documents"("tenantId", "documentType");

-- AddForeignKey
ALTER TABLE "rescission_calculations" ADD CONSTRAINT "rescission_calculations_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rescission_calculations" ADD CONSTRAINT "rescission_calculations_rescissionRequestId_fkey" FOREIGN KEY ("rescissionRequestId") REFERENCES "rescission_requests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rescission_documents" ADD CONSTRAINT "rescission_documents_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rescission_documents" ADD CONSTRAINT "rescission_documents_rescissionRequestId_fkey" FOREIGN KEY ("rescissionRequestId") REFERENCES "rescission_requests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rescission_documents" ADD CONSTRAINT "rescission_documents_calculationId_fkey" FOREIGN KEY ("calculationId") REFERENCES "rescission_calculations"("id") ON DELETE SET NULL ON UPDATE CASCADE;
