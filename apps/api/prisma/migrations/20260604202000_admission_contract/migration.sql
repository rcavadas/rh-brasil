CREATE TABLE "admission_contracts" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "admissionRequestId" TEXT NOT NULL,
    "contractType" TEXT NOT NULL,
    "effectiveFrom" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'formalized',
    "notes" TEXT,
    "createdBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admission_contracts_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "admission_contracts_admissionRequestId_key" ON "admission_contracts"("admissionRequestId");
CREATE INDEX "admission_contracts_tenantId_admissionRequestId_idx" ON "admission_contracts"("tenantId", "admissionRequestId");

ALTER TABLE "admission_contracts" ADD CONSTRAINT "admission_contracts_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "admission_contracts" ADD CONSTRAINT "admission_contracts_admissionRequestId_fkey" FOREIGN KEY ("admissionRequestId") REFERENCES "admission_requests"("id") ON DELETE CASCADE ON UPDATE CASCADE;
