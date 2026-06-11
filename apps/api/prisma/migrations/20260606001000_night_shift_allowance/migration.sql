CREATE TABLE "night_shift_allowance_calculations" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "periodStart" TIMESTAMP(3) NOT NULL,
    "periodEnd" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'calculated',
    "nightPeriodReference" TEXT NOT NULL,
    "calculationBase" TEXT NOT NULL,
    "totalMinutes" INTEGER NOT NULL,
    "reducedMinutes" INTEGER NOT NULL,
    "percentage" INTEGER NOT NULL,
    "notes" TEXT,
    "calculatedBy" TEXT,
    "calculatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "approvedBy" TEXT,
    "approvedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "night_shift_allowance_calculations_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "night_shift_allowance_items" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "calculationId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "minutes" INTEGER NOT NULL,
    "percentage" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    "reducedHourFactor" DOUBLE PRECISION NOT NULL,
    "sourceReference" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "night_shift_allowance_items_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "night_shift_allowance_calculations_tenantId_employeeId_periodStar_idx" ON "night_shift_allowance_calculations"("tenantId", "employeeId", "periodStart", "periodEnd");
CREATE INDEX "night_shift_allowance_calculations_tenantId_status_idx" ON "night_shift_allowance_calculations"("tenantId", "status");
CREATE INDEX "night_shift_allowance_items_tenantId_calculationId_idx" ON "night_shift_allowance_items"("tenantId", "calculationId");

ALTER TABLE "night_shift_allowance_calculations" ADD CONSTRAINT "night_shift_allowance_calculations_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "night_shift_allowance_calculations" ADD CONSTRAINT "night_shift_allowance_calculations_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "night_shift_allowance_items" ADD CONSTRAINT "night_shift_allowance_items_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "night_shift_allowance_items" ADD CONSTRAINT "night_shift_allowance_items_calculationId_fkey" FOREIGN KEY ("calculationId") REFERENCES "night_shift_allowance_calculations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
