-- CreateTable
CREATE TABLE "point_holiday_calendars" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "companyId" TEXT,
    "locale" TEXT,
    "title" TEXT NOT NULL,
    "isNational" BOOLEAN NOT NULL DEFAULT false,
    "validFrom" TIMESTAMP(3) NOT NULL,
    "validUntil" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "point_holiday_calendars_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "point_tolerance_rules" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "companyId" TEXT,
    "profile" TEXT,
    "jornada" TEXT,
    "toleranceMinutes" INTEGER NOT NULL,
    "validFrom" TIMESTAMP(3) NOT NULL,
    "validUntil" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "point_tolerance_rules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "point_devices" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "companyId" TEXT,
    "label" TEXT NOT NULL,
    "deviceType" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "supportsOffline" BOOLEAN NOT NULL DEFAULT false,
    "supportsBiometrics" BOOLEAN NOT NULL DEFAULT false,
    "supportsGeo" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "point_devices_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "point_holiday_calendars_tenantId_companyId_idx" ON "point_holiday_calendars"("tenantId", "companyId");

-- CreateIndex
CREATE INDEX "point_holiday_calendars_tenantId_isNational_idx" ON "point_holiday_calendars"("tenantId", "isNational");

-- CreateIndex
CREATE INDEX "point_tolerance_rules_tenantId_companyId_idx" ON "point_tolerance_rules"("tenantId", "companyId");

-- CreateIndex
CREATE INDEX "point_tolerance_rules_tenantId_profile_idx" ON "point_tolerance_rules"("tenantId", "profile");

-- CreateIndex
CREATE INDEX "point_devices_tenantId_companyId_idx" ON "point_devices"("tenantId", "companyId");

-- CreateIndex
CREATE INDEX "point_devices_tenantId_status_idx" ON "point_devices"("tenantId", "status");

-- AddForeignKey
ALTER TABLE "point_holiday_calendars" ADD CONSTRAINT "point_holiday_calendars_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "point_holiday_calendars" ADD CONSTRAINT "point_holiday_calendars_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "point_tolerance_rules" ADD CONSTRAINT "point_tolerance_rules_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "point_tolerance_rules" ADD CONSTRAINT "point_tolerance_rules_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "point_devices" ADD CONSTRAINT "point_devices_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "point_devices" ADD CONSTRAINT "point_devices_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
