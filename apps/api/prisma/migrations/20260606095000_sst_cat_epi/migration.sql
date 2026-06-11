CREATE TABLE "occupational_health_cats" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "companyId" TEXT,
    "employeeId" TEXT NOT NULL,
    "reportNumber" TEXT NOT NULL,
    "accidentType" TEXT,
    "occurredAt" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'open',
    "description" TEXT NOT NULL,
    "notifiedAt" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "occupational_health_cats_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "occupational_health_epi_catalogs" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "companyId" TEXT,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "validFrom" TIMESTAMP(3) NOT NULL,
    "validUntil" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "occupational_health_epi_catalogs_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "occupational_health_epi_assignments" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "epiCatalogId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'delivered',
    "deliveredAt" TIMESTAMP(3) NOT NULL,
    "returnedAt" TIMESTAMP(3),
    "receivedBy" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "occupational_health_epi_assignments_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "occupational_health_cats_tenantId_reportNumber_key" ON "occupational_health_cats"("tenantId", "reportNumber");
CREATE UNIQUE INDEX "occupational_health_epi_catalogs_tenantId_code_key" ON "occupational_health_epi_catalogs"("tenantId", "code");
CREATE INDEX "occupational_health_cats_tenantId_employeeId_idx" ON "occupational_health_cats"("tenantId", "employeeId");
CREATE INDEX "occupational_health_cats_tenantId_status_idx" ON "occupational_health_cats"("tenantId", "status");
CREATE INDEX "occupational_health_epi_catalogs_tenantId_companyId_idx" ON "occupational_health_epi_catalogs"("tenantId", "companyId");
CREATE INDEX "occupational_health_epi_assignments_tenantId_employeeId_idx" ON "occupational_health_epi_assignments"("tenantId", "employeeId");
CREATE INDEX "occupational_health_epi_assignments_tenantId_epiCatalogId_idx" ON "occupational_health_epi_assignments"("tenantId", "epiCatalogId");

ALTER TABLE "occupational_health_cats" ADD CONSTRAINT "occupational_health_cats_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "occupational_health_cats" ADD CONSTRAINT "occupational_health_cats_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "occupational_health_cats" ADD CONSTRAINT "occupational_health_cats_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "occupational_health_epi_catalogs" ADD CONSTRAINT "occupational_health_epi_catalogs_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "occupational_health_epi_catalogs" ADD CONSTRAINT "occupational_health_epi_catalogs_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "occupational_health_epi_assignments" ADD CONSTRAINT "occupational_health_epi_assignments_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "occupational_health_epi_assignments" ADD CONSTRAINT "occupational_health_epi_assignments_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "occupational_health_epi_assignments" ADD CONSTRAINT "occupational_health_epi_assignments_epiCatalogId_fkey" FOREIGN KEY ("epiCatalogId") REFERENCES "occupational_health_epi_catalogs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
