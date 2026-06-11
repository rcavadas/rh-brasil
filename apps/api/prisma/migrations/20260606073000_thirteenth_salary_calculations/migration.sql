-- CreateTable
CREATE TABLE "thirteenth_salary_calculations" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "referenceYear" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'calculated',
    "salaryBaseCents" INTEGER NOT NULL,
    "eligibleMonths" INTEGER NOT NULL,
    "totalAmountCents" INTEGER NOT NULL,
    "firstParcelAmountCents" INTEGER NOT NULL,
    "secondParcelAmountCents" INTEGER NOT NULL,
    "notes" TEXT,
    "calculatedBy" TEXT,
    "calculatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "approvedBy" TEXT,
    "approvedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "thirteenth_salary_calculations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "thirteenth_salary_calculations_tenantId_employeeId_idx" ON "thirteenth_salary_calculations"("tenantId", "employeeId");

-- CreateIndex
CREATE INDEX "thirteenth_salary_calculations_tenantId_referenceYear_idx" ON "thirteenth_salary_calculations"("tenantId", "referenceYear");

-- AddForeignKey
ALTER TABLE "thirteenth_salary_calculations" ADD CONSTRAINT "thirteenth_salary_calculations_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "thirteenth_salary_calculations" ADD CONSTRAINT "thirteenth_salary_calculations_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE;
