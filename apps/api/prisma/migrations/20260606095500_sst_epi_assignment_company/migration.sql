ALTER TABLE "occupational_health_epi_assignments"
ADD COLUMN "companyId" TEXT;

CREATE INDEX "occupational_health_epi_assignments_tenantId_companyId_idx" ON "occupational_health_epi_assignments"("tenantId", "companyId");

ALTER TABLE "occupational_health_epi_assignments"
ADD CONSTRAINT "occupational_health_epi_assignments_companyId_fkey"
FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;
