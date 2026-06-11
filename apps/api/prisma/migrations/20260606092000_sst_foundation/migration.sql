-- Create initial SST occupational health foundation tables
CREATE TABLE "occupational_health_environments" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "companyId" TEXT,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sector" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "validFrom" TIMESTAMP(3) NOT NULL,
    "validUntil" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "occupational_health_environments_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "occupational_health_risks" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "environmentId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "severity" TEXT NOT NULL,
    "probability" TEXT NOT NULL,
    "controlMeasure" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "validFrom" TIMESTAMP(3) NOT NULL,
    "validUntil" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "occupational_health_risks_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "occupational_health_environments_tenantId_code_key" ON "occupational_health_environments"("tenantId", "code");
CREATE INDEX "occupational_health_environments_tenantId_companyId_idx" ON "occupational_health_environments"("tenantId", "companyId");

CREATE UNIQUE INDEX "occupational_health_risks_tenantId_environmentId_code_key" ON "occupational_health_risks"("tenantId", "environmentId", "code");
CREATE INDEX "occupational_health_risks_tenantId_environmentId_idx" ON "occupational_health_risks"("tenantId", "environmentId");

ALTER TABLE "occupational_health_environments"
ADD CONSTRAINT "occupational_health_environments_tenantId_fkey"
FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "occupational_health_environments"
ADD CONSTRAINT "occupational_health_environments_companyId_fkey"
FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "occupational_health_risks"
ADD CONSTRAINT "occupational_health_risks_tenantId_fkey"
FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "occupational_health_risks"
ADD CONSTRAINT "occupational_health_risks_environmentId_fkey"
FOREIGN KEY ("environmentId") REFERENCES "occupational_health_environments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
