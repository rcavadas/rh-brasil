-- Expand thirteenth salary calculation with variable averages and employer charges
ALTER TABLE "thirteenth_salary_calculations"
ADD COLUMN "variableAverageAmountCents" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN "employerChargesAmountCents" INTEGER NOT NULL DEFAULT 0;
