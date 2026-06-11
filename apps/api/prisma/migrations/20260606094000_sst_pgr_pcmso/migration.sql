CREATE TABLE "occupational_health_pgrs" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "companyId" TEXT,
    "code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "validFrom" TIMESTAMP(3) NOT NULL,
    "validUntil" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "occupational_health_pgrs_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "occupational_health_pcmsos" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "companyId" TEXT,
    "code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "validFrom" TIMESTAMP(3) NOT NULL,
    "validUntil" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "occupational_health_pcmsos_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "occupational_health_pgrs_tenantId_code_key" ON "occupational_health_pgrs"("tenantId", "code");
CREATE UNIQUE INDEX "occupational_health_pcmsos_tenantId_code_key" ON "occupational_health_pcmsos"("tenantId", "code");
CREATE INDEX "occupational_health_pgrs_tenantId_companyId_idx" ON "occupational_health_pgrs"("tenantId", "companyId");
CREATE INDEX "occupational_health_pcmsos_tenantId_companyId_idx" ON "occupational_health_pcmsos"("tenantId", "companyId");

ALTER TABLE "occupational_health_pgrs" ADD CONSTRAINT "occupational_health_pgrs_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "occupational_health_pgrs" ADD CONSTRAINT "occupational_health_pgrs_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "occupational_health_pcmsos" ADD CONSTRAINT "occupational_health_pcmsos_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "occupational_health_pcmsos" ADD CONSTRAINT "occupational_health_pcmsos_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;
