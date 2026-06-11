CREATE TABLE "occupational_health_exams" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "environmentId" TEXT,
    "examType" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'scheduled',
    "scheduledAt" TIMESTAMP(3) NOT NULL,
    "performedAt" TIMESTAMP(3),
    "result" TEXT,
    "expiresAt" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "occupational_health_exams_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "occupational_health_asos" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "examId" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "issuedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "result" TEXT NOT NULL,
    "issuer" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "occupational_health_asos_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "occupational_health_asos_examId_key" ON "occupational_health_asos"("examId");
CREATE INDEX "occupational_health_exams_tenantId_employeeId_idx" ON "occupational_health_exams"("tenantId", "employeeId");
CREATE INDEX "occupational_health_exams_tenantId_examType_idx" ON "occupational_health_exams"("tenantId", "examType");
CREATE INDEX "occupational_health_exams_tenantId_status_idx" ON "occupational_health_exams"("tenantId", "status");
CREATE INDEX "occupational_health_asos_tenantId_employeeId_idx" ON "occupational_health_asos"("tenantId", "employeeId");

ALTER TABLE "occupational_health_exams" ADD CONSTRAINT "occupational_health_exams_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "occupational_health_exams" ADD CONSTRAINT "occupational_health_exams_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "occupational_health_exams" ADD CONSTRAINT "occupational_health_exams_environmentId_fkey" FOREIGN KEY ("environmentId") REFERENCES "occupational_health_environments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "occupational_health_asos" ADD CONSTRAINT "occupational_health_asos_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "occupational_health_asos" ADD CONSTRAINT "occupational_health_asos_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "occupational_health_asos" ADD CONSTRAINT "occupational_health_asos_examId_fkey" FOREIGN KEY ("examId") REFERENCES "occupational_health_exams"("id") ON DELETE CASCADE ON UPDATE CASCADE;
