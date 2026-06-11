CREATE TABLE "benefit_catalogs" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "benefitType" TEXT NOT NULL,
    "description" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "benefit_catalogs_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "employee_benefits" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "benefitCatalogId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "startsAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endsAt" TIMESTAMP(3),
    "notes" TEXT,
    "requestedBy" TEXT,
    "requestedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "changedBy" TEXT,
    "changedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employee_benefits_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "benefit_catalogs_tenantId_code_key" ON "benefit_catalogs"("tenantId", "code");
CREATE INDEX "benefit_catalogs_tenantId_benefitType_idx" ON "benefit_catalogs"("tenantId", "benefitType");

CREATE UNIQUE INDEX "employee_benefits_tenantId_employeeId_benefitCatalogId_key" ON "employee_benefits"("tenantId", "employeeId", "benefitCatalogId");
CREATE INDEX "employee_benefits_tenantId_status_idx" ON "employee_benefits"("tenantId", "status");

ALTER TABLE "benefit_catalogs" ADD CONSTRAINT "benefit_catalogs_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "employee_benefits" ADD CONSTRAINT "employee_benefits_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "employee_benefits" ADD CONSTRAINT "employee_benefits_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "employee_benefits" ADD CONSTRAINT "employee_benefits_benefitCatalogId_fkey" FOREIGN KEY ("benefitCatalogId") REFERENCES "benefit_catalogs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
