import { Body, Controller, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsISO8601,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { CurrentAuth, Roles } from './authz.decorators.js';
import type { AuthContext, AuthRole } from './authz.js';
import { SliceStore } from './slice.store.js';

class CreateTenantDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  slug!: string;
}

class CreateCompanyDto {
  @IsString()
  @IsNotEmpty()
  legalName!: string;

  @IsOptional()
  @IsString()
  tradeName?: string;

  @IsOptional()
  @IsString()
  cnpj?: string;
}

class CreatePersonDto {
  @IsString()
  @IsNotEmpty()
  fullName!: string;

  @IsOptional()
  @IsString()
  cpf?: string;
}

class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  companyId!: string;

  @IsString()
  @IsNotEmpty()
  personId!: string;

  @IsOptional()
  @IsString()
  code?: string;
}

class CreateEmployeeDependentDto {
  @IsString()
  @IsNotEmpty()
  fullName!: string;

  @IsOptional()
  @IsString()
  cpf?: string;

  @IsISO8601()
  birthDate!: string;

  @IsString()
  @IsNotEmpty()
  relationshipType!: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

class UpdateEmployeeDependentDto {
  @IsOptional()
  @IsString()
  fullName?: string;

  @IsOptional()
  @IsString()
  cpf?: string;

  @IsOptional()
  @IsISO8601()
  birthDate?: string;

  @IsOptional()
  @IsString()
  relationshipType?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

class CreatePrivacyConsentDto {
  @IsString()
  @IsNotEmpty()
  subjectType!: string;

  @IsString()
  @IsNotEmpty()
  subjectId!: string;

  @IsString()
  @IsNotEmpty()
  purpose!: string;

  @IsOptional()
  @IsString()
  scope?: string;

  @IsOptional()
  @IsString()
  @IsIn(['accepted', 'refused'])
  status?: string;

  @IsOptional()
  @IsISO8601()
  expiresAt?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

class RevokePrivacyConsentDto {
  @IsOptional()
  @IsString()
  notes?: string;
}

class CreateDataSubjectRequestDto {
  @IsString()
  @IsNotEmpty()
  subjectType!: string;

  @IsString()
  @IsNotEmpty()
  subjectId!: string;

  @IsString()
  @IsNotEmpty()
  requestType!: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

class ResolveDataSubjectRequestDto {
  @IsOptional()
  @IsString()
  @IsIn(['completed', 'rejected'])
  status?: string;

  @IsOptional()
  @IsString()
  responseSummary?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

class CreatePrivacyAnonymizationJobDto {
  @IsString()
  @IsNotEmpty()
  subjectType!: string;

  @IsString()
  @IsNotEmpty()
  subjectId!: string;

  @IsString()
  @IsNotEmpty()
  datasetName!: string;

  @IsOptional()
  @IsString()
  @IsIn(['strict', 'controlled', 'aggregate'])
  maskingLevel?: string;

  @IsOptional()
  @IsString()
  @IsIn(['completed', 'blocked'])
  status?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

class CreateRetentionRuleDto {
  @IsString()
  @IsNotEmpty()
  subjectType!: string;

  @IsString()
  @IsNotEmpty()
  purpose!: string;

  @IsString()
  @IsNotEmpty()
  ruleExpression!: string;

  @IsOptional()
  @IsString()
  @IsIn(['retain', 'anonymize', 'discard'])
  action?: string;

  @IsOptional()
  @IsString()
  @IsIn(['draft', 'active', 'applied', 'blocked'])
  status?: string;

  @IsOptional()
  @IsBoolean()
  legalHold?: boolean;

  @IsOptional()
  @IsString()
  notes?: string;
}

class ApplyRetentionRuleDto {
  @IsOptional()
  @IsString()
  notes?: string;
}

class CreateSecurityIncidentDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['low', 'medium', 'high', 'critical'])
  severity!: string;

  @IsOptional()
  @IsString()
  impact?: string;

  @IsOptional()
  @IsString()
  summary?: string;

  @IsOptional()
  @IsString()
  responseActions?: string;

  @IsOptional()
  @IsString()
  @IsIn(['open', 'acknowledged', 'resolved'])
  status?: string;
}

class UpdateSecurityIncidentDto {
  @IsOptional()
  @IsString()
  responseActions?: string;
}

class AuditTrailQueryDto {
  @IsOptional()
  @IsString()
  action?: string;

  @IsOptional()
  @IsString()
  entityType?: string;

  @IsOptional()
  @IsISO8601()
  from?: string;

  @IsOptional()
  @IsISO8601()
  to?: string;
}

class CreateRecruitmentVacancyRequestDto {
  @IsOptional()
  @IsString()
  companyId?: string;

  @IsString()
  @IsNotEmpty()
  code!: string;

  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsOptional()
  @IsString()
  department?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  headcount?: number;

  @IsOptional()
  @IsString()
  notes?: string;
}

class CreateRecruitmentCandidateDto {
  @IsString()
  @IsNotEmpty()
  fullName!: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  source?: string;

  @IsOptional()
  @IsString()
  stage?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

class MoveRecruitmentCandidateDto {
  @IsString()
  @IsNotEmpty()
  stage!: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

class ScheduleRecruitmentInterviewDto {
  @IsString()
  @IsNotEmpty()
  candidateId!: string;

  @IsISO8601()
  scheduledAt!: string;

  @IsOptional()
  @IsString()
  interviewerName?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

class RecordRecruitmentCandidateEvaluationDto {
  @IsInt()
  @Min(0)
  score!: number;

  @IsString()
  @IsNotEmpty()
  recommendation!: string;

  @IsOptional()
  @IsString()
  evaluatorName?: string;

  @IsOptional()
  @IsISO8601()
  evaluatedAt?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

class CreateRecruitmentProposalDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  salaryBaseCents?: number;

  @IsOptional()
  @IsISO8601()
  startAt?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

class ConvertRecruitmentProposalDto {
  @IsOptional()
  @IsString()
  personCpf?: string;

  @IsOptional()
  @IsString()
  employeeCode?: string;

  @IsISO8601()
  effectiveFrom!: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

class CreatePointMarkDto {
  @IsString()
  @IsNotEmpty()
  employeeId!: string;

  @IsOptional()
  @IsISO8601()
  occurredAt?: string;
}

class CreatePointHolidayCalendarDto {
  @IsOptional()
  @IsString()
  companyId?: string;

  @IsOptional()
  @IsString()
  locale?: string;

  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsOptional()
  @IsBoolean()
  isNational?: boolean;

  @IsISO8601()
  validFrom!: string;

  @IsOptional()
  @IsISO8601()
  validUntil?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

class UpdatePointHolidayCalendarDto {
  @IsOptional()
  @IsString()
  companyId?: string;

  @IsOptional()
  @IsString()
  locale?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsBoolean()
  isNational?: boolean;

  @IsOptional()
  @IsISO8601()
  validFrom?: string;

  @IsOptional()
  @IsISO8601()
  validUntil?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

class CreatePointToleranceRuleDto {
  @IsOptional()
  @IsString()
  companyId?: string;

  @IsOptional()
  @IsString()
  profile?: string;

  @IsOptional()
  @IsString()
  jornada?: string;

  @IsInt()
  @Min(0)
  toleranceMinutes!: number;

  @IsISO8601()
  validFrom!: string;

  @IsOptional()
  @IsISO8601()
  validUntil?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

class UpdatePointToleranceRuleDto {
  @IsOptional()
  @IsString()
  companyId?: string;

  @IsOptional()
  @IsString()
  profile?: string;

  @IsOptional()
  @IsString()
  jornada?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  toleranceMinutes?: number;

  @IsOptional()
  @IsISO8601()
  validFrom?: string;

  @IsOptional()
  @IsISO8601()
  validUntil?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

class CreatePointDeviceDto {
  @IsOptional()
  @IsString()
  companyId?: string;

  @IsString()
  @IsNotEmpty()
  label!: string;

  @IsString()
  @IsNotEmpty()
  deviceType!: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsBoolean()
  supportsOffline?: boolean;

  @IsOptional()
  @IsBoolean()
  supportsBiometrics?: boolean;

  @IsOptional()
  @IsBoolean()
  supportsGeo?: boolean;

  @IsOptional()
  @IsString()
  notes?: string;
}

class UpdatePointDeviceDto {
  @IsOptional()
  @IsString()
  companyId?: string;

  @IsOptional()
  @IsString()
  label?: string;

  @IsOptional()
  @IsString()
  deviceType?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsBoolean()
  supportsOffline?: boolean;

  @IsOptional()
  @IsBoolean()
  supportsBiometrics?: boolean;

  @IsOptional()
  @IsBoolean()
  supportsGeo?: boolean;

  @IsOptional()
  @IsString()
  notes?: string;
}

class CalculateNightShiftAllowanceDto {
  @IsString()
  @IsNotEmpty()
  employeeId!: string;

  @IsISO8601()
  periodStart!: string;

  @IsISO8601()
  periodEnd!: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

class CalculateWeeklyRestAllowanceDto {
  @IsString()
  @IsNotEmpty()
  employeeId!: string;

  @IsISO8601()
  periodStart!: string;

  @IsISO8601()
  periodEnd!: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

class CalculateThirteenthSalaryDto {
  @IsString()
  @IsNotEmpty()
  employeeId!: string;

  @IsInt()
  @Min(2000)
  referenceYear!: number;

  @IsInt()
  @Min(0)
  salaryBaseCents!: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  variableAverageAmountCents?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  employerChargesAmountCents?: number;

  @IsOptional()
  @IsString()
  notes?: string;
}

class QueueThirteenthSalaryPayrollDto {
  @IsOptional()
  @IsString()
  notes?: string;
}

class ConsolidateTimeSheetPayrollEventsDto {
  @IsString()
  @IsNotEmpty()
  employeeId!: string;

  @IsISO8601()
  sourcePeriodStart!: string;

  @IsISO8601()
  sourcePeriodEnd!: string;

  @IsString()
  @IsNotEmpty()
  payrollPeriod!: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

class GrantTenantAccessDto {
  @IsString()
  @IsNotEmpty()
  subject!: string;

  @IsString()
  @IsNotEmpty()
  role!: AuthRole;
}

class CreateAdmissionDto {
  @IsString()
  @IsNotEmpty()
  personId!: string;

  @IsString()
  @IsNotEmpty()
  companyId!: string;

  @IsString()
  @IsNotEmpty()
  employeeId!: string;
}

class FormalizeAdmissionContractDto {
  @IsString()
  @IsNotEmpty()
  contractType!: string;

  @IsISO8601()
  effectiveFrom!: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

class QueueAdmissionEsocialDto {
  @IsOptional()
  @IsString()
  eventCode?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

class CreateTerminationDto {
  @IsString()
  @IsNotEmpty()
  employeeId!: string;

  @IsString()
  @IsNotEmpty()
  reason!: string;

  @IsISO8601()
  effectiveAt!: string;

  @IsOptional()
  @IsString()
  noticeType?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

class CreateRescissionDto {
  @IsOptional()
  @IsString()
  notes?: string;
}

class SignRescissionDocumentDto {
  @IsOptional()
  @IsString()
  @IsIn(['govbr_advanced', 'icp_brasil'])
  signatureMethod?: string;
}

class CreateAdmissionDocumentDto {
  @IsString()
  @IsNotEmpty()
  documentType!: string;

  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsOptional()
  @IsObject()
  content?: Record<string, unknown>;
}

class SignAdmissionDocumentDto {
  @IsOptional()
  @IsString()
  @IsIn(['govbr_advanced', 'icp_brasil'])
  signatureMethod?: string;
}

class CalculateRescissionDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  referenceSalaryCents?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  noticeAmountCents?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  salaryBalanceAmountCents?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  vacationAmountCents?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  thirteenthAmountCents?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  fgtsAmountCents?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  fgtsPenaltyAmountCents?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  deductionsAmountCents?: number;

  @IsOptional()
  @IsString()
  notes?: string;
}

class CreateOffboardingDto {
  @IsOptional()
  @IsString()
  notes?: string;
}

class QueueTerminationEsocialDto {
  @IsOptional()
  @IsString()
  eventCode?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

class RetryEsocialTransmissionDto {
  @IsOptional()
  @IsString()
  notes?: string;
}

class CreateBenefitCatalogDto {
  @IsString()
  @IsNotEmpty()
  code!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  benefitType!: string;

