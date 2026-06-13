-- CreateTable
CREATE TABLE "benefit_eligibility_rules" (
    "id" TEXT NOT NULL,
    "tenant_id" TEXT NOT NULL,
    "benefit_catalog_id" TEXT NOT NULL,
    "company_id" TEXT,
    "employee_id" TEXT,
    "status" TEXT NOT NULL DEFAULT 'active',
    "notes" TEXT,
    "created_by" TEXT,
    "updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "benefit_eligibility_rules_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "benefit_eligibility_rules_tenant_id_benefit_catalog_id_idx" ON "benefit_eligibility_rules"("tenant_id", "benefit_catalog_id");

-- CreateIndex
CREATE INDEX "benefit_eligibility_rules_tenant_id_status_idx" ON "benefit_eligibility_rules"("tenant_id", "status");

-- CreateIndex
CREATE INDEX "benefit_eligibility_rules_tenant_id_company_id_idx" ON "benefit_eligibility_rules"("tenant_id", "company_id");

-- CreateIndex
CREATE INDEX "benefit_eligibility_rules_tenant_id_employee_id_idx" ON "benefit_eligibility_rules"("tenant_id", "employee_id");

-- CreateIndex
CREATE UNIQUE INDEX "benefit_eligibility_rules_tenant_id_benefit_catalog_id_compa_idx" ON "benefit_eligibility_rules"("tenant_id", "benefit_catalog_id", "company_id", "employee_id");

-- AddForeignKey
ALTER TABLE "benefit_eligibility_rules" ADD CONSTRAINT "benefit_eligibility_rules_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "benefit_eligibility_rules" ADD CONSTRAINT "benefit_eligibility_rules_benefit_catalog_id_fkey" FOREIGN KEY ("benefit_catalog_id") REFERENCES "benefit_catalogs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
