-- Admission document dossier for onboarding and signature tracking.
CREATE TABLE "admission_documents" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "admissionRequestId" TEXT NOT NULL,
    "admissionContractId" TEXT,
    "documentType" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'generated',
    "signedBy" TEXT,
    "signedAt" TIMESTAMP(3),
    "signatureMethod" TEXT,
    "content" JSONB NOT NULL,
    "generatedBy" TEXT,
    "generatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "admission_documents_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "admission_documents_admissionRequestId_documentType_key" ON "admission_documents"("admissionRequestId", "documentType");
CREATE INDEX "admission_documents_tenantId_admissionRequestId_idx" ON "admission_documents"("tenantId", "admissionRequestId");
CREATE INDEX "admission_documents_tenantId_documentType_idx" ON "admission_documents"("tenantId", "documentType");

ALTER TABLE "admission_documents" ADD CONSTRAINT "admission_documents_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "admission_documents" ADD CONSTRAINT "admission_documents_admissionRequestId_fkey" FOREIGN KEY ("admissionRequestId") REFERENCES "admission_requests"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "admission_documents" ADD CONSTRAINT "admission_documents_admissionContractId_fkey" FOREIGN KEY ("admissionContractId") REFERENCES "admission_contracts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