  @IsOptional()
  @IsString()
  description?: string;
}

class CreateBenefitEligibilityRuleDto {
  @IsOptional()
  @IsString()
  companyId?: string;

  @IsOptional()
  @IsString()
  employeeId?: string;

  @IsOptional()
  @IsString()
  @IsIn(['active', 'inactive'])
  status?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

class UpdateBenefitEligibilityRuleDto {
  @IsOptional()
  @IsString()
  companyId?: string;

  @IsOptional()
  @IsString()
  employeeId?: string;

  @IsOptional()
  @IsString()
  @IsIn(['active', 'inactive'])
  status?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

class GrantBenefitDto {
  @IsString()
  @IsNotEmpty()
  employeeId!: string;

  @IsString()
  @IsNotEmpty()
  benefitCatalogId!: string;

  @IsOptional()
  @IsISO8601()
  startsAt?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

class UpdateBenefitDto {
  @IsOptional()
  @IsString()
  notes?: string;
}

class CreateVacationBalanceDto {
  @IsString()
  @IsNotEmpty()
  employeeId!: string;

  @IsOptional()
  @IsISO8601()
  referenceStart?: string;

  @IsOptional()
  @IsISO8601()
  referenceEnd?: string;

  @IsOptional()
  @IsInt()
  accruedDays?: number;

  @IsOptional()
  @IsString()
  notes?: string;
}

class CreateVacationRequestDto {
  @IsString()
  @IsNotEmpty()
  employeeId!: string;

  @IsString()
  @IsNotEmpty()
  vacationBalanceId!: string;

  @IsISO8601()
  plannedStart!: string;

  @IsISO8601()
  plannedEnd!: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  abonoDays?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  salaryBaseCents?: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateVacationRequestPeriodDto)
  periods?: CreateVacationRequestPeriodDto[];

  @IsOptional()
  @IsString()
  notes?: string;
}

class CreateVacationRequestPeriodDto {
  @IsISO8601()
  plannedStart!: string;

  @IsISO8601()
  plannedEnd!: string;
}

class UpdateVacationRequestDto {
  @IsOptional()
  @IsString()
  notes?: string;
}

class IssueVacationNoticeDto {
  @IsOptional()
  @IsString()
  notes?: string;
}

class MarkVacationPaymentDto {
  @IsOptional()
  @IsString()
  notes?: string;
}

class QueueVacationEsocialDto {
  @IsOptional()
  @IsString()
  eventCode?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

class CreateOccupationalHealthEnvironmentDto {
  @IsOptional()
  @IsString()
  companyId?: string;

  @IsString()
  @IsNotEmpty()
  code!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsOptional()
  @IsString()
  sector?: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @IsISO8601()
  validFrom!: string;

  @IsOptional()
  @IsISO8601()
  validUntil?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

class UpdateOccupationalHealthEnvironmentDto {
  @IsOptional()
  @IsString()
  companyId?: string;

  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  sector?: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @IsOptional()
  @IsISO8601()
  validFrom?: string;

  @IsOptional()
  @IsISO8601()
  validUntil?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

class CreateOccupationalHealthRiskDto {
  @IsString()
  @IsNotEmpty()
  code!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  severity!: string;

  @IsString()
  @IsNotEmpty()
  probability!: string;

  @IsOptional()
  @IsString()
  controlMeasure?: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @IsISO8601()
  validFrom!: string;

  @IsOptional()
  @IsISO8601()
  validUntil?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

class UpdateOccupationalHealthRiskDto {
  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  severity?: string;

  @IsOptional()
  @IsString()
  probability?: string;

  @IsOptional()
  @IsString()
  controlMeasure?: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @IsOptional()
  @IsISO8601()
  validFrom?: string;

  @IsOptional()
  @IsISO8601()
  validUntil?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

class CreateOccupationalHealthPgrDto {
  @IsOptional()
  @IsString()
  companyId?: string;

  @IsString()
  @IsNotEmpty()
  code!: string;

  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsISO8601()
  validFrom!: string;

  @IsOptional()
  @IsISO8601()
  validUntil?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

class UpdateOccupationalHealthPgrDto {
  @IsOptional()
  @IsString()
  companyId?: string;

  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsISO8601()
  validFrom?: string;

  @IsOptional()
  @IsISO8601()
  validUntil?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

class CreateOccupationalHealthPcmsoDto {
  @IsOptional()
  @IsString()
  companyId?: string;

  @IsString()
  @IsNotEmpty()
  code!: string;

  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsISO8601()
  validFrom!: string;

  @IsOptional()
  @IsISO8601()
  validUntil?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

class UpdateOccupationalHealthPcmsoDto {
  @IsOptional()
  @IsString()
  companyId?: string;

  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsISO8601()
  validFrom?: string;

  @IsOptional()
  @IsISO8601()
  validUntil?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

class CreateOccupationalHealthCatDto {
  @IsOptional()
  @IsString()
  companyId?: string;

  @IsString()
  @IsNotEmpty()
  employeeId!: string;

  @IsString()
  @IsNotEmpty()
  reportNumber!: string;

  @IsOptional()
  @IsString()
  accidentType?: string;

  @IsISO8601()
  occurredAt!: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsOptional()
  @IsISO8601()
  notifiedAt?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

class CreateOccupationalHealthEpiCatalogDto {
  @IsOptional()
  @IsString()
  companyId?: string;

  @IsString()
  @IsNotEmpty()
  code!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @IsISO8601()
  validFrom!: string;

  @IsOptional()
  @IsISO8601()
  validUntil?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

class UpdateOccupationalHealthEpiCatalogDto {
  @IsOptional()
  @IsString()
  companyId?: string;

  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @IsOptional()
  @IsISO8601()
  validFrom?: string;

  @IsOptional()
  @IsISO8601()
  validUntil?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

class DeliverOccupationalHealthEpiDto {
  @IsString()
  @IsNotEmpty()
  employeeId!: string;

  @IsString()
  @IsNotEmpty()
  epiCatalogId!: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsISO8601()
  deliveredAt?: string;

  @IsOptional()
  @IsISO8601()
  returnedAt?: string;

  @IsOptional()
  @IsString()
  receivedBy?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

class CreateOccupationalHealthExamDto {
  @IsString()
  @IsNotEmpty()
  employeeId!: string;

  @IsOptional()
  @IsString()
  environmentId?: string;

  @IsString()
  @IsNotEmpty()
  examType!: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsISO8601()
  scheduledAt!: string;

  @IsOptional()
  @IsISO8601()
  performedAt?: string;

  @IsOptional()
  @IsString()
  result?: string;

  @IsOptional()
  @IsISO8601()
  expiresAt?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

class UpdateOccupationalHealthExamDto {
  @IsOptional()
  @IsString()
  employeeId?: string;

  @IsOptional()
  @IsString()
  environmentId?: string;

  @IsOptional()
  @IsString()
  examType?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsISO8601()
  scheduledAt?: string;

  @IsOptional()
  @IsISO8601()
  performedAt?: string;

  @IsOptional()
  @IsString()
  result?: string;

  @IsOptional()
  @IsISO8601()
  expiresAt?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

class CreateOccupationalHealthAsoDto {
  @IsString()
  @IsNotEmpty()
  result!: string;

  @IsOptional()
  @IsString()
  issuer?: string;

  @IsOptional()
  @IsISO8601()
  issuedAt?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

class CreateOccupationalHealthTrainingCatalogDto {
  @IsOptional()
  @IsString()
  companyId?: string;

  @IsString()
  @IsNotEmpty()
  code!: string;

  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  mandatory?: boolean;

  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @IsISO8601()
  validFrom!: string;

  @IsOptional()
  @IsISO8601()
  validUntil?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

class UpdateOccupationalHealthTrainingCatalogDto {
  @IsOptional()
  @IsString()
  companyId?: string;

  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  mandatory?: boolean;

  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @IsOptional()
  @IsISO8601()
  validFrom?: string;

  @IsOptional()
  @IsISO8601()
  validUntil?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

class CreateOccupationalHealthTrainingAssignmentDto {
  @IsOptional()
  @IsString()
  companyId?: string;

  @IsString()
  @IsNotEmpty()
  employeeId!: string;

  @IsString()
  @IsNotEmpty()
  trainingCatalogId!: string;

  @IsOptional()
  @IsISO8601()
  assignedAt?: string;

  @IsOptional()
  @IsISO8601()
  dueAt?: string;

  @IsOptional()
  @IsISO8601()
  expiresAt?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  score?: number;

  @IsOptional()
  @IsString()
  notes?: string;
}

class CompleteOccupationalHealthTrainingAssignmentDto {
  @IsOptional()
  @IsISO8601()
  completedAt?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  score?: number;

  @IsOptional()
  @IsString()
  notes?: string;
}

class QueueOccupationalHealthEsocialDto {
  @IsOptional()
  @IsString()
  eventCode?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

class MarkOccupationalHealthEsocialTransmissionFailedDto {
  @IsOptional()
  @IsString()
  errorMessage?: string;
}

@Controller('v1/tenants')
export class SliceController {
  constructor(@Inject(SliceStore) private readonly store: SliceStore) {}

  @Roles('admin')
  @Post()
  createTenant(@CurrentAuth() auth: AuthContext | undefined, @Body() body: CreateTenantDto) {
    return this.store.createTenant(body.name, body.slug, {
      subject: auth?.source === 'oidc' ? auth.subject : undefined,
      role: auth?.role as AuthRole | undefined,
    });
  }

