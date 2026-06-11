-- CreateTable
CREATE TABLE "tenant_access" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tenant_access_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tenant_access_tenantId_subject_key" ON "tenant_access"("tenantId", "subject");

-- CreateIndex
CREATE INDEX "tenant_access_subject_idx" ON "tenant_access"("subject");

-- AddForeignKey
ALTER TABLE "tenant_access" ADD CONSTRAINT "tenant_access_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
