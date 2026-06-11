-- CreateTable
CREATE TABLE "occupational_health_training_catalogs" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "companyId" TEXT,
    "code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "mandatory" BOOLEAN NOT NULL DEFAULT true,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "validFrom" TIMESTAMP(3) NOT NULL,
    "validUntil" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "occupational_health_training_catalogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "occupational_health_training_assignments" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "companyId" TEXT,
    "employeeId" TEXT NOT NULL,
    "trainingCatalogId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'assigned',
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dueAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "expiresAt" TIMESTAMP(3),
    "completedBy" TEXT,
    "score" INTEGER,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "occupational_health_training_assignments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "oh_training_catalog_tenant_code_key" ON "occupational_health_training_catalogs"("tenantId", "code");

-- CreateIndex
CREATE INDEX "oh_training_catalog_tenant_active_idx" ON "occupational_health_training_catalogs"("tenantId", "active");

-- CreateIndex
CREATE UNIQUE INDEX "oh_training_assignment_tenant_employee_catalog_key" ON "occupational_health_training_assignments"("tenantId", "employeeId", "trainingCatalogId");

-- CreateIndex
CREATE INDEX "oh_training_assignment_tenant_employee_idx" ON "occupational_health_training_assignments"("tenantId", "employeeId");

-- CreateIndex
CREATE INDEX "oh_training_assignment_tenant_status_idx" ON "occupational_health_training_assignments"("tenantId", "status");

-- AddForeignKey
ALTER TABLE "occupational_health_training_catalogs" ADD CONSTRAINT "oh_training_catalog_tenant_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "occupational_health_training_catalogs" ADD CONSTRAINT "oh_training_catalog_company_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "occupational_health_training_assignments" ADD CONSTRAINT "oh_training_assignment_tenant_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "occupational_health_training_assignments" ADD CONSTRAINT "oh_training_assignment_company_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "occupational_health_training_assignments" ADD CONSTRAINT "oh_training_assignment_employee_fkey" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "occupational_health_training_assignments" ADD CONSTRAINT "oh_training_assignment_catalog_fkey" FOREIGN KEY ("trainingCatalogId") REFERENCES "occupational_health_training_catalogs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