  @Roles('admin', 'rh', 'manager', 'auditor')
  @Get(':tenantId/summary')
  summary(@Param('tenantId') tenantId: string) {
    return this.store.summary(tenantId);
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/sst/environments')
  createOccupationalHealthEnvironment(
    @Param('tenantId') tenantId: string,
    @CurrentAuth() auth: AuthContext | undefined,
    @Body() body: CreateOccupationalHealthEnvironmentDto,
  ) {
    return this.store.createOccupationalHealthEnvironment(
      tenantId,
      body,
      auth?.source === 'oidc' ? auth.subject : undefined,
    );
  }

  @Roles('admin', 'rh', 'manager', 'auditor')
  @Get(':tenantId/sst/environments')
  listOccupationalHealthEnvironments(@Param('tenantId') tenantId: string) {
    return this.store.listOccupationalHealthEnvironments(tenantId);
  }

  @Roles('admin', 'rh')
  @Patch(':tenantId/sst/environments/:environmentId')
  updateOccupationalHealthEnvironment(
    @Param('tenantId') tenantId: string,
    @Param('environmentId') environmentId: string,
    @CurrentAuth() auth: AuthContext | undefined,
    @Body() body: UpdateOccupationalHealthEnvironmentDto,
  ) {
    return this.store.updateOccupationalHealthEnvironment(
      tenantId,
      environmentId,
      body,
      auth?.source === 'oidc' ? auth.subject : undefined,
    );
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/sst/environments/:environmentId/risks')
  createOccupationalHealthRisk(
    @Param('tenantId') tenantId: string,
    @Param('environmentId') environmentId: string,
    @CurrentAuth() auth: AuthContext | undefined,
    @Body() body: CreateOccupationalHealthRiskDto,
  ) {
    return this.store.createOccupationalHealthRisk(
      tenantId,
      environmentId,
      body,
      auth?.source === 'oidc' ? auth.subject : undefined,
    );
  }

  @Roles('admin', 'rh', 'manager', 'auditor')
  @Get(':tenantId/sst/environments/:environmentId/risks')
  listOccupationalHealthRisks(@Param('tenantId') tenantId: string, @Param('environmentId') environmentId: string) {
    return this.store.listOccupationalHealthRisks(tenantId, environmentId);
  }

  @Roles('admin', 'rh')
  @Patch(':tenantId/sst/environments/:environmentId/risks/:riskId')
  updateOccupationalHealthRisk(
    @Param('tenantId') tenantId: string,
    @Param('environmentId') environmentId: string,
    @Param('riskId') riskId: string,
    @CurrentAuth() auth: AuthContext | undefined,
    @Body() body: UpdateOccupationalHealthRiskDto,
  ) {
    return this.store.updateOccupationalHealthRisk(
      tenantId,
      environmentId,
      riskId,
      body,
      auth?.source === 'oidc' ? auth.subject : undefined,
    );
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/sst/pgrs')
  createOccupationalHealthPgr(
    @Param('tenantId') tenantId: string,
    @CurrentAuth() auth: AuthContext | undefined,
    @Body() body: CreateOccupationalHealthPgrDto,
  ) {
    return this.store.createOccupationalHealthPgr(
      tenantId,
      {
        companyId: body.companyId,
        code: body.code,
        title: body.title,
        status: body.status,
        validFrom: body.validFrom,
        validUntil: body.validUntil,
        notes: body.notes,
      },
      auth?.source === 'oidc' ? auth.subject : undefined,
    );
  }

  @Roles('admin', 'rh', 'manager', 'auditor')
  @Get(':tenantId/sst/pgrs')
  listOccupationalHealthPgrs(@Param('tenantId') tenantId: string) {
    return this.store.listOccupationalHealthPgrs(tenantId);
  }

  @Roles('admin', 'rh')
  @Patch(':tenantId/sst/pgrs/:pgrId')
  updateOccupationalHealthPgr(
    @Param('tenantId') tenantId: string,
    @Param('pgrId') pgrId: string,
    @CurrentAuth() auth: AuthContext | undefined,
    @Body() body: UpdateOccupationalHealthPgrDto,
  ) {
    return this.store.updateOccupationalHealthPgr(
      tenantId,
      pgrId,
      body,
      auth?.source === 'oidc' ? auth.subject : undefined,
    );
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/sst/pcmsos')
  createOccupationalHealthPcmso(
    @Param('tenantId') tenantId: string,
    @CurrentAuth() auth: AuthContext | undefined,
    @Body() body: CreateOccupationalHealthPcmsoDto,
  ) {
    return this.store.createOccupationalHealthPcmso(
      tenantId,
      {
        companyId: body.companyId,
        code: body.code,
        title: body.title,
        status: body.status,
        validFrom: body.validFrom,
        validUntil: body.validUntil,
        notes: body.notes,
      },
      auth?.source === 'oidc' ? auth.subject : undefined,
    );
  }

  @Roles('admin', 'rh', 'manager', 'auditor')
  @Get(':tenantId/sst/pcmsos')
  listOccupationalHealthPcmsos(@Param('tenantId') tenantId: string) {
    return this.store.listOccupationalHealthPcmsos(tenantId);
  }

  @Roles('admin', 'rh')
  @Patch(':tenantId/sst/pcmsos/:pcmsoId')
  updateOccupationalHealthPcmso(
    @Param('tenantId') tenantId: string,
    @Param('pcmsoId') pcmsoId: string,
    @CurrentAuth() auth: AuthContext | undefined,
    @Body() body: UpdateOccupationalHealthPcmsoDto,
  ) {
    return this.store.updateOccupationalHealthPcmso(
      tenantId,
      pcmsoId,
      body,
      auth?.source === 'oidc' ? auth.subject : undefined,
    );
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/sst/cats')
  createOccupationalHealthCat(
    @Param('tenantId') tenantId: string,
    @CurrentAuth() auth: AuthContext | undefined,
    @Body() body: CreateOccupationalHealthCatDto,
  ) {
    return this.store.createOccupationalHealthCat(
      tenantId,
      {
        companyId: body.companyId,
        employeeId: body.employeeId,
        reportNumber: body.reportNumber,
        accidentType: body.accidentType,
        occurredAt: body.occurredAt,
        status: body.status,
        description: body.description,
        notifiedAt: body.notifiedAt,
        notes: body.notes,
      },
      auth?.source === 'oidc' ? auth.subject : undefined,
    );
  }

  @Roles('admin', 'rh', 'manager', 'auditor')
  @Get(':tenantId/sst/cats')
  listOccupationalHealthCats(@Param('tenantId') tenantId: string) {
    return this.store.listOccupationalHealthCats(tenantId);
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/sst/epi-catalogs')
  createOccupationalHealthEpiCatalog(
    @Param('tenantId') tenantId: string,
    @CurrentAuth() auth: AuthContext | undefined,
    @Body() body: CreateOccupationalHealthEpiCatalogDto,
  ) {
    return this.store.createOccupationalHealthEpiCatalog(
      tenantId,
      {
        companyId: body.companyId,
        code: body.code,
        name: body.name,
        active: body.active,
        validFrom: body.validFrom,
        validUntil: body.validUntil,
        notes: body.notes,
      },
      auth?.source === 'oidc' ? auth.subject : undefined,
    );
  }

  @Roles('admin', 'rh', 'manager', 'auditor')
  @Get(':tenantId/sst/epi-catalogs')
  listOccupationalHealthEpiCatalogs(@Param('tenantId') tenantId: string) {
    return this.store.listOccupationalHealthEpiCatalogs(tenantId);
  }

  @Roles('admin', 'rh')
  @Patch(':tenantId/sst/epi-catalogs/:epiCatalogId')
  updateOccupationalHealthEpiCatalog(
    @Param('tenantId') tenantId: string,
    @Param('epiCatalogId') epiCatalogId: string,
    @CurrentAuth() auth: AuthContext | undefined,
    @Body() body: UpdateOccupationalHealthEpiCatalogDto,
  ) {
    return this.store.updateOccupationalHealthEpiCatalog(
      tenantId,
      epiCatalogId,
      {
        companyId: body.companyId,
        code: body.code,
        name: body.name,
        active: body.active,
        validFrom: body.validFrom,
        validUntil: body.validUntil,
        notes: body.notes,
      },
      auth?.source === 'oidc' ? auth.subject : undefined,
    );
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/sst/epi-assignments')
  deliverOccupationalHealthEpi(
    @Param('tenantId') tenantId: string,
    @CurrentAuth() auth: AuthContext | undefined,
    @Body() body: DeliverOccupationalHealthEpiDto,
  ) {
    return this.store.deliverOccupationalHealthEpi(
      tenantId,
      {
        employeeId: body.employeeId,
        epiCatalogId: body.epiCatalogId,
        status: body.status,
        deliveredAt: body.deliveredAt,
        returnedAt: body.returnedAt,
        receivedBy: body.receivedBy,
        notes: body.notes,
      },
      auth?.source === 'oidc' ? auth.subject : undefined,
    );
  }

  @Roles('admin', 'rh', 'manager', 'auditor')
  @Get(':tenantId/sst/epi-assignments')
  listOccupationalHealthEpiAssignments(@Param('tenantId') tenantId: string) {
    return this.store.listOccupationalHealthEpiAssignments(tenantId);
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/sst/exams')
  createOccupationalHealthExam(
    @Param('tenantId') tenantId: string,
    @CurrentAuth() auth: AuthContext | undefined,
    @Body() body: CreateOccupationalHealthExamDto,
  ) {
    return this.store.createOccupationalHealthExam(
      tenantId,
      {
        employeeId: body.employeeId,
        environmentId: body.environmentId,
        examType: body.examType,
        status: body.status,
        scheduledAt: body.scheduledAt,
        performedAt: body.performedAt,
        result: body.result,
        expiresAt: body.expiresAt,
        notes: body.notes,
      },
      auth?.source === 'oidc' ? auth.subject : undefined,
    );
  }

  @Roles('admin', 'rh', 'manager', 'auditor')
  @Get(':tenantId/sst/exams')
  listOccupationalHealthExams(@Param('tenantId') tenantId: string) {
    return this.store.listOccupationalHealthExams(tenantId);
  }

  @Roles('admin', 'rh')
  @Patch(':tenantId/sst/exams/:examId')
  updateOccupationalHealthExam(
    @Param('tenantId') tenantId: string,
    @Param('examId') examId: string,
    @CurrentAuth() auth: AuthContext | undefined,
    @Body() body: UpdateOccupationalHealthExamDto,
  ) {
    return this.store.updateOccupationalHealthExam(
      tenantId,
      examId,
      {
        employeeId: body.employeeId,
        environmentId: body.environmentId,
        examType: body.examType,
        status: body.status,
        scheduledAt: body.scheduledAt,
        performedAt: body.performedAt,
        result: body.result,
        expiresAt: body.expiresAt,
        notes: body.notes,
      },
      auth?.source === 'oidc' ? auth.subject : undefined,
    );
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/sst/exams/:examId/aso')
  issueOccupationalHealthAso(
    @Param('tenantId') tenantId: string,
    @Param('examId') examId: string,
    @CurrentAuth() auth: AuthContext | undefined,
    @Body() body: CreateOccupationalHealthAsoDto,
  ) {
    return this.store.issueOccupationalHealthAso(
      tenantId,
      examId,
      {
        result: body.result,
        issuer: body.issuer,
        issuedAt: body.issuedAt,
        notes: body.notes,
      },
      auth?.source === 'oidc' ? auth.subject : undefined,
    );
  }

  @Roles('admin', 'rh', 'manager', 'auditor')
  @Get(':tenantId/sst/exams/:examId/aso')
  getOccupationalHealthAso(@Param('tenantId') tenantId: string, @Param('examId') examId: string) {
    return this.store.getOccupationalHealthAso(tenantId, examId);
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/sst/training-catalogs')
  createOccupationalHealthTrainingCatalog(
    @Param('tenantId') tenantId: string,
    @CurrentAuth() auth: AuthContext | undefined,
    @Body() body: CreateOccupationalHealthTrainingCatalogDto,
  ) {
    return this.store.createOccupationalHealthTrainingCatalog(
      tenantId,
      {
        companyId: body.companyId,
        code: body.code,
        title: body.title,
        description: body.description,
        mandatory: body.mandatory,
        active: body.active,
        validFrom: body.validFrom,
        validUntil: body.validUntil,
        notes: body.notes,
      },
      auth?.source === 'oidc' ? auth.subject : undefined,
    );
  }

  @Roles('admin', 'rh', 'manager', 'auditor')
  @Get(':tenantId/sst/training-catalogs')
  listOccupationalHealthTrainingCatalogs(@Param('tenantId') tenantId: string) {
    return this.store.listOccupationalHealthTrainingCatalogs(tenantId);
  }

  @Roles('admin', 'rh')
  @Patch(':tenantId/sst/training-catalogs/:trainingCatalogId')
  updateOccupationalHealthTrainingCatalog(
    @Param('tenantId') tenantId: string,
    @Param('trainingCatalogId') trainingCatalogId: string,
    @CurrentAuth() auth: AuthContext | undefined,
    @Body() body: UpdateOccupationalHealthTrainingCatalogDto,
  ) {
    return this.store.updateOccupationalHealthTrainingCatalog(
      tenantId,
      trainingCatalogId,
      {
        companyId: body.companyId,
        code: body.code,
        title: body.title,
        description: body.description,
        mandatory: body.mandatory,
        active: body.active,
        validFrom: body.validFrom,
        validUntil: body.validUntil,
        notes: body.notes,
      },
      auth?.source === 'oidc' ? auth.subject : undefined,
    );
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/sst/training-assignments')
  assignOccupationalHealthTraining(
    @Param('tenantId') tenantId: string,
    @CurrentAuth() auth: AuthContext | undefined,
    @Body() body: CreateOccupationalHealthTrainingAssignmentDto,
  ) {
    return this.store.assignOccupationalHealthTraining(
      tenantId,
      {
        companyId: body.companyId,
        employeeId: body.employeeId,
        trainingCatalogId: body.trainingCatalogId,
        assignedAt: body.assignedAt,
        dueAt: body.dueAt,
        expiresAt: body.expiresAt,
        score: body.score,
        notes: body.notes,
      },
      auth?.source === 'oidc' ? auth.subject : undefined,
    );
  }

  @Roles('admin', 'rh', 'manager', 'auditor')
  @Get(':tenantId/sst/training-assignments')
  listOccupationalHealthTrainingAssignments(@Param('tenantId') tenantId: string) {
    return this.store.listOccupationalHealthTrainingAssignments(tenantId);
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/sst/training-assignments/:assignmentId/complete')
  completeOccupationalHealthTrainingAssignment(
    @Param('tenantId') tenantId: string,
    @Param('assignmentId') assignmentId: string,
    @CurrentAuth() auth: AuthContext | undefined,
    @Body() body: CompleteOccupationalHealthTrainingAssignmentDto,
  ) {
    return this.store.completeOccupationalHealthTrainingAssignment(
      tenantId,
      assignmentId,
      {
        completedAt: body.completedAt,
        score: body.score,
        notes: body.notes,
      },
      auth?.source === 'oidc' ? auth.subject : undefined,
    );
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/sst/environments/:environmentId/esocial-transmissions')
  queueOccupationalHealthEnvironmentEsocialTransmission(
    @Param('tenantId') tenantId: string,
    @Param('environmentId') environmentId: string,
    @CurrentAuth() auth: AuthContext | undefined,
    @Body() body: QueueOccupationalHealthEsocialDto,
  ) {
    return this.store.queueOccupationalHealthEsocialTransmission(
      tenantId,
      'environment',
      environmentId,
      body.eventCode,
      auth?.source === 'oidc' ? auth.subject : undefined,
      body.notes,
    );
  }

  @Roles('admin', 'rh', 'manager', 'auditor')
  @Get(':tenantId/sst/environments/:environmentId/esocial-transmissions')
  listOccupationalHealthEnvironmentEsocialTransmissions(
    @Param('tenantId') tenantId: string,
    @Param('environmentId') environmentId: string,
  ) {
    return this.store.listOccupationalHealthEsocialTransmissions(tenantId, 'environment', environmentId);
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/sst/environments/:environmentId/esocial-transmissions/:transmissionId/retry')
  retryOccupationalHealthEnvironmentEsocialTransmission(
    @Param('tenantId') tenantId: string,
    @Param('environmentId') environmentId: string,
    @Param('transmissionId') transmissionId: string,
    @CurrentAuth() auth: AuthContext | undefined,
    @Body() body: QueueOccupationalHealthEsocialDto,
  ) {
    void environmentId;
    return this.store.retryOccupationalHealthEsocialTransmission(
      tenantId,
      transmissionId,
      auth?.source === 'oidc' ? auth.subject : undefined,
      body.notes,
      'environment',
      environmentId,
    );
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/sst/environments/:environmentId/esocial-transmissions/:transmissionId/mark-failed')
  markOccupationalHealthEnvironmentEsocialTransmissionFailed(
    @Param('tenantId') tenantId: string,
    @Param('environmentId') environmentId: string,
    @Param('transmissionId') transmissionId: string,
    @Body() body: MarkOccupationalHealthEsocialTransmissionFailedDto,
  ) {
    void environmentId;
    return this.store.markOccupationalHealthEsocialTransmissionFailed(
      transmissionId,
      body.errorMessage ?? 'manual occupational health eSocial failure',
    );
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/sst/cats/:catId/esocial-transmissions')
  queueOccupationalHealthCatEsocialTransmission(
    @Param('tenantId') tenantId: string,
    @Param('catId') catId: string,
    @CurrentAuth() auth: AuthContext | undefined,
    @Body() body: QueueOccupationalHealthEsocialDto,
  ) {
    return this.store.queueOccupationalHealthEsocialTransmission(
      tenantId,
      'cat',
      catId,
      body.eventCode,
      auth?.source === 'oidc' ? auth.subject : undefined,
      body.notes,
    );
  }

  @Roles('admin', 'rh', 'manager', 'auditor')
  @Get(':tenantId/sst/cats/:catId/esocial-transmissions')
  listOccupationalHealthCatEsocialTransmissions(@Param('tenantId') tenantId: string, @Param('catId') catId: string) {
    return this.store.listOccupationalHealthEsocialTransmissions(tenantId, 'cat', catId);
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/sst/cats/:catId/esocial-transmissions/:transmissionId/retry')
  retryOccupationalHealthCatEsocialTransmission(
    @Param('tenantId') tenantId: string,
    @Param('catId') catId: string,
    @Param('transmissionId') transmissionId: string,
    @CurrentAuth() auth: AuthContext | undefined,
    @Body() body: QueueOccupationalHealthEsocialDto,
  ) {
    void catId;
    return this.store.retryOccupationalHealthEsocialTransmission(
      tenantId,
      transmissionId,
      auth?.source === 'oidc' ? auth.subject : undefined,
      body.notes,
      'cat',
      catId,
    );
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/sst/cats/:catId/esocial-transmissions/:transmissionId/mark-failed')
  markOccupationalHealthCatEsocialTransmissionFailed(
    @Param('tenantId') tenantId: string,
    @Param('catId') catId: string,
    @Param('transmissionId') transmissionId: string,
    @Body() body: MarkOccupationalHealthEsocialTransmissionFailedDto,
  ) {
    void catId;
    return this.store.markOccupationalHealthEsocialTransmissionFailed(
      transmissionId,
      body.errorMessage ?? 'manual occupational health eSocial failure',
    );
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/sst/exams/:examId/esocial-transmissions')
  queueOccupationalHealthExamEsocialTransmission(
    @Param('tenantId') tenantId: string,
    @Param('examId') examId: string,
    @CurrentAuth() auth: AuthContext | undefined,
    @Body() body: QueueOccupationalHealthEsocialDto,
  ) {
    return this.store.queueOccupationalHealthEsocialTransmission(
      tenantId,
      'exam',
      examId,
      body.eventCode,
      auth?.source === 'oidc' ? auth.subject : undefined,
      body.notes,
    );
  }

  @Roles('admin', 'rh', 'manager', 'auditor')
  @Get(':tenantId/sst/exams/:examId/esocial-transmissions')
  listOccupationalHealthExamEsocialTransmissions(@Param('tenantId') tenantId: string, @Param('examId') examId: string) {
    return this.store.listOccupationalHealthEsocialTransmissions(tenantId, 'exam', examId);
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/sst/exams/:examId/esocial-transmissions/:transmissionId/retry')
  retryOccupationalHealthExamEsocialTransmission(
    @Param('tenantId') tenantId: string,
    @Param('examId') examId: string,
    @Param('transmissionId') transmissionId: string,
    @CurrentAuth() auth: AuthContext | undefined,
    @Body() body: QueueOccupationalHealthEsocialDto,
  ) {
    void examId;
    return this.store.retryOccupationalHealthEsocialTransmission(
      tenantId,
      transmissionId,
      auth?.source === 'oidc' ? auth.subject : undefined,
      body.notes,
      'exam',
      examId,
    );
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/sst/exams/:examId/esocial-transmissions/:transmissionId/mark-failed')
  markOccupationalHealthExamEsocialTransmissionFailed(
    @Param('tenantId') tenantId: string,
    @Param('examId') examId: string,
    @Param('transmissionId') transmissionId: string,
    @Body() body: MarkOccupationalHealthEsocialTransmissionFailedDto,
  ) {
    void examId;
    return this.store.markOccupationalHealthEsocialTransmissionFailed(
      transmissionId,
      body.errorMessage ?? 'manual occupational health eSocial failure',
    );
  }

  @Roles('admin', 'rh', 'manager', 'auditor')
  @Get(':tenantId/audit-events')
  auditEvents(@Param('tenantId') tenantId: string) {
    return this.store.listAuditEvents(tenantId);
  }

  @Roles('admin', 'rh', 'manager', 'auditor')
  @Get(':tenantId/lgpd/audit-trail')
  auditTrail(
    @Param('tenantId') tenantId: string,
    @CurrentAuth() auth: AuthContext | undefined,
    @Query() query: AuditTrailQueryDto,
  ) {
    return this.store.listAuditTrail(
      tenantId,
      {
        action: query.action,
        entityType: query.entityType,
        from: query.from,
        to: query.to,
      },
      auth?.source === 'oidc' ? auth.subject : undefined,
    );
  }

  @Roles('admin', 'rh', 'manager', 'auditor')
  @Get(':tenantId/lgpd/incidents')
  listSecurityIncidents(@Param('tenantId') tenantId: string) {
    return this.store.listSecurityIncidents(tenantId);
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/lgpd/incidents')
  createSecurityIncident(
    @Param('tenantId') tenantId: string,
    @CurrentAuth() auth: AuthContext | undefined,
    @Body() body: CreateSecurityIncidentDto,
  ) {
    return this.store.createSecurityIncident(
      tenantId,
      {
        title: body.title,
        severity: body.severity,
        impact: body.impact,
        summary: body.summary,
        responseActions: body.responseActions,
        status: body.status,
      },
      auth?.source === 'oidc' ? auth.subject : undefined,
    );
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/lgpd/incidents/:incidentId/acknowledge')
  acknowledgeSecurityIncident(
    @Param('tenantId') tenantId: string,
    @Param('incidentId') incidentId: string,
    @CurrentAuth() auth: AuthContext | undefined,
    @Body() body: UpdateSecurityIncidentDto,
  ) {
    return this.store.acknowledgeSecurityIncident(
      tenantId,
      incidentId,
      auth?.source === 'oidc' ? auth.subject : undefined,
      body.responseActions,
    );
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/lgpd/incidents/:incidentId/resolve')
  resolveSecurityIncident(
    @Param('tenantId') tenantId: string,
    @Param('incidentId') incidentId: string,
    @CurrentAuth() auth: AuthContext | undefined,
    @Body() body: UpdateSecurityIncidentDto,
  ) {
    return this.store.resolveSecurityIncident(
      tenantId,
      incidentId,
      auth?.source === 'oidc' ? auth.subject : undefined,
      body.responseActions,
    );
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/vacations/balances')
  createVacationBalance(
    @Param('tenantId') tenantId: string,
    @CurrentAuth() auth: AuthContext | undefined,
    @Body() body: CreateVacationBalanceDto,
  ) {
    return this.store.createVacationBalance(
      tenantId,
      body.employeeId,
      auth?.source === 'oidc' ? auth.subject : undefined,
      body.notes,
      body.referenceStart,
      body.referenceEnd,
      body.accruedDays,
    );
  }

  @Roles('admin', 'rh', 'manager', 'auditor')
  @Get(':tenantId/vacations/balances')
  listVacationBalances(@Param('tenantId') tenantId: string) {
    return this.store.listVacationBalances(tenantId);
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/vacations/requests')
  createVacationRequest(
    @Param('tenantId') tenantId: string,
    @CurrentAuth() auth: AuthContext | undefined,
    @Body() body: CreateVacationRequestDto,
  ) {
    return this.store.requestVacation(
      tenantId,
      body.employeeId,
      body.vacationBalanceId,
      body.plannedStart,
      body.plannedEnd,
      auth?.source === 'oidc' ? auth.subject : undefined,
      body.notes,
      {
        periods: body.periods,
        abonoDays: body.abonoDays,
        salaryBaseCents: body.salaryBaseCents,
      },
    );
  }

  @Roles('admin', 'rh', 'manager', 'auditor')
  @Get(':tenantId/vacations/requests')
  listVacationRequests(@Param('tenantId') tenantId: string) {
    return this.store.listVacationRequests(tenantId);
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/vacations/requests/:requestId/approve')
  approveVacationRequest(
    @Param('tenantId') tenantId: string,
    @Param('requestId') requestId: string,
    @CurrentAuth() auth: AuthContext | undefined,
    @Body() body: UpdateVacationRequestDto,
  ) {
    return this.store.approveVacationRequest(
      tenantId,
      requestId,
      auth?.source === 'oidc' ? auth.subject : undefined,
      body.notes,
    );
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/vacations/requests/:requestId/notice')
  issueVacationNotice(
    @Param('tenantId') tenantId: string,
    @Param('requestId') requestId: string,
    @CurrentAuth() auth: AuthContext | undefined,
    @Body() body: IssueVacationNoticeDto,
  ) {
    return this.store.issueVacationNotice(
      tenantId,
      requestId,
      auth?.source === 'oidc' ? auth.subject : undefined,
      body.notes,
    );
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/vacations/requests/:requestId/payment')
  markVacationPayment(
    @Param('tenantId') tenantId: string,
    @Param('requestId') requestId: string,
    @CurrentAuth() auth: AuthContext | undefined,
    @Body() body: MarkVacationPaymentDto,
  ) {
    return this.store.markVacationPayment(
      tenantId,
      requestId,
      auth?.source === 'oidc' ? auth.subject : undefined,
      body.notes,
    );
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/vacations/requests/:requestId/send-to-payroll')
  sendVacationRequestToPayroll(
    @Param('tenantId') tenantId: string,
    @Param('requestId') requestId: string,
    @CurrentAuth() auth: AuthContext | undefined,
    @Body() body: UpdateVacationRequestDto,
  ) {
    return this.store.sendVacationRequestToPayroll(
      tenantId,
      requestId,
      auth?.source === 'oidc' ? auth.subject : undefined,
      body.notes,
    );
  }

  @Roles('admin', 'rh', 'manager', 'auditor')
  @Get(':tenantId/vacations/requests/:requestId/esocial-transmissions')
  listVacationEsocialTransmissions(@Param('tenantId') tenantId: string, @Param('requestId') requestId: string) {
    return this.store.listVacationEsocialTransmissions(tenantId, requestId);
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/vacations/requests/:requestId/esocial-transmissions')
  queueVacationEsocialTransmission(
    @Param('tenantId') tenantId: string,
    @Param('requestId') requestId: string,
    @CurrentAuth() auth: AuthContext | undefined,
    @Body() body: QueueVacationEsocialDto,
  ) {
    return this.store.queueVacationEsocialTransmission(
      tenantId,
      requestId,
      body.eventCode,
      auth?.source === 'oidc' ? auth.subject : undefined,
      body.notes,
    );
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/vacations/requests/:requestId/esocial-transmissions/:transmissionId/retry')
  retryVacationEsocialTransmission(
    @Param('tenantId') tenantId: string,
    @Param('requestId') requestId: string,
    @Param('transmissionId') transmissionId: string,
    @CurrentAuth() auth: AuthContext | undefined,
    @Body() body: QueueVacationEsocialDto,
  ) {
    void requestId;
    return this.store.retryVacationEsocialTransmission(
      tenantId,
      transmissionId,
      auth?.source === 'oidc' ? auth.subject : undefined,
      body.notes,
    );
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/vacations/requests/:requestId/cancel')
  cancelVacationRequest(
    @Param('tenantId') tenantId: string,
    @Param('requestId') requestId: string,
    @CurrentAuth() auth: AuthContext | undefined,
    @Body() body: UpdateVacationRequestDto,
  ) {
    return this.store.cancelVacationRequest(
      tenantId,
      requestId,
      auth?.source === 'oidc' ? auth.subject : undefined,
      body.notes,
    );
  }

  @Roles('admin', 'rh', 'auditor')
  @Post(':tenantId/benefits/catalog')
  createBenefitCatalog(
    @Param('tenantId') tenantId: string,
    @CurrentAuth() auth: AuthContext | undefined,
    @Body() body: CreateBenefitCatalogDto,
  ) {
    return this.store.createBenefitCatalog(
      tenantId,
      body.code,
      body.name,
      body.benefitType,
      auth?.source === 'oidc' ? auth.subject : undefined,
      body.description,
    );
  }

  @Roles('admin', 'rh', 'manager', 'auditor')
  @Get(':tenantId/benefits/catalog')
  listBenefitCatalogs(@Param('tenantId') tenantId: string) {
    return this.store.listBenefitCatalogs(tenantId);
  }

  @Roles('admin', 'rh', 'auditor')
  @Post(':tenantId/benefits/catalog/:benefitCatalogId/eligibility-rules')
  createBenefitEligibilityRule(
    @Param('tenantId') tenantId: string,
    @Param('benefitCatalogId') benefitCatalogId: string,
    @CurrentAuth() auth: AuthContext | undefined,
    @Body() body: CreateBenefitEligibilityRuleDto,
  ) {
    return this.store.createBenefitEligibilityRule(
      tenantId,
      benefitCatalogId,
      {
        companyId: body.companyId,
        employeeId: body.employeeId,
        status: body.status,
        notes: body.notes,
      },
      auth?.source === 'oidc' ? auth.subject : undefined,
    );
  }

  @Roles('admin', 'rh', 'manager', 'auditor')
  @Get(':tenantId/benefits/catalog/:benefitCatalogId/eligibility-rules')
  listBenefitEligibilityRules(@Param('tenantId') tenantId: string, @Param('benefitCatalogId') benefitCatalogId: string) {
    return this.store.listBenefitEligibilityRules(tenantId, benefitCatalogId);
  }

  @Roles('admin', 'rh')
  @Patch(':tenantId/benefits/catalog/:benefitCatalogId/eligibility-rules/:ruleId')
  updateBenefitEligibilityRule(
    @Param('tenantId') tenantId: string,
    @Param('benefitCatalogId') benefitCatalogId: string,
    @Param('ruleId') ruleId: string,
    @CurrentAuth() auth: AuthContext | undefined,
    @Body() body: UpdateBenefitEligibilityRuleDto,
  ) {
    return this.store.updateBenefitEligibilityRule(
      tenantId,
      benefitCatalogId,
      ruleId,
      {
        companyId: body.companyId,
        employeeId: body.employeeId,
        status: body.status,
        notes: body.notes,
      },
      auth?.source === 'oidc' ? auth.subject : undefined,
    );
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/benefits/assignments')
  grantBenefitToEmployee(
    @Param('tenantId') tenantId: string,
    @CurrentAuth() auth: AuthContext | undefined,
    @Body() body: GrantBenefitDto,
  ) {
    return this.store.grantBenefitToEmployee(
      tenantId,
      body.employeeId,
      body.benefitCatalogId,
      auth?.source === 'oidc' ? auth.subject : undefined,
      body.notes,
      body.startsAt,
    );
  }

  @Roles('admin', 'rh', 'manager', 'auditor')
  @Get(':tenantId/benefits/assignments')
  listEmployeeBenefits(@Param('tenantId') tenantId: string) {
    return this.store.listEmployeeBenefits(tenantId);
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/benefits/assignments/:assignmentId/suspend')
  suspendEmployeeBenefit(
    @Param('tenantId') tenantId: string,
    @Param('assignmentId') assignmentId: string,
    @CurrentAuth() auth: AuthContext | undefined,
    @Body() body: UpdateBenefitDto,
  ) {
    return this.store.suspendEmployeeBenefit(
      tenantId,
      assignmentId,
      auth?.source === 'oidc' ? auth.subject : undefined,
      body.notes,
    );
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/benefits/assignments/:assignmentId/cancel')
  cancelEmployeeBenefit(
    @Param('tenantId') tenantId: string,
    @Param('assignmentId') assignmentId: string,
    @CurrentAuth() auth: AuthContext | undefined,
    @Body() body: UpdateBenefitDto,
  ) {
    return this.store.cancelEmployeeBenefit(
      tenantId,
      assignmentId,
      auth?.source === 'oidc' ? auth.subject : undefined,
      body.notes,
    );
  }

  @Roles('admin', 'rh', 'manager', 'auditor')
  @Get(':tenantId/analytics/overview')
  analyticsOverview(@Param('tenantId') tenantId: string) {
    return this.store.analyticsOverview(tenantId);
  }

  @Roles('admin', 'rh', 'manager', 'auditor', 'employee')
  @Get('me/access')
  listMyTenants(@CurrentAuth() auth: AuthContext) {
    if (auth.source !== 'oidc' || !auth.subject) {
      return [];
    }

    return this.store.listAccessibleTenants(auth.subject);
  }

  @Roles('admin', 'rh', 'manager', 'auditor')
  @Get(':tenantId')
  getTenant(@Param('tenantId') tenantId: string) {
    return this.store.getTenant(tenantId);
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/access-grants')
  grantAccess(@Param('tenantId') tenantId: string, @Body() body: GrantTenantAccessDto) {
    return this.store.grantTenantAccess(tenantId, body.subject, body.role);
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/terminations')
  createTermination(
    @Param('tenantId') tenantId: string,
    @CurrentAuth() auth: AuthContext | undefined,
    @Body() body: CreateTerminationDto,
  ) {
    return this.store.createTermination(
      tenantId,
      body.employeeId,
      body.reason,
      body.effectiveAt,
      auth?.source === 'oidc' ? auth.subject : undefined,
      body.noticeType,
      body.notes,
    );
  }

  @Roles('admin', 'rh', 'manager', 'auditor')
  @Get(':tenantId/terminations')
  listTerminations(@Param('tenantId') tenantId: string) {
    return this.store.listTerminations(tenantId);
  }

  @Roles('admin', 'rh', 'manager', 'auditor')
  @Get(':tenantId/terminations/:terminationId')
  getTermination(@Param('tenantId') tenantId: string, @Param('terminationId') terminationId: string) {
    return this.store.getTermination(tenantId, terminationId);
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/terminations/:terminationId/approve')
  approveTermination(
    @Param('tenantId') tenantId: string,
    @Param('terminationId') terminationId: string,
    @CurrentAuth() auth: AuthContext | undefined,
  ) {
    return this.store.approveTermination(tenantId, terminationId, auth?.source === 'oidc' ? auth.subject : undefined);
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/terminations/:terminationId/effective')
  effectuateTermination(
    @Param('tenantId') tenantId: string,
    @Param('terminationId') terminationId: string,
    @CurrentAuth() auth: AuthContext | undefined,
  ) {
    return this.store.effectuateTermination(tenantId, terminationId, auth?.source === 'oidc' ? auth.subject : undefined);
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/terminations/:terminationId/cancel')
  cancelTermination(
    @Param('tenantId') tenantId: string,
    @Param('terminationId') terminationId: string,
    @CurrentAuth() auth: AuthContext | undefined,
  ) {
    return this.store.cancelTermination(tenantId, terminationId, auth?.source === 'oidc' ? auth.subject : undefined);
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/terminations/:terminationId/offboardings')
  createTerminationOffboarding(
    @Param('tenantId') tenantId: string,
    @Param('terminationId') terminationId: string,
    @CurrentAuth() auth: AuthContext | undefined,
    @Body() body: CreateOffboardingDto,
  ) {
    return this.store.createOffboarding(
      tenantId,
      terminationId,
      auth?.source === 'oidc' ? auth.subject : undefined,
      body.notes,
    );
  }

  @Roles('admin', 'rh', 'manager', 'auditor')
  @Get(':tenantId/offboardings')
  listTerminationOffboardings(@Param('tenantId') tenantId: string) {
    return this.store.listOffboardings(tenantId);
  }

  @Roles('admin', 'rh', 'manager', 'auditor')
  @Get(':tenantId/offboardings/:offboardingId')
  getTerminationOffboarding(@Param('tenantId') tenantId: string, @Param('offboardingId') offboardingId: string) {
    return this.store.getOffboarding(tenantId, offboardingId);
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/offboardings/:offboardingId/close')
  closeTerminationOffboarding(
    @Param('tenantId') tenantId: string,
    @Param('offboardingId') offboardingId: string,
    @CurrentAuth() auth: AuthContext | undefined,
  ) {
    return this.store.closeOffboarding(tenantId, offboardingId, auth?.source === 'oidc' ? auth.subject : undefined);
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/offboardings/:offboardingId/cancel')
  cancelTerminationOffboarding(
    @Param('tenantId') tenantId: string,
    @Param('offboardingId') offboardingId: string,
    @CurrentAuth() auth: AuthContext | undefined,
  ) {
    return this.store.cancelOffboarding(tenantId, offboardingId, auth?.source === 'oidc' ? auth.subject : undefined);
  }

  @Roles('admin', 'rh', 'manager', 'auditor')
  @Get(':tenantId/terminations/:terminationId/esocial-transmissions')
  listTerminationEsocialTransmissions(@Param('tenantId') tenantId: string, @Param('terminationId') terminationId: string) {
    return this.store.listTerminationEsocialTransmissions(tenantId, terminationId);
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/terminations/:terminationId/esocial-transmissions')
  queueTerminationEsocialTransmission(
    @Param('tenantId') tenantId: string,
    @Param('terminationId') terminationId: string,
    @CurrentAuth() auth: AuthContext | undefined,
    @Body() body: QueueTerminationEsocialDto,
  ) {
    return this.store.queueTerminationEsocialTransmission(
      tenantId,
      terminationId,
      body.eventCode,
      auth?.source === 'oidc' ? auth.subject : undefined,
      body.notes,
    );
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/terminations/:terminationId/esocial-transmissions/:transmissionId/retry')
  retryTerminationEsocialTransmission(
    @Param('tenantId') tenantId: string,
    @Param('transmissionId') transmissionId: string,
    @CurrentAuth() auth: AuthContext | undefined,
    @Body() body: RetryEsocialTransmissionDto,
  ) {
    return this.store.retryTerminationEsocialTransmission(
      tenantId,
      transmissionId,
      auth?.source === 'oidc' ? auth.subject : undefined,
      body.notes,
    );
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/terminations/:terminationId/rescissions')
  createRescission(
    @Param('tenantId') tenantId: string,
    @Param('terminationId') terminationId: string,
    @CurrentAuth() auth: AuthContext | undefined,
    @Body() body: CreateRescissionDto,
  ) {
    return this.store.createRescission(
      tenantId,
      terminationId,
      auth?.source === 'oidc' ? auth.subject : undefined,
      body.notes,
    );
  }

  @Roles('admin', 'rh', 'manager', 'auditor')
  @Get(':tenantId/rescissions')
  listRescissions(@Param('tenantId') tenantId: string) {
    return this.store.listRescissions(tenantId);
  }

  @Roles('admin', 'rh', 'manager', 'auditor')
  @Get(':tenantId/rescissions/:rescissionId')
  getRescission(@Param('tenantId') tenantId: string, @Param('rescissionId') rescissionId: string) {
    return this.store.getRescission(tenantId, rescissionId);
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/rescissions/:rescissionId/calculation')
  calculateRescission(
    @Param('tenantId') tenantId: string,
    @Param('rescissionId') rescissionId: string,
    @CurrentAuth() auth: AuthContext | undefined,
    @Body() body: CalculateRescissionDto,
  ) {
    return this.store.calculateRescission(
      tenantId,
      rescissionId,
      {
        referenceSalaryCents: body.referenceSalaryCents,
        noticeAmountCents: body.noticeAmountCents,
        salaryBalanceAmountCents: body.salaryBalanceAmountCents,
        vacationAmountCents: body.vacationAmountCents,
        thirteenthAmountCents: body.thirteenthAmountCents,
        fgtsAmountCents: body.fgtsAmountCents,
        fgtsPenaltyAmountCents: body.fgtsPenaltyAmountCents,
        deductionsAmountCents: body.deductionsAmountCents,
        notes: body.notes,
      },
      auth?.source === 'oidc' ? auth.subject : undefined,
    );
  }

  @Roles('admin', 'rh', 'manager', 'auditor')
  @Get(':tenantId/rescissions/:rescissionId/documents')
  listRescissionDocuments(@Param('tenantId') tenantId: string, @Param('rescissionId') rescissionId: string) {
    return this.store.listRescissionDocuments(tenantId, rescissionId);
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/rescissions/:rescissionId/documents')
  generateRescissionDocuments(
    @Param('tenantId') tenantId: string,
    @Param('rescissionId') rescissionId: string,
    @CurrentAuth() auth: AuthContext | undefined,
  ) {
    return this.store.generateRescissionDocuments(
      tenantId,
      rescissionId,
      auth?.source === 'oidc' ? auth.subject : undefined,
    );
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/rescissions/:rescissionId/documents/:documentId/sign')
  signRescissionDocument(
    @Param('tenantId') tenantId: string,
    @Param('rescissionId') rescissionId: string,
    @Param('documentId') documentId: string,
    @CurrentAuth() auth: AuthContext | undefined,
    @Body() body: SignRescissionDocumentDto,
  ) {
    return this.store.signRescissionDocument(
      tenantId,
      rescissionId,
      documentId,
      body.signatureMethod,
      auth?.source === 'oidc' ? auth.subject : undefined,
    );
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/rescissions/:rescissionId/close')
  closeRescission(
    @Param('tenantId') tenantId: string,
    @Param('rescissionId') rescissionId: string,
    @CurrentAuth() auth: AuthContext | undefined,
  ) {
    return this.store.closeRescission(tenantId, rescissionId, auth?.source === 'oidc' ? auth.subject : undefined);
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/rescissions/:rescissionId/cancel')
  cancelRescission(
    @Param('tenantId') tenantId: string,
    @Param('rescissionId') rescissionId: string,
    @CurrentAuth() auth: AuthContext | undefined,
  ) {
    return this.store.cancelRescission(tenantId, rescissionId, auth?.source === 'oidc' ? auth.subject : undefined);
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/companies')
  createCompany(@Param('tenantId') tenantId: string, @Body() body: CreateCompanyDto) {
    return this.store.createCompany(tenantId, body.legalName, body.tradeName, body.cnpj);
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/persons')
  createPerson(@Param('tenantId') tenantId: string, @Body() body: CreatePersonDto) {
    return this.store.createPerson(tenantId, body.fullName, body.cpf);
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/employees')
  createEmployee(@Param('tenantId') tenantId: string, @Body() body: CreateEmployeeDto) {
    return this.store.createEmployee(tenantId, body.companyId, body.personId, body.code);
  }

  @Roles('admin', 'rh', 'manager', 'auditor')
  @Get(':tenantId/employees/:employeeId/dependents')
  listEmployeeDependents(@Param('tenantId') tenantId: string, @Param('employeeId') employeeId: string) {
    return this.store.listEmployeeDependents(tenantId, employeeId);
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/employees/:employeeId/dependents')
  createEmployeeDependent(
    @Param('tenantId') tenantId: string,
    @Param('employeeId') employeeId: string,
    @CurrentAuth() auth: AuthContext | undefined,
    @Body() body: CreateEmployeeDependentDto,
  ) {
    return this.store.createEmployeeDependent(
      tenantId,
      employeeId,
      {
        fullName: body.fullName,
        cpf: body.cpf,
        birthDate: body.birthDate,
        relationshipType: body.relationshipType,
        notes: body.notes,
      },
      auth?.source === 'oidc' ? auth.subject : undefined,
    );
  }

  @Roles('admin', 'rh')
  @Patch(':tenantId/employees/:employeeId/dependents/:dependentId')
  updateEmployeeDependent(
    @Param('tenantId') tenantId: string,
    @Param('employeeId') employeeId: string,
    @Param('dependentId') dependentId: string,
    @CurrentAuth() auth: AuthContext | undefined,
    @Body() body: UpdateEmployeeDependentDto,
  ) {
    return this.store.updateEmployeeDependent(
      tenantId,
      employeeId,
      dependentId,
      {
        fullName: body.fullName,
        cpf: body.cpf,
        birthDate: body.birthDate,
        relationshipType: body.relationshipType,
        status: body.status,
        notes: body.notes,
      },
      auth?.source === 'oidc' ? auth.subject : undefined,
    );
  }

  @Roles('admin', 'rh')
  @Patch(':tenantId/employees/:employeeId/dependents/:dependentId/inactive')
  inactivateEmployeeDependent(
    @Param('tenantId') tenantId: string,
    @Param('employeeId') employeeId: string,
    @Param('dependentId') dependentId: string,
    @CurrentAuth() auth: AuthContext | undefined,
  ) {
    return this.store.inactivateEmployeeDependent(
      tenantId,
      employeeId,
      dependentId,
      auth?.source === 'oidc' ? auth.subject : undefined,
    );
  }

  @Roles('admin', 'rh', 'manager', 'auditor')
  @Get(':tenantId/lgpd/consents')
  listPrivacyConsents(@Param('tenantId') tenantId: string) {
    return this.store.listPrivacyConsents(tenantId);
  }

  @Roles('admin', 'rh', 'manager', 'auditor', 'employee')
  @Post(':tenantId/lgpd/consents')
  createPrivacyConsent(
    @Param('tenantId') tenantId: string,
    @CurrentAuth() auth: AuthContext | undefined,
    @Body() body: CreatePrivacyConsentDto,
  ) {
    return this.store.createPrivacyConsent(
      tenantId,
      {
        subjectType: body.subjectType,
        subjectId: body.subjectId,
        purpose: body.purpose,
        scope: body.scope,
        status: body.status,
        expiresAt: body.expiresAt,
        notes: body.notes,
      },
      auth?.source === 'oidc' ? auth.subject : undefined,
    );
  }

  @Roles('admin', 'rh', 'manager', 'employee')
  @Post(':tenantId/lgpd/consents/:consentId/revoke')
  revokePrivacyConsent(
    @Param('tenantId') tenantId: string,
    @Param('consentId') consentId: string,
    @CurrentAuth() auth: AuthContext | undefined,
    @Body() body: RevokePrivacyConsentDto,
  ) {
    return this.store.revokePrivacyConsent(
      tenantId,
      consentId,
      auth?.source === 'oidc' ? auth.subject : undefined,
      body.notes,
    );
  }

  @Roles('admin', 'rh', 'manager', 'auditor')
  @Get(':tenantId/lgpd/requests')
  listDataSubjectRequests(@Param('tenantId') tenantId: string) {
    return this.store.listDataSubjectRequests(tenantId);
  }

  @Roles('admin', 'rh', 'manager', 'auditor', 'employee')
  @Post(':tenantId/lgpd/requests')
  createDataSubjectRequest(
    @Param('tenantId') tenantId: string,
    @CurrentAuth() auth: AuthContext | undefined,
    @Body() body: CreateDataSubjectRequestDto,
  ) {
    return this.store.createDataSubjectRequest(
      tenantId,
      {
        subjectType: body.subjectType,
        subjectId: body.subjectId,
        requestType: body.requestType,
        notes: body.notes,
      },
      auth?.source === 'oidc' ? auth.subject : undefined,
    );
  }

  @Roles('admin', 'rh', 'manager', 'auditor')
  @Get(':tenantId/lgpd/anonymizations')
  listPrivacyAnonymizationJobs(@Param('tenantId') tenantId: string) {
    return this.store.listPrivacyAnonymizationJobs(tenantId);
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/lgpd/anonymizations')
  createPrivacyAnonymizationJob(
    @Param('tenantId') tenantId: string,
    @CurrentAuth() auth: AuthContext | undefined,
    @Body() body: CreatePrivacyAnonymizationJobDto,
  ) {
    return this.store.createPrivacyAnonymizationJob(
      tenantId,
      {
        subjectType: body.subjectType,
        subjectId: body.subjectId,
        datasetName: body.datasetName,
        maskingLevel: body.maskingLevel,
        status: body.status,
        notes: body.notes,
      },
      auth?.source === 'oidc' ? auth.subject : undefined,
    );
  }

  @Roles('admin', 'rh', 'manager', 'auditor')
  @Get(':tenantId/lgpd/retention-rules')
  listRetentionRules(@Param('tenantId') tenantId: string) {
    return this.store.listRetentionRules(tenantId);
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/lgpd/retention-rules')
  createRetentionRule(
    @Param('tenantId') tenantId: string,
    @CurrentAuth() auth: AuthContext | undefined,
    @Body() body: CreateRetentionRuleDto,
  ) {
    return this.store.createRetentionRule(
      tenantId,
      {
        subjectType: body.subjectType,
        purpose: body.purpose,
        ruleExpression: body.ruleExpression,
        action: body.action,
        status: body.status,
        legalHold: body.legalHold,
        notes: body.notes,
      },
      auth?.source === 'oidc' ? auth.subject : undefined,
    );
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/lgpd/retention-rules/:ruleId/apply')
  applyRetentionRule(
    @Param('tenantId') tenantId: string,
    @Param('ruleId') ruleId: string,
    @CurrentAuth() auth: AuthContext | undefined,
    @Body() body: ApplyRetentionRuleDto,
  ) {
    return this.store.applyRetentionRule(tenantId, ruleId, auth?.source === 'oidc' ? auth.subject : undefined, body.notes);
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/lgpd/requests/:requestId/resolve')
  resolveDataSubjectRequest(
    @Param('tenantId') tenantId: string,
    @Param('requestId') requestId: string,
    @CurrentAuth() auth: AuthContext | undefined,
    @Body() body: ResolveDataSubjectRequestDto,
  ) {
    return this.store.resolveDataSubjectRequest(
      tenantId,
      requestId,
      {
        status: body.status,
        responseSummary: body.responseSummary,
        notes: body.notes,
      },
      auth?.source === 'oidc' ? auth.subject : undefined,
    );
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/ats/vacancy-requests')
  createRecruitmentVacancyRequest(
    @Param('tenantId') tenantId: string,
    @CurrentAuth() auth: AuthContext | undefined,
    @Body() body: CreateRecruitmentVacancyRequestDto,
  ) {
    return this.store.createRecruitmentVacancyRequest(
      tenantId,
      {
        companyId: body.companyId,
        code: body.code,
        title: body.title,
        department: body.department,
        headcount: body.headcount,
        notes: body.notes,
      },
      auth?.source === 'oidc' ? auth.subject : undefined,
    );
  }

  @Roles('admin', 'rh', 'manager', 'auditor')
  @Get(':tenantId/ats/vacancy-requests')
  listRecruitmentVacancyRequests(@Param('tenantId') tenantId: string) {
    return this.store.listRecruitmentVacancyRequests(tenantId);
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/ats/vacancy-requests/:vacancyRequestId/approve')
  approveRecruitmentVacancyRequest(
    @Param('tenantId') tenantId: string,
    @Param('vacancyRequestId') vacancyRequestId: string,
    @CurrentAuth() auth: AuthContext | undefined,
  ) {
    return this.store.approveRecruitmentVacancyRequest(
      tenantId,
      vacancyRequestId,
      auth?.source === 'oidc' ? auth.subject : undefined,
    );
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/ats/vacancy-requests/:vacancyRequestId/publish')
  publishRecruitmentVacancyRequest(
    @Param('tenantId') tenantId: string,
    @Param('vacancyRequestId') vacancyRequestId: string,
    @CurrentAuth() auth: AuthContext | undefined,
  ) {
    return this.store.publishRecruitmentVacancyRequest(
      tenantId,
      vacancyRequestId,
      auth?.source === 'oidc' ? auth.subject : undefined,
    );
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/ats/vacancy-requests/:vacancyRequestId/candidates')
  createRecruitmentCandidate(
    @Param('tenantId') tenantId: string,
    @Param('vacancyRequestId') vacancyRequestId: string,
    @CurrentAuth() auth: AuthContext | undefined,
    @Body() body: CreateRecruitmentCandidateDto,
  ) {
    return this.store.createRecruitmentCandidate(
      tenantId,
      vacancyRequestId,
      {
        fullName: body.fullName,
        email: body.email,
        phone: body.phone,
        source: body.source,
        stage: body.stage,
        notes: body.notes,
      },
      auth?.source === 'oidc' ? auth.subject : undefined,
    );
  }

  @Roles('admin', 'rh', 'manager', 'auditor')
  @Get(':tenantId/ats/vacancy-requests/:vacancyRequestId/candidates')
  listRecruitmentCandidates(
    @Param('tenantId') tenantId: string,
    @Param('vacancyRequestId') vacancyRequestId: string,
  ) {
    return this.store.listRecruitmentCandidates(tenantId, vacancyRequestId);
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/ats/candidates/:candidateId/move')
  moveRecruitmentCandidate(
    @Param('tenantId') tenantId: string,
    @Param('candidateId') candidateId: string,
    @CurrentAuth() auth: AuthContext | undefined,
    @Body() body: MoveRecruitmentCandidateDto,
  ) {
    return this.store.moveRecruitmentCandidate(
      tenantId,
      candidateId,
      {
        stage: body.stage,
        notes: body.notes,
      },
      auth?.source === 'oidc' ? auth.subject : undefined,
    );
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/ats/vacancy-requests/:vacancyRequestId/interviews')
  scheduleRecruitmentInterview(
    @Param('tenantId') tenantId: string,
    @Param('vacancyRequestId') vacancyRequestId: string,
    @CurrentAuth() auth: AuthContext | undefined,
    @Body() body: ScheduleRecruitmentInterviewDto,
  ) {
    return this.store.scheduleRecruitmentInterview(
      tenantId,
      vacancyRequestId,
      body.candidateId,
      {
        scheduledAt: body.scheduledAt,
        interviewerName: body.interviewerName,
        location: body.location,
        notes: body.notes,
      },
      auth?.source === 'oidc' ? auth.subject : undefined,
    );
  }

  @Roles('admin', 'rh', 'manager', 'auditor')
  @Get(':tenantId/ats/vacancy-requests/:vacancyRequestId/interviews')
  listRecruitmentInterviews(
    @Param('tenantId') tenantId: string,
    @Param('vacancyRequestId') vacancyRequestId: string,
  ) {
    return this.store.listRecruitmentInterviews(tenantId, vacancyRequestId);
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/ats/interviews/:interviewId/evaluations')
  recordRecruitmentCandidateEvaluation(
    @Param('tenantId') tenantId: string,
    @Param('interviewId') interviewId: string,
    @CurrentAuth() auth: AuthContext | undefined,
    @Body() body: RecordRecruitmentCandidateEvaluationDto,
  ) {
    return this.store.recordRecruitmentCandidateEvaluation(
      tenantId,
      interviewId,
      {
        score: body.score,
        recommendation: body.recommendation,
        evaluatorName: body.evaluatorName,
        evaluatedAt: body.evaluatedAt,
        notes: body.notes,
      },
      auth?.source === 'oidc' ? auth.subject : undefined,
    );
  }

  @Roles('admin', 'rh', 'manager', 'auditor')
  @Get(':tenantId/ats/vacancy-requests/:vacancyRequestId/evaluations')
  listRecruitmentCandidateEvaluations(
    @Param('tenantId') tenantId: string,
    @Param('vacancyRequestId') vacancyRequestId: string,
  ) {
    return this.store.listRecruitmentCandidateEvaluations(tenantId, vacancyRequestId);
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/ats/vacancy-requests/:vacancyRequestId/candidates/:candidateId/proposals')
  createRecruitmentProposal(
    @Param('tenantId') tenantId: string,
    @Param('vacancyRequestId') vacancyRequestId: string,
    @Param('candidateId') candidateId: string,
    @CurrentAuth() auth: AuthContext | undefined,
    @Body() body: CreateRecruitmentProposalDto,
  ) {
    return this.store.createRecruitmentProposal(
      tenantId,
      vacancyRequestId,
      candidateId,
      {
        salaryBaseCents: body.salaryBaseCents,
        startAt: body.startAt,
        notes: body.notes,
      },
      auth?.source === 'oidc' ? auth.subject : undefined,
    );
  }

  @Roles('admin', 'rh', 'manager', 'auditor')
  @Get(':tenantId/ats/vacancy-requests/:vacancyRequestId/proposals')
  listRecruitmentProposals(
    @Param('tenantId') tenantId: string,
    @Param('vacancyRequestId') vacancyRequestId: string,
  ) {
    return this.store.listRecruitmentProposals(tenantId, vacancyRequestId);
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/ats/proposals/:proposalId/convert')
  convertRecruitmentProposalToPreAdmission(
    @Param('tenantId') tenantId: string,
    @Param('proposalId') proposalId: string,
    @CurrentAuth() auth: AuthContext | undefined,
    @Body() body: ConvertRecruitmentProposalDto,
  ) {
    return this.store.convertRecruitmentProposalToPreAdmission(
      tenantId,
      proposalId,
      {
        personCpf: body.personCpf,
        employeeCode: body.employeeCode,
        effectiveFrom: body.effectiveFrom,
        notes: body.notes,
      },
      auth?.source === 'oidc' ? auth.subject : undefined,
    );
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/point-marks')
  createPointMark(@Param('tenantId') tenantId: string, @Body() body: CreatePointMarkDto) {
    return this.store.recordPointMark(tenantId, body.employeeId, body.occurredAt);
  }

  @Roles('admin', 'rh', 'manager', 'auditor')
  @Get(':tenantId/point-marks')
  listPointMarks(@Param('tenantId') tenantId: string) {
    return this.store.listPointMarks(tenantId);
  }

  @Roles('admin', 'rh', 'manager', 'auditor', 'employee')
  @Get(':tenantId/point-marks/:pointMarkId/receipt')
  getPointMarkReceipt(@Param('tenantId') tenantId: string, @Param('pointMarkId') pointMarkId: string) {
    return this.store.getPointMarkReceipt(tenantId, pointMarkId);
  }

  @Roles('admin', 'rh', 'manager', 'auditor')
  @Get(':tenantId/point-holidays')
  listPointHolidayCalendars(@Param('tenantId') tenantId: string) {
    return this.store.listPointHolidayCalendars(tenantId);
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/point-holidays')
  createPointHolidayCalendar(
    @Param('tenantId') tenantId: string,
    @CurrentAuth() auth: AuthContext | undefined,
    @Body() body: CreatePointHolidayCalendarDto,
  ) {
    return this.store.createPointHolidayCalendar(
      tenantId,
      body,
      auth?.source === 'oidc' ? auth.subject : undefined,
    );
  }

  @Roles('admin', 'rh')
  @Patch(':tenantId/point-holidays/:holidayCalendarId')
  updatePointHolidayCalendar(
    @Param('tenantId') tenantId: string,
    @Param('holidayCalendarId') holidayCalendarId: string,
    @CurrentAuth() auth: AuthContext | undefined,
    @Body() body: UpdatePointHolidayCalendarDto,
  ) {
    return this.store.updatePointHolidayCalendar(
      tenantId,
      holidayCalendarId,
      body,
      auth?.source === 'oidc' ? auth.subject : undefined,
    );
  }

  @Roles('admin', 'rh', 'manager', 'auditor')
  @Get(':tenantId/point-tolerance-rules')
  listPointToleranceRules(@Param('tenantId') tenantId: string) {
    return this.store.listPointToleranceRules(tenantId);
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/point-tolerance-rules')
  createPointToleranceRule(
    @Param('tenantId') tenantId: string,
    @CurrentAuth() auth: AuthContext | undefined,
    @Body() body: CreatePointToleranceRuleDto,
  ) {
    return this.store.createPointToleranceRule(
      tenantId,
      body,
      auth?.source === 'oidc' ? auth.subject : undefined,
    );
  }

  @Roles('admin', 'rh')
  @Patch(':tenantId/point-tolerance-rules/:toleranceRuleId')
  updatePointToleranceRule(
    @Param('tenantId') tenantId: string,
    @Param('toleranceRuleId') toleranceRuleId: string,
    @CurrentAuth() auth: AuthContext | undefined,
    @Body() body: UpdatePointToleranceRuleDto,
  ) {
    return this.store.updatePointToleranceRule(
      tenantId,
      toleranceRuleId,
      body,
      auth?.source === 'oidc' ? auth.subject : undefined,
    );
  }

  @Roles('admin', 'rh', 'manager', 'auditor')
  @Get(':tenantId/point-devices')
  listPointDevices(@Param('tenantId') tenantId: string) {
    return this.store.listPointDevices(tenantId);
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/point-devices')
  createPointDevice(
    @Param('tenantId') tenantId: string,
    @CurrentAuth() auth: AuthContext | undefined,
    @Body() body: CreatePointDeviceDto,
  ) {
    return this.store.createPointDevice(tenantId, body, auth?.source === 'oidc' ? auth.subject : undefined);
  }

  @Roles('admin', 'rh')
  @Patch(':tenantId/point-devices/:deviceId')
  updatePointDevice(
    @Param('tenantId') tenantId: string,
    @Param('deviceId') deviceId: string,
    @CurrentAuth() auth: AuthContext | undefined,
    @Body() body: UpdatePointDeviceDto,
  ) {
    return this.store.updatePointDevice(
      tenantId,
      deviceId,
      body,
      auth?.source === 'oidc' ? auth.subject : undefined,
    );
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/night-shift-allowance/calculate')
  calculateNightShiftAllowance(
    @Param('tenantId') tenantId: string,
    @CurrentAuth() auth: AuthContext | undefined,
    @Body() body: CalculateNightShiftAllowanceDto,
  ) {
    return this.store.calculateNightShiftAllowance(
      tenantId,
      body.employeeId,
      body.periodStart,
      body.periodEnd,
      auth?.source === 'oidc' ? auth.subject : undefined,
      body.notes,
    );
  }

  @Roles('admin', 'rh', 'manager', 'auditor')
  @Get(':tenantId/night-shift-allowance/calculations/:calculationId')
  getNightShiftAllowanceCalculation(@Param('tenantId') tenantId: string, @Param('calculationId') calculationId: string) {
    return this.store.getNightShiftAllowanceCalculation(tenantId, calculationId);
  }

  @Roles('admin', 'rh', 'manager')
  @Post(':tenantId/night-shift-allowance/calculations/:calculationId/approve')
  approveNightShiftAllowanceCalculation(
    @Param('tenantId') tenantId: string,
    @Param('calculationId') calculationId: string,
    @CurrentAuth() auth: AuthContext | undefined,
  ) {
    return this.store.approveNightShiftAllowanceCalculation(
      tenantId,
      calculationId,
      auth?.source === 'oidc' ? auth.subject : undefined,
    );
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/weekly-rest-allowance/calculate')
  calculateWeeklyRestAllowance(
    @Param('tenantId') tenantId: string,
    @CurrentAuth() auth: AuthContext | undefined,
    @Body() body: CalculateWeeklyRestAllowanceDto,
  ) {
    return this.store.calculateWeeklyRestAllowance(
      tenantId,
      body.employeeId,
      body.periodStart,
      body.periodEnd,
      auth?.source === 'oidc' ? auth.subject : undefined,
      body.notes,
    );
  }

  @Roles('admin', 'rh', 'manager', 'auditor')
  @Get(':tenantId/weekly-rest-allowance/calculations/:calculationId')
  getWeeklyRestAllowanceCalculation(@Param('tenantId') tenantId: string, @Param('calculationId') calculationId: string) {
    return this.store.getWeeklyRestAllowanceCalculation(tenantId, calculationId);
  }

  @Roles('admin', 'rh', 'manager')
  @Post(':tenantId/weekly-rest-allowance/calculations/:calculationId/approve')
  approveWeeklyRestAllowanceCalculation(
    @Param('tenantId') tenantId: string,
    @Param('calculationId') calculationId: string,
    @CurrentAuth() auth: AuthContext | undefined,
  ) {
    return this.store.approveWeeklyRestAllowanceCalculation(
      tenantId,
      calculationId,
      auth?.source === 'oidc' ? auth.subject : undefined,
    );
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/thirteenth-salary/calculate')
  calculateThirteenthSalary(
    @Param('tenantId') tenantId: string,
    @CurrentAuth() auth: AuthContext | undefined,
    @Body() body: CalculateThirteenthSalaryDto,
  ) {
    return this.store.calculateThirteenthSalary(
      tenantId,
      body.employeeId,
      body.referenceYear,
      body.salaryBaseCents,
      body.variableAverageAmountCents ?? 0,
      body.employerChargesAmountCents ?? 0,
      auth?.source === 'oidc' ? auth.subject : undefined,
      body.notes,
    );
  }

  @Roles('admin', 'rh', 'manager', 'auditor')
  @Get(':tenantId/thirteenth-salary/calculations/:calculationId')
  getThirteenthSalaryCalculation(@Param('tenantId') tenantId: string, @Param('calculationId') calculationId: string) {
    return this.store.getThirteenthSalaryCalculation(tenantId, calculationId);
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/thirteenth-salary/calculations/:calculationId/approve')
  approveThirteenthSalaryCalculation(
    @Param('tenantId') tenantId: string,
    @Param('calculationId') calculationId: string,
    @CurrentAuth() auth: AuthContext | undefined,
  ) {
    return this.store.approveThirteenthSalaryCalculation(
      tenantId,
      calculationId,
      auth?.source === 'oidc' ? auth.subject : undefined,
    );
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/thirteenth-salary/calculations/:calculationId/send-to-payroll')
  sendThirteenthSalaryCalculationToPayroll(
    @Param('tenantId') tenantId: string,
    @Param('calculationId') calculationId: string,
    @CurrentAuth() auth: AuthContext | undefined,
    @Body() body: QueueThirteenthSalaryPayrollDto,
  ) {
    return this.store.sendThirteenthSalaryCalculationToPayroll(
      tenantId,
      calculationId,
      auth?.source === 'oidc' ? auth.subject : undefined,
      body.notes,
    );
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/time-sheet/payroll-events/consolidate')
  consolidateTimeSheetPayrollEvents(
    @Param('tenantId') tenantId: string,
    @CurrentAuth() auth: AuthContext | undefined,
    @Body() body: ConsolidateTimeSheetPayrollEventsDto,
  ) {
    return this.store.consolidateTimeSheetPayrollEvents(
      tenantId,
      body.employeeId,
      body.sourcePeriodStart,
      body.sourcePeriodEnd,
      body.payrollPeriod,
      auth?.source === 'oidc' ? auth.subject : undefined,
      body.notes,
    );
  }

  @Roles('admin', 'rh', 'manager', 'auditor')
  @Get(':tenantId/time-sheet/payroll-events/batches/:batchId')
  getTimeSheetPayrollEventBatch(@Param('tenantId') tenantId: string, @Param('batchId') batchId: string) {
    return this.store.getTimeSheetPayrollEventBatch(tenantId, batchId);
  }

  @Roles('admin', 'rh', 'manager')
  @Post(':tenantId/time-sheet/payroll-events/batches/:batchId/approve')
  approveTimeSheetPayrollEventBatch(
    @Param('tenantId') tenantId: string,
    @Param('batchId') batchId: string,
    @CurrentAuth() auth: AuthContext | undefined,
  ) {
    return this.store.approveTimeSheetPayrollEventBatch(
      tenantId,
      batchId,
      auth?.source === 'oidc' ? auth.subject : undefined,
    );
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/time-sheet/payroll-events/batches/:batchId/send-to-payroll')
  sendTimeSheetPayrollEventBatchToPayroll(
    @Param('tenantId') tenantId: string,
    @Param('batchId') batchId: string,
    @CurrentAuth() auth: AuthContext | undefined,
  ) {
    return this.store.sendTimeSheetPayrollEventBatchToPayroll(
      tenantId,
      batchId,
      auth?.source === 'oidc' ? auth.subject : undefined,
    );
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/time-sheet/payroll-events/batches/:batchId/send-to-erp')
  sendTimeSheetPayrollEventBatchToErp(
    @Param('tenantId') tenantId: string,
    @Param('batchId') batchId: string,
    @CurrentAuth() auth: AuthContext | undefined,
  ) {
    return this.store.sendTimeSheetPayrollEventBatchToErp(
      tenantId,
      batchId,
      auth?.source === 'oidc' ? auth.subject : undefined,
    );
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/admissions')
  createAdmission(
    @Param('tenantId') tenantId: string,
    @CurrentAuth() auth: AuthContext | undefined,
    @Body() body: CreateAdmissionDto,
  ) {
    return this.store.createAdmission(
      tenantId,
      body.personId,
      body.companyId,
      body.employeeId,
      auth?.source === 'oidc' ? auth.subject : undefined,
    );
  }

  @Roles('admin', 'rh', 'manager', 'auditor')
  @Get(':tenantId/admissions')
  listAdmissions(@Param('tenantId') tenantId: string) {
    return this.store.listAdmissions(tenantId);
  }

  @Roles('admin', 'rh', 'manager', 'auditor')
  @Get(':tenantId/admissions/:admissionId')
  getAdmission(@Param('tenantId') tenantId: string, @Param('admissionId') admissionId: string) {
    return this.store.getAdmission(tenantId, admissionId);
  }

  @Roles('admin', 'rh', 'manager', 'auditor')
  @Get(':tenantId/admissions/:admissionId/checklist')
  getAdmissionChecklist(@Param('tenantId') tenantId: string, @Param('admissionId') admissionId: string) {
    return this.store.listAdmissionChecklist(tenantId, admissionId);
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/admissions/:admissionId/checklist/:checklistItemId/receive')
  receiveAdmissionChecklistItem(
    @Param('tenantId') tenantId: string,
    @Param('admissionId') admissionId: string,
    @Param('checklistItemId') checklistItemId: string,
    @CurrentAuth() auth: AuthContext | undefined,
  ) {
    return this.store.receiveAdmissionChecklistItem(
      tenantId,
      admissionId,
      checklistItemId,
      auth?.source === 'oidc' ? auth.subject : undefined,
    );
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/admissions/:admissionId/cancel')
  cancelAdmission(
    @Param('tenantId') tenantId: string,
    @Param('admissionId') admissionId: string,
    @CurrentAuth() auth: AuthContext | undefined,
  ) {
    return this.store.cancelAdmission(tenantId, admissionId, auth?.source === 'oidc' ? auth.subject : undefined);
  }

  @Roles('admin', 'rh')
  @Get(':tenantId/admissions/:admissionId/contract')
  getAdmissionContract(@Param('tenantId') tenantId: string, @Param('admissionId') admissionId: string) {
    return this.store.getAdmissionContract(tenantId, admissionId);
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/admissions/:admissionId/contract')
  formalizeAdmissionContract(
    @Param('tenantId') tenantId: string,
    @Param('admissionId') admissionId: string,
    @CurrentAuth() auth: AuthContext | undefined,
    @Body() body: FormalizeAdmissionContractDto,
  ) {
    return this.store.formalizeAdmissionContract(
      tenantId,
      admissionId,
      body.contractType,
      body.effectiveFrom,
      auth?.source === 'oidc' ? auth.subject : undefined,
      body.notes,
    );
  }

  @Roles('admin', 'rh', 'manager', 'auditor')
  @Get(':tenantId/admissions/:admissionId/documents')
  listAdmissionDocuments(@Param('tenantId') tenantId: string, @Param('admissionId') admissionId: string) {
    return this.store.listAdmissionDocuments(tenantId, admissionId);
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/admissions/:admissionId/documents')
  generateAdmissionDocument(
    @Param('tenantId') tenantId: string,
    @Param('admissionId') admissionId: string,
    @CurrentAuth() auth: AuthContext | undefined,
    @Body() body: CreateAdmissionDocumentDto,
  ) {
    return this.store.upsertAdmissionDocument(
      tenantId,
      admissionId,
      {
        documentType: body.documentType,
        title: body.title,
        content: body.content,
      },
      auth?.source === 'oidc' ? auth.subject : undefined,
    );
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/admissions/:admissionId/documents/:documentId/sign')
  signAdmissionDocument(
    @Param('tenantId') tenantId: string,
    @Param('admissionId') admissionId: string,
    @Param('documentId') documentId: string,
    @CurrentAuth() auth: AuthContext | undefined,
    @Body() body: SignAdmissionDocumentDto,
  ) {
    return this.store.signAdmissionDocument(
      tenantId,
      admissionId,
      documentId,
      body.signatureMethod,
      auth?.source === 'oidc' ? auth.subject : undefined,
    );
  }

  @Roles('admin', 'rh', 'manager', 'auditor')
  @Get(':tenantId/admissions/:admissionId/esocial-transmissions')
  listAdmissionEsocialTransmissions(@Param('tenantId') tenantId: string, @Param('admissionId') admissionId: string) {
    return this.store.listAdmissionEsocialTransmissions(tenantId, admissionId);
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/admissions/:admissionId/esocial-transmissions')
  queueAdmissionEsocialTransmission(
    @Param('tenantId') tenantId: string,
    @Param('admissionId') admissionId: string,
    @CurrentAuth() auth: AuthContext | undefined,
    @Body() body: QueueAdmissionEsocialDto,
  ) {
    return this.store.queueAdmissionEsocialTransmission(
      tenantId,
      admissionId,
      body.eventCode,
      auth?.source === 'oidc' ? auth.subject : undefined,
      body.notes,
    );
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/admissions/:admissionId/esocial-transmissions/:transmissionId/retry')
  retryAdmissionEsocialTransmission(
    @Param('tenantId') tenantId: string,
    @Param('transmissionId') transmissionId: string,
    @CurrentAuth() auth: AuthContext | undefined,
    @Body() body: RetryEsocialTransmissionDto,
  ) {
    return this.store.retryAdmissionEsocialTransmission(
      tenantId,
      transmissionId,
      auth?.source === 'oidc' ? auth.subject : undefined,
      body.notes,
    );
  }
}
