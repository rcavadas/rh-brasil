-- CreateTable
CREATE TABLE "employee_dependents" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "cpf" TEXT,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "relationshipType" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employee_dependents_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "employee_dependents_tenantId_employeeId_cpf_key" ON "employee_dependents"("tenantId", "employeeId", "cpf");

-- CreateIndex
CREATE UNIQUE INDEX "employee_dependents_tenantId_employeeId_fullName_birthDate_r_key" ON "employee_dependents"("tenantId", "employeeId", "fullName", "birthDate", "relationshipType");

-- CreateIndex
CREATE INDEX "employee_dependents_tenantId_employeeId_idx" ON "employee_dependents"("tenantId", "employeeId");

-- CreateIndex
CREATE INDEX "employee_dependents_tenantId_status_idx" ON "employee_dependents"("tenantId", "status");

-- AddForeignKey
ALTER TABLE "employee_dependents" ADD CONSTRAINT "employee_dependents_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_dependents" ADD CONSTRAINT "employee_dependents_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE;
