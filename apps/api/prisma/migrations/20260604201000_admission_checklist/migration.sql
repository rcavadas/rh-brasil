-- CreateTable
CREATE TABLE "admission_checklist_items" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "admissionRequestId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "required" BOOLEAN NOT NULL DEFAULT true,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "receivedBy" TEXT,
    "receivedAt" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admission_checklist_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admission_checklist_items_admissionRequestId_code_key" ON "admission_checklist_items"("admissionRequestId", "code");

-- CreateIndex
CREATE INDEX "admission_checklist_items_tenantId_admissionRequestId_idx" ON "admission_checklist_items"("tenantId", "admissionRequestId");

-- AddForeignKey
ALTER TABLE "admission_checklist_items" ADD CONSTRAINT "admission_checklist_items_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admission_checklist_items" ADD CONSTRAINT "admission_checklist_items_admissionRequestId_fkey" FOREIGN KEY ("admissionRequestId") REFERENCES "admission_requests"("id") ON DELETE CASCADE ON UPDATE CASCADE;
