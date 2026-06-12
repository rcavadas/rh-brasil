import { randomUUID } from 'node:crypto';
import { ConflictException, Injectable, NotFoundException, OnModuleDestroy } from '@nestjs/common';
import { Queue } from 'bullmq';
import { PrismaClient, Prisma } from '@prisma/client';
import type { AuthRole } from './authz.js';

const RESCISSION_SIGNATURE_METHODS = ['govbr_advanced', 'icp_brasil'] as const;
const OCCUPATIONAL_HEALTH_ESOCIAL_EVENT_CODES = {
  environment: 'S-2240',
  cat: 'S-2210',
  exam: 'S-2220',
} as const;

export type TenantRecord = {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
};

export type CompanyRecord = {
  id: string;
  tenantId: string;
  legalName: string;
  tradeName?: string;
  cnpj?: string;
  createdAt: string;
  updatedAt: string;
};

export type PersonRecord = {
  id: string;
  tenantId: string;
  fullName: string;
  cpf?: string;
  createdAt: string;
  updatedAt: string;
};

export type EmployeeRecord = {
  id: string;
  tenantId: string;
  companyId: string;
  personId: string;
  code?: string;
  createdAt: string;
  updatedAt: string;
};

export type RecruitmentVacancyRequestRecord = {
  id: string;
  tenantId: string;
  companyId?: string;
  code: string;
  title: string;
  department?: string;
  headcount: number;
  status: string;
  requestedBy?: string;
  requestedAt: string;
  approvedBy?: string;
  approvedAt?: string;
  publishedBy?: string;
  publishedAt?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

export type RecruitmentCandidateRecord = {
  id: string;
  tenantId: string;
  companyId?: string;
  vacancyRequestId: string;
  fullName: string;
  email?: string;
  phone?: string;
  source?: string;
  status: string;
  stage: string;
  appliedAt: string;
  movedBy?: string;
  movedAt?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

export type RecruitmentInterviewRecord = {
  id: string;
  tenantId: string;
  companyId?: string;
  vacancyRequestId: string;
  candidateId: string;
  scheduledAt: string;
  completedAt?: string;
  status: string;
  interviewerName?: string;
  location?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

export type RecruitmentCandidateEvaluationRecord = {
  id: string;
  tenantId: string;
  companyId?: string;
  vacancyRequestId: string;
  candidateId: string;
  interviewId?: string;
  evaluatorName?: string;
  score: number;
  recommendation: string;
  evaluatedAt: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

export type RecruitmentProposalRecord = {
  id: string;
  tenantId: string;
  companyId?: string;
  vacancyRequestId: string;
  candidateId: string;
  salaryBaseCents?: number;
  startAt?: string;
  status: string;
  notes?: string;
  convertedAt?: string;
  convertedBy?: string;
  admissionRequestId?: string;
  createdAt: string;
  updatedAt: string;
};

export type PointMarkRecord = {
  id: string;
  tenantId: string;
  employeeId: string;
  occurredAt: string;
  createdAt: string;
};

export type PointMarkReceiptRecord = {
  receiptNumber: string;
  generatedAt: string;
  pointMark: PointMarkRecord;
  employee: EmployeeRecord;
  title: string;
  content: {
    receiptNumber: string;
    pointMarkId: string;
    employeeId: string;
    occurredAt: string;
    generatedAt: string;
  };
};

export type PointHolidayCalendarRecord = {
  id: string;
  tenantId: string;
  companyId?: string;
  locale?: string;
  title: string;
  isNational: boolean;
  validFrom: string;
  validUntil?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

export type PointToleranceRuleRecord = {
  id: string;
  tenantId: string;
  companyId?: string;
  profile?: string;
  jornada?: string;
  toleranceMinutes: number;
  validFrom: string;
  validUntil?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

export type PointDeviceRecord = {
  id: string;
  tenantId: string;
  companyId?: string;
  label: string;
  deviceType: string;
  status: string;
  supportsOffline: boolean;
  supportsBiometrics: boolean;
  supportsGeo: boolean;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

export type OccupationalHealthEnvironmentRecord = {
  id: string;
  tenantId: string;
  companyId?: string;
  code: string;
  name: string;
  sector?: string;
  active: boolean;
  validFrom: string;
  validUntil?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

export type OccupationalHealthRiskRecord = {
  id: string;
  tenantId: string;
  environmentId: string;
  code: string;
  name: string;
  severity: string;
  probability: string;
  controlMeasure?: string;
  active: boolean;
  validFrom: string;
  validUntil?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

export type OccupationalHealthPgrRecord = {
  id: string;
  tenantId: string;
  companyId?: string;
  code: string;
  title: string;
  status: string;
  validFrom: string;
  validUntil?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

export type OccupationalHealthPcmsoRecord = {
  id: string;
  tenantId: string;
  companyId?: string;
  code: string;
  title: string;
  status: string;
  validFrom: string;
  validUntil?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

export type OccupationalHealthCatRecord = {
  id: string;
  tenantId: string;
  companyId?: string;
  employeeId: string;
  reportNumber: string;
  accidentType?: string;
  occurredAt: string;
  status: string;
  description: string;
  notifiedAt?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

export type OccupationalHealthEpiCatalogRecord = {
  id: string;
  tenantId: string;
  companyId?: string;
  code: string;
  name: string;
  active: boolean;
  validFrom: string;
  validUntil?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

export type OccupationalHealthEpiAssignmentRecord = {
  id: string;
  tenantId: string;
  companyId?: string;
  employeeId: string;
  epiCatalogId: string;
  status: string;
  deliveredAt: string;
  returnedAt?: string;
  receivedBy?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  epiCatalog?: OccupationalHealthEpiCatalogRecord;
};

export type OccupationalHealthAsoRecord = {
  id: string;
  tenantId: string;
  examId: string;
  employeeId: string;
  issuedAt: string;
  result: string;
  issuer?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

export type OccupationalHealthEsocialSubjectType = 'environment' | 'cat' | 'exam';

export type OccupationalHealthEsocialTransmissionRecord = {
  id: string;
  tenantId: string;
  subjectType: OccupationalHealthEsocialSubjectType;
  subjectId: string;
  companyId?: string;
  employeeId?: string;
  environmentId?: string;
  catId?: string;
  examId?: string;
  eventCode: string;
  status: string;
  payload: Prisma.JsonValue;
  receiptNumber?: string;
  response?: Prisma.JsonValue;
  errorMessage?: string;
  queuedAt: string;
  sentAt?: string;
  processedAt?: string;
  attempts: number;
  createdAt: string;
  updatedAt: string;
};

export type OccupationalHealthTrainingCatalogRecord = {
  id: string;
  tenantId: string;
  companyId?: string;
  code: string;
  title: string;
  description?: string;
  mandatory: boolean;
  active: boolean;
  validFrom: string;
  validUntil?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

export type OccupationalHealthTrainingAssignmentRecord = {
  id: string;
  tenantId: string;
  companyId?: string;
  employeeId: string;
  trainingCatalogId: string;
  status: string;
  assignedAt: string;
  dueAt?: string;
  completedAt?: string;
  expiresAt?: string;
  completedBy?: string;
  score?: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  trainingCatalog?: OccupationalHealthTrainingCatalogRecord;
};

export type OccupationalHealthEsocialSourceRecord =
  | {
      subjectType: 'environment';
      subjectId: string;
      companyId?: string;
      employeeId?: string;
      environmentId?: string;
      catId?: string;
      examId?: string;
      environment: {
        id: string;
        tenantId: string;
        companyId: string | null;
        code: string;
        name: string;
        sector: string | null;
        active: boolean;
        validFrom: Date;
        validUntil: Date | null;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
      };
      risks: Array<{
        id: string;
        tenantId: string;
        environmentId: string;
        code: string;
        name: string;
        severity: string;
        probability: string;
        controlMeasure: string | null;
        active: boolean;
        validFrom: Date;
        validUntil: Date | null;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
      }>;
    }
  | {
      subjectType: 'cat';
      subjectId: string;
      companyId?: string;
      employeeId?: string;
      environmentId?: string;
      catId?: string;
      examId?: string;
      cat: {
        id: string;
        tenantId: string;
        companyId: string | null;
        employeeId: string;
        reportNumber: string;
        accidentType: string | null;
        occurredAt: Date;
        status: string;
        description: string;
        notifiedAt: Date | null;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
      };
    }
  | {
      subjectType: 'exam';
      subjectId: string;
      companyId?: string;
      employeeId?: string;
      environmentId?: string;
      catId?: string;
      examId?: string;
      exam: {
        id: string;
        tenantId: string;
        employeeId: string;
        environmentId: string | null;
        examType: string;
        status: string;
        scheduledAt: Date;
        performedAt: Date | null;
        result: string | null;
        expiresAt: Date | null;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
      };
      aso?: {
        id: string;
        tenantId: string;
        examId: string;
        employeeId: string;
        issuedAt: Date;
        result: string;
        issuer: string | null;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
      };
    };

export type OccupationalHealthExamRecord = {
  id: string;
  tenantId: string;
  employeeId: string;
  environmentId?: string;
  examType: string;
  status: string;
  scheduledAt: string;
  performedAt?: string;
  result?: string;
  expiresAt?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  aso?: OccupationalHealthAsoRecord;
};

export type NightShiftAllowanceItemRecord = {
  id: string;
  tenantId: string;
  calculationId: string;
  date: string;
  minutes: number;
  percentage: number;
  reason: string;
  reducedHourFactor: number;
  sourceReference: string;
  createdAt: string;
  updatedAt: string;
};

export type NightShiftAllowanceCalculationRecord = {
  id: string;
  tenantId: string;
  employeeId: string;
  periodStart: string;
  periodEnd: string;
  status: string;
  nightPeriodReference: string;
  calculationBase: string;
  totalMinutes: number;
  reducedMinutes: number;
  percentage: number;
  notes?: string;
  calculatedBy?: string;
  calculatedAt: string;
  approvedBy?: string;
  approvedAt?: string;
  createdAt: string;
  updatedAt: string;
  items: NightShiftAllowanceItemRecord[];
};

export type WeeklyRestAllowanceItemRecord = {
  id: string;
  tenantId: string;
  calculationId: string;
  date: string;
  dayType: string;
  minutes: number;
  percentage: number;
  reason: string;
  sourceReference: string;
  createdAt: string;
  updatedAt: string;
};

export type WeeklyRestAllowanceCalculationRecord = {
  id: string;
  tenantId: string;
  employeeId: string;
  periodStart: string;
  periodEnd: string;
  status: string;
  ruleReference: string;
  calculationBase: string;
  totalMinutes: number;
  affectedDays: number;
  restDays: number;
  notes?: string;
  calculatedBy?: string;
  calculatedAt: string;
  approvedBy?: string;
  approvedAt?: string;
  createdAt: string;
  updatedAt: string;
  items: WeeklyRestAllowanceItemRecord[];
};

export type ThirteenthSalaryCalculationRecord = {
  id: string;
  tenantId: string;
  employeeId: string;
  referenceYear: number;
  status: string;
  salaryBaseCents: number;
  eligibleMonths: number;
  variableAverageAmountCents: number;
  employerChargesAmountCents: number;
  totalAmountCents: number;
  firstParcelAmountCents: number;
  secondParcelAmountCents: number;
  notes?: string;
  calculatedBy?: string;
  calculatedAt: string;
  approvedBy?: string;
  approvedAt?: string;
  payrollBatchId?: string;
  payrollStatus?: string;
  payrollReceiptNumber?: string;
  payrollSentBy?: string;
  payrollSentAt?: string;
  createdAt: string;
  updatedAt: string;
};

export type TimeSheetPayrollEventBatchItemRecord = {
  id: string;
  tenantId: string;
  batchId: string;
  sourceEventType: string;
  sourceEventId: string;
  payrollRubricCode: string;
  quantityMinutes: number;
  amountCents: number;
  referenceDate: string;
  status: string;
  reason?: string;
  sourceReference: string;
  createdAt: string;
  updatedAt: string;
};

export type TimeSheetPayrollEventBatchRecord = {
  id: string;
  tenantId: string;
  employeeId: string;
  companyId: string;
  sourcePeriodStart: string;
  sourcePeriodEnd: string;
  payrollPeriod: string;
  status: string;
  totalMinutes: number;
  totalAmountCents: number;
  notes?: string;
  consolidatedBy?: string;
  consolidatedAt: string;
  approvedBy?: string;
  approvedAt?: string;
  payrollReceiptNumber?: string;
  sentBy?: string;
  sentAt?: string;
  erpStatus?: string;
  erpReceiptNumber?: string;
  erpSentBy?: string;
  erpSentAt?: string;
  bankStatus?: string;
  bankReceiptNumber?: string;
  bankSentBy?: string;
  bankSentAt?: string;
  createdAt: string;
  updatedAt: string;
  items: TimeSheetPayrollEventBatchItemRecord[];
};

export type PlatformTelemetryRecord = {
  service: string;
  generatedAt: string;
  counts: {
    tenants: number;
    companies: number;
    persons: number;
    employees: number;
    pointMarks: number;
    admissions: number;
    terminations: number;
    rescissions: number;
    payrollBatches: number;
    integrationRequests: number;
  };
};

export type ApiIntegrationRequestHistoryRecord = {
  id: string;
  tenantId: string;
  requestId: string;
  eventType: string;
  details?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
};

export type ApiIntegrationRequestRecord = {
  id: string;
  tenantId: string;
  integrationType: string;
  operation: string;
  status: string;
  attempts: number;
  subject?: string;
  externalReference?: string;
  payload?: Record<string, unknown>;
  response?: Record<string, unknown>;
  failureReason?: string;
  dlqReason?: string;
  requestedBy?: string;
  requestedAt: string;
  lastAttemptAt?: string;
  completedAt?: string;
  dlqAt?: string;
  createdAt: string;
  updatedAt: string;
  histories: ApiIntegrationRequestHistoryRecord[];
};

export type IntegrationMonitoringSnapshotRecord = {
  tenantId: string;
  counts: {
    total: number;
    requested: number;
    completed: number;
    failed: number;
    dlq: number;
    benefits: number;
    identity: number;
    attempts: number;
  };
  lastRequestedAt?: string;
  alerts: Array<{
    integrationType: string;
    severity: 'warning' | 'critical';
    message: string;
  }>;
};

export type TenantAnalyticsOverviewRecord = {
  tenantId: string;
  generatedAt: string;
  counts: {
    employees: number;
    pointMarks: number;
    auditEvents: number;
    admissions: number;
    terminations: number;
    offboardings: number;
    rescissions: number;
    openAdmissions: number;
    openTerminations: number;
    openOffboardings: number;
    openRescissions: number;
    integrationRequests: number;
    failedIntegrations: number;
    dlqIntegrations: number;
    attempts: number;
  };
  signals: {
    headcount: number;
    workflowPressure: number;
    lastAuditEventAt: string | null;
    lastRequestedAt: string | null;
  };
  privacy: {
    retentionModel: 'class-based';
    exportFormats: string[];
    maskingLevels: string[];
  };
  alerts: Array<{
    code: string;
    severity: 'info' | 'warning' | 'critical';
    message: string;
  }>;
};

export type AuditEventRecord = {
  id: string;
  tenantId: string;
  action: string;
  entityType: string;
  entityId: string;
  occurredAt: string;
  details: Record<string, string | undefined>;
};

export type TenantAccessGrantRecord = {
  id: string;
  tenantId: string;
  subject: string;
  role: string;
  createdAt: string;
};

export type TenantAccessWithTenantRecord = TenantAccessGrantRecord & {
  tenant: TenantRecord;
};

export type BenefitCatalogRecord = {
  id: string;
  tenantId: string;
  code: string;
  name: string;
  benefitType: string;
  description?: string;
  active: boolean;
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
};

export type EmployeeBenefitRecord = {
  id: string;
  tenantId: string;
  employeeId: string;
  benefitCatalogId: string;
  status: string;
  startsAt: string;
  endsAt?: string;
  notes?: string;
  requestedBy?: string;
  requestedAt: string;
  changedBy?: string;
  changedAt?: string;
  createdAt: string;
  updatedAt: string;
  benefitCatalog?: BenefitCatalogRecord;
};

export type VacationBalanceRecord = {
  id: string;
  tenantId: string;
  employeeId: string;
  referenceStart: string;
  referenceEnd: string;
  concessiveStart: string;
  concessiveEnd: string;
  concessiveStatus: string;
  daysUntilConcessiveEnd: number;
  canScheduleVacation: boolean;
  accruedDays: number;
  takenDays: number;
  availableDays: number;
  status: string;
  notes?: string;
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
};

export type VacationRequestRecord = {
  id: string;
  tenantId: string;
  employeeId: string;
  vacationBalanceId: string;
  plannedStart: string;
  plannedEnd: string;
  requestedDays: number;
  consumedDays: number;
  abonoDays: number;
  salaryBaseCents?: number;
  vacationAmountCents: number;
  abonoAmountCents: number;
  status: string;
  notes?: string;
  requestedBy?: string;
  requestedAt: string;
  decidedBy?: string;
  decidedAt?: string;
  noticeIssuedAt?: string;
  noticeProtocol?: string;
  paymentDueAt?: string;
  paidAt?: string;
  paidBy?: string;
  payrollBatchId?: string;
  payrollStatus?: string;
  payrollReceiptNumber?: string;
  payrollSentBy?: string;
  payrollSentAt?: string;
  createdAt: string;
  updatedAt: string;
  balance?: VacationBalanceRecord;
  periods: VacationRequestPeriodRecord[];
};

export type VacationRequestPeriodRecord = {
  id: string;
  tenantId: string;
  vacationRequestId: string;
  sequence: number;
  plannedStart: string;
  plannedEnd: string;
  requestedDays: number;
  createdAt: string;
  updatedAt: string;
};

export type VacationEsocialTransmissionRecord = {
  id: string;
  tenantId: string;
  vacationRequestId: string;
  eventCode: string;
  status: string;
  payload: Record<string, string | number | boolean | undefined>;
  receiptNumber?: string;
  response?: Record<string, string | number | boolean | undefined>;
  errorMessage?: string;
  queuedAt: string;
  sentAt?: string;
  processedAt?: string;
  attempts: number;
  createdAt: string;
  updatedAt: string;
};

export type VacationRequestPeriodInput = {
  plannedStart: string;
  plannedEnd: string;
};

export type AdmissionRecord = {
  id: string;
  tenantId: string;
  sourceCandidateId?: string;
  sourceProposalId?: string;
  personId: string;
  companyId: string;
  employeeId: string;
  status: string;
  requestedBy?: string;
  requestedAt: string;
  createdAt: string;
  updatedAt: string;
};

export type AdmissionHistoryRecord = {
  id: string;
  tenantId: string;
  admissionRequestId: string;
  eventType: string;
  fromStatus?: string;
  toStatus?: string;
  actor?: string;
  occurredAt: string;
  details: Record<string, string | undefined>;
};

export type AdmissionWithHistoryRecord = AdmissionRecord & {
  history: AdmissionHistoryRecord[];
  contract?: AdmissionContractRecord;
  documents: AdmissionDocumentRecord[];
};

export type AdmissionChecklistItemRecord = {
  id: string;
  tenantId: string;
  admissionRequestId: string;
  code: string;
  label: string;
  required: boolean;
  status: string;
  receivedBy?: string;
  receivedAt?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

export type AdmissionContractRecord = {
  id: string;
  tenantId: string;
  admissionRequestId: string;
  contractType: string;
  effectiveFrom: string;
  status: string;
  notes?: string;
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
};

export type AdmissionDocumentRecord = {
  id: string;
  tenantId: string;
  admissionRequestId: string;
  admissionContractId?: string;
  documentType: string;
  title: string;
  status: string;
  signedBy?: string;
  signedAt?: string;
  signatureMethod?: string;
  content: Record<string, unknown>;
  generatedBy?: string;
  generatedAt: string;
  createdAt: string;
  updatedAt: string;
};

export type AdmissionEsocialTransmissionRecord = {
  id: string;
  tenantId: string;
  admissionRequestId: string;
  admissionContractId?: string;
  eventCode: string;
  status: string;
  payload: Record<string, string | undefined>;
  receiptNumber?: string;
  response?: Record<string, string | undefined>;
  errorMessage?: string;
  queuedAt: string;
  sentAt?: string;
  processedAt?: string;
  attempts: number;
  createdAt: string;
  updatedAt: string;
};

export type TerminationRecord = {
  id: string;
  tenantId: string;
  employeeId: string;
  status: string;
  reason: string;
  effectiveAt: string;
  noticeType?: string;
  requestedBy?: string;
  requestedAt: string;
  approvedBy?: string;
  approvedAt?: string;
  effectiveBy?: string;
  effectiveOn?: string;
  cancelledBy?: string;
  cancelledAt?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

export type TerminationHistoryRecord = {
  id: string;
  tenantId: string;
  terminationRequestId: string;
  eventType: string;
  fromStatus?: string;
  toStatus?: string;
  actor?: string;
  occurredAt: string;
  details: Record<string, string | undefined>;
};

export type TerminationWithHistoryRecord = TerminationRecord & {
  histories: TerminationHistoryRecord[];
};

export type TerminationOffboardingRecord = {
  id: string;
  tenantId: string;
  terminationRequestId: string;
  employeeId: string;
  status: string;
  requestedBy?: string;
  requestedAt: string;
  closedBy?: string;
  closedAt?: string;
  cancelledBy?: string;
  cancelledAt?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

export type TerminationOffboardingHistoryRecord = {
  id: string;
  tenantId: string;
  terminationOffboardingId: string;
  eventType: string;
  fromStatus?: string;
  toStatus?: string;
  actor?: string;
  occurredAt: string;
  details: Record<string, string | undefined>;
};

export type TerminationOffboardingWithHistoryRecord = TerminationOffboardingRecord & {
  histories: TerminationOffboardingHistoryRecord[];
};

export type TerminationEsocialTransmissionRecord = {
  id: string;
  tenantId: string;
  terminationRequestId: string;
  terminationOffboardingId: string;
  eventCode: string;
  status: string;
  payload: Record<string, string | undefined>;
  receiptNumber?: string;
  response?: Record<string, string | undefined>;
  errorMessage?: string;
  queuedAt: string;
  sentAt?: string;
  processedAt?: string;
  attempts: number;
  createdAt: string;
  updatedAt: string;
};

export type RescissionRecord = {
  id: string;
  tenantId: string;
  terminationRequestId: string;
  employeeId: string;
  status: string;
  paymentDueAt?: string;
  requestedBy?: string;
  requestedAt: string;
  closedBy?: string;
  closedAt?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

export type RescissionHistoryRecord = {
  id: string;
  tenantId: string;
  rescissionRequestId: string;
  eventType: string;
  fromStatus?: string;
  toStatus?: string;
  actor?: string;
  occurredAt: string;
  details: Record<string, string | undefined>;
};

export type RescissionCalculationRecord = {
  id: string;
  tenantId: string;
  rescissionRequestId: string;
  status: string;
  referenceSalaryCents?: number;
  noticeAmountCents: number;
  salaryBalanceAmountCents: number;
  vacationAmountCents: number;
  thirteenthAmountCents: number;
  fgtsAmountCents: number;
  fgtsPenaltyAmountCents: number;
  deductionsAmountCents: number;
  grossAmountCents: number;
  netAmountCents: number;
  notes?: string;
  calculatedBy?: string;
  calculatedAt: string;
  createdAt: string;
  updatedAt: string;
};

export type RescissionDocumentRecord = {
  id: string;
  tenantId: string;
  rescissionRequestId: string;
  calculationId?: string;
  documentType: string;
  title: string;
  status: string;
  signedBy?: string;
  signedAt?: string;
  signatureMethod?: string;
  content: Record<string, unknown>;
  generatedBy?: string;
  generatedAt: string;
  createdAt: string;
  updatedAt: string;
};

export type RescissionWithHistoryRecord = RescissionRecord & {
  histories: RescissionHistoryRecord[];
  calculation?: RescissionCalculationRecord;
  documents: RescissionDocumentRecord[];
};

const ADMISSION_CHECKLIST_TEMPLATE = [
  { code: 'identity_document', label: 'Documento de identidade' },
  { code: 'cpf', label: 'CPF' },
  { code: 'address_proof', label: 'Comprovante de endereco' },
] as const;

@Injectable()
export class SliceStore implements OnModuleDestroy {
  private readonly prisma = new PrismaClient();
  private readonly queue = this.createQueue();

  async close(): Promise<void> {
    if (this.queue) {
      await this.queue.close();
    }
    await this.prisma.$disconnect();
  }

  async onModuleDestroy(): Promise<void> {
    await this.close();
  }

  private createQueue(): Queue | null {
    if (process.env.ESOCIAL_QUEUE_ENABLED !== 'true') {
      return null;
    }

    const redisUrl = new URL(process.env.REDIS_URL ?? 'redis://localhost:6379');
    const connection = {
      host: redisUrl.hostname,
      port: Number(redisUrl.port || '6379'),
      password: redisUrl.password || undefined,
    };

    return new Queue('rh-events', { connection });
  }

  async createTenant(
    name: string,
    slug: string,
    createdBy?: {
      subject?: string;
      role?: AuthRole;
    },
  ): Promise<TenantRecord> {
    const existing = await this.prisma.tenant.findUnique({ where: { slug } });
    if (existing) {
      throw new ConflictException(`tenant slug ${slug} already exists`);
    }

    const now = new Date();
    const tenant = await this.prisma.$transaction(async (tx) => {
      const created = await tx.tenant.create({
        data: {
          name,
          slug,
        },
      });

      await tx.auditEvent.create({
        data: this.auditData(created.id, 'tenant.created', 'tenant', created.id, { name, slug }, now),
      });

      if (createdBy?.subject) {
        await tx.tenantAccess.create({
          data: {
            tenantId: created.id,
            subject: createdBy.subject,
            role: createdBy.role ?? 'admin',
          },
        });
      }

      return created;
    });

    return this.toTenantRecord(tenant);
  }

  async getTenant(tenantId: string): Promise<TenantRecord> {
    return this.toTenantRecord(await this.requireTenant(tenantId));
  }

  async createCompany(tenantId: string, legalName: string, tradeName?: string, cnpj?: string): Promise<CompanyRecord> {
    await this.requireTenant(tenantId);

    if (cnpj) {
      const existing = await this.prisma.company.findFirst({ where: { tenantId, cnpj } });
      if (existing) {
        throw new ConflictException(`company cnpj ${cnpj} already exists in tenant ${tenantId}`);
      }
    }

    const now = new Date();
    const company = await this.prisma.$transaction(async (tx) => {
      const created = await tx.company.create({
        data: {
          tenantId,
          legalName,
          tradeName,
          cnpj,
        },
      });

      await tx.auditEvent.create({
        data: this.auditData(tenantId, 'company.created', 'company', created.id, { legalName }, now),
      });

      return created;
    });

    return this.toCompanyRecord(company);
  }

  async createPerson(tenantId: string, fullName: string, cpf?: string): Promise<PersonRecord> {
    await this.requireTenant(tenantId);

    if (cpf) {
      const existing = await this.prisma.person.findFirst({ where: { tenantId, cpf } });
      if (existing) {
        throw new ConflictException(`person cpf ${cpf} already exists in tenant ${tenantId}`);
      }
    }

    const now = new Date();
    const person = await this.prisma.$transaction(async (tx) => {
      const created = await tx.person.create({
        data: {
          tenantId,
          fullName,
          cpf,
        },
      });

      await tx.auditEvent.create({
        data: this.auditData(tenantId, 'person.created', 'person', created.id, { fullName }, now),
      });

      return created;
    });

    return this.toPersonRecord(person);
  }

  async createEmployee(tenantId: string, companyId: string, personId: string, code?: string): Promise<EmployeeRecord> {
    await this.requireTenant(tenantId);
    await this.requireCompany(tenantId, companyId);
    await this.requirePerson(tenantId, personId);

    if (code) {
      const existing = await this.prisma.employee.findFirst({ where: { tenantId, code } });
      if (existing) {
        throw new ConflictException(`employee code ${code} already exists in tenant ${tenantId}`);
      }
    }

    const now = new Date();
    const employee = await this.prisma.$transaction(async (tx) => {
      const created = await tx.employee.create({
        data: {
          tenantId,
          companyId,
          personId,
          code,
        },
      });

      await tx.auditEvent.create({
        data: this.auditData(tenantId, 'employee.created', 'employee', created.id, { companyId, personId, code }, now),
      });

      return created;
    });

    return this.toEmployeeRecord(employee);
  }

  async createRecruitmentVacancyRequest(
    tenantId: string,
    payload: {
      companyId?: string;
      code: string;
      title: string;
      department?: string;
      headcount?: number;
      notes?: string;
    },
    actor?: string,
  ): Promise<RecruitmentVacancyRequestRecord> {
    await this.requireTenant(tenantId);
    if (payload.companyId) {
      await this.requireCompany(tenantId, payload.companyId);
    }

    const existing = await this.prisma.recruitmentVacancyRequest.findUnique({
      where: {
        tenantId_code: {
          tenantId,
          code: payload.code,
        },
      },
    });
    if (existing) {
      throw new ConflictException(`recruitment vacancy request code ${payload.code} already exists`);
    }

    const now = new Date();
    const created = await this.prisma.recruitmentVacancyRequest.create({
      data: {
        tenantId,
        companyId: payload.companyId ?? null,
        code: payload.code,
        title: payload.title,
        department: payload.department ?? null,
        headcount: payload.headcount ?? 1,
        notes: payload.notes ?? null,
      },
    });

    await this.prisma.auditEvent.create({
      data: this.auditData(
        tenantId,
        'recruitment.vacancy_request.created',
        'recruitmentVacancyRequest',
        created.id,
        {
          companyId: created.companyId ?? undefined,
          code: created.code,
          title: created.title,
          headcount: String(created.headcount),
          actor,
        },
        now,
      ),
    });

    return this.toRecruitmentVacancyRequestRecord(created);
  }

  async listRecruitmentVacancyRequests(tenantId: string): Promise<RecruitmentVacancyRequestRecord[]> {
    await this.requireTenant(tenantId);
    const requests = await this.prisma.recruitmentVacancyRequest.findMany({
      where: { tenantId },
      orderBy: [{ createdAt: 'desc' }],
    });

    return requests.map((request) => this.toRecruitmentVacancyRequestRecord(request));
  }

  async approveRecruitmentVacancyRequest(
    tenantId: string,
    vacancyRequestId: string,
    actor?: string,
  ): Promise<RecruitmentVacancyRequestRecord> {
    await this.requireTenant(tenantId);
    const current = await this.requireRecruitmentVacancyRequest(tenantId, vacancyRequestId);

    if (current.status !== 'draft') {
      throw new ConflictException(`recruitment vacancy request ${vacancyRequestId} is already ${current.status}`);
    }

    const now = new Date();
    const updated = await this.prisma.recruitmentVacancyRequest.update({
      where: { id: vacancyRequestId },
      data: {
        status: 'approved',
        approvedBy: actor ?? null,
        approvedAt: now,
      },
    });

    await this.prisma.auditEvent.create({
      data: this.auditData(
        tenantId,
        'recruitment.vacancy_request.approved',
        'recruitmentVacancyRequest',
        updated.id,
        { status: updated.status, approvedBy: actor },
        now,
      ),
    });

    return this.toRecruitmentVacancyRequestRecord(updated);
  }

  async publishRecruitmentVacancyRequest(
    tenantId: string,
    vacancyRequestId: string,
    actor?: string,
  ): Promise<RecruitmentVacancyRequestRecord> {
    await this.requireTenant(tenantId);
    const current = await this.requireRecruitmentVacancyRequest(tenantId, vacancyRequestId);

    if (current.status !== 'approved') {
      throw new ConflictException(`recruitment vacancy request ${vacancyRequestId} must be approved before publishing`);
    }

    const now = new Date();
    const updated = await this.prisma.recruitmentVacancyRequest.update({
      where: { id: vacancyRequestId },
      data: {
        status: 'published',
        publishedBy: actor ?? null,
        publishedAt: now,
      },
    });

    await this.prisma.auditEvent.create({
      data: this.auditData(
        tenantId,
        'recruitment.vacancy_request.published',
        'recruitmentVacancyRequest',
        updated.id,
        { status: updated.status, publishedBy: actor },
        now,
      ),
    });

    return this.toRecruitmentVacancyRequestRecord(updated);
  }

  async createRecruitmentCandidate(
    tenantId: string,
    vacancyRequestId: string,
    payload: {
      fullName: string;
      email?: string;
      phone?: string;
      source?: string;
      stage?: string;
      notes?: string;
    },
    actor?: string,
  ): Promise<RecruitmentCandidateRecord> {
    await this.requireTenant(tenantId);
    const vacancyRequest = await this.requireRecruitmentVacancyRequest(tenantId, vacancyRequestId);

    if (!['approved', 'published'].includes(vacancyRequest.status)) {
      throw new ConflictException(
        `recruitment vacancy request ${vacancyRequestId} must be approved or published before adding candidates`,
      );
    }

    const now = new Date();
    const created = await this.prisma.recruitmentCandidate.create({
      data: {
        tenantId,
        companyId: vacancyRequest.companyId,
        vacancyRequestId,
        fullName: payload.fullName,
        email: payload.email ?? null,
        phone: payload.phone ?? null,
        source: payload.source ?? null,
        stage: payload.stage ?? 'applied',
        status: 'active',
        notes: payload.notes ?? null,
      },
    });

    await this.prisma.auditEvent.create({
      data: this.auditData(
        tenantId,
        'recruitment.candidate.created',
        'recruitmentCandidate',
        created.id,
        {
          vacancyRequestId,
          fullName: created.fullName,
          stage: created.stage,
          actor,
        },
        now,
      ),
    });

    return this.toRecruitmentCandidateRecord(created);
  }

  async listRecruitmentCandidates(
    tenantId: string,
    vacancyRequestId: string,
  ): Promise<RecruitmentCandidateRecord[]> {
    await this.requireTenant(tenantId);
    await this.requireRecruitmentVacancyRequest(tenantId, vacancyRequestId);
    const candidates = await this.prisma.recruitmentCandidate.findMany({
      where: { tenantId, vacancyRequestId },
      orderBy: [{ createdAt: 'asc' }],
    });

    return candidates.map((candidate) => this.toRecruitmentCandidateRecord(candidate));
  }

  async moveRecruitmentCandidate(
    tenantId: string,
    candidateId: string,
    payload: {
      stage: string;
      notes?: string;
    },
    actor?: string,
  ): Promise<RecruitmentCandidateRecord> {
    await this.requireTenant(tenantId);
    const current = await this.requireRecruitmentCandidate(tenantId, candidateId);

    const status = payload.stage === 'hired' ? 'hired' : payload.stage === 'rejected' ? 'rejected' : 'active';
    const now = new Date();
    const updated = await this.prisma.recruitmentCandidate.update({
      where: { id: candidateId },
      data: {
        stage: payload.stage,
        status,
        movedBy: actor ?? null,
        movedAt: now,
        notes: payload.notes ?? current.notes,
      },
    });

    await this.prisma.auditEvent.create({
      data: this.auditData(
        tenantId,
        'recruitment.candidate.moved',
        'recruitmentCandidate',
        updated.id,
        {
          fromStage: current.stage,
          toStage: updated.stage,
          status: updated.status,
          actor,
        },
        now,
      ),
    });

    return this.toRecruitmentCandidateRecord(updated);
  }

  async scheduleRecruitmentInterview(
    tenantId: string,
    vacancyRequestId: string,
    candidateId: string,
    payload: {
      scheduledAt: string;
      interviewerName?: string;
      location?: string;
      notes?: string;
    },
    actor?: string,
  ): Promise<RecruitmentInterviewRecord> {
    await this.requireTenant(tenantId);
    const vacancyRequest = await this.requireRecruitmentVacancyRequest(tenantId, vacancyRequestId);
    const candidate = await this.requireRecruitmentCandidate(tenantId, candidateId);

    if (candidate.vacancyRequestId !== vacancyRequest.id) {
      throw new ConflictException('candidate does not belong to the provided vacancy request');
    }
    if (!['approved', 'published'].includes(vacancyRequest.status)) {
      throw new ConflictException(`recruitment vacancy request ${vacancyRequestId} must be approved or published before scheduling interviews`);
    }

    const scheduledAt = new Date(payload.scheduledAt);
    if (Number.isNaN(scheduledAt.getTime())) {
      throw new ConflictException('invalid recruitment interview scheduledAt');
    }

    const now = new Date();
    const interview = await this.prisma.$transaction(async (tx) => {
      const created = await tx.recruitmentInterview.create({
        data: {
          tenantId,
          companyId: vacancyRequest.companyId ?? null,
          vacancyRequestId,
          candidateId,
          scheduledAt,
          interviewerName: payload.interviewerName ?? null,
          location: payload.location ?? null,
          notes: payload.notes ?? null,
        },
      });

      await tx.recruitmentCandidate.update({
        where: { id: candidateId },
        data: {
          stage: 'interview',
          movedBy: actor ?? null,
          movedAt: now,
        },
      });

      await tx.auditEvent.create({
        data: this.auditData(
          tenantId,
          'recruitment.interview.scheduled',
          'recruitmentInterview',
          created.id,
          {
            vacancyRequestId,
            candidateId,
            scheduledAt: created.scheduledAt.toISOString(),
            interviewerName: created.interviewerName ?? undefined,
            actor,
          },
          now,
        ),
      });

      return created;
    });

    return this.toRecruitmentInterviewRecord(interview);
  }

  async listRecruitmentInterviews(
    tenantId: string,
    vacancyRequestId: string,
  ): Promise<RecruitmentInterviewRecord[]> {
    await this.requireTenant(tenantId);
    await this.requireRecruitmentVacancyRequest(tenantId, vacancyRequestId);
    const interviews = await this.prisma.recruitmentInterview.findMany({
      where: { tenantId, vacancyRequestId },
      orderBy: [{ scheduledAt: 'asc' }, { createdAt: 'asc' }],
    });

    return interviews.map((interview) => this.toRecruitmentInterviewRecord(interview));
  }

  async recordRecruitmentCandidateEvaluation(
    tenantId: string,
    interviewId: string,
    payload: {
      score: number;
      recommendation: string;
      evaluatorName?: string;
      notes?: string;
      evaluatedAt?: string;
    },
    actor?: string,
  ): Promise<RecruitmentCandidateEvaluationRecord> {
    await this.requireTenant(tenantId);
    const interview = await this.prisma.recruitmentInterview.findFirst({
      where: { id: interviewId, tenantId },
    });
    if (!interview) {
      throw new NotFoundException(`recruitment interview ${interviewId} not found`);
    }
    const candidate = await this.requireRecruitmentCandidate(tenantId, interview.candidateId);
    if (candidate.vacancyRequestId !== interview.vacancyRequestId) {
      throw new ConflictException('candidate and interview are not aligned to the same vacancy request');
    }

    const evaluatedAt = payload.evaluatedAt ? new Date(payload.evaluatedAt) : new Date();
    if (Number.isNaN(evaluatedAt.getTime())) {
      throw new ConflictException('invalid recruitment candidate evaluation evaluatedAt');
    }

    const now = new Date();
    const evaluation = await this.prisma.$transaction(async (tx) => {
      const created = await tx.recruitmentCandidateEvaluation.create({
        data: {
          tenantId,
          companyId: interview.companyId ?? null,
          vacancyRequestId: interview.vacancyRequestId,
          candidateId: interview.candidateId,
          interviewId: interview.id,
          evaluatorName: payload.evaluatorName ?? null,
          score: payload.score,
          recommendation: payload.recommendation,
          evaluatedAt,
          notes: payload.notes ?? null,
        },
      });

      await tx.recruitmentInterview.update({
        where: { id: interview.id },
        data: {
          status: 'completed',
          completedAt: evaluatedAt,
        },
      });

      await tx.recruitmentCandidate.update({
        where: { id: interview.candidateId },
        data: {
          stage: 'evaluated',
          movedBy: actor ?? null,
          movedAt: now,
        },
      });

      await tx.auditEvent.create({
        data: this.auditData(
          tenantId,
          'recruitment.candidate.evaluated',
          'recruitmentCandidateEvaluation',
          created.id,
          {
            interviewId: interview.id,
            candidateId: interview.candidateId,
            score: String(created.score),
            recommendation: created.recommendation,
            actor,
          },
          now,
        ),
      });

      return created;
    });

    return this.toRecruitmentCandidateEvaluationRecord(evaluation);
  }

  async listRecruitmentCandidateEvaluations(
    tenantId: string,
    vacancyRequestId: string,
  ): Promise<RecruitmentCandidateEvaluationRecord[]> {
    await this.requireTenant(tenantId);
    await this.requireRecruitmentVacancyRequest(tenantId, vacancyRequestId);
    const evaluations = await this.prisma.recruitmentCandidateEvaluation.findMany({
      where: { tenantId, vacancyRequestId },
      orderBy: [{ evaluatedAt: 'asc' }, { createdAt: 'asc' }],
    });

    return evaluations.map((evaluation) => this.toRecruitmentCandidateEvaluationRecord(evaluation));
  }

  async createRecruitmentProposal(
    tenantId: string,
    vacancyRequestId: string,
    candidateId: string,
    payload: {
      salaryBaseCents?: number;
      startAt?: string;
      notes?: string;
    },
    actor?: string,
  ): Promise<RecruitmentProposalRecord> {
    await this.requireTenant(tenantId);
    const vacancyRequest = await this.requireRecruitmentVacancyRequest(tenantId, vacancyRequestId);
    const candidate = await this.requireRecruitmentCandidate(tenantId, candidateId);

    if (candidate.vacancyRequestId !== vacancyRequest.id) {
      throw new ConflictException('candidate does not belong to the provided vacancy request');
    }
    if (candidate.status === 'rejected') {
      throw new ConflictException(`candidate ${candidateId} is rejected`);
    }
    if (!['approved', 'published'].includes(vacancyRequest.status)) {
      throw new ConflictException(`recruitment vacancy request ${vacancyRequestId} must be approved or published before proposing`);
    }

    const existing = await this.prisma.recruitmentProposal.findUnique({
      where: {
        tenantId_candidateId: {
          tenantId,
          candidateId,
        },
      },
    });
    if (existing) {
      throw new ConflictException(`recruitment proposal already exists for candidate ${candidateId}`);
    }

    const startAt = payload.startAt ? new Date(payload.startAt) : undefined;
    if (startAt && Number.isNaN(startAt.getTime())) {
      throw new ConflictException('invalid recruitment proposal startAt');
    }

    const now = new Date();
    const created = await this.prisma.recruitmentProposal.create({
      data: {
        tenantId,
        companyId: vacancyRequest.companyId,
        vacancyRequestId,
        candidateId,
        salaryBaseCents: payload.salaryBaseCents ?? null,
        startAt: startAt ?? null,
        notes: payload.notes ?? null,
      },
    });

    await this.prisma.auditEvent.create({
      data: this.auditData(
        tenantId,
        'recruitment.proposal.created',
        'recruitmentProposal',
        created.id,
        {
          vacancyRequestId,
          candidateId,
          salaryBaseCents: created.salaryBaseCents === null ? undefined : String(created.salaryBaseCents),
          startAt: created.startAt?.toISOString(),
          actor,
        },
        now,
      ),
    });

    return this.toRecruitmentProposalRecord(created);
  }

  async listRecruitmentProposals(
    tenantId: string,
    vacancyRequestId: string,
  ): Promise<RecruitmentProposalRecord[]> {
    await this.requireTenant(tenantId);
    await this.requireRecruitmentVacancyRequest(tenantId, vacancyRequestId);
    const proposals = await this.prisma.recruitmentProposal.findMany({
      where: { tenantId, vacancyRequestId },
      orderBy: [{ createdAt: 'asc' }],
    });

    return proposals.map((proposal) => this.toRecruitmentProposalRecord(proposal));
  }

  async convertRecruitmentProposalToPreAdmission(
    tenantId: string,
    proposalId: string,
    payload: {
      personCpf?: string;
      employeeCode?: string;
      effectiveFrom: string;
      notes?: string;
    },
    actor?: string,
  ): Promise<{
    proposal: RecruitmentProposalRecord;
    admission: AdmissionRecord;
    person: PersonRecord;
    employee: EmployeeRecord;
  }> {
    await this.requireTenant(tenantId);
    const proposal = await this.prisma.recruitmentProposal.findFirst({
      where: { id: proposalId, tenantId },
      include: {
        candidate: true,
        vacancyRequest: true,
      },
    });
    if (!proposal) {
      throw new NotFoundException(`recruitment proposal ${proposalId} not found`);
    }
    if (proposal.status === 'converted') {
      throw new ConflictException(`recruitment proposal ${proposalId} is already converted`);
    }
    if (!proposal.companyId && !proposal.vacancyRequest.companyId) {
      throw new ConflictException('recruitment proposal must be associated with a company before conversion');
    }
    if (proposal.candidate.vacancyRequestId !== proposal.vacancyRequestId) {
      throw new ConflictException('proposal candidate does not belong to the vacancy request');
    }
    if (!['approved', 'published'].includes(proposal.vacancyRequest.status)) {
      throw new ConflictException(`recruitment vacancy request ${proposal.vacancyRequestId} must be approved or published before conversion`);
    }

    const effectiveFrom = new Date(payload.effectiveFrom);
    if (Number.isNaN(effectiveFrom.getTime())) {
      throw new ConflictException('invalid recruitment proposal effectiveFrom');
    }

    const now = new Date();
    const companyId = proposal.companyId ?? proposal.vacancyRequest.companyId;
    const person = await this.prisma.person.create({
      data: {
        tenantId,
        fullName: proposal.candidate.fullName,
        cpf: payload.personCpf ?? null,
      },
    });

    const employee = await this.prisma.employee.create({
      data: {
        tenantId,
        companyId: companyId!,
        personId: person.id,
        code: payload.employeeCode ?? undefined,
      },
    });

    const admission = await this.prisma.$transaction(async (tx) => {
      const createdAdmission = await tx.admissionRequest.create({
        data: {
          tenantId,
          sourceCandidateId: proposal.candidateId,
          sourceProposalId: proposal.id,
          personId: person.id,
          companyId: employee.companyId,
          employeeId: employee.id,
          status: 'draft',
          requestedBy: actor,
          requestedAt: now,
        },
      });

      await tx.admissionHistory.create({
        data: {
          tenantId,
          admissionRequestId: createdAdmission.id,
          eventType: 'admission.created_from_ats',
          fromStatus: undefined,
          toStatus: 'draft',
          actor,
          occurredAt: now,
          details: {
            sourceCandidateId: proposal.candidateId,
            sourceProposalId: proposal.id,
            effectiveFrom: effectiveFrom.toISOString(),
          },
        },
      });

      await tx.admissionChecklistItem.createMany({
        data: ADMISSION_CHECKLIST_TEMPLATE.map((item) => ({
          tenantId,
          admissionRequestId: createdAdmission.id,
          code: item.code,
          label: item.label,
          status: 'pending',
        })),
      });

      await tx.recruitmentProposal.update({
        where: { id: proposal.id },
        data: {
          status: 'converted',
          convertedAt: now,
          convertedBy: actor ?? null,
          admissionRequestId: createdAdmission.id,
        },
      });

      await tx.auditEvent.create({
        data: this.auditData(
          tenantId,
          'recruitment.proposal.converted',
          'recruitmentProposal',
          proposal.id,
          {
            candidateId: proposal.candidateId,
            admissionRequestId: createdAdmission.id,
            employeeId: employee.id,
            actor,
          },
          now,
        ),
      });

      return createdAdmission;
    });

    return {
      proposal: this.toRecruitmentProposalRecord({
        ...proposal,
        salaryBaseCents: proposal.salaryBaseCents,
        startAt: proposal.startAt,
        status: 'converted',
        convertedAt: now,
        convertedBy: actor ?? null,
        admissionRequestId: admission.id,
        createdAt: proposal.createdAt,
        updatedAt: proposal.updatedAt,
      }),
      admission: this.toAdmissionRecord(admission),
      person: this.toPersonRecord(person),
      employee: this.toEmployeeRecord(employee),
    };
  }

  async createAdmission(
    tenantId: string,
    personId: string,
    companyId: string,
    employeeId: string,
    requestedBy?: string,
  ): Promise<AdmissionRecord> {
    await this.requireTenant(tenantId);
    const [person, company, employee] = await Promise.all([
      this.requirePerson(tenantId, personId),
      this.requireCompany(tenantId, companyId),
      this.requireEmployee(tenantId, employeeId),
    ]);

    if (employee.companyId !== company.id || employee.personId !== person.id) {
      throw new ConflictException('employee does not match the provided person and company');
    }

    const now = new Date();
    const admission = await this.prisma.$transaction(async (tx) => {
      const created = await tx.admissionRequest.create({
        data: {
          tenantId,
          personId,
          companyId,
          employeeId,
          status: 'draft',
          requestedBy,
          requestedAt: now,
        },
      });

      await tx.admissionHistory.create({
        data: {
          tenantId,
          admissionRequestId: created.id,
          eventType: 'admission.created',
          fromStatus: undefined,
          toStatus: 'draft',
          actor: requestedBy,
          occurredAt: now,
          details: {
            personId,
            companyId,
            employeeId,
            status: 'draft',
          },
        },
      });

      await tx.auditEvent.create({
        data: this.auditData(
          tenantId,
          'admission.created',
          'admissionRequest',
          created.id,
          { personId, companyId, employeeId, status: 'draft', requestedBy },
          now,
        ),
      });

      await tx.admissionChecklistItem.createMany({
        data: ADMISSION_CHECKLIST_TEMPLATE.map((item) => ({
          tenantId,
          admissionRequestId: created.id,
          code: item.code,
          label: item.label,
          status: 'pending',
        })),
      });

      return created;
    });

    return this.toAdmissionRecord(admission);
  }

  async listAdmissions(tenantId: string): Promise<AdmissionRecord[]> {
    await this.requireTenant(tenantId);
    const admissions = await this.prisma.admissionRequest.findMany({
      where: { tenantId },
      orderBy: { createdAt: 'asc' },
    });

    return admissions.map((admission) => this.toAdmissionRecord(admission));
  }

  async getAdmission(tenantId: string, admissionId: string): Promise<AdmissionWithHistoryRecord> {
    await this.requireTenant(tenantId);
    const admission = await this.prisma.admissionRequest.findFirst({
      where: { id: admissionId, tenantId },
      include: {
        history: {
          orderBy: { occurredAt: 'asc' },
        },
        contract: true,
        documents: {
          orderBy: { generatedAt: 'asc' },
        },
      },
    });

    if (!admission) {
      throw new NotFoundException(`admission ${admissionId} not found`);
    }

    return {
      ...this.toAdmissionRecord(admission),
      history: admission.history.map((entry) => this.toAdmissionHistoryRecord(entry)),
      contract: admission.contract ? this.toAdmissionContractRecord(admission.contract) : undefined,
      documents: admission.documents.map((document) => this.toAdmissionDocumentRecord(document)),
    };
  }

  async cancelAdmission(tenantId: string, admissionId: string, actor?: string): Promise<AdmissionRecord> {
    await this.requireTenant(tenantId);
    const current = await this.requireAdmission(tenantId, admissionId);

    if (current.status === 'cancelled') {
      throw new ConflictException(`admission ${admissionId} is already cancelled`);
    }

    const now = new Date();
    const admission = await this.prisma.$transaction(async (tx) => {
      const updated = await tx.admissionRequest.update({
        where: { id: admissionId },
        data: {
          status: 'cancelled',
        },
      });

      await tx.admissionHistory.create({
        data: {
          tenantId,
          admissionRequestId: updated.id,
          eventType: 'admission.cancelled',
          fromStatus: current.status,
          toStatus: 'cancelled',
          actor,
          occurredAt: now,
          details: {
            admissionId: updated.id,
            status: 'cancelled',
          },
        },
      });

      await tx.auditEvent.create({
        data: this.auditData(
          tenantId,
          'admission.cancelled',
          'admissionRequest',
          updated.id,
          { admissionId: updated.id, fromStatus: current.status, toStatus: 'cancelled', actor },
          now,
        ),
      });

      return updated;
    });

    return this.toAdmissionRecord(admission);
  }

  async listAdmissionChecklist(tenantId: string, admissionId: string): Promise<AdmissionChecklistItemRecord[]> {
    await this.requireTenant(tenantId);
    await this.requireAdmission(tenantId, admissionId);
    const checklist = await this.prisma.admissionChecklistItem.findMany({
      where: { tenantId, admissionRequestId: admissionId },
      orderBy: { createdAt: 'asc' },
    });

    return checklist.map((item) => this.toAdmissionChecklistItemRecord(item));
  }

  async receiveAdmissionChecklistItem(
    tenantId: string,
    admissionId: string,
    checklistItemId: string,
    actor?: string,
  ): Promise<AdmissionChecklistItemRecord> {
    await this.requireTenant(tenantId);
    const admission = await this.requireAdmission(tenantId, admissionId);
    if (admission.status === 'cancelled') {
      throw new ConflictException(`admission ${admissionId} is cancelled`);
    }

    const item = await this.prisma.admissionChecklistItem.findFirst({
      where: {
        id: checklistItemId,
        tenantId,
        admissionRequestId: admissionId,
      },
    });

    if (!item) {
      throw new NotFoundException(`checklist item ${checklistItemId} not found`);
    }

    if (item.status === 'received') {
      throw new ConflictException(`checklist item ${checklistItemId} already received`);
    }

    const now = new Date();
    const updatedItem = await this.prisma.$transaction(async (tx) => {
      const received = await tx.admissionChecklistItem.update({
        where: { id: checklistItemId },
        data: {
          status: 'received',
          receivedBy: actor,
          receivedAt: now,
        },
      });

      await tx.admissionHistory.create({
        data: {
          tenantId,
          admissionRequestId: admissionId,
          eventType: 'admission.checklist.received',
          fromStatus: admission.status,
          toStatus: admission.status,
          actor,
          occurredAt: now,
          details: {
            checklistItemId: received.id,
            code: received.code,
            status: 'received',
          },
        },
      });

      await tx.auditEvent.create({
        data: this.auditData(
          tenantId,
          'admission.checklist.received',
          'admissionChecklistItem',
          received.id,
          {
            admissionId,
            checklistItemId: received.id,
            code: received.code,
            status: 'received',
            actor,
          },
          now,
        ),
      });

      const pendingCount = await tx.admissionChecklistItem.count({
        where: {
          tenantId,
          admissionRequestId: admissionId,
          status: { not: 'received' },
        },
      });

      if (pendingCount === 0 && admission.status !== 'under_review') {
        const previousStatus = admission.status;
        await tx.admissionRequest.update({
          where: { id: admissionId },
          data: {
            status: 'under_review',
          },
        });

        await tx.admissionHistory.create({
          data: {
            tenantId,
            admissionRequestId: admissionId,
            eventType: 'admission.ready_for_contract',
            fromStatus: previousStatus,
            toStatus: 'under_review',
            actor,
            occurredAt: now,
            details: {
              admissionId,
              status: 'under_review',
              pendingCount: '0',
            },
          },
        });

        await tx.auditEvent.create({
          data: this.auditData(
            tenantId,
            'admission.ready_for_contract',
            'admissionRequest',
            admissionId,
            { admissionId, fromStatus: previousStatus, toStatus: 'under_review', pendingCount: '0', actor },
            now,
          ),
        });
      } else if (pendingCount > 0 && admission.status === 'draft') {
        await tx.admissionRequest.update({
          where: { id: admissionId },
          data: {
            status: 'pending_documents',
          },
        });

        await tx.admissionHistory.create({
          data: {
            tenantId,
            admissionRequestId: admissionId,
            eventType: 'admission.pending_documents',
            fromStatus: admission.status,
            toStatus: 'pending_documents',
            actor,
            occurredAt: now,
            details: {
              admissionId,
              status: 'pending_documents',
              pendingCount: String(pendingCount),
            },
          },
        });

        await tx.auditEvent.create({
          data: this.auditData(
            tenantId,
            'admission.pending_documents',
            'admissionRequest',
            admissionId,
            { admissionId, fromStatus: admission.status, toStatus: 'pending_documents', pendingCount: String(pendingCount), actor },
            now,
          ),
        });
      }

      return received;
    });

    return this.toAdmissionChecklistItemRecord(updatedItem);
  }

  async formalizeAdmissionContract(
    tenantId: string,
    admissionId: string,
    contractType: string,
    effectiveFrom: string,
    actor?: string,
    notes?: string,
  ): Promise<AdmissionContractRecord> {
    await this.requireTenant(tenantId);
    const admission = await this.requireAdmission(tenantId, admissionId);
    if (admission.status === 'cancelled') {
      throw new ConflictException(`admission ${admissionId} is cancelled`);
    }

    if (admission.status !== 'under_review') {
      throw new ConflictException(`admission ${admissionId} is not ready for contract formalization`);
    }

    const existing = await this.prisma.admissionContract.findUnique({
      where: { admissionRequestId: admissionId },
    });
    if (existing) {
      throw new ConflictException(`admission ${admissionId} already has a formalized contract`);
    }

    const now = new Date();
    const effectiveFromDate = new Date(effectiveFrom);
    if (Number.isNaN(effectiveFromDate.getTime())) {
      throw new ConflictException(`invalid effectiveFrom ${effectiveFrom}`);
    }

    const contract = await this.prisma.$transaction(async (tx) => {
      const created = await tx.admissionContract.create({
        data: {
          tenantId,
          admissionRequestId: admissionId,
          contractType,
          effectiveFrom: effectiveFromDate,
          notes,
          createdBy: actor,
        },
      });

      await tx.admissionRequest.update({
        where: { id: admissionId },
        data: {
          status: 'completed',
        },
      });

      await tx.admissionHistory.create({
        data: {
          tenantId,
          admissionRequestId: admissionId,
          eventType: 'admission.contract.formalized',
          fromStatus: admission.status,
          toStatus: 'completed',
          actor,
          occurredAt: now,
          details: {
            admissionId,
            contractId: created.id,
            contractType,
            effectiveFrom: effectiveFromDate.toISOString(),
            fromStatus: admission.status,
            toStatus: 'completed',
            notes,
          },
        },
      });

      await tx.auditEvent.create({
        data: this.auditData(
          tenantId,
          'admission.contract.formalized',
          'admissionContract',
          created.id,
          { admissionId, contractType, effectiveFrom: effectiveFromDate.toISOString(), actor, notes },
          now,
        ),
      });

      await tx.admissionDocument.upsert({
        where: {
          admissionRequestId_documentType: {
            admissionRequestId: admissionId,
            documentType: 'admission_contract_snapshot',
          },
        },
        create: {
          tenantId,
          admissionRequestId: admissionId,
          admissionContractId: created.id,
          documentType: 'admission_contract_snapshot',
          title: 'Contrato de admissao',
          status: 'generated',
          signedBy: null,
          signedAt: null,
          signatureMethod: null,
          content: {
            admissionId,
            contractId: created.id,
            companyId: admission.companyId,
            personId: admission.personId,
            employeeId: admission.employeeId,
            contractType,
            effectiveFrom: effectiveFromDate.toISOString(),
            notes,
            generatedAt: now.toISOString(),
            generatedBy: actor,
          } as Prisma.InputJsonValue,
          generatedBy: actor,
          generatedAt: now,
        },
        update: {
          admissionContractId: created.id,
          title: 'Contrato de admissao',
          status: 'generated',
          signedBy: null,
          signedAt: null,
          signatureMethod: null,
          content: {
            admissionId,
            contractId: created.id,
            companyId: admission.companyId,
            personId: admission.personId,
            employeeId: admission.employeeId,
            contractType,
            effectiveFrom: effectiveFromDate.toISOString(),
            notes,
            generatedAt: now.toISOString(),
            generatedBy: actor,
          } as Prisma.InputJsonValue,
          generatedBy: actor,
          generatedAt: now,
        },
      });

      await tx.admissionHistory.create({
        data: {
          tenantId,
          admissionRequestId: admissionId,
          eventType: 'admission.document.generated',
          fromStatus: 'under_review',
          toStatus: 'completed',
          actor,
          occurredAt: now,
          details: {
            admissionId,
            documentType: 'admission_contract_snapshot',
            status: 'generated',
          },
        },
      });

      return created;
    });

    return this.toAdmissionContractRecord(contract);
  }

  async getAdmissionContract(tenantId: string, admissionId: string): Promise<AdmissionContractRecord> {
    await this.requireTenant(tenantId);
    const contract = await this.prisma.admissionContract.findFirst({
      where: { tenantId, admissionRequestId: admissionId },
    });

    if (!contract) {
      throw new NotFoundException(`admission contract for ${admissionId} not found`);
    }

    return this.toAdmissionContractRecord(contract);
  }

  async listAdmissionDocuments(tenantId: string, admissionId: string): Promise<AdmissionDocumentRecord[]> {
    await this.requireTenant(tenantId);
    await this.requireAdmission(tenantId, admissionId);
    const documents = await this.prisma.admissionDocument.findMany({
      where: { tenantId, admissionRequestId: admissionId },
      orderBy: { generatedAt: 'asc' },
    });

    return documents.map((document) => this.toAdmissionDocumentRecord(document));
  }

  async upsertAdmissionDocument(
    tenantId: string,
    admissionId: string,
    payload: {
      documentType: string;
      title: string;
      content?: Record<string, unknown>;
    },
    actor?: string,
  ): Promise<AdmissionDocumentRecord> {
    await this.requireTenant(tenantId);
    const admission = await this.requireAdmission(tenantId, admissionId);
    if (admission.status === 'cancelled') {
      throw new ConflictException(`admission ${admissionId} is cancelled`);
    }

    const contract = await this.prisma.admissionContract.findUnique({
      where: { admissionRequestId: admissionId },
    });

    const now = new Date();
    const content = {
      admissionId,
      companyId: admission.companyId,
      personId: admission.personId,
      employeeId: admission.employeeId,
      documentType: payload.documentType,
      title: payload.title,
      generatedAt: now.toISOString(),
      generatedBy: actor,
      ...(payload.content ?? {}),
    };

    const document = await this.prisma.$transaction(async (tx) => {
      const created = await tx.admissionDocument.upsert({
        where: {
          admissionRequestId_documentType: {
            admissionRequestId: admissionId,
            documentType: payload.documentType,
          },
        },
        create: {
          tenantId,
          admissionRequestId: admissionId,
          admissionContractId: contract?.id ?? null,
          documentType: payload.documentType,
          title: payload.title,
          status: 'generated',
          signedBy: null,
          signedAt: null,
          signatureMethod: null,
          content: content as Prisma.InputJsonValue,
          generatedBy: actor,
          generatedAt: now,
        },
        update: {
          admissionContractId: contract?.id ?? null,
          title: payload.title,
          status: 'generated',
          signedBy: null,
          signedAt: null,
          signatureMethod: null,
          content: content as Prisma.InputJsonValue,
          generatedBy: actor,
          generatedAt: now,
        },
      });

      await tx.admissionHistory.create({
        data: {
          tenantId,
          admissionRequestId: admissionId,
          eventType: 'admission.document.generated',
          fromStatus: admission.status,
          toStatus: admission.status,
          actor,
          occurredAt: now,
          details: {
            admissionId,
            documentId: created.id,
            documentType: created.documentType,
            status: created.status,
          },
        },
      });

      await tx.auditEvent.create({
        data: this.auditData(
          tenantId,
          'admission.document.generated',
          'admissionDocument',
          created.id,
          {
            admissionId,
            documentId: created.id,
            documentType: created.documentType,
            status: created.status,
            actor,
          },
          now,
        ),
      });

      return created;
    });

    return this.toAdmissionDocumentRecord(document);
  }

  async signAdmissionDocument(
    tenantId: string,
    admissionId: string,
    documentId: string,
    signatureMethod: string | undefined,
    actor?: string,
  ): Promise<AdmissionDocumentRecord> {
    await this.requireTenant(tenantId);
    const admission = await this.requireAdmission(tenantId, admissionId);
    if (admission.status === 'cancelled') {
      throw new ConflictException(`admission ${admissionId} is cancelled`);
    }

    const method = signatureMethod ?? 'govbr_advanced';
    if (!RESCISSION_SIGNATURE_METHODS.includes(method as (typeof RESCISSION_SIGNATURE_METHODS)[number])) {
      throw new ConflictException(`unsupported signature method ${method}`);
    }

    const current = await this.prisma.admissionDocument.findFirst({
      where: {
        id: documentId,
        tenantId,
        admissionRequestId: admissionId,
      },
    });

    if (!current) {
      throw new NotFoundException(`admission document ${documentId} not found`);
    }

    if (current.status === 'signed') {
      throw new ConflictException(`admission document ${documentId} is already signed`);
    }

    const now = new Date();
    const updated = await this.prisma.$transaction(async (tx) => {
      const record = await tx.admissionDocument.update({
        where: { id: documentId },
        data: {
          status: 'signed',
          signedBy: actor ?? null,
          signedAt: now,
          signatureMethod: method,
        },
      });

      await tx.admissionHistory.create({
        data: {
          tenantId,
          admissionRequestId: admissionId,
          eventType: 'admission.document.signed',
          fromStatus: admission.status,
          toStatus: admission.status,
          actor,
          occurredAt: now,
          details: {
            admissionId,
            documentId: record.id,
            documentType: record.documentType,
            status: 'signed',
            signatureMethod: method,
          },
        },
      });

      await tx.auditEvent.create({
        data: this.auditData(
          tenantId,
          'admission.document.signed',
          'admissionDocument',
          record.id,
          {
            admissionId,
            documentId: record.id,
            documentType: record.documentType,
            status: 'signed',
            signatureMethod: method,
            actor,
          },
          now,
        ),
      });

      return record;
    });

    return this.toAdmissionDocumentRecord(updated);
  }

  async listAdmissionEsocialTransmissions(
    tenantId: string,
    admissionId: string,
  ): Promise<AdmissionEsocialTransmissionRecord[]> {
    await this.requireTenant(tenantId);
    await this.requireAdmission(tenantId, admissionId);
    const transmissions = await this.prisma.admissionEsocialTransmission.findMany({
      where: { tenantId, admissionRequestId: admissionId },
      orderBy: { createdAt: 'asc' },
    });

    return transmissions.map((transmission) => this.toAdmissionEsocialTransmissionRecord(transmission));
  }

  async queueAdmissionEsocialTransmission(
    tenantId: string,
    admissionId: string,
    eventCode: string | undefined,
    actor?: string,
    notes?: string,
  ): Promise<AdmissionEsocialTransmissionRecord> {
    await this.requireTenant(tenantId);
    const admission = await this.requireAdmission(tenantId, admissionId);
    const contract = await this.prisma.admissionContract.findUnique({
      where: { admissionRequestId: admissionId },
    });

    const resolvedEventCode = eventCode ?? (contract && admission.status === 'completed' ? 'S-2200' : 'S-2190');

    if (resolvedEventCode === 'S-2200' && (!contract || admission.status !== 'completed')) {
      throw new ConflictException(`admission ${admissionId} is not ready for S-2200`);
    }

    if (resolvedEventCode === 'S-2190' && admission.status === 'completed') {
      throw new ConflictException(`admission ${admissionId} is already completed`);
    }

    if (resolvedEventCode !== 'S-2190' && resolvedEventCode !== 'S-2200') {
      throw new ConflictException(`unsupported eSocial event ${resolvedEventCode}`);
    }

    const existing = await this.prisma.admissionEsocialTransmission.findUnique({
      where: {
        admissionRequestId_eventCode: {
          admissionRequestId: admissionId,
          eventCode: resolvedEventCode,
        },
      },
    });

    const now = new Date();
    const payload = this.buildEsocialPayload(admission, contract, resolvedEventCode, actor, notes);

    const transmission = await this.prisma.$transaction(async (tx) => {
      if (existing) {
        const updated = await tx.admissionEsocialTransmission.update({
          where: { id: existing.id },
          data: {
            status: 'queued',
            payload,
            errorMessage: null,
            receiptNumber: null,
            response: Prisma.JsonNull,
            queuedAt: now,
            sentAt: null,
            processedAt: null,
            attempts: 0,
            admissionContractId: contract?.id ?? null,
          },
        });

        await tx.admissionHistory.create({
          data: {
            tenantId,
            admissionRequestId: admissionId,
            eventType: 'admission.esocial.queued',
            fromStatus: admission.status,
            toStatus: admission.status,
            actor,
            occurredAt: now,
            details: {
              admissionId,
              eventCode: resolvedEventCode,
              transmissionId: updated.id,
              status: 'queued',
              notes,
            },
          },
        });

        await tx.auditEvent.create({
          data: this.auditData(
            tenantId,
            'admission.esocial.queued',
            'admissionEsocialTransmission',
            updated.id,
            { admissionId, eventCode: resolvedEventCode, transmissionId: updated.id, status: 'queued', actor, notes },
            now,
          ),
        });

        return updated;
      }

      const created = await tx.admissionEsocialTransmission.create({
        data: {
          tenantId,
          admissionRequestId: admissionId,
          admissionContractId: contract?.id ?? null,
          eventCode: resolvedEventCode,
          status: 'queued',
          payload,
          queuedAt: now,
        },
      });

      await tx.admissionHistory.create({
        data: {
          tenantId,
          admissionRequestId: admissionId,
          eventType: 'admission.esocial.queued',
          fromStatus: admission.status,
          toStatus: admission.status,
          actor,
          occurredAt: now,
          details: {
            admissionId,
            eventCode: resolvedEventCode,
            transmissionId: created.id,
            status: 'queued',
            notes,
          },
        },
      });

      await tx.auditEvent.create({
        data: this.auditData(
          tenantId,
          'admission.esocial.queued',
          'admissionEsocialTransmission',
          created.id,
          { admissionId, eventCode: resolvedEventCode, transmissionId: created.id, status: 'queued', actor, notes },
          now,
        ),
      });

      return created;
    });

    try {
      await this.enqueueAdmissionEsocialTransmission(transmission.id);
      return this.toAdmissionEsocialTransmissionRecord(transmission);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      const failed = await this.markAdmissionEsocialTransmissionFailed(transmission.id, message);
      throw new ConflictException(`failed to enqueue eSocial transmission ${transmission.id}: ${message}`);
    }
  }

  async markAdmissionEsocialTransmissionSent(
    transmissionId: string,
    receiptNumber: string,
    response: Record<string, string | undefined>,
  ): Promise<AdmissionEsocialTransmissionRecord> {
    const existing = await this.prisma.admissionEsocialTransmission.findUnique({
      where: { id: transmissionId },
    });
    if (!existing) {
      throw new NotFoundException(`admission eSocial transmission ${transmissionId} not found`);
    }

    const now = new Date();
    const updated = await this.prisma.$transaction(async (tx) => {
      const record = await tx.admissionEsocialTransmission.update({
        where: { id: transmissionId },
        data: {
          status: 'sent',
          receiptNumber,
          response,
          sentAt: now,
          processedAt: now,
          attempts: existing.attempts + 1,
          errorMessage: null,
        },
      });

      await tx.admissionHistory.create({
        data: {
          tenantId: existing.tenantId,
          admissionRequestId: existing.admissionRequestId,
          eventType: 'admission.esocial.sent',
          fromStatus: existing.status,
          toStatus: 'sent',
          occurredAt: now,
          details: {
            admissionId: existing.admissionRequestId,
            transmissionId,
            eventCode: existing.eventCode,
            receiptNumber,
            status: 'sent',
          },
        },
      });

      await tx.auditEvent.create({
        data: this.auditData(
          existing.tenantId,
          'admission.esocial.sent',
          'admissionEsocialTransmission',
          transmissionId,
          { admissionId: existing.admissionRequestId, eventCode: existing.eventCode, receiptNumber, status: 'sent' },
          now,
        ),
      });

      return record;
    });

    return this.toAdmissionEsocialTransmissionRecord(updated);
  }

  async markAdmissionEsocialTransmissionFailed(
    transmissionId: string,
    errorMessage: string,
  ): Promise<AdmissionEsocialTransmissionRecord> {
    const existing = await this.prisma.admissionEsocialTransmission.findUnique({
      where: { id: transmissionId },
    });
    if (!existing) {
      throw new NotFoundException(`admission eSocial transmission ${transmissionId} not found`);
    }

    const now = new Date();
    const updated = await this.prisma.$transaction(async (tx) => {
      const record = await tx.admissionEsocialTransmission.update({
        where: { id: transmissionId },
        data: {
          status: 'failed',
          errorMessage,
          processedAt: now,
          attempts: existing.attempts + 1,
        },
      });

      await tx.admissionHistory.create({
        data: {
          tenantId: existing.tenantId,
          admissionRequestId: existing.admissionRequestId,
          eventType: 'admission.esocial.failed',
          fromStatus: existing.status,
          toStatus: 'failed',
          occurredAt: now,
          details: {
            admissionId: existing.admissionRequestId,
            transmissionId,
            eventCode: existing.eventCode,
            errorMessage,
            status: 'failed',
          },
        },
      });

      await tx.auditEvent.create({
        data: this.auditData(
          existing.tenantId,
          'admission.esocial.failed',
          'admissionEsocialTransmission',
          transmissionId,
          { admissionId: existing.admissionRequestId, eventCode: existing.eventCode, errorMessage, status: 'failed' },
          now,
        ),
      });

      return record;
    });

    return this.toAdmissionEsocialTransmissionRecord(updated);
  }

  async retryAdmissionEsocialTransmission(
    tenantId: string,
    transmissionId: string,
    actor?: string,
    notes?: string,
  ): Promise<AdmissionEsocialTransmissionRecord> {
    await this.requireTenant(tenantId);
    const existing = await this.prisma.admissionEsocialTransmission.findFirst({
      where: { id: transmissionId, tenantId },
      include: {
        admissionRequest: true,
        admissionContract: true,
      },
    });
    if (!existing) {
      throw new NotFoundException(`admission eSocial transmission ${transmissionId} not found`);
    }
    if (existing.status !== 'failed') {
      throw new ConflictException(`admission eSocial transmission ${transmissionId} is not failed`);
    }

    const now = new Date();
    const payload = this.buildEsocialPayload(
      existing.admissionRequest,
      existing.admissionContract,
      existing.eventCode,
      actor,
      notes,
    );

    const updated = await this.prisma.$transaction(async (tx) => {
      const record = await tx.admissionEsocialTransmission.update({
        where: { id: transmissionId },
        data: {
          status: 'queued',
          payload,
          errorMessage: null,
          receiptNumber: null,
          response: Prisma.JsonNull,
          queuedAt: now,
          sentAt: null,
          processedAt: null,
          attempts: 0,
        },
      });

      await tx.admissionHistory.create({
        data: {
          tenantId: existing.tenantId,
          admissionRequestId: existing.admissionRequestId,
          eventType: 'admission.esocial.requeued',
          fromStatus: existing.status,
          toStatus: 'queued',
          actor,
          occurredAt: now,
          details: {
            admissionId: existing.admissionRequestId,
            eventCode: existing.eventCode,
            transmissionId,
            status: 'queued',
            notes,
          },
        },
      });

      await tx.auditEvent.create({
        data: this.auditData(
          existing.tenantId,
          'admission.esocial.requeued',
          'admissionEsocialTransmission',
          transmissionId,
          { admissionId: existing.admissionRequestId, eventCode: existing.eventCode, transmissionId, status: 'queued', actor, notes },
          now,
        ),
      });

      return record;
    });

    try {
      await this.enqueueAdmissionEsocialTransmission(updated.id);
      return this.toAdmissionEsocialTransmissionRecord(updated);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      await this.markAdmissionEsocialTransmissionFailed(updated.id, message);
      throw new ConflictException(`failed to requeue admission eSocial transmission ${updated.id}: ${message}`);
    }
  }

  async createTermination(
    tenantId: string,
    employeeId: string,
    reason: string,
    effectiveAt: string,
    actor?: string,
    noticeType?: string,
    notes?: string,
  ): Promise<TerminationRecord> {
    await this.requireTenant(tenantId);
    const employee = await this.requireEmployee(tenantId, employeeId);

    const effectiveAtDate = new Date(effectiveAt);
    if (Number.isNaN(effectiveAtDate.getTime())) {
      throw new ConflictException(`invalid effectiveAt ${effectiveAt}`);
    }

    const existing = await this.prisma.terminationRequest.findFirst({
      where: {
        tenantId,
        employeeId,
        status: { not: 'cancelled' },
      },
    });
    if (existing) {
      throw new ConflictException(`employee ${employeeId} already has an active termination request`);
    }

    const now = new Date();
    const termination = await this.prisma.$transaction(async (tx) => {
      const created = await tx.terminationRequest.create({
        data: {
          tenantId,
          employeeId: employee.id,
          status: 'draft',
          reason,
          effectiveAt: effectiveAtDate,
          noticeType,
          requestedBy: actor,
          requestedAt: now,
          notes,
        },
      });

      await tx.terminationHistory.create({
        data: {
          tenantId,
          terminationRequestId: created.id,
          eventType: 'termination.created',
          fromStatus: null,
          toStatus: 'draft',
          actor,
          details: {
            employeeId,
            effectiveAt: effectiveAtDate.toISOString(),
            noticeType,
          },
        },
      });

      await tx.auditEvent.create({
        data: this.auditData(
          tenantId,
          'termination.created',
          'terminationRequest',
          created.id,
          { employeeId, effectiveAt: effectiveAtDate.toISOString(), noticeType, actor },
          now,
        ),
      });

      return created;
    });

    return this.toTerminationRecord(termination);
  }

  async listTerminations(tenantId: string): Promise<TerminationRecord[]> {
    await this.requireTenant(tenantId);
    const terminations = await this.prisma.terminationRequest.findMany({
      where: { tenantId },
      orderBy: { createdAt: 'asc' },
    });

    return terminations.map((termination) => this.toTerminationRecord(termination));
  }

  async getTermination(tenantId: string, terminationId: string): Promise<TerminationWithHistoryRecord> {
    await this.requireTenant(tenantId);
    const termination = await this.prisma.terminationRequest.findFirst({
      where: { id: terminationId, tenantId },
      include: {
        histories: {
          orderBy: { occurredAt: 'asc' },
        },
      },
    });

    if (!termination) {
      throw new NotFoundException(`termination ${terminationId} not found`);
    }

    return {
      ...this.toTerminationRecord(termination),
      histories: termination.histories.map((entry) => this.toTerminationHistoryRecord(entry)),
    };
  }

  async approveTermination(
    tenantId: string,
    terminationId: string,
    actor?: string,
  ): Promise<TerminationRecord> {
    await this.requireTenant(tenantId);
    const termination = await this.requireTermination(tenantId, terminationId);
    if (termination.status === 'cancelled') {
      throw new ConflictException(`termination ${terminationId} is cancelled`);
    }
    if (termination.status === 'effective') {
      throw new ConflictException(`termination ${terminationId} is already effective`);
    }
    if (termination.status !== 'draft') {
      throw new ConflictException(`termination ${terminationId} is not in draft`);
    }

    const now = new Date();
    const updated = await this.prisma.$transaction(async (tx) => {
      const record = await tx.terminationRequest.update({
        where: { id: terminationId },
        data: {
          status: 'approved',
          approvedBy: actor,
          approvedAt: now,
        },
      });

      await tx.terminationHistory.create({
        data: {
          tenantId,
          terminationRequestId: terminationId,
          eventType: 'termination.approved',
          fromStatus: termination.status,
          toStatus: 'approved',
          actor,
          details: {
            terminationId,
            employeeId: termination.employeeId,
            status: 'approved',
          },
        },
      });

      await tx.auditEvent.create({
        data: this.auditData(
          tenantId,
          'termination.approved',
          'terminationRequest',
          terminationId,
          { terminationId, employeeId: termination.employeeId, status: 'approved', actor },
          now,
        ),
      });

      return record;
    });

    return this.toTerminationRecord(updated);
  }

  async effectuateTermination(
    tenantId: string,
    terminationId: string,
    actor?: string,
  ): Promise<TerminationRecord> {
    await this.requireTenant(tenantId);
    const termination = await this.requireTermination(tenantId, terminationId);
    if (termination.status === 'cancelled') {
      throw new ConflictException(`termination ${terminationId} is cancelled`);
    }
    if (termination.status === 'effective') {
      throw new ConflictException(`termination ${terminationId} is already effective`);
    }
    if (termination.status !== 'approved') {
      throw new ConflictException(`termination ${terminationId} is not approved`);
    }

    const now = new Date();
    const updated = await this.prisma.$transaction(async (tx) => {
      const record = await tx.terminationRequest.update({
        where: { id: terminationId },
        data: {
          status: 'effective',
          effectiveBy: actor,
          effectiveOn: now,
        },
      });

      await tx.terminationHistory.create({
        data: {
          tenantId,
          terminationRequestId: terminationId,
          eventType: 'termination.effective',
          fromStatus: termination.status,
          toStatus: 'effective',
          actor,
          details: {
            terminationId,
            employeeId: termination.employeeId,
            status: 'effective',
          },
        },
      });

      await tx.auditEvent.create({
        data: this.auditData(
          tenantId,
          'termination.effective',
          'terminationRequest',
          terminationId,
          { terminationId, employeeId: termination.employeeId, status: 'effective', actor },
          now,
        ),
      });

      return record;
    });

    return this.toTerminationRecord(updated);
  }

  async cancelTermination(
    tenantId: string,
    terminationId: string,
    actor?: string,
  ): Promise<TerminationRecord> {
    await this.requireTenant(tenantId);
    const termination = await this.requireTermination(tenantId, terminationId);
    if (termination.status === 'effective') {
      throw new ConflictException(`termination ${terminationId} is already effective`);
    }
    if (termination.status === 'cancelled') {
      throw new ConflictException(`termination ${terminationId} is already cancelled`);
    }

    const now = new Date();
    const updated = await this.prisma.$transaction(async (tx) => {
      const record = await tx.terminationRequest.update({
        where: { id: terminationId },
        data: {
          status: 'cancelled',
          cancelledBy: actor,
          cancelledAt: now,
        },
      });

      await tx.terminationHistory.create({
        data: {
          tenantId,
          terminationRequestId: terminationId,
          eventType: 'termination.cancelled',
          fromStatus: termination.status,
          toStatus: 'cancelled',
          actor,
          details: {
            terminationId,
            employeeId: termination.employeeId,
            status: 'cancelled',
          },
        },
      });

      await tx.auditEvent.create({
        data: this.auditData(
          tenantId,
          'termination.cancelled',
          'terminationRequest',
          terminationId,
          { terminationId, employeeId: termination.employeeId, status: 'cancelled', actor },
          now,
        ),
      });

      return record;
    });

    return this.toTerminationRecord(updated);
  }

  async createOffboarding(
    tenantId: string,
    terminationId: string,
    actor?: string,
    notes?: string,
  ): Promise<TerminationOffboardingRecord> {
    await this.requireTenant(tenantId);
    const termination = await this.requireTermination(tenantId, terminationId);
    if (termination.status !== 'effective') {
      throw new ConflictException(`termination ${terminationId} is not effective`);
    }

    const existing = await this.prisma.terminationOffboarding.findUnique({
      where: { terminationRequestId: terminationId },
    });
    if (existing) {
      throw new ConflictException(`termination ${terminationId} already has an offboarding request`);
    }

    const now = new Date();
    const offboarding = await this.prisma.$transaction(async (tx) => {
      const created = await tx.terminationOffboarding.create({
        data: {
          tenantId,
          terminationRequestId: terminationId,
          employeeId: termination.employeeId,
          status: 'draft',
          requestedBy: actor,
          requestedAt: now,
          notes,
        },
      });

      await tx.terminationOffboardingHistory.create({
        data: {
          tenantId,
          terminationOffboardingId: created.id,
          eventType: 'offboarding.created',
          fromStatus: null,
          toStatus: 'draft',
          actor,
          details: {
            terminationId,
            employeeId: termination.employeeId,
            status: 'draft',
            notes,
          },
        },
      });

      await tx.auditEvent.create({
        data: this.auditData(
          tenantId,
          'offboarding.created',
          'terminationOffboarding',
          created.id,
          { terminationId, employeeId: termination.employeeId, status: 'draft', actor, notes },
          now,
        ),
      });

      return created;
    });

    return this.toTerminationOffboardingRecord(offboarding);
  }

  async listOffboardings(tenantId: string): Promise<TerminationOffboardingRecord[]> {
    await this.requireTenant(tenantId);
    const offboardings = await this.prisma.terminationOffboarding.findMany({
      where: { tenantId },
      orderBy: { createdAt: 'asc' },
    });

    return offboardings.map((offboarding) => this.toTerminationOffboardingRecord(offboarding));
  }

  async getOffboarding(tenantId: string, offboardingId: string): Promise<TerminationOffboardingWithHistoryRecord> {
    await this.requireTenant(tenantId);
    const offboarding = await this.prisma.terminationOffboarding.findFirst({
      where: { id: offboardingId, tenantId },
      include: {
        histories: {
          orderBy: { occurredAt: 'asc' },
        },
      },
    });

    if (!offboarding) {
      throw new NotFoundException(`offboarding ${offboardingId} not found`);
    }

    return {
      ...this.toTerminationOffboardingRecord(offboarding),
      histories: offboarding.histories.map((entry) => this.toTerminationOffboardingHistoryRecord(entry)),
    };
  }

  async closeOffboarding(
    tenantId: string,
    offboardingId: string,
    actor?: string,
  ): Promise<TerminationOffboardingRecord> {
    await this.requireTenant(tenantId);
    const offboarding = await this.requireOffboarding(tenantId, offboardingId);
    if (offboarding.status === 'closed') {
      throw new ConflictException(`offboarding ${offboardingId} is already closed`);
    }
    if (offboarding.status === 'cancelled') {
      throw new ConflictException(`offboarding ${offboardingId} is cancelled`);
    }
    if (offboarding.status !== 'draft') {
      throw new ConflictException(`offboarding ${offboardingId} is not in draft`);
    }

    const now = new Date();
    const updated = await this.prisma.$transaction(async (tx) => {
      const record = await tx.terminationOffboarding.update({
        where: { id: offboardingId },
        data: {
          status: 'closed',
          closedBy: actor,
          closedAt: now,
        },
      });

      await tx.terminationOffboardingHistory.create({
        data: {
          tenantId,
          terminationOffboardingId: offboardingId,
          eventType: 'offboarding.closed',
          fromStatus: offboarding.status,
          toStatus: 'closed',
          actor,
          details: {
            offboardingId,
            terminationId: offboarding.terminationRequestId,
            employeeId: offboarding.employeeId,
            status: 'closed',
          },
        },
      });

      await tx.auditEvent.create({
        data: this.auditData(
          tenantId,
          'offboarding.closed',
          'terminationOffboarding',
          offboardingId,
          { offboardingId, terminationId: offboarding.terminationRequestId, employeeId: offboarding.employeeId, status: 'closed', actor },
          now,
        ),
      });

      return record;
    });

    try {
      await this.queueTerminationEsocialTransmission(tenantId, offboarding.terminationRequestId, undefined, actor, 'Transmissao eSocial de desligamento');
      return this.toTerminationOffboardingRecord(updated);
    } catch (error) {
      throw error;
    }
  }

  async cancelOffboarding(
    tenantId: string,
    offboardingId: string,
    actor?: string,
  ): Promise<TerminationOffboardingRecord> {
    await this.requireTenant(tenantId);
    const offboarding = await this.requireOffboarding(tenantId, offboardingId);
    if (offboarding.status === 'closed') {
      throw new ConflictException(`offboarding ${offboardingId} is already closed`);
    }
    if (offboarding.status === 'cancelled') {
      throw new ConflictException(`offboarding ${offboardingId} is already cancelled`);
    }

    const now = new Date();
    const updated = await this.prisma.$transaction(async (tx) => {
      const record = await tx.terminationOffboarding.update({
        where: { id: offboardingId },
        data: {
          status: 'cancelled',
          cancelledBy: actor,
          cancelledAt: now,
        },
      });

      await tx.terminationOffboardingHistory.create({
        data: {
          tenantId,
          terminationOffboardingId: offboardingId,
          eventType: 'offboarding.cancelled',
          fromStatus: offboarding.status,
          toStatus: 'cancelled',
          actor,
          details: {
            offboardingId,
            terminationId: offboarding.terminationRequestId,
            employeeId: offboarding.employeeId,
            status: 'cancelled',
          },
        },
      });

      await tx.auditEvent.create({
        data: this.auditData(
          tenantId,
          'offboarding.cancelled',
          'terminationOffboarding',
          offboardingId,
          { offboardingId, terminationId: offboarding.terminationRequestId, employeeId: offboarding.employeeId, status: 'cancelled', actor },
          now,
        ),
      });

      return record;
    });

    return this.toTerminationOffboardingRecord(updated);
  }

  async listTerminationEsocialTransmissions(
    tenantId: string,
    terminationId: string,
  ): Promise<TerminationEsocialTransmissionRecord[]> {
    await this.requireTenant(tenantId);
    await this.requireTermination(tenantId, terminationId);
    const transmissions = await this.prisma.terminationEsocialTransmission.findMany({
      where: { tenantId, terminationRequestId: terminationId },
      orderBy: { createdAt: 'asc' },
    });

    return transmissions.map((transmission) => this.toTerminationEsocialTransmissionRecord(transmission));
  }

  async queueTerminationEsocialTransmission(
    tenantId: string,
    terminationId: string,
    eventCode: string | undefined,
    actor?: string,
    notes?: string,
  ): Promise<TerminationEsocialTransmissionRecord> {
    await this.requireTenant(tenantId);
    const termination = await this.requireTermination(tenantId, terminationId);
    if (termination.status !== 'effective') {
      throw new ConflictException(`termination ${terminationId} is not effective`);
    }

    const offboarding = await this.prisma.terminationOffboarding.findUnique({
      where: { terminationRequestId: terminationId },
    });
    if (!offboarding || offboarding.status !== 'closed') {
      throw new ConflictException(`termination ${terminationId} is not ready for eSocial transmission`);
    }

    const resolvedEventCode = eventCode ?? 'S-2299';
    if (resolvedEventCode !== 'S-2299') {
      throw new ConflictException(`unsupported termination eSocial event ${resolvedEventCode}`);
    }

    const existing = await this.prisma.terminationEsocialTransmission.findUnique({
      where: {
        terminationRequestId_eventCode: {
          terminationRequestId: terminationId,
          eventCode: resolvedEventCode,
        },
      },
    });

    const now = new Date();
    const payload = this.buildTerminationEsocialPayload(termination, offboarding, resolvedEventCode, actor, notes);

    const transmission = await this.prisma.$transaction(async (tx) => {
      if (existing) {
        const updated = await tx.terminationEsocialTransmission.update({
          where: { id: existing.id },
          data: {
            status: 'queued',
            payload,
            errorMessage: null,
            receiptNumber: null,
            response: Prisma.JsonNull,
            queuedAt: now,
            sentAt: null,
            processedAt: null,
            attempts: 0,
            terminationOffboardingId: offboarding.id,
          },
        });

        await tx.terminationHistory.create({
          data: {
            tenantId,
            terminationRequestId: terminationId,
            eventType: 'termination.esocial.queued',
            fromStatus: termination.status,
            toStatus: termination.status,
            actor,
            occurredAt: now,
            details: {
              terminationId,
              offboardingId: offboarding.id,
              eventCode: resolvedEventCode,
              transmissionId: updated.id,
              status: 'queued',
              notes,
            },
          },
        });

        await tx.auditEvent.create({
          data: this.auditData(
            tenantId,
            'termination.esocial.queued',
            'terminationEsocialTransmission',
            updated.id,
            { terminationId, offboardingId: offboarding.id, eventCode: resolvedEventCode, transmissionId: updated.id, status: 'queued', actor, notes },
            now,
          ),
        });

        return updated;
      }

      const created = await tx.terminationEsocialTransmission.create({
        data: {
          tenantId,
          terminationRequestId: terminationId,
          terminationOffboardingId: offboarding.id,
          eventCode: resolvedEventCode,
          status: 'queued',
          payload,
          queuedAt: now,
        },
      });

      await tx.terminationHistory.create({
        data: {
          tenantId,
          terminationRequestId: terminationId,
          eventType: 'termination.esocial.queued',
          fromStatus: termination.status,
          toStatus: termination.status,
          actor,
          occurredAt: now,
          details: {
            terminationId,
            offboardingId: offboarding.id,
            eventCode: resolvedEventCode,
            transmissionId: created.id,
            status: 'queued',
            notes,
          },
        },
      });

      await tx.auditEvent.create({
        data: this.auditData(
          tenantId,
          'termination.esocial.queued',
          'terminationEsocialTransmission',
          created.id,
          { terminationId, offboardingId: offboarding.id, eventCode: resolvedEventCode, transmissionId: created.id, status: 'queued', actor, notes },
          now,
        ),
      });

      return created;
    });

    try {
      await this.enqueueTerminationEsocialTransmission(transmission.id);
      return this.toTerminationEsocialTransmissionRecord(transmission);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      await this.markTerminationEsocialTransmissionFailed(transmission.id, message);
      throw new ConflictException(`failed to enqueue termination eSocial transmission ${transmission.id}: ${message}`);
    }
  }

  async markTerminationEsocialTransmissionSent(
    transmissionId: string,
    receiptNumber: string,
    response: Record<string, string | undefined>,
  ): Promise<TerminationEsocialTransmissionRecord> {
    const existing = await this.prisma.terminationEsocialTransmission.findUnique({
      where: { id: transmissionId },
    });
    if (!existing) {
      throw new NotFoundException(`termination eSocial transmission ${transmissionId} not found`);
    }

    const now = new Date();
    const updated = await this.prisma.$transaction(async (tx) => {
      const record = await tx.terminationEsocialTransmission.update({
        where: { id: transmissionId },
        data: {
          status: 'sent',
          receiptNumber,
          response,
          sentAt: now,
          processedAt: now,
          attempts: existing.attempts + 1,
          errorMessage: null,
        },
      });

      await tx.terminationHistory.create({
        data: {
          tenantId: existing.tenantId,
          terminationRequestId: existing.terminationRequestId,
          eventType: 'termination.esocial.sent',
          fromStatus: existing.status,
          toStatus: 'sent',
          occurredAt: now,
          details: {
            terminationId: existing.terminationRequestId,
            transmissionId,
            eventCode: existing.eventCode,
            receiptNumber,
            status: 'sent',
          },
        },
      });

      await tx.auditEvent.create({
        data: this.auditData(
          existing.tenantId,
          'termination.esocial.sent',
          'terminationEsocialTransmission',
          transmissionId,
          { terminationId: existing.terminationRequestId, eventCode: existing.eventCode, receiptNumber, status: 'sent' },
          now,
        ),
      });

      return record;
    });

    return this.toTerminationEsocialTransmissionRecord(updated);
  }

  async markTerminationEsocialTransmissionFailed(
    transmissionId: string,
    errorMessage: string,
  ): Promise<TerminationEsocialTransmissionRecord> {
    const existing = await this.prisma.terminationEsocialTransmission.findUnique({
      where: { id: transmissionId },
    });
    if (!existing) {
      throw new NotFoundException(`termination eSocial transmission ${transmissionId} not found`);
    }

    const now = new Date();
    const updated = await this.prisma.$transaction(async (tx) => {
      const record = await tx.terminationEsocialTransmission.update({
        where: { id: transmissionId },
        data: {
          status: 'failed',
          errorMessage,
          processedAt: now,
          attempts: existing.attempts + 1,
        },
      });

      await tx.terminationHistory.create({
        data: {
          tenantId: existing.tenantId,
          terminationRequestId: existing.terminationRequestId,
          eventType: 'termination.esocial.failed',
          fromStatus: existing.status,
          toStatus: 'failed',
          occurredAt: now,
          details: {
            terminationId: existing.terminationRequestId,
            transmissionId,
            eventCode: existing.eventCode,
            errorMessage,
            status: 'failed',
          },
        },
      });

      await tx.auditEvent.create({
        data: this.auditData(
          existing.tenantId,
          'termination.esocial.failed',
          'terminationEsocialTransmission',
          transmissionId,
          { terminationId: existing.terminationRequestId, eventCode: existing.eventCode, errorMessage, status: 'failed' },
          now,
        ),
      });

      return record;
    });

    return this.toTerminationEsocialTransmissionRecord(updated);
  }

  async retryTerminationEsocialTransmission(
    tenantId: string,
    transmissionId: string,
    actor?: string,
    notes?: string,
  ): Promise<TerminationEsocialTransmissionRecord> {
    await this.requireTenant(tenantId);
    const existing = await this.prisma.terminationEsocialTransmission.findFirst({
      where: { id: transmissionId, tenantId },
      include: {
        terminationRequest: true,
        terminationOffboarding: true,
      },
    });
    if (!existing) {
      throw new NotFoundException(`termination eSocial transmission ${transmissionId} not found`);
    }
    if (existing.status !== 'failed') {
      throw new ConflictException(`termination eSocial transmission ${transmissionId} is not failed`);
    }

    const now = new Date();
    const payload = this.buildTerminationEsocialPayload(
      existing.terminationRequest,
      existing.terminationOffboarding,
      existing.eventCode,
      actor,
      notes,
    );

    const updated = await this.prisma.$transaction(async (tx) => {
      const record = await tx.terminationEsocialTransmission.update({
        where: { id: transmissionId },
        data: {
          status: 'queued',
          payload,
          errorMessage: null,
          receiptNumber: null,
          response: Prisma.JsonNull,
          queuedAt: now,
          sentAt: null,
          processedAt: null,
          attempts: 0,
        },
      });

      await tx.terminationHistory.create({
        data: {
          tenantId: existing.tenantId,
          terminationRequestId: existing.terminationRequestId,
          eventType: 'termination.esocial.requeued',
          fromStatus: existing.status,
          toStatus: 'queued',
          actor,
          occurredAt: now,
          details: {
            terminationId: existing.terminationRequestId,
            eventCode: existing.eventCode,
            transmissionId,
            status: 'queued',
            notes,
          },
        },
      });

      await tx.auditEvent.create({
        data: this.auditData(
          existing.tenantId,
          'termination.esocial.requeued',
          'terminationEsocialTransmission',
          transmissionId,
          { terminationId: existing.terminationRequestId, eventCode: existing.eventCode, transmissionId, status: 'queued', actor, notes },
          now,
        ),
      });

      return record;
    });

    try {
      await this.enqueueTerminationEsocialTransmission(updated.id);
      return this.toTerminationEsocialTransmissionRecord(updated);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      await this.markTerminationEsocialTransmissionFailed(updated.id, message);
      throw new ConflictException(`failed to requeue termination eSocial transmission ${updated.id}: ${message}`);
    }
  }

  async createRescission(
    tenantId: string,
    terminationId: string,
    actor?: string,
    notes?: string,
  ): Promise<RescissionRecord> {
    await this.requireTenant(tenantId);
    const termination = await this.requireTermination(tenantId, terminationId);
    if (termination.status !== 'effective') {
      throw new ConflictException(`termination ${terminationId} is not effective`);
    }

    const existing = await this.prisma.rescissionRequest.findUnique({
      where: { terminationRequestId: terminationId },
    });
    if (existing) {
      throw new ConflictException(`termination ${terminationId} already has a rescission request`);
    }

    const referenceDate = termination.effectiveAt;
    const paymentDueAt = new Date(referenceDate);
    paymentDueAt.setUTCDate(paymentDueAt.getUTCDate() + 10);
    const now = new Date();
    const rescission = await this.prisma.$transaction(async (tx) => {
      const created = await tx.rescissionRequest.create({
        data: {
          tenantId,
          terminationRequestId: terminationId,
          employeeId: termination.employeeId,
          status: 'draft',
          paymentDueAt,
          requestedBy: actor,
          requestedAt: now,
          notes,
        },
      });

      await tx.rescissionHistory.create({
        data: {
          tenantId,
          rescissionRequestId: created.id,
          eventType: 'rescission.created',
          fromStatus: null,
          toStatus: 'draft',
          actor,
          details: {
            terminationId,
            employeeId: termination.employeeId,
            status: 'draft',
            paymentDueAt: paymentDueAt.toISOString(),
          },
        },
      });

      await tx.auditEvent.create({
        data: this.auditData(
          tenantId,
          'rescission.created',
          'rescissionRequest',
          created.id,
          {
            terminationId,
            employeeId: termination.employeeId,
            status: 'draft',
            paymentDueAt: paymentDueAt.toISOString(),
            actor,
          },
          now,
        ),
      });

      return created;
    });

    return this.toRescissionRecord(rescission);
  }

  async listRescissions(tenantId: string): Promise<RescissionRecord[]> {
    await this.requireTenant(tenantId);
    const rescissions = await this.prisma.rescissionRequest.findMany({
      where: { tenantId },
      orderBy: { createdAt: 'asc' },
    });

    return rescissions.map((rescission) => this.toRescissionRecord(rescission));
  }

  async getRescission(tenantId: string, rescissionId: string): Promise<RescissionWithHistoryRecord> {
    await this.requireTenant(tenantId);
    const rescission = await this.prisma.rescissionRequest.findFirst({
      where: { id: rescissionId, tenantId },
      include: {
        histories: {
          orderBy: { occurredAt: 'asc' },
        },
        calculation: true,
        documents: {
          orderBy: { generatedAt: 'asc' },
        },
      },
    });

    if (!rescission) {
      throw new NotFoundException(`rescission ${rescissionId} not found`);
    }

    return {
      ...this.toRescissionRecord(rescission),
      histories: rescission.histories.map((entry) => this.toRescissionHistoryRecord(entry)),
      calculation: rescission.calculation ? this.toRescissionCalculationRecord(rescission.calculation) : undefined,
      documents: rescission.documents.map((document) => this.toRescissionDocumentRecord(document)),
    };
  }

  async calculateRescission(
    tenantId: string,
    rescissionId: string,
    input: {
      referenceSalaryCents?: number;
      noticeAmountCents?: number;
      salaryBalanceAmountCents?: number;
      vacationAmountCents?: number;
      thirteenthAmountCents?: number;
      fgtsAmountCents?: number;
      fgtsPenaltyAmountCents?: number;
      deductionsAmountCents?: number;
      notes?: string;
    },
    actor?: string,
  ): Promise<RescissionCalculationRecord> {
    await this.requireTenant(tenantId);
    const rescission = await this.requireRescission(tenantId, rescissionId);
    if (rescission.status === 'closed') {
      throw new ConflictException(`rescission ${rescissionId} is already closed`);
    }
    if (rescission.status === 'cancelled') {
      throw new ConflictException(`rescission ${rescissionId} is cancelled`);
    }
    if (rescission.status !== 'draft') {
      throw new ConflictException(`rescission ${rescissionId} is not in draft`);
    }

    const referenceSalaryCents = input.referenceSalaryCents ?? undefined;
    const noticeAmountCents = input.noticeAmountCents ?? 0;
    const salaryBalanceAmountCents = input.salaryBalanceAmountCents ?? 0;
    const vacationAmountCents = input.vacationAmountCents ?? 0;
    const thirteenthAmountCents = input.thirteenthAmountCents ?? 0;
    const fgtsAmountCents = input.fgtsAmountCents ?? 0;
    const fgtsPenaltyAmountCents = input.fgtsPenaltyAmountCents ?? 0;
    const deductionsAmountCents = input.deductionsAmountCents ?? 0;
    const grossAmountCents =
      noticeAmountCents +
      salaryBalanceAmountCents +
      vacationAmountCents +
      thirteenthAmountCents +
      fgtsAmountCents +
      fgtsPenaltyAmountCents;
    const netAmountCents = grossAmountCents - deductionsAmountCents;
    const now = new Date();

    const calculation = await this.prisma.$transaction(async (tx) => {
      const created = await tx.rescissionCalculation.upsert({
        where: { rescissionRequestId: rescissionId },
        create: {
          tenantId,
          rescissionRequestId: rescissionId,
          status: 'calculated',
          referenceSalaryCents,
          noticeAmountCents,
          salaryBalanceAmountCents,
          vacationAmountCents,
          thirteenthAmountCents,
          fgtsAmountCents,
          fgtsPenaltyAmountCents,
          deductionsAmountCents,
          grossAmountCents,
          netAmountCents,
          notes: input.notes,
          calculatedBy: actor,
          calculatedAt: now,
        },
        update: {
          status: 'calculated',
          referenceSalaryCents,
          noticeAmountCents,
          salaryBalanceAmountCents,
          vacationAmountCents,
          thirteenthAmountCents,
          fgtsAmountCents,
          fgtsPenaltyAmountCents,
          deductionsAmountCents,
          grossAmountCents,
          netAmountCents,
          notes: input.notes,
          calculatedBy: actor,
          calculatedAt: now,
        },
      });

      const updated = await tx.rescissionRequest.update({
        where: { id: rescissionId },
        data: {
          status: 'calculated',
        },
      });

      await tx.rescissionHistory.create({
        data: {
          tenantId,
          rescissionRequestId: rescissionId,
          eventType: 'rescission.calculated',
          fromStatus: rescission.status,
          toStatus: 'calculated',
          actor,
          details: {
            rescissionId,
            terminationId: rescission.terminationRequestId,
            employeeId: rescission.employeeId,
            status: 'calculated',
          },
        },
      });

      await tx.auditEvent.create({
        data: this.auditData(
          tenantId,
          'rescission.calculated',
          'rescissionRequest',
          rescissionId,
          {
            rescissionId,
            terminationId: rescission.terminationRequestId,
            employeeId: rescission.employeeId,
            status: 'calculated',
            actor,
          },
          now,
        ),
      });

      return created;
    });

    return this.toRescissionCalculationRecord(calculation);
  }

  async listRescissionDocuments(tenantId: string, rescissionId: string): Promise<RescissionDocumentRecord[]> {
    await this.requireTenant(tenantId);
    const documents = await this.prisma.rescissionDocument.findMany({
      where: { tenantId, rescissionRequestId: rescissionId },
      orderBy: { generatedAt: 'asc' },
    });

    return documents.map((document) => this.toRescissionDocumentRecord(document));
  }

  async generateRescissionDocuments(
    tenantId: string,
    rescissionId: string,
    actor?: string,
  ): Promise<RescissionDocumentRecord[]> {
    await this.requireTenant(tenantId);
    const rescission = await this.requireRescission(tenantId, rescissionId);
    if (rescission.status === 'closed') {
      throw new ConflictException(`rescission ${rescissionId} is already closed`);
    }
    if (rescission.status === 'cancelled') {
      throw new ConflictException(`rescission ${rescissionId} is cancelled`);
    }
    if (rescission.status !== 'calculated') {
      throw new ConflictException(`rescission ${rescissionId} is not calculated`);
    }

    const calculation = await this.prisma.rescissionCalculation.findUnique({
      where: { rescissionRequestId: rescissionId },
    });
    if (!calculation) {
      throw new ConflictException(`rescission ${rescissionId} has no calculation`);
    }

    const now = new Date();
    const baseContent = {
      rescissionId,
      terminationId: rescission.terminationRequestId,
      employeeId: rescission.employeeId,
      grossAmountCents: calculation.grossAmountCents,
      netAmountCents: calculation.netAmountCents,
      generatedAt: now.toISOString(),
      generatedBy: actor,
    };

    const documents = await this.prisma.$transaction(async (tx) => {
      const entries = [
        {
          documentType: 'rescission_summary',
          title: 'Resumo rescisorio',
          content: {
            ...baseContent,
            documentType: 'rescission_summary',
            lineItems: {
              noticeAmountCents: calculation.noticeAmountCents,
              salaryBalanceAmountCents: calculation.salaryBalanceAmountCents,
              vacationAmountCents: calculation.vacationAmountCents,
              thirteenthAmountCents: calculation.thirteenthAmountCents,
              fgtsAmountCents: calculation.fgtsAmountCents,
              fgtsPenaltyAmountCents: calculation.fgtsPenaltyAmountCents,
              deductionsAmountCents: calculation.deductionsAmountCents,
            },
          },
        },
        {
          documentType: 'rescission_payment_statement',
          title: 'Demonstrativo de pagamento rescisorio',
          content: {
            ...baseContent,
            documentType: 'rescission_payment_statement',
            referenceSalaryCents: calculation.referenceSalaryCents ?? undefined,
            notes: calculation.notes ?? undefined,
          },
        },
        {
          documentType: 'rescission_receipt',
          title: 'Recibo de encerramento do desligamento',
          content: {
            ...baseContent,
            documentType: 'rescission_receipt',
            status: 'documented',
          },
        },
      ] as const;

      const createdDocuments = [];
      for (const entry of entries) {
        const created = await tx.rescissionDocument.upsert({
          where: {
            rescissionRequestId_documentType: {
              rescissionRequestId: rescissionId,
              documentType: entry.documentType,
            },
          },
          create: {
            tenantId,
            rescissionRequestId: rescissionId,
            calculationId: calculation.id,
            documentType: entry.documentType,
            title: entry.title,
            status: 'generated',
            signedBy: null,
            signedAt: null,
            signatureMethod: null,
            content: entry.content as Prisma.InputJsonValue,
            generatedBy: actor,
            generatedAt: now,
          },
          update: {
            calculationId: calculation.id,
            title: entry.title,
            status: 'generated',
            signedBy: null,
            signedAt: null,
            signatureMethod: null,
            content: entry.content as Prisma.InputJsonValue,
            generatedBy: actor,
            generatedAt: now,
          },
        });
        createdDocuments.push(created);
      }

      await tx.rescissionRequest.update({
        where: { id: rescissionId },
        data: {
          status: 'documented',
        },
      });

      await tx.rescissionHistory.create({
        data: {
          tenantId,
          rescissionRequestId: rescissionId,
          eventType: 'rescission.documents.generated',
          fromStatus: rescission.status,
          toStatus: 'documented',
          actor,
          details: {
            rescissionId,
            terminationId: rescission.terminationRequestId,
            employeeId: rescission.employeeId,
            status: 'documented',
            documents: String(createdDocuments.length),
          },
        },
      });

      await tx.auditEvent.create({
        data: this.auditData(
          tenantId,
          'rescission.documents.generated',
          'rescissionRequest',
          rescissionId,
          {
            rescissionId,
            terminationId: rescission.terminationRequestId,
            employeeId: rescission.employeeId,
            status: 'documented',
            documents: String(createdDocuments.length),
            actor,
          },
          now,
        ),
      });

      return createdDocuments;
    });

    return documents.map((document) => this.toRescissionDocumentRecord(document));
  }

  async closeRescission(
    tenantId: string,
    rescissionId: string,
    actor?: string,
  ): Promise<RescissionRecord> {
    await this.requireTenant(tenantId);
    const rescission = await this.requireRescission(tenantId, rescissionId);
    if (rescission.status === 'closed') {
      throw new ConflictException(`rescission ${rescissionId} is already closed`);
    }
    if (rescission.status === 'cancelled') {
      throw new ConflictException(`rescission ${rescissionId} is cancelled`);
    }
    if (rescission.status !== 'documented') {
      throw new ConflictException(`rescission ${rescissionId} is not documented`);
    }

    const unsignedDocuments = await this.prisma.rescissionDocument.count({
      where: {
        tenantId,
        rescissionRequestId: rescissionId,
        OR: [{ signedAt: null }, { status: { not: 'signed' } }],
      },
    });
    if (unsignedDocuments > 0) {
      throw new ConflictException(`rescission ${rescissionId} has unsigned documents`);
    }

    const now = new Date();
    const updated = await this.prisma.$transaction(async (tx) => {
      const record = await tx.rescissionRequest.update({
        where: { id: rescissionId },
        data: {
          status: 'closed',
          closedBy: actor,
          closedAt: now,
        },
      });

      await tx.rescissionHistory.create({
        data: {
          tenantId,
          rescissionRequestId: rescissionId,
          eventType: 'rescission.closed',
          fromStatus: rescission.status,
          toStatus: 'closed',
          actor,
          details: {
            rescissionId,
            terminationId: rescission.terminationRequestId,
            employeeId: rescission.employeeId,
            status: 'closed',
          },
        },
      });

      await tx.auditEvent.create({
        data: this.auditData(
          tenantId,
          'rescission.closed',
          'rescissionRequest',
          rescissionId,
          { rescissionId, terminationId: rescission.terminationRequestId, employeeId: rescission.employeeId, status: 'closed', actor },
          now,
        ),
      });

      return record;
    });

    return this.toRescissionRecord(updated);
  }

  async cancelRescission(
    tenantId: string,
    rescissionId: string,
    actor?: string,
  ): Promise<RescissionRecord> {
    await this.requireTenant(tenantId);
    const rescission = await this.requireRescission(tenantId, rescissionId);
    if (rescission.status === 'documented' || rescission.status === 'closed') {
      throw new ConflictException(`rescission ${rescissionId} is already documented or closed`);
    }
    if (rescission.status === 'cancelled') {
      throw new ConflictException(`rescission ${rescissionId} is already cancelled`);
    }

    const now = new Date();
    const updated = await this.prisma.$transaction(async (tx) => {
      const record = await tx.rescissionRequest.update({
        where: { id: rescissionId },
        data: {
          status: 'cancelled',
        },
      });

      await tx.rescissionHistory.create({
        data: {
          tenantId,
          rescissionRequestId: rescissionId,
          eventType: 'rescission.cancelled',
          fromStatus: rescission.status,
          toStatus: 'cancelled',
          actor,
          details: {
            rescissionId,
            terminationId: rescission.terminationRequestId,
            employeeId: rescission.employeeId,
            status: 'cancelled',
          },
        },
      });

      await tx.auditEvent.create({
        data: this.auditData(
          tenantId,
          'rescission.cancelled',
          'rescissionRequest',
          rescissionId,
          { rescissionId, terminationId: rescission.terminationRequestId, employeeId: rescission.employeeId, status: 'cancelled', actor },
          now,
        ),
      });

      return record;
    });

    return this.toRescissionRecord(updated);
  }

  async signRescissionDocument(
    tenantId: string,
    rescissionId: string,
    documentId: string,
    signatureMethod?: string,
    actor?: string,
  ): Promise<RescissionDocumentRecord> {
    await this.requireTenant(tenantId);
    const rescission = await this.requireRescission(tenantId, rescissionId);
    if (rescission.status === 'cancelled') {
      throw new ConflictException(`rescission ${rescissionId} is cancelled`);
    }
    if (rescission.status === 'closed') {
      throw new ConflictException(`rescission ${rescissionId} is already closed`);
    }

    const document = await this.prisma.rescissionDocument.findFirst({
      where: {
        id: documentId,
        tenantId,
        rescissionRequestId: rescissionId,
      },
    });

    if (!document) {
      throw new NotFoundException(`rescission document ${documentId} not found`);
    }

    if (document.status === 'signed' && document.signedAt) {
      throw new ConflictException(`rescission document ${documentId} is already signed`);
    }

    const resolvedSignatureMethod = signatureMethod ?? 'govbr_advanced';
    if (
      !RESCISSION_SIGNATURE_METHODS.includes(
        resolvedSignatureMethod as (typeof RESCISSION_SIGNATURE_METHODS)[number],
      )
    ) {
      throw new ConflictException(`unsupported rescission signature method ${resolvedSignatureMethod}`);
    }

    const now = new Date();
    const updated = await this.prisma.$transaction(async (tx) => {
      const record = await tx.rescissionDocument.update({
        where: { id: documentId },
        data: {
          status: 'signed',
          signedBy: actor,
          signedAt: now,
          signatureMethod: resolvedSignatureMethod,
        },
      });

      await tx.rescissionHistory.create({
        data: {
          tenantId,
          rescissionRequestId: rescissionId,
          eventType: 'rescission.document.signed',
          fromStatus: rescission.status,
          toStatus: rescission.status,
          actor,
          details: {
            rescissionId,
            terminationId: rescission.terminationRequestId,
            employeeId: rescission.employeeId,
            documentId,
            documentType: record.documentType,
            status: 'signed',
            signatureMethod: resolvedSignatureMethod,
          },
        },
      });

      await tx.auditEvent.create({
        data: this.auditData(
          tenantId,
          'rescission.document.signed',
          'rescissionDocument',
          documentId,
          {
            rescissionId,
            terminationId: rescission.terminationRequestId,
            employeeId: rescission.employeeId,
            documentId,
            documentType: record.documentType,
            status: 'signed',
            signatureMethod: resolvedSignatureMethod,
            actor,
          },
          now,
        ),
      });

      return record;
    });

    return this.toRescissionDocumentRecord(updated);
  }

  private async enqueueAdmissionEsocialTransmission(transmissionId: string): Promise<void> {
    if (!this.queue) {
      return;
    }

    await this.queue.add(
      'admission.esocial.transmit',
      { transmissionId },
      {
        removeOnComplete: true,
        removeOnFail: false,
      },
    );
  }

  private async enqueueVacationEsocialTransmission(transmissionId: string): Promise<void> {
    if (!this.queue) {
      return;
    }

    await this.queue.add(
      'vacation.esocial.transmit',
      { transmissionId },
      {
        removeOnComplete: true,
        removeOnFail: false,
      },
    );
  }

  private async enqueueTerminationEsocialTransmission(transmissionId: string): Promise<void> {
    if (!this.queue) {
      return;
    }

    await this.queue.add(
      'termination.esocial.transmit',
      { transmissionId },
      {
        removeOnComplete: true,
        removeOnFail: false,
      },
    );
  }

  private async enqueueOccupationalHealthEsocialTransmission(transmissionId: string): Promise<void> {
    if (!this.queue) {
      return;
    }

    await this.queue.add(
      'occupational_health.esocial.transmit',
      { transmissionId },
      {
        removeOnComplete: true,
        removeOnFail: false,
      },
    );
  }

  private buildVacationEsocialPayload(
    request: {
      id: string;
      tenantId: string;
      employeeId: string;
      vacationBalanceId: string;
      plannedStart: Date;
      plannedEnd: Date;
      requestedDays: number;
      consumedDays: number;
      abonoDays: number;
      salaryBaseCents: number | null;
      vacationAmountCents: number;
      abonoAmountCents: number;
      status: string;
      notes: string | null;
      requestedBy: string | null;
      requestedAt: Date;
      decidedBy: string | null;
      decidedAt: Date | null;
      noticeIssuedAt: Date | null;
      noticeProtocol: string | null;
      paymentDueAt: Date | null;
      paidAt: Date | null;
      paidBy: string | null;
      payrollBatchId: string | null;
      payrollStatus: string | null;
      payrollReceiptNumber: string | null;
      payrollSentBy: string | null;
      payrollSentAt: Date | null;
      createdAt: Date;
      updatedAt: Date;
      balance?: {
        id: string;
        tenantId: string;
        employeeId: string;
        referenceStart: Date;
        referenceEnd: Date;
        accruedDays: number;
        takenDays: number;
        availableDays: number;
        status: string;
        notes: string | null;
        createdBy: string | null;
        createdAt: Date;
        updatedAt: Date;
      } | null;
      periods?: {
        id: string;
        tenantId: string;
        vacationRequestId: string;
        sequence: number;
        plannedStart: Date;
        plannedEnd: Date;
        requestedDays: number;
        createdAt: Date;
        updatedAt: Date;
      }[];
      payrollBatch?: {
        id: string;
      } | null;
    },
    eventCode: string,
    actor?: string,
    notes?: string,
  ): Prisma.InputJsonValue {
    const payload: Record<string, string | number | boolean | undefined> = {
      vacationRequestId: request.id,
      tenantId: request.tenantId,
      employeeId: request.employeeId,
      eventCode,
      codMotAfast: 15,
      source: 'vacation',
      status: request.status,
      plannedStart: request.plannedStart.toISOString(),
      plannedEnd: request.plannedEnd.toISOString(),
      requestedDays: request.requestedDays,
      consumedDays: request.consumedDays,
      abonoDays: request.abonoDays,
      vacationAmountCents: request.vacationAmountCents,
      abonoAmountCents: request.abonoAmountCents,
    };

    if (request.noticeIssuedAt) {
      payload.noticeIssuedAt = request.noticeIssuedAt.toISOString();
    }

    if (request.noticeProtocol) {
      payload.noticeProtocol = request.noticeProtocol;
    }

    if (request.paymentDueAt) {
      payload.paymentDueAt = request.paymentDueAt.toISOString();
    }

    if (request.paidAt) {
      payload.paidAt = request.paidAt.toISOString();
    }

    if (request.payrollReceiptNumber) {
      payload.payrollReceiptNumber = request.payrollReceiptNumber;
    }

    if (request.payrollStatus) {
      payload.payrollStatus = request.payrollStatus;
    }

    if (actor) {
      payload.actor = actor;
    }

    if (notes) {
      payload.notes = notes;
    }

    if (request.periods?.length) {
      payload.periodCount = request.periods.length;
    }

    return payload as Prisma.InputJsonValue;
  }

  private async loadOccupationalHealthEsocialSource(
    tenantId: string,
    subjectType: OccupationalHealthEsocialSubjectType,
    subjectId: string,
  ): Promise<OccupationalHealthEsocialSourceRecord> {
    if (subjectType === 'environment') {
      const environment = await this.prisma.occupationalHealthEnvironment.findFirst({
        where: { id: subjectId, tenantId },
      });
      if (!environment) {
        throw new NotFoundException(`occupational health environment ${subjectId} not found`);
      }

      const risks = await this.prisma.occupationalHealthRisk.findMany({
        where: { tenantId, environmentId: subjectId },
        orderBy: [{ active: 'desc' }, { validFrom: 'desc' }, { createdAt: 'desc' }],
      });

      return {
        subjectType,
        subjectId,
        companyId: environment.companyId ?? undefined,
        environmentId: environment.id,
        environment,
        risks,
      };
    }

    if (subjectType === 'cat') {
      const cat = await this.prisma.occupationalHealthCat.findFirst({
        where: { id: subjectId, tenantId },
      });
      if (!cat) {
        throw new NotFoundException(`occupational health cat ${subjectId} not found`);
      }

      return {
        subjectType,
        subjectId,
        companyId: cat.companyId ?? undefined,
        employeeId: cat.employeeId,
        catId: cat.id,
        cat,
      };
    }

    const exam = await this.prisma.occupationalHealthExam.findFirst({
      where: { id: subjectId, tenantId },
      include: { aso: true },
    });
    if (!exam) {
      throw new NotFoundException(`occupational health exam ${subjectId} not found`);
    }

    const employee = await this.prisma.employee.findFirst({
      where: { id: exam.employeeId, tenantId },
    });
    if (!employee) {
      throw new NotFoundException(`employee ${exam.employeeId} not found`);
    }

    return {
      subjectType,
      subjectId,
      companyId: employee.companyId,
      employeeId: exam.employeeId,
      environmentId: exam.environmentId ?? undefined,
      examId: exam.id,
      exam,
      aso: exam.aso ?? undefined,
    };
  }

  private buildOccupationalHealthEsocialPayload(
    source: OccupationalHealthEsocialSourceRecord,
    eventCode: string,
    actor?: string,
    notes?: string,
  ): Prisma.InputJsonValue {
    const payload: Record<string, string | number | boolean | undefined | Array<Record<string, string | number | boolean | undefined>>> = {
      subjectType: source.subjectType,
      subjectId: source.subjectId,
      eventCode,
      source: 'occupational_health',
    };

    if (source.companyId) {
      payload.companyId = source.companyId;
    }

    if (source.employeeId) {
      payload.employeeId = source.employeeId;
    }

    if (source.environmentId) {
      payload.environmentId = source.environmentId;
    }

    if (source.catId) {
      payload.catId = source.catId;
    }

    if (source.examId) {
      payload.examId = source.examId;
    }

    if (source.subjectType === 'environment' && source.environment) {
      payload.environmentCode = source.environment.code;
      payload.environmentName = source.environment.name;
      payload.environmentStatus = source.environment.active;
      payload.riskCount = source.risks?.length ?? 0;
      payload.risks = source.risks?.map((risk) => ({
        riskId: risk.id,
        code: risk.code,
        name: risk.name,
        severity: risk.severity,
        probability: risk.probability,
        active: risk.active,
      }));
    }

    if (source.subjectType === 'cat' && source.cat) {
      payload.reportNumber = source.cat.reportNumber;
      payload.accidentType = source.cat.accidentType ?? undefined;
      payload.occurredAt = source.cat.occurredAt.toISOString();
      payload.status = source.cat.status;
      payload.description = source.cat.description;
      payload.notifiedAt = source.cat.notifiedAt?.toISOString();
    }

    if (source.subjectType === 'exam' && source.exam) {
      payload.examType = source.exam.examType;
      payload.scheduledAt = source.exam.scheduledAt.toISOString();
      payload.performedAt = source.exam.performedAt?.toISOString();
      payload.result = source.exam.result ?? undefined;
      payload.status = source.exam.status;
      payload.expiresAt = source.exam.expiresAt?.toISOString();
      if (source.aso) {
        payload.asoIssuedAt = source.aso.issuedAt.toISOString();
        payload.asoResult = source.aso.result;
      }
    }

    if (actor) {
      payload.actor = actor;
    }

    if (notes) {
      payload.notes = notes;
    }

    return payload as Prisma.InputJsonValue;
  }

  private buildEsocialPayload(
    admission: {
      id: string;
      tenantId: string;
      personId: string;
      companyId: string;
      employeeId: string;
      status: string;
      requestedBy: string | null;
      requestedAt: Date;
      createdAt: Date;
      updatedAt: Date;
    },
    contract: {
      id: string;
      tenantId: string;
      admissionRequestId: string;
      contractType: string;
      effectiveFrom: Date;
      status: string;
      notes: string | null;
      createdBy: string | null;
      createdAt: Date;
      updatedAt: Date;
    } | null,
    eventCode: string,
    actor?: string,
    notes?: string,
  ): Prisma.InputJsonValue {
    const payload: Record<string, string> = {
      admissionId: admission.id,
      tenantId: admission.tenantId,
      personId: admission.personId,
      companyId: admission.companyId,
      employeeId: admission.employeeId,
      eventCode,
      status: admission.status,
      source: 'admission',
    };

    if (admission.requestedBy) {
      payload.requestedBy = admission.requestedBy;
    }

    if (contract?.id) {
      payload.contractId = contract.id;
      payload.contractType = contract.contractType;
      payload.effectiveFrom = contract.effectiveFrom.toISOString();
    }

    if (actor) {
      payload.actor = actor;
    }

    if (notes) {
      payload.notes = notes;
    }

    return payload as Prisma.InputJsonValue;
  }

  private buildTerminationEsocialPayload(
    termination: {
      id: string;
      tenantId: string;
      employeeId: string;
      status: string;
      reason: string;
      effectiveAt: Date;
      noticeType: string | null;
      requestedBy: string | null;
      requestedAt: Date;
      approvedBy: string | null;
      approvedAt: Date | null;
      effectiveBy: string | null;
      effectiveOn: Date | null;
      cancelledBy: string | null;
      cancelledAt: Date | null;
      notes: string | null;
      createdAt: Date;
      updatedAt: Date;
    },
    offboarding: {
      id: string;
      tenantId: string;
      terminationRequestId: string;
      employeeId: string;
      status: string;
      requestedBy: string | null;
      requestedAt: Date;
      closedBy: string | null;
      closedAt: Date | null;
      cancelledBy: string | null;
      cancelledAt: Date | null;
      notes: string | null;
      createdAt: Date;
      updatedAt: Date;
    },
    eventCode: string,
    actor?: string,
    notes?: string,
  ): Prisma.InputJsonValue {
    const payload: Record<string, string> = {
      terminationId: termination.id,
      tenantId: termination.tenantId,
      employeeId: termination.employeeId,
      reason: termination.reason,
      eventCode,
      status: termination.status,
      source: 'termination',
      offboardingId: offboarding.id,
    };

    payload.effectiveAt = termination.effectiveAt.toISOString();

    if (termination.requestedBy) {
      payload.requestedBy = termination.requestedBy;
    }

    if (termination.noticeType) {
      payload.noticeType = termination.noticeType;
    }

    if (offboarding.closedBy) {
      payload.offboardingClosedBy = offboarding.closedBy;
    }

    if (offboarding.closedAt) {
      payload.offboardingClosedAt = offboarding.closedAt.toISOString();
    }

    if (actor) {
      payload.actor = actor;
    }

    if (notes) {
      payload.notes = notes;
    }

    return payload as Prisma.InputJsonValue;
  }

  async recordPointMark(tenantId: string, employeeId: string, occurredAt?: string): Promise<PointMarkRecord> {
    await this.requireTenant(tenantId);
    await this.requireEmployee(tenantId, employeeId);
    const activeTermination = await this.prisma.terminationRequest.findFirst({
      where: {
        tenantId,
        employeeId,
        status: 'effective',
      },
    });
    if (activeTermination) {
      throw new ConflictException(`employee ${employeeId} is terminated`);
    }

    const moment = occurredAt ? new Date(occurredAt) : new Date();
    if (Number.isNaN(moment.getTime())) {
      throw new ConflictException(`invalid occurredAt ${occurredAt}`);
    }

    const now = new Date();
    const pointMark = await this.prisma.$transaction(async (tx) => {
      const created = await tx.pointMark.create({
        data: {
          tenantId,
          employeeId,
          occurredAt: moment,
        },
      });

      await tx.auditEvent.create({
        data: this.auditData(
          tenantId,
          'point_mark.recorded',
          'pointMark',
          created.id,
          { employeeId, occurredAt: moment.toISOString() },
          now,
        ),
      });

      return created;
    });

    return this.toPointMarkRecord(pointMark);
  }

  async listPointMarks(tenantId: string): Promise<PointMarkRecord[]> {
    await this.requireTenant(tenantId);
    const marks = await this.prisma.pointMark.findMany({
      where: { tenantId },
      orderBy: { occurredAt: 'desc' },
    });

    return marks.map((mark) => this.toPointMarkRecord(mark));
  }

  async getPointMarkReceipt(tenantId: string, pointMarkId: string): Promise<PointMarkReceiptRecord> {
    await this.requireTenant(tenantId);
    const now = new Date();
    const result = await this.prisma.$transaction(async (tx) => {
      const pointMark = await tx.pointMark.findFirst({
        where: { id: pointMarkId, tenantId },
        include: {
          employee: true,
        },
      });

      if (!pointMark) {
        throw new NotFoundException(`point mark ${pointMarkId} not found`);
      }

      const receiptNumber = `PM-${pointMark.id.slice(0, 8).toUpperCase()}`;
      const generatedAt = now.toISOString();

      await tx.auditEvent.create({
        data: this.auditData(
          tenantId,
          'point_mark.receipt.generated',
          'pointMark',
          pointMark.id,
          { receiptNumber, employeeId: pointMark.employeeId },
          now,
        ),
      });

      return {
        receiptNumber,
        generatedAt,
        pointMark: this.toPointMarkRecord(pointMark),
        employee: this.toEmployeeRecord(pointMark.employee),
        title: 'Comprovante de marcacao',
        content: {
          receiptNumber,
          pointMarkId: pointMark.id,
          employeeId: pointMark.employeeId,
          occurredAt: pointMark.occurredAt.toISOString(),
          generatedAt,
        },
      };
    });

    return result;
  }

  async createPointHolidayCalendar(
    tenantId: string,
    payload: {
      companyId?: string;
      locale?: string;
      title: string;
      isNational?: boolean;
      validFrom: string;
      validUntil?: string;
      notes?: string;
    },
    actor?: string,
  ): Promise<PointHolidayCalendarRecord> {
    await this.requireTenant(tenantId);
    if (payload.companyId) {
      await this.requireCompany(tenantId, payload.companyId);
    }

    const validFrom = new Date(payload.validFrom);
    const validUntil = payload.validUntil ? new Date(payload.validUntil) : undefined;
    if (Number.isNaN(validFrom.getTime()) || (validUntil && Number.isNaN(validUntil.getTime()))) {
      throw new ConflictException('invalid holiday calendar dates');
    }

    const now = new Date();
    const rows = await this.prisma.$queryRaw<
      Array<{
        id: string;
        tenantId: string;
        companyId: string | null;
        locale: string | null;
        title: string;
        isNational: boolean;
        validFrom: Date;
        validUntil: Date | null;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
      }>
    >`
      INSERT INTO "point_holiday_calendars"
        ("id", "tenantId", "companyId", "locale", "title", "isNational", "validFrom", "validUntil", "notes", "createdAt", "updatedAt")
      VALUES
        (${randomUUID()}, ${tenantId}, ${payload.companyId ?? null}, ${payload.locale ?? null}, ${payload.title}, ${payload.isNational ?? false}, ${validFrom}, ${validUntil ?? null}, ${payload.notes ?? null}, ${now}, ${now})
      RETURNING *;
    `;

    const created = rows[0];
    if (!created) {
      throw new ConflictException('failed to create point holiday calendar');
    }

    await this.prisma.auditEvent.create({
      data: this.auditData(
        tenantId,
        'point.holiday_calendar.created',
        'pointHolidayCalendar',
        created.id,
        {
          companyId: created.companyId ?? undefined,
          locale: created.locale ?? undefined,
          title: created.title,
          isNational: String(created.isNational),
          actor,
        },
        now,
      ),
    });

    return this.toPointHolidayCalendarRecord(created);
  }

  async updatePointHolidayCalendar(
    tenantId: string,
    holidayCalendarId: string,
    payload: {
      companyId?: string;
      locale?: string;
      title?: string;
      isNational?: boolean;
      validFrom?: string;
      validUntil?: string;
      notes?: string;
    },
    actor?: string,
  ): Promise<PointHolidayCalendarRecord> {
    await this.requireTenant(tenantId);
    const current = await this.prisma.pointHolidayCalendar.findFirst({
      where: { id: holidayCalendarId, tenantId },
    });
    if (!current) {
      throw new NotFoundException(`point holiday calendar ${holidayCalendarId} not found`);
    }

    if (payload.companyId !== undefined) {
      await this.requireCompany(tenantId, payload.companyId);
    }

    const validFrom = payload.validFrom !== undefined ? new Date(payload.validFrom) : current.validFrom;
    const validUntil =
      payload.validUntil !== undefined ? new Date(payload.validUntil) : current.validUntil ?? undefined;
    if (Number.isNaN(validFrom.getTime()) || (validUntil && Number.isNaN(validUntil.getTime()))) {
      throw new ConflictException('invalid holiday calendar dates');
    }

    const now = new Date();
    const rows = await this.prisma.$queryRaw<
      Array<{
        id: string;
        tenantId: string;
        companyId: string | null;
        locale: string | null;
        title: string;
        isNational: boolean;
        validFrom: Date;
        validUntil: Date | null;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
      }>
    >`
      UPDATE "point_holiday_calendars"
      SET
        "companyId" = ${payload.companyId !== undefined ? payload.companyId : current.companyId},
        "locale" = ${payload.locale !== undefined ? payload.locale : current.locale},
        "title" = ${payload.title !== undefined ? payload.title : current.title},
        "isNational" = ${payload.isNational !== undefined ? payload.isNational : current.isNational},
        "validFrom" = ${validFrom},
        "validUntil" = ${validUntil ?? null},
        "notes" = ${payload.notes !== undefined ? payload.notes : current.notes},
        "updatedAt" = ${now}
      WHERE "id" = ${holidayCalendarId} AND "tenantId" = ${tenantId}
      RETURNING *;
    `;

    const updated = rows[0];
    if (!updated) {
      throw new ConflictException('failed to update point holiday calendar');
    }

    await this.prisma.auditEvent.create({
      data: this.auditData(
        tenantId,
        'point.holiday_calendar.updated',
        'pointHolidayCalendar',
        updated.id,
        {
          companyId: updated.companyId ?? undefined,
          locale: updated.locale ?? undefined,
          title: updated.title,
          isNational: String(updated.isNational),
          actor,
        },
        now,
      ),
    });

    return this.toPointHolidayCalendarRecord(updated);
  }

  async listPointHolidayCalendars(tenantId: string): Promise<PointHolidayCalendarRecord[]> {
    await this.requireTenant(tenantId);
    const rows = await this.prisma.$queryRaw<
      Array<{
        id: string;
        tenantId: string;
        companyId: string | null;
        locale: string | null;
        title: string;
        isNational: boolean;
        validFrom: Date;
        validUntil: Date | null;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
      }>
    >`
      SELECT * FROM "point_holiday_calendars"
      WHERE "tenantId" = ${tenantId}
      ORDER BY "isNational" DESC, "validFrom" DESC, "createdAt" DESC;
    `;

    return rows.map((row) => this.toPointHolidayCalendarRecord(row));
  }

  async createPointToleranceRule(
    tenantId: string,
    payload: {
      companyId?: string;
      profile?: string;
      jornada?: string;
      toleranceMinutes: number;
      validFrom: string;
      validUntil?: string;
      notes?: string;
    },
    actor?: string,
  ): Promise<PointToleranceRuleRecord> {
    await this.requireTenant(tenantId);
    if (payload.companyId) {
      await this.requireCompany(tenantId, payload.companyId);
    }

    const validFrom = new Date(payload.validFrom);
    const validUntil = payload.validUntil ? new Date(payload.validUntil) : undefined;
    if (Number.isNaN(validFrom.getTime()) || (validUntil && Number.isNaN(validUntil.getTime()))) {
      throw new ConflictException('invalid tolerance rule dates');
    }

    const now = new Date();
    const rows = await this.prisma.$queryRaw<
      Array<{
        id: string;
        tenantId: string;
        companyId: string | null;
        profile: string | null;
        jornada: string | null;
        toleranceMinutes: number;
        validFrom: Date;
        validUntil: Date | null;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
      }>
    >`
      INSERT INTO "point_tolerance_rules"
        ("id", "tenantId", "companyId", "profile", "jornada", "toleranceMinutes", "validFrom", "validUntil", "notes", "createdAt", "updatedAt")
      VALUES
        (${randomUUID()}, ${tenantId}, ${payload.companyId ?? null}, ${payload.profile ?? null}, ${payload.jornada ?? null}, ${payload.toleranceMinutes}, ${validFrom}, ${validUntil ?? null}, ${payload.notes ?? null}, ${now}, ${now})
      RETURNING *;
    `;

    const created = rows[0];
    if (!created) {
      throw new ConflictException('failed to create point tolerance rule');
    }

    await this.prisma.auditEvent.create({
      data: this.auditData(
        tenantId,
        'point.tolerance_rule.created',
        'pointToleranceRule',
        created.id,
        {
          companyId: created.companyId ?? undefined,
          profile: created.profile ?? undefined,
          jornada: created.jornada ?? undefined,
          toleranceMinutes: String(created.toleranceMinutes),
          actor,
        },
        now,
      ),
    });

    return this.toPointToleranceRuleRecord(created);
  }

  async updatePointToleranceRule(
    tenantId: string,
    toleranceRuleId: string,
    payload: {
      companyId?: string;
      profile?: string;
      jornada?: string;
      toleranceMinutes?: number;
      validFrom?: string;
      validUntil?: string;
      notes?: string;
    },
    actor?: string,
  ): Promise<PointToleranceRuleRecord> {
    await this.requireTenant(tenantId);
    const current = await this.prisma.pointToleranceRule.findFirst({
      where: { id: toleranceRuleId, tenantId },
    });
    if (!current) {
      throw new NotFoundException(`point tolerance rule ${toleranceRuleId} not found`);
    }

    if (payload.companyId !== undefined) {
      await this.requireCompany(tenantId, payload.companyId);
    }

    const validFrom = payload.validFrom !== undefined ? new Date(payload.validFrom) : current.validFrom;
    const validUntil =
      payload.validUntil !== undefined ? new Date(payload.validUntil) : current.validUntil ?? undefined;
    if (Number.isNaN(validFrom.getTime()) || (validUntil && Number.isNaN(validUntil.getTime()))) {
      throw new ConflictException('invalid tolerance rule dates');
    }

    const toleranceMinutes = payload.toleranceMinutes !== undefined ? payload.toleranceMinutes : current.toleranceMinutes;
    const now = new Date();
    const rows = await this.prisma.$queryRaw<
      Array<{
        id: string;
        tenantId: string;
        companyId: string | null;
        profile: string | null;
        jornada: string | null;
        toleranceMinutes: number;
        validFrom: Date;
        validUntil: Date | null;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
      }>
    >`
      UPDATE "point_tolerance_rules"
      SET
        "companyId" = ${payload.companyId !== undefined ? payload.companyId : current.companyId},
        "profile" = ${payload.profile !== undefined ? payload.profile : current.profile},
        "jornada" = ${payload.jornada !== undefined ? payload.jornada : current.jornada},
        "toleranceMinutes" = ${toleranceMinutes},
        "validFrom" = ${validFrom},
        "validUntil" = ${validUntil ?? null},
        "notes" = ${payload.notes !== undefined ? payload.notes : current.notes},
        "updatedAt" = ${now}
      WHERE "id" = ${toleranceRuleId} AND "tenantId" = ${tenantId}
      RETURNING *;
    `;

    const updated = rows[0];
    if (!updated) {
      throw new ConflictException('failed to update point tolerance rule');
    }

    await this.prisma.auditEvent.create({
      data: this.auditData(
        tenantId,
        'point.tolerance_rule.updated',
        'pointToleranceRule',
        updated.id,
        {
          companyId: updated.companyId ?? undefined,
          profile: updated.profile ?? undefined,
          jornada: updated.jornada ?? undefined,
          toleranceMinutes: String(updated.toleranceMinutes),
          actor,
        },
        now,
      ),
    });

    return this.toPointToleranceRuleRecord(updated);
  }

  async listPointToleranceRules(tenantId: string): Promise<PointToleranceRuleRecord[]> {
    await this.requireTenant(tenantId);
    const rows = await this.prisma.$queryRaw<
      Array<{
        id: string;
        tenantId: string;
        companyId: string | null;
        profile: string | null;
        jornada: string | null;
        toleranceMinutes: number;
        validFrom: Date;
        validUntil: Date | null;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
      }>
    >`
      SELECT * FROM "point_tolerance_rules"
      WHERE "tenantId" = ${tenantId}
      ORDER BY "validFrom" DESC, "createdAt" DESC;
    `;

    return rows.map((row) => this.toPointToleranceRuleRecord(row));
  }

  async createPointDevice(
    tenantId: string,
    payload: {
      companyId?: string;
      label: string;
      deviceType: string;
      status?: string;
      supportsOffline?: boolean;
      supportsBiometrics?: boolean;
      supportsGeo?: boolean;
      notes?: string;
    },
    actor?: string,
  ): Promise<PointDeviceRecord> {
    await this.requireTenant(tenantId);
    if (payload.companyId) {
      await this.requireCompany(tenantId, payload.companyId);
    }

    const now = new Date();
    const rows = await this.prisma.$queryRaw<
      Array<{
        id: string;
        tenantId: string;
        companyId: string | null;
        label: string;
        deviceType: string;
        status: string;
        supportsOffline: boolean;
        supportsBiometrics: boolean;
        supportsGeo: boolean;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
      }>
    >`
      INSERT INTO "point_devices"
        ("id", "tenantId", "companyId", "label", "deviceType", "status", "supportsOffline", "supportsBiometrics", "supportsGeo", "notes", "createdAt", "updatedAt")
      VALUES
        (${randomUUID()}, ${tenantId}, ${payload.companyId ?? null}, ${payload.label}, ${payload.deviceType}, ${payload.status ?? 'active'}, ${payload.supportsOffline ?? false}, ${payload.supportsBiometrics ?? false}, ${payload.supportsGeo ?? false}, ${payload.notes ?? null}, ${now}, ${now})
      RETURNING *;
    `;

    const created = rows[0];
    if (!created) {
      throw new ConflictException('failed to create point device');
    }

    await this.prisma.auditEvent.create({
      data: this.auditData(
        tenantId,
        'point.device.created',
        'pointDevice',
        created.id,
        {
          companyId: created.companyId ?? undefined,
          label: created.label,
          deviceType: created.deviceType,
          status: created.status,
          actor,
        },
        now,
      ),
    });

    return this.toPointDeviceRecord(created);
  }

  async updatePointDevice(
    tenantId: string,
    deviceId: string,
    payload: {
      companyId?: string;
      label?: string;
      deviceType?: string;
      status?: string;
      supportsOffline?: boolean;
      supportsBiometrics?: boolean;
      supportsGeo?: boolean;
      notes?: string;
    },
    actor?: string,
  ): Promise<PointDeviceRecord> {
    await this.requireTenant(tenantId);
    const current = await this.prisma.pointDevice.findFirst({
      where: { id: deviceId, tenantId },
    });
    if (!current) {
      throw new NotFoundException(`point device ${deviceId} not found`);
    }

    if (payload.companyId !== undefined) {
      await this.requireCompany(tenantId, payload.companyId);
    }

    const now = new Date();
    const rows = await this.prisma.$queryRaw<
      Array<{
        id: string;
        tenantId: string;
        companyId: string | null;
        label: string;
        deviceType: string;
        status: string;
        supportsOffline: boolean;
        supportsBiometrics: boolean;
        supportsGeo: boolean;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
      }>
    >`
      UPDATE "point_devices"
      SET
        "companyId" = ${payload.companyId !== undefined ? payload.companyId : current.companyId},
        "label" = ${payload.label !== undefined ? payload.label : current.label},
        "deviceType" = ${payload.deviceType !== undefined ? payload.deviceType : current.deviceType},
        "status" = ${payload.status !== undefined ? payload.status : current.status},
        "supportsOffline" = ${payload.supportsOffline !== undefined ? payload.supportsOffline : current.supportsOffline},
        "supportsBiometrics" = ${payload.supportsBiometrics !== undefined ? payload.supportsBiometrics : current.supportsBiometrics},
        "supportsGeo" = ${payload.supportsGeo !== undefined ? payload.supportsGeo : current.supportsGeo},
        "notes" = ${payload.notes !== undefined ? payload.notes : current.notes},
        "updatedAt" = ${now}
      WHERE "id" = ${deviceId} AND "tenantId" = ${tenantId}
      RETURNING *;
    `;

    const updated = rows[0];
    if (!updated) {
      throw new ConflictException('failed to update point device');
    }

    await this.prisma.auditEvent.create({
      data: this.auditData(
        tenantId,
        'point.device.updated',
        'pointDevice',
        updated.id,
        {
          companyId: updated.companyId ?? undefined,
          label: updated.label,
          deviceType: updated.deviceType,
          status: updated.status,
          actor,
        },
        now,
      ),
    });

    return this.toPointDeviceRecord(updated);
  }

  async listPointDevices(tenantId: string): Promise<PointDeviceRecord[]> {
    await this.requireTenant(tenantId);
    const rows = await this.prisma.$queryRaw<
      Array<{
        id: string;
        tenantId: string;
        companyId: string | null;
        label: string;
        deviceType: string;
        status: string;
        supportsOffline: boolean;
        supportsBiometrics: boolean;
        supportsGeo: boolean;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
      }>
    >`
      SELECT * FROM "point_devices"
      WHERE "tenantId" = ${tenantId}
      ORDER BY "createdAt" DESC;
    `;

    return rows.map((row) => this.toPointDeviceRecord(row));
  }

  async createOccupationalHealthEnvironment(
    tenantId: string,
    payload: {
      companyId?: string;
      code: string;
      name: string;
      sector?: string;
      active?: boolean;
      validFrom: string;
      validUntil?: string;
      notes?: string;
    },
    actor?: string,
  ): Promise<OccupationalHealthEnvironmentRecord> {
    await this.requireTenant(tenantId);
    if (payload.companyId) {
      await this.requireCompany(tenantId, payload.companyId);
    }

    const validFrom = new Date(payload.validFrom);
    const validUntil = payload.validUntil ? new Date(payload.validUntil) : undefined;
    if (Number.isNaN(validFrom.getTime()) || (validUntil && Number.isNaN(validUntil.getTime()))) {
      throw new ConflictException('invalid occupational health environment dates');
    }

    const existing = await this.prisma.occupationalHealthEnvironment.findUnique({
      where: {
        tenantId_code: {
          tenantId,
          code: payload.code,
        },
      },
    });
    if (existing) {
      throw new ConflictException(`occupational health environment code ${payload.code} already exists`);
    }

    const now = new Date();
    const created = await this.prisma.occupationalHealthEnvironment.create({
      data: {
        tenantId,
        companyId: payload.companyId ?? null,
        code: payload.code,
        name: payload.name,
        sector: payload.sector ?? null,
        active: payload.active ?? true,
        validFrom,
        validUntil: validUntil ?? null,
        notes: payload.notes ?? null,
      },
    });

    await this.prisma.auditEvent.create({
      data: this.auditData(
        tenantId,
        'occupational_health.environment.created',
        'occupationalHealthEnvironment',
        created.id,
        {
          companyId: created.companyId ?? undefined,
          code: created.code,
          name: created.name,
          active: String(created.active),
          actor,
        },
        now,
      ),
    });

    return this.toOccupationalHealthEnvironmentRecord(created);
  }

  async updateOccupationalHealthEnvironment(
    tenantId: string,
    environmentId: string,
    payload: {
      companyId?: string;
      code?: string;
      name?: string;
      sector?: string;
      active?: boolean;
      validFrom?: string;
      validUntil?: string;
      notes?: string;
    },
    actor?: string,
  ): Promise<OccupationalHealthEnvironmentRecord> {
    await this.requireTenant(tenantId);
    const current = await this.prisma.occupationalHealthEnvironment.findFirst({
      where: { id: environmentId, tenantId },
    });
    if (!current) {
      throw new NotFoundException(`occupational health environment ${environmentId} not found`);
    }

    if (payload.companyId !== undefined) {
      await this.requireCompany(tenantId, payload.companyId);
    }

    const validFrom = payload.validFrom !== undefined ? new Date(payload.validFrom) : current.validFrom;
    const validUntil =
      payload.validUntil !== undefined ? new Date(payload.validUntil) : current.validUntil ?? undefined;
    if (Number.isNaN(validFrom.getTime()) || (validUntil && Number.isNaN(validUntil.getTime()))) {
      throw new ConflictException('invalid occupational health environment dates');
    }

    const now = new Date();
    const updated = await this.prisma.occupationalHealthEnvironment.update({
      where: { id: current.id },
      data: {
        companyId: payload.companyId !== undefined ? payload.companyId : current.companyId,
        code: payload.code !== undefined ? payload.code : current.code,
        name: payload.name !== undefined ? payload.name : current.name,
        sector: payload.sector !== undefined ? payload.sector : current.sector,
        active: payload.active !== undefined ? payload.active : current.active,
        validFrom,
        validUntil: validUntil ?? null,
        notes: payload.notes !== undefined ? payload.notes : current.notes,
      },
    });

    await this.prisma.auditEvent.create({
      data: this.auditData(
        tenantId,
        'occupational_health.environment.updated',
        'occupationalHealthEnvironment',
        updated.id,
        {
          companyId: updated.companyId ?? undefined,
          code: updated.code,
          name: updated.name,
          active: String(updated.active),
          actor,
        },
        now,
      ),
    });

    return this.toOccupationalHealthEnvironmentRecord(updated);
  }

  async listOccupationalHealthEnvironments(tenantId: string): Promise<OccupationalHealthEnvironmentRecord[]> {
    await this.requireTenant(tenantId);
    const environments = await this.prisma.occupationalHealthEnvironment.findMany({
      where: { tenantId },
      orderBy: [{ active: 'desc' }, { validFrom: 'desc' }, { createdAt: 'desc' }],
    });

    return environments.map((environment) => this.toOccupationalHealthEnvironmentRecord(environment));
  }

  async createOccupationalHealthRisk(
    tenantId: string,
    environmentId: string,
    payload: {
      code: string;
      name: string;
      severity: string;
      probability: string;
      controlMeasure?: string;
      active?: boolean;
      validFrom: string;
      validUntil?: string;
      notes?: string;
    },
    actor?: string,
  ): Promise<OccupationalHealthRiskRecord> {
    await this.requireTenant(tenantId);
    const environment = await this.prisma.occupationalHealthEnvironment.findFirst({
      where: { id: environmentId, tenantId },
    });
    if (!environment) {
      throw new NotFoundException(`occupational health environment ${environmentId} not found`);
    }

    const validFrom = new Date(payload.validFrom);
    const validUntil = payload.validUntil ? new Date(payload.validUntil) : undefined;
    if (Number.isNaN(validFrom.getTime()) || (validUntil && Number.isNaN(validUntil.getTime()))) {
      throw new ConflictException('invalid occupational health risk dates');
    }

    const existing = await this.prisma.occupationalHealthRisk.findUnique({
      where: {
        tenantId_environmentId_code: {
          tenantId,
          environmentId,
          code: payload.code,
        },
      },
    });
    if (existing) {
      throw new ConflictException(`occupational health risk code ${payload.code} already exists in environment ${environmentId}`);
    }

    const now = new Date();
    const created = await this.prisma.occupationalHealthRisk.create({
      data: {
        tenantId,
        environmentId,
        code: payload.code,
        name: payload.name,
        severity: payload.severity,
        probability: payload.probability,
        controlMeasure: payload.controlMeasure ?? null,
        active: payload.active ?? true,
        validFrom,
        validUntil: validUntil ?? null,
        notes: payload.notes ?? null,
      },
    });

    await this.prisma.auditEvent.create({
      data: this.auditData(
        tenantId,
        'occupational_health.risk.created',
        'occupationalHealthRisk',
        created.id,
        {
          environmentId,
          code: created.code,
          name: created.name,
          severity: created.severity,
          probability: created.probability,
          actor,
        },
        now,
      ),
    });

    return this.toOccupationalHealthRiskRecord(created);
  }

  async updateOccupationalHealthRisk(
    tenantId: string,
    environmentId: string,
    riskId: string,
    payload: {
      code?: string;
      name?: string;
      severity?: string;
      probability?: string;
      controlMeasure?: string;
      active?: boolean;
      validFrom?: string;
      validUntil?: string;
      notes?: string;
    },
    actor?: string,
  ): Promise<OccupationalHealthRiskRecord> {
    await this.requireTenant(tenantId);
    const current = await this.prisma.occupationalHealthRisk.findFirst({
      where: { id: riskId, tenantId, environmentId },
    });
    if (!current) {
      throw new NotFoundException(`occupational health risk ${riskId} not found`);
    }

    const validFrom = payload.validFrom !== undefined ? new Date(payload.validFrom) : current.validFrom;
    const validUntil =
      payload.validUntil !== undefined ? new Date(payload.validUntil) : current.validUntil ?? undefined;
    if (Number.isNaN(validFrom.getTime()) || (validUntil && Number.isNaN(validUntil.getTime()))) {
      throw new ConflictException('invalid occupational health risk dates');
    }

    const nextCode = payload.code !== undefined ? payload.code : current.code;
    if (nextCode !== current.code) {
      const existing = await this.prisma.occupationalHealthRisk.findUnique({
        where: {
          tenantId_environmentId_code: {
            tenantId,
            environmentId,
            code: nextCode,
          },
        },
      });
      if (existing && existing.id !== current.id) {
        throw new ConflictException(`occupational health risk code ${nextCode} already exists in environment ${environmentId}`);
      }
    }

    const now = new Date();
    const updated = await this.prisma.occupationalHealthRisk.update({
      where: { id: current.id },
      data: {
        environmentId,
        code: nextCode,
        name: payload.name !== undefined ? payload.name : current.name,
        severity: payload.severity !== undefined ? payload.severity : current.severity,
        probability: payload.probability !== undefined ? payload.probability : current.probability,
        controlMeasure: payload.controlMeasure !== undefined ? payload.controlMeasure : current.controlMeasure,
        active: payload.active !== undefined ? payload.active : current.active,
        validFrom,
        validUntil: validUntil ?? null,
        notes: payload.notes !== undefined ? payload.notes : current.notes,
      },
    });

    await this.prisma.auditEvent.create({
      data: this.auditData(
        tenantId,
        'occupational_health.risk.updated',
        'occupationalHealthRisk',
        updated.id,
        {
          environmentId,
          code: updated.code,
          name: updated.name,
          severity: updated.severity,
          probability: updated.probability,
          actor,
        },
        now,
      ),
    });

    return this.toOccupationalHealthRiskRecord(updated);
  }

  async listOccupationalHealthRisks(
    tenantId: string,
    environmentId?: string,
  ): Promise<OccupationalHealthRiskRecord[]> {
    await this.requireTenant(tenantId);
    const risks = await this.prisma.occupationalHealthRisk.findMany({
      where: {
        tenantId,
        environmentId: environmentId ?? undefined,
      },
      orderBy: [{ active: 'desc' }, { validFrom: 'desc' }, { createdAt: 'desc' }],
    });

    return risks.map((risk) => this.toOccupationalHealthRiskRecord(risk));
  }

  async createOccupationalHealthPgr(
    tenantId: string,
    payload: {
      companyId?: string;
      code: string;
      title: string;
      status?: string;
      validFrom: string;
      validUntil?: string;
      notes?: string;
    },
    actor?: string,
  ): Promise<OccupationalHealthPgrRecord> {
    await this.requireTenant(tenantId);
    if (payload.companyId) {
      await this.requireCompany(tenantId, payload.companyId);
    }

    const validFrom = new Date(payload.validFrom);
    const validUntil = payload.validUntil ? new Date(payload.validUntil) : undefined;
    if (Number.isNaN(validFrom.getTime()) || (validUntil && Number.isNaN(validUntil.getTime()))) {
      throw new ConflictException('invalid occupational health pgr dates');
    }

    const existing = await this.prisma.occupationalHealthPgr.findUnique({
      where: {
        tenantId_code: {
          tenantId,
          code: payload.code,
        },
      },
    });
    if (existing) {
      throw new ConflictException(`occupational health pgr code ${payload.code} already exists`);
    }

    const now = new Date();
    const created = await this.prisma.occupationalHealthPgr.create({
      data: {
        tenantId,
        companyId: payload.companyId ?? null,
        code: payload.code,
        title: payload.title,
        status: payload.status ?? 'draft',
        validFrom,
        validUntil: validUntil ?? null,
        notes: payload.notes ?? null,
      },
    });

    await this.prisma.auditEvent.create({
      data: this.auditData(
        tenantId,
        'occupational_health.pgr.created',
        'occupationalHealthPgr',
        created.id,
        {
          companyId: created.companyId ?? undefined,
          code: created.code,
          title: created.title,
          status: created.status,
          actor,
        },
        now,
      ),
    });

    return this.toOccupationalHealthPgrRecord(created);
  }

  async updateOccupationalHealthPgr(
    tenantId: string,
    pgrId: string,
    payload: {
      companyId?: string;
      code?: string;
      title?: string;
      status?: string;
      validFrom?: string;
      validUntil?: string;
      notes?: string;
    },
    actor?: string,
  ): Promise<OccupationalHealthPgrRecord> {
    await this.requireTenant(tenantId);
    const current = await this.prisma.occupationalHealthPgr.findFirst({
      where: { id: pgrId, tenantId },
    });
    if (!current) {
      throw new NotFoundException(`occupational health pgr ${pgrId} not found`);
    }

    if (payload.companyId !== undefined) {
      await this.requireCompany(tenantId, payload.companyId);
    }

    const validFrom = payload.validFrom !== undefined ? new Date(payload.validFrom) : current.validFrom;
    const validUntil =
      payload.validUntil !== undefined ? new Date(payload.validUntil) : current.validUntil ?? undefined;
    if (Number.isNaN(validFrom.getTime()) || (validUntil && Number.isNaN(validUntil.getTime()))) {
      throw new ConflictException('invalid occupational health pgr dates');
    }

    const nextCode = payload.code !== undefined ? payload.code : current.code;
    if (nextCode !== current.code) {
      const existing = await this.prisma.occupationalHealthPgr.findUnique({
        where: {
          tenantId_code: {
            tenantId,
            code: nextCode,
          },
        },
      });
      if (existing && existing.id !== current.id) {
        throw new ConflictException(`occupational health pgr code ${nextCode} already exists`);
      }
    }

    const now = new Date();
    const updated = await this.prisma.occupationalHealthPgr.update({
      where: { id: current.id },
      data: {
        companyId: payload.companyId !== undefined ? payload.companyId : current.companyId,
        code: nextCode,
        title: payload.title !== undefined ? payload.title : current.title,
        status: payload.status !== undefined ? payload.status : current.status,
        validFrom,
        validUntil: validUntil ?? null,
        notes: payload.notes !== undefined ? payload.notes : current.notes,
      },
    });

    await this.prisma.auditEvent.create({
      data: this.auditData(
        tenantId,
        'occupational_health.pgr.updated',
        'occupationalHealthPgr',
        updated.id,
        {
          companyId: updated.companyId ?? undefined,
          code: updated.code,
          title: updated.title,
          status: updated.status,
          actor,
        },
        now,
      ),
    });

    return this.toOccupationalHealthPgrRecord(updated);
  }

  async listOccupationalHealthPgrs(tenantId: string): Promise<OccupationalHealthPgrRecord[]> {
    await this.requireTenant(tenantId);
    const pgrs = await this.prisma.occupationalHealthPgr.findMany({
      where: { tenantId },
      orderBy: [{ validFrom: 'desc' }, { createdAt: 'desc' }],
    });

    return pgrs.map((pgr) => this.toOccupationalHealthPgrRecord(pgr));
  }

  async createOccupationalHealthPcmso(
    tenantId: string,
    payload: {
      companyId?: string;
      code: string;
      title: string;
      status?: string;
      validFrom: string;
      validUntil?: string;
      notes?: string;
    },
    actor?: string,
  ): Promise<OccupationalHealthPcmsoRecord> {
    await this.requireTenant(tenantId);
    if (payload.companyId) {
      await this.requireCompany(tenantId, payload.companyId);
    }

    const validFrom = new Date(payload.validFrom);
    const validUntil = payload.validUntil ? new Date(payload.validUntil) : undefined;
    if (Number.isNaN(validFrom.getTime()) || (validUntil && Number.isNaN(validUntil.getTime()))) {
      throw new ConflictException('invalid occupational health pcmso dates');
    }

    const existing = await this.prisma.occupationalHealthPcmso.findUnique({
      where: {
        tenantId_code: {
          tenantId,
          code: payload.code,
        },
      },
    });
    if (existing) {
      throw new ConflictException(`occupational health pcmso code ${payload.code} already exists`);
    }

    const now = new Date();
    const created = await this.prisma.occupationalHealthPcmso.create({
      data: {
        tenantId,
        companyId: payload.companyId ?? null,
        code: payload.code,
        title: payload.title,
        status: payload.status ?? 'draft',
        validFrom,
        validUntil: validUntil ?? null,
        notes: payload.notes ?? null,
      },
    });

    await this.prisma.auditEvent.create({
      data: this.auditData(
        tenantId,
        'occupational_health.pcmso.created',
        'occupationalHealthPcmso',
        created.id,
        {
          companyId: created.companyId ?? undefined,
          code: created.code,
          title: created.title,
          status: created.status,
          actor,
        },
        now,
      ),
    });

    return this.toOccupationalHealthPcmsoRecord(created);
  }

  async updateOccupationalHealthPcmso(
    tenantId: string,
    pcmsoId: string,
    payload: {
      companyId?: string;
      code?: string;
      title?: string;
      status?: string;
      validFrom?: string;
      validUntil?: string;
      notes?: string;
    },
    actor?: string,
  ): Promise<OccupationalHealthPcmsoRecord> {
    await this.requireTenant(tenantId);
    const current = await this.prisma.occupationalHealthPcmso.findFirst({
      where: { id: pcmsoId, tenantId },
    });
    if (!current) {
      throw new NotFoundException(`occupational health pcmso ${pcmsoId} not found`);
    }

    if (payload.companyId !== undefined) {
      await this.requireCompany(tenantId, payload.companyId);
    }

    const validFrom = payload.validFrom !== undefined ? new Date(payload.validFrom) : current.validFrom;
    const validUntil =
      payload.validUntil !== undefined ? new Date(payload.validUntil) : current.validUntil ?? undefined;
    if (Number.isNaN(validFrom.getTime()) || (validUntil && Number.isNaN(validUntil.getTime()))) {
      throw new ConflictException('invalid occupational health pcmso dates');
    }

    const nextCode = payload.code !== undefined ? payload.code : current.code;
    if (nextCode !== current.code) {
      const existing = await this.prisma.occupationalHealthPcmso.findUnique({
        where: {
          tenantId_code: {
            tenantId,
            code: nextCode,
          },
        },
      });
      if (existing && existing.id !== current.id) {
        throw new ConflictException(`occupational health pcmso code ${nextCode} already exists`);
      }
    }

    const now = new Date();
    const updated = await this.prisma.occupationalHealthPcmso.update({
      where: { id: current.id },
      data: {
        companyId: payload.companyId !== undefined ? payload.companyId : current.companyId,
        code: nextCode,
        title: payload.title !== undefined ? payload.title : current.title,
        status: payload.status !== undefined ? payload.status : current.status,
        validFrom,
        validUntil: validUntil ?? null,
        notes: payload.notes !== undefined ? payload.notes : current.notes,
      },
    });

    await this.prisma.auditEvent.create({
      data: this.auditData(
        tenantId,
        'occupational_health.pcmso.updated',
        'occupationalHealthPcmso',
        updated.id,
        {
          companyId: updated.companyId ?? undefined,
          code: updated.code,
          title: updated.title,
          status: updated.status,
          actor,
        },
        now,
      ),
    });

    return this.toOccupationalHealthPcmsoRecord(updated);
  }

  async listOccupationalHealthPcmsos(tenantId: string): Promise<OccupationalHealthPcmsoRecord[]> {
    await this.requireTenant(tenantId);
    const programs = await this.prisma.occupationalHealthPcmso.findMany({
      where: { tenantId },
      orderBy: [{ validFrom: 'desc' }, { createdAt: 'desc' }],
    });

    return programs.map((program) => this.toOccupationalHealthPcmsoRecord(program));
  }

  async createOccupationalHealthCat(
    tenantId: string,
    payload: {
      companyId?: string;
      employeeId: string;
      reportNumber: string;
      accidentType?: string;
      occurredAt: string;
      status?: string;
      description: string;
      notifiedAt?: string;
      notes?: string;
    },
    actor?: string,
  ): Promise<OccupationalHealthCatRecord> {
    await this.requireTenant(tenantId);
    if (payload.companyId) {
      await this.requireCompany(tenantId, payload.companyId);
    }
    await this.requireEmployee(tenantId, payload.employeeId);

    const occurredAt = new Date(payload.occurredAt);
    const notifiedAt = payload.notifiedAt ? new Date(payload.notifiedAt) : undefined;
    if (Number.isNaN(occurredAt.getTime()) || (notifiedAt && Number.isNaN(notifiedAt.getTime()))) {
      throw new ConflictException('invalid occupational health cat dates');
    }

    const existing = await this.prisma.occupationalHealthCat.findUnique({
      where: {
        tenantId_reportNumber: {
          tenantId,
          reportNumber: payload.reportNumber,
        },
      },
    });
    if (existing) {
      throw new ConflictException(`occupational health cat report ${payload.reportNumber} already exists`);
    }

    const now = new Date();
    const created = await this.prisma.occupationalHealthCat.create({
      data: {
        tenantId,
        companyId: payload.companyId ?? null,
        employeeId: payload.employeeId,
        reportNumber: payload.reportNumber,
        accidentType: payload.accidentType ?? null,
        occurredAt,
        status: payload.status ?? 'open',
        description: payload.description,
        notifiedAt: notifiedAt ?? null,
        notes: payload.notes ?? null,
      },
    });

    await this.prisma.auditEvent.create({
      data: this.auditData(
        tenantId,
        'occupational_health.cat.created',
        'occupationalHealthCat',
        created.id,
        {
          companyId: created.companyId ?? undefined,
          employeeId: created.employeeId,
          reportNumber: created.reportNumber,
          status: created.status,
          actor,
        },
        now,
      ),
    });

    return this.toOccupationalHealthCatRecord(created);
  }

  async listOccupationalHealthCats(tenantId: string): Promise<OccupationalHealthCatRecord[]> {
    await this.requireTenant(tenantId);
    const cats = await this.prisma.occupationalHealthCat.findMany({
      where: { tenantId },
      orderBy: [{ occurredAt: 'desc' }, { createdAt: 'desc' }],
    });

    return cats.map((cat) => this.toOccupationalHealthCatRecord(cat));
  }

  async createOccupationalHealthEpiCatalog(
    tenantId: string,
    payload: {
      companyId?: string;
      code: string;
      name: string;
      active?: boolean;
      validFrom: string;
      validUntil?: string;
      notes?: string;
    },
    actor?: string,
  ): Promise<OccupationalHealthEpiCatalogRecord> {
    await this.requireTenant(tenantId);
    if (payload.companyId) {
      await this.requireCompany(tenantId, payload.companyId);
    }

    const validFrom = new Date(payload.validFrom);
    const validUntil = payload.validUntil ? new Date(payload.validUntil) : undefined;
    if (Number.isNaN(validFrom.getTime()) || (validUntil && Number.isNaN(validUntil.getTime()))) {
      throw new ConflictException('invalid occupational health epi dates');
    }

    const existing = await this.prisma.occupationalHealthEpiCatalog.findUnique({
      where: {
        tenantId_code: {
          tenantId,
          code: payload.code,
        },
      },
    });
    if (existing) {
      throw new ConflictException(`occupational health epi code ${payload.code} already exists`);
    }

    const now = new Date();
    const created = await this.prisma.occupationalHealthEpiCatalog.create({
      data: {
        tenantId,
        companyId: payload.companyId ?? null,
        code: payload.code,
        name: payload.name,
        active: payload.active ?? true,
        validFrom,
        validUntil: validUntil ?? null,
        notes: payload.notes ?? null,
      },
    });

    await this.prisma.auditEvent.create({
      data: this.auditData(
        tenantId,
        'occupational_health.epi_catalog.created',
        'occupationalHealthEpiCatalog',
        created.id,
        {
          companyId: created.companyId ?? undefined,
          code: created.code,
          name: created.name,
          active: String(created.active),
          actor,
        },
        now,
      ),
    });

    return this.toOccupationalHealthEpiCatalogRecord(created);
  }

  async updateOccupationalHealthEpiCatalog(
    tenantId: string,
    epiCatalogId: string,
    payload: {
      companyId?: string;
      code?: string;
      name?: string;
      active?: boolean;
      validFrom?: string;
      validUntil?: string;
      notes?: string;
    },
    actor?: string,
  ): Promise<OccupationalHealthEpiCatalogRecord> {
    await this.requireTenant(tenantId);
    const current = await this.prisma.occupationalHealthEpiCatalog.findFirst({
      where: { id: epiCatalogId, tenantId },
    });
    if (!current) {
      throw new NotFoundException(`occupational health epi catalog ${epiCatalogId} not found`);
    }

    if (payload.companyId !== undefined) {
      await this.requireCompany(tenantId, payload.companyId);
    }

    const validFrom = payload.validFrom !== undefined ? new Date(payload.validFrom) : current.validFrom;
    const validUntil =
      payload.validUntil !== undefined ? new Date(payload.validUntil) : current.validUntil ?? undefined;
    if (Number.isNaN(validFrom.getTime()) || (validUntil && Number.isNaN(validUntil.getTime()))) {
      throw new ConflictException('invalid occupational health epi dates');
    }

    const nextCode = payload.code !== undefined ? payload.code : current.code;
    if (nextCode !== current.code) {
      const existing = await this.prisma.occupationalHealthEpiCatalog.findUnique({
        where: {
          tenantId_code: {
            tenantId,
            code: nextCode,
          },
        },
      });
      if (existing && existing.id !== current.id) {
        throw new ConflictException(`occupational health epi code ${nextCode} already exists`);
      }
    }

    const now = new Date();
    const updated = await this.prisma.occupationalHealthEpiCatalog.update({
      where: { id: current.id },
      data: {
        companyId: payload.companyId !== undefined ? payload.companyId : current.companyId,
        code: nextCode,
        name: payload.name !== undefined ? payload.name : current.name,
        active: payload.active !== undefined ? payload.active : current.active,
        validFrom,
        validUntil: validUntil ?? null,
        notes: payload.notes !== undefined ? payload.notes : current.notes,
      },
    });

    await this.prisma.auditEvent.create({
      data: this.auditData(
        tenantId,
        'occupational_health.epi_catalog.updated',
        'occupationalHealthEpiCatalog',
        updated.id,
        {
          companyId: updated.companyId ?? undefined,
          code: updated.code,
          name: updated.name,
          active: String(updated.active),
          actor,
        },
        now,
      ),
    });

    return this.toOccupationalHealthEpiCatalogRecord(updated);
  }

  async listOccupationalHealthEpiCatalogs(tenantId: string): Promise<OccupationalHealthEpiCatalogRecord[]> {
    await this.requireTenant(tenantId);
    const catalogs = await this.prisma.occupationalHealthEpiCatalog.findMany({
      where: { tenantId },
      orderBy: [{ active: 'desc' }, { validFrom: 'desc' }, { createdAt: 'desc' }],
    });

    return catalogs.map((catalog) => this.toOccupationalHealthEpiCatalogRecord(catalog));
  }

  async deliverOccupationalHealthEpi(
    tenantId: string,
    payload: {
      employeeId: string;
      epiCatalogId: string;
      deliveredAt?: string;
      returnedAt?: string;
      status?: string;
      receivedBy?: string;
      notes?: string;
    },
    actor?: string,
  ): Promise<OccupationalHealthEpiAssignmentRecord> {
    await this.requireTenant(tenantId);
    const employee = await this.prisma.employee.findFirst({
      where: { id: payload.employeeId, tenantId },
    });
    if (!employee) {
      throw new NotFoundException(`employee ${payload.employeeId} not found`);
    }
    const catalog = await this.prisma.occupationalHealthEpiCatalog.findFirst({
      where: { id: payload.epiCatalogId, tenantId },
    });
    if (!catalog) {
      throw new NotFoundException(`occupational health epi catalog ${payload.epiCatalogId} not found`);
    }

    const deliveredAt = payload.deliveredAt ? new Date(payload.deliveredAt) : new Date();
    const returnedAt = payload.returnedAt ? new Date(payload.returnedAt) : undefined;
    if (Number.isNaN(deliveredAt.getTime()) || (returnedAt && Number.isNaN(returnedAt.getTime()))) {
      throw new ConflictException('invalid occupational health epi delivery dates');
    }

    const now = new Date();
    const created = await this.prisma.occupationalHealthEpiAssignment.create({
      data: {
        tenantId,
        companyId: employee.companyId,
        employeeId: payload.employeeId,
        epiCatalogId: payload.epiCatalogId,
        status: payload.status ?? 'delivered',
        deliveredAt,
        returnedAt: returnedAt ?? null,
        receivedBy: payload.receivedBy ?? null,
        notes: payload.notes ?? null,
      },
      include: {
        epiCatalog: true,
      },
    });

    await this.prisma.auditEvent.create({
      data: this.auditData(
        tenantId,
        'occupational_health.epi.delivered',
        'occupationalHealthEpiAssignment',
        created.id,
        {
          companyId: created.companyId ?? undefined,
          employeeId: created.employeeId,
          epiCatalogId: created.epiCatalogId,
          status: created.status,
          actor,
        },
        now,
      ),
    });

    return this.toOccupationalHealthEpiAssignmentRecord(created);
  }

  async listOccupationalHealthEpiAssignments(tenantId: string): Promise<OccupationalHealthEpiAssignmentRecord[]> {
    await this.requireTenant(tenantId);
    const assignments = await this.prisma.occupationalHealthEpiAssignment.findMany({
      where: { tenantId },
      include: {
        epiCatalog: true,
      },
      orderBy: [{ deliveredAt: 'desc' }, { createdAt: 'desc' }],
    });

    return assignments.map((assignment) => this.toOccupationalHealthEpiAssignmentRecord(assignment));
  }

  async createOccupationalHealthExam(
    tenantId: string,
    payload: {
      employeeId: string;
      environmentId?: string;
      examType: string;
      status?: string;
      scheduledAt: string;
      performedAt?: string;
      result?: string;
      expiresAt?: string;
      notes?: string;
    },
    actor?: string,
  ): Promise<OccupationalHealthExamRecord> {
    await this.requireTenant(tenantId);
    await this.requireEmployee(tenantId, payload.employeeId);

    if (payload.environmentId) {
      const environment = await this.prisma.occupationalHealthEnvironment.findFirst({
        where: { id: payload.environmentId, tenantId },
      });
      if (!environment) {
        throw new NotFoundException(`occupational health environment ${payload.environmentId} not found`);
      }
    }

    const scheduledAt = new Date(payload.scheduledAt);
    const performedAt = payload.performedAt ? new Date(payload.performedAt) : undefined;
    const expiresAt = payload.expiresAt ? new Date(payload.expiresAt) : undefined;
    if (
      Number.isNaN(scheduledAt.getTime()) ||
      (performedAt && Number.isNaN(performedAt.getTime())) ||
      (expiresAt && Number.isNaN(expiresAt.getTime()))
    ) {
      throw new ConflictException('invalid occupational health exam dates');
    }

    const now = new Date();
    const created = await this.prisma.occupationalHealthExam.create({
      data: {
        tenantId,
        employeeId: payload.employeeId,
        environmentId: payload.environmentId ?? null,
        examType: payload.examType,
        status: payload.status ?? 'scheduled',
        scheduledAt,
        performedAt: performedAt ?? null,
        result: payload.result ?? null,
        expiresAt: expiresAt ?? null,
        notes: payload.notes ?? null,
      },
      include: {
        aso: true,
      },
    });

    await this.prisma.auditEvent.create({
      data: this.auditData(
        tenantId,
        'occupational_health.exam.created',
        'occupationalHealthExam',
        created.id,
        {
          employeeId: created.employeeId,
          environmentId: created.environmentId ?? undefined,
          examType: created.examType,
          status: created.status,
          actor,
        },
        now,
      ),
    });

    return this.toOccupationalHealthExamRecord(created);
  }

  async updateOccupationalHealthExam(
    tenantId: string,
    examId: string,
    payload: {
      employeeId?: string;
      environmentId?: string;
      examType?: string;
      status?: string;
      scheduledAt?: string;
      performedAt?: string;
      result?: string;
      expiresAt?: string;
      notes?: string;
    },
    actor?: string,
  ): Promise<OccupationalHealthExamRecord> {
    await this.requireTenant(tenantId);
    const current = await this.prisma.occupationalHealthExam.findFirst({
      where: { id: examId, tenantId },
      include: {
        aso: true,
      },
    });
    if (!current) {
      throw new NotFoundException(`occupational health exam ${examId} not found`);
    }

    const nextEmployeeId = payload.employeeId !== undefined ? payload.employeeId : current.employeeId;
    if (nextEmployeeId !== current.employeeId) {
      await this.requireEmployee(tenantId, nextEmployeeId);
    }

    const nextEnvironmentId =
      payload.environmentId !== undefined ? payload.environmentId : current.environmentId ?? undefined;
    if (nextEnvironmentId) {
      const environment = await this.prisma.occupationalHealthEnvironment.findFirst({
        where: { id: nextEnvironmentId, tenantId },
      });
      if (!environment) {
        throw new NotFoundException(`occupational health environment ${nextEnvironmentId} not found`);
      }
    }

    const scheduledAt = payload.scheduledAt !== undefined ? new Date(payload.scheduledAt) : current.scheduledAt;
    const performedAt =
      payload.performedAt !== undefined ? new Date(payload.performedAt) : current.performedAt ?? undefined;
    const expiresAt = payload.expiresAt !== undefined ? new Date(payload.expiresAt) : current.expiresAt ?? undefined;
    if (
      Number.isNaN(scheduledAt.getTime()) ||
      (performedAt && Number.isNaN(performedAt.getTime())) ||
      (expiresAt && Number.isNaN(expiresAt.getTime()))
    ) {
      throw new ConflictException('invalid occupational health exam dates');
    }

    const now = new Date();
    const updated = await this.prisma.occupationalHealthExam.update({
      where: { id: current.id },
      data: {
        employeeId: nextEmployeeId,
        environmentId: nextEnvironmentId ?? null,
        examType: payload.examType !== undefined ? payload.examType : current.examType,
        status: payload.status !== undefined ? payload.status : current.status,
        scheduledAt,
        performedAt: performedAt ?? null,
        result: payload.result !== undefined ? payload.result : current.result,
        expiresAt: expiresAt ?? null,
        notes: payload.notes !== undefined ? payload.notes : current.notes,
      },
      include: {
        aso: true,
      },
    });

    await this.prisma.auditEvent.create({
      data: this.auditData(
        tenantId,
        'occupational_health.exam.updated',
        'occupationalHealthExam',
        updated.id,
        {
          employeeId: updated.employeeId,
          environmentId: updated.environmentId ?? undefined,
          examType: updated.examType,
          status: updated.status,
          actor,
        },
        now,
      ),
    });

    return this.toOccupationalHealthExamRecord(updated);
  }

  async listOccupationalHealthExams(tenantId: string): Promise<OccupationalHealthExamRecord[]> {
    await this.requireTenant(tenantId);
    const exams = await this.prisma.occupationalHealthExam.findMany({
      where: { tenantId },
      include: {
        aso: true,
      },
      orderBy: [{ scheduledAt: 'desc' }, { createdAt: 'desc' }],
    });

    return exams.map((exam) => this.toOccupationalHealthExamRecord(exam));
  }

  async issueOccupationalHealthAso(
    tenantId: string,
    examId: string,
    payload: {
      result: string;
      issuer?: string;
      issuedAt?: string;
      notes?: string;
    },
    actor?: string,
  ): Promise<OccupationalHealthAsoRecord> {
    await this.requireTenant(tenantId);
    const exam = await this.prisma.occupationalHealthExam.findFirst({
      where: { id: examId, tenantId },
      include: {
        aso: true,
      },
    });
    if (!exam) {
      throw new NotFoundException(`occupational health exam ${examId} not found`);
    }
    if (exam.aso) {
      throw new ConflictException(`occupational health exam ${examId} already has aso`);
    }
    if (exam.status !== 'performed' && !exam.performedAt) {
      throw new ConflictException('occupational health exam must be performed before issuing aso');
    }

    const issuedAt = payload.issuedAt ? new Date(payload.issuedAt) : new Date();
    if (Number.isNaN(issuedAt.getTime())) {
      throw new ConflictException('invalid occupational health aso issuedAt');
    }

    const now = new Date();
    const created = await this.prisma.occupationalHealthAso.create({
      data: {
        tenantId,
        examId,
        employeeId: exam.employeeId,
        issuedAt,
        result: payload.result,
        issuer: payload.issuer ?? null,
        notes: payload.notes ?? null,
      },
    });

    await this.prisma.auditEvent.create({
      data: this.auditData(
        tenantId,
        'occupational_health.aso.issued',
        'occupationalHealthAso',
        created.id,
        {
          examId,
          employeeId: created.employeeId,
          result: created.result,
          issuer: created.issuer ?? undefined,
          actor,
        },
        now,
      ),
    });

    return this.toOccupationalHealthAsoRecord(created);
  }

  async getOccupationalHealthAso(tenantId: string, examId: string): Promise<OccupationalHealthAsoRecord> {
    await this.requireTenant(tenantId);
    const aso = await this.prisma.occupationalHealthAso.findFirst({
      where: { tenantId, examId },
    });
    if (!aso) {
      throw new NotFoundException(`occupational health aso for exam ${examId} not found`);
    }

    return this.toOccupationalHealthAsoRecord(aso);
  }

  async queueOccupationalHealthEsocialTransmission(
    tenantId: string,
    subjectType: OccupationalHealthEsocialSubjectType,
    subjectId: string,
    eventCode: string | undefined,
    actor?: string,
    notes?: string,
  ): Promise<OccupationalHealthEsocialTransmissionRecord> {
    await this.requireTenant(tenantId);
    const source = await this.loadOccupationalHealthEsocialSource(tenantId, subjectType, subjectId);
    const resolvedEventCode = eventCode ?? OCCUPATIONAL_HEALTH_ESOCIAL_EVENT_CODES[subjectType];
    if (resolvedEventCode !== OCCUPATIONAL_HEALTH_ESOCIAL_EVENT_CODES[subjectType]) {
      throw new ConflictException(`unsupported occupational health eSocial event ${resolvedEventCode} for ${subjectType}`);
    }

    const existing = await this.prisma.occupationalHealthEsocialTransmission.findUnique({
      where: {
        tenantId_subjectType_subjectId_eventCode: {
          tenantId,
          subjectType,
          subjectId,
          eventCode: resolvedEventCode,
        },
      },
    });

    const now = new Date();
    const payload = this.buildOccupationalHealthEsocialPayload(source, resolvedEventCode, actor, notes);

    const transmission = await this.prisma.$transaction(async (tx) => {
      if (existing) {
        return tx.occupationalHealthEsocialTransmission.update({
          where: { id: existing.id },
          data: {
            companyId: source.companyId ?? null,
            employeeId: source.employeeId ?? null,
            environmentId: source.environmentId ?? null,
            catId: source.catId ?? null,
            examId: source.examId ?? null,
            status: 'queued',
            payload,
            errorMessage: null,
            receiptNumber: null,
            response: Prisma.JsonNull,
            queuedAt: now,
            sentAt: null,
            processedAt: null,
            attempts: 0,
          },
        });
      }

      return tx.occupationalHealthEsocialTransmission.create({
        data: {
          tenantId,
          subjectType,
          subjectId,
          companyId: source.companyId ?? null,
          employeeId: source.employeeId ?? null,
          environmentId: source.environmentId ?? null,
          catId: source.catId ?? null,
          examId: source.examId ?? null,
          eventCode: resolvedEventCode,
          status: 'queued',
          payload,
          queuedAt: now,
        },
      });
    });

    await this.prisma.auditEvent.create({
      data: this.auditData(
        tenantId,
        'occupational_health.esocial.queued',
        'occupationalHealthEsocialTransmission',
        transmission.id,
        {
          subjectType,
          subjectId,
          eventCode: resolvedEventCode,
          transmissionId: transmission.id,
          status: 'queued',
          actor,
          notes,
        },
        now,
      ),
    });

    try {
      await this.enqueueOccupationalHealthEsocialTransmission(transmission.id);
      return this.toOccupationalHealthEsocialTransmissionRecord(transmission);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      await this.markOccupationalHealthEsocialTransmissionFailed(transmission.id, message);
      throw new ConflictException(`failed to enqueue occupational health eSocial transmission ${transmission.id}: ${message}`);
    }
  }

  async listOccupationalHealthEsocialTransmissions(
    tenantId: string,
    subjectType: OccupationalHealthEsocialSubjectType,
    subjectId: string,
  ): Promise<OccupationalHealthEsocialTransmissionRecord[]> {
    await this.requireTenant(tenantId);
    const transmissions = await this.prisma.occupationalHealthEsocialTransmission.findMany({
      where: {
        tenantId,
        subjectType,
        subjectId,
      },
      orderBy: [{ queuedAt: 'desc' }, { createdAt: 'desc' }],
    });

    return transmissions.map((transmission) => this.toOccupationalHealthEsocialTransmissionRecord(transmission));
  }

  async createOccupationalHealthTrainingCatalog(
    tenantId: string,
    payload: {
      companyId?: string;
      code: string;
      title: string;
      description?: string;
      mandatory?: boolean;
      active?: boolean;
      validFrom: string;
      validUntil?: string;
      notes?: string;
    },
    actor?: string,
  ): Promise<OccupationalHealthTrainingCatalogRecord> {
    await this.requireTenant(tenantId);
    if (payload.companyId) {
      await this.requireCompany(tenantId, payload.companyId);
    }

    const validFrom = new Date(payload.validFrom);
    const validUntil = payload.validUntil ? new Date(payload.validUntil) : undefined;
    if (Number.isNaN(validFrom.getTime()) || (validUntil && Number.isNaN(validUntil.getTime()))) {
      throw new ConflictException('invalid occupational health training catalog dates');
    }

    const existing = await this.prisma.occupationalHealthTrainingCatalog.findUnique({
      where: {
        tenantId_code: {
          tenantId,
          code: payload.code,
        },
      },
    });
    if (existing) {
      throw new ConflictException(`occupational health training catalog code ${payload.code} already exists`);
    }

    const now = new Date();
    const created = await this.prisma.occupationalHealthTrainingCatalog.create({
      data: {
        tenantId,
        companyId: payload.companyId ?? null,
        code: payload.code,
        title: payload.title,
        description: payload.description ?? null,
        mandatory: payload.mandatory ?? true,
        active: payload.active ?? true,
        validFrom,
        validUntil: validUntil ?? null,
        notes: payload.notes ?? null,
      },
    });

    await this.prisma.auditEvent.create({
      data: this.auditData(
        tenantId,
        'occupational_health.training_catalog.created',
        'occupationalHealthTrainingCatalog',
        created.id,
        {
          companyId: created.companyId ?? undefined,
          code: created.code,
          title: created.title,
          mandatory: String(created.mandatory),
          actor,
        },
        now,
      ),
    });

    return this.toOccupationalHealthTrainingCatalogRecord(created);
  }

  async updateOccupationalHealthTrainingCatalog(
    tenantId: string,
    trainingCatalogId: string,
    payload: {
      companyId?: string;
      code?: string;
      title?: string;
      description?: string;
      mandatory?: boolean;
      active?: boolean;
      validFrom?: string;
      validUntil?: string;
      notes?: string;
    },
    actor?: string,
  ): Promise<OccupationalHealthTrainingCatalogRecord> {
    await this.requireTenant(tenantId);
    const current = await this.prisma.occupationalHealthTrainingCatalog.findFirst({
      where: { id: trainingCatalogId, tenantId },
    });
    if (!current) {
      throw new NotFoundException(`occupational health training catalog ${trainingCatalogId} not found`);
    }

    if (payload.companyId !== undefined) {
      await this.requireCompany(tenantId, payload.companyId);
    }

    const validFrom = payload.validFrom !== undefined ? new Date(payload.validFrom) : current.validFrom;
    const validUntil =
      payload.validUntil !== undefined ? new Date(payload.validUntil) : current.validUntil ?? undefined;
    if (Number.isNaN(validFrom.getTime()) || (validUntil && Number.isNaN(validUntil.getTime()))) {
      throw new ConflictException('invalid occupational health training catalog dates');
    }

    const nextCode = payload.code !== undefined ? payload.code : current.code;
    if (nextCode !== current.code) {
      const existing = await this.prisma.occupationalHealthTrainingCatalog.findUnique({
        where: {
          tenantId_code: {
            tenantId,
            code: nextCode,
          },
        },
      });
      if (existing && existing.id !== current.id) {
        throw new ConflictException(`occupational health training catalog code ${nextCode} already exists`);
      }
    }

    const now = new Date();
    const updated = await this.prisma.occupationalHealthTrainingCatalog.update({
      where: { id: current.id },
      data: {
        companyId: payload.companyId !== undefined ? payload.companyId : current.companyId,
        code: nextCode,
        title: payload.title !== undefined ? payload.title : current.title,
        description: payload.description !== undefined ? payload.description : current.description,
        mandatory: payload.mandatory !== undefined ? payload.mandatory : current.mandatory,
        active: payload.active !== undefined ? payload.active : current.active,
        validFrom,
        validUntil: validUntil ?? null,
        notes: payload.notes !== undefined ? payload.notes : current.notes,
      },
    });

    await this.prisma.auditEvent.create({
      data: this.auditData(
        tenantId,
        'occupational_health.training_catalog.updated',
        'occupationalHealthTrainingCatalog',
        updated.id,
        {
          companyId: updated.companyId ?? undefined,
          code: updated.code,
          title: updated.title,
          mandatory: String(updated.mandatory),
          actor,
        },
        now,
      ),
    });

    return this.toOccupationalHealthTrainingCatalogRecord(updated);
  }

  async listOccupationalHealthTrainingCatalogs(tenantId: string): Promise<OccupationalHealthTrainingCatalogRecord[]> {
    await this.requireTenant(tenantId);
    const catalogs = await this.prisma.occupationalHealthTrainingCatalog.findMany({
      where: { tenantId },
      orderBy: [{ active: 'desc' }, { validFrom: 'desc' }, { createdAt: 'desc' }],
    });

    return catalogs.map((catalog) => this.toOccupationalHealthTrainingCatalogRecord(catalog));
  }

  async assignOccupationalHealthTraining(
    tenantId: string,
    payload: {
      employeeId: string;
      trainingCatalogId: string;
      companyId?: string;
      assignedAt?: string;
      dueAt?: string;
      expiresAt?: string;
      score?: number;
      notes?: string;
    },
    actor?: string,
  ): Promise<OccupationalHealthTrainingAssignmentRecord> {
    await this.requireTenant(tenantId);
    const employee = await this.requireEmployee(tenantId, payload.employeeId);
    const catalog = await this.prisma.occupationalHealthTrainingCatalog.findFirst({
      where: { id: payload.trainingCatalogId, tenantId },
    });
    if (!catalog) {
      throw new NotFoundException(`occupational health training catalog ${payload.trainingCatalogId} not found`);
    }
    if (payload.companyId) {
      await this.requireCompany(tenantId, payload.companyId);
    }

    const assignedAt = payload.assignedAt ? new Date(payload.assignedAt) : new Date();
    const dueAt = payload.dueAt ? new Date(payload.dueAt) : undefined;
    const expiresAt = payload.expiresAt ? new Date(payload.expiresAt) : undefined;
    if (
      Number.isNaN(assignedAt.getTime()) ||
      (dueAt && Number.isNaN(dueAt.getTime())) ||
      (expiresAt && Number.isNaN(expiresAt.getTime()))
    ) {
      throw new ConflictException('invalid occupational health training assignment dates');
    }

    const existing = await this.prisma.occupationalHealthTrainingAssignment.findUnique({
      where: {
        tenantId_employeeId_trainingCatalogId: {
          tenantId,
          employeeId: payload.employeeId,
          trainingCatalogId: payload.trainingCatalogId,
        },
      },
      include: {
        trainingCatalog: true,
      },
    });
    if (existing) {
      throw new ConflictException(`occupational health training assignment already exists for employee ${payload.employeeId} and catalog ${payload.trainingCatalogId}`);
    }

    const now = new Date();
    const created = await this.prisma.occupationalHealthTrainingAssignment.create({
      data: {
        tenantId,
        companyId: employee.companyId,
        employeeId: payload.employeeId,
        trainingCatalogId: payload.trainingCatalogId,
        status: 'assigned',
        assignedAt,
        dueAt: dueAt ?? null,
        expiresAt: expiresAt ?? null,
        score: payload.score ?? null,
        notes: payload.notes ?? null,
      },
      include: {
        trainingCatalog: true,
      },
    });

    await this.prisma.auditEvent.create({
      data: this.auditData(
        tenantId,
        'occupational_health.training.assigned',
        'occupationalHealthTrainingAssignment',
        created.id,
        {
          companyId: created.companyId ?? undefined,
          employeeId: created.employeeId,
          trainingCatalogId: created.trainingCatalogId,
          status: created.status,
          actor,
        },
        now,
      ),
    });

    return this.toOccupationalHealthTrainingAssignmentRecord(created);
  }

  async listOccupationalHealthTrainingAssignments(tenantId: string): Promise<OccupationalHealthTrainingAssignmentRecord[]> {
    await this.requireTenant(tenantId);
    const assignments = await this.prisma.occupationalHealthTrainingAssignment.findMany({
      where: { tenantId },
      include: {
        trainingCatalog: true,
      },
      orderBy: [{ assignedAt: 'desc' }, { createdAt: 'desc' }],
    });

    return assignments.map((assignment) => this.toOccupationalHealthTrainingAssignmentRecord(assignment));
  }

  async completeOccupationalHealthTrainingAssignment(
    tenantId: string,
    assignmentId: string,
    payload: {
      completedAt?: string;
      score?: number;
      notes?: string;
    },
    actor?: string,
  ): Promise<OccupationalHealthTrainingAssignmentRecord> {
    await this.requireTenant(tenantId);
    const existing = await this.prisma.occupationalHealthTrainingAssignment.findFirst({
      where: { id: assignmentId, tenantId },
      include: {
        trainingCatalog: true,
      },
    });
    if (!existing) {
      throw new NotFoundException(`occupational health training assignment ${assignmentId} not found`);
    }
    if (existing.status === 'completed') {
      throw new ConflictException(`occupational health training assignment ${assignmentId} is already completed`);
    }

    const completedAt = payload.completedAt ? new Date(payload.completedAt) : new Date();
    if (Number.isNaN(completedAt.getTime())) {
      throw new ConflictException('invalid occupational health training completion date');
    }

    const now = new Date();
    const updated = await this.prisma.$transaction(async (tx) => {
      const record = await tx.occupationalHealthTrainingAssignment.update({
        where: { id: assignmentId },
        data: {
          status: 'completed',
          completedAt,
          completedBy: actor ?? existing.completedBy ?? null,
          score: payload.score ?? existing.score,
          notes: payload.notes ?? existing.notes,
        },
        include: {
          trainingCatalog: true,
        },
      });

      await tx.auditEvent.create({
        data: this.auditData(
          tenantId,
          'occupational_health.training.completed',
          'occupationalHealthTrainingAssignment',
          assignmentId,
          {
            employeeId: existing.employeeId,
            trainingCatalogId: existing.trainingCatalogId,
            status: 'completed',
            actor,
          },
          now,
        ),
      });

      return record;
    });

    return this.toOccupationalHealthTrainingAssignmentRecord(updated);
  }

  async retryOccupationalHealthEsocialTransmission(
    tenantId: string,
    transmissionId: string,
    actor?: string,
    notes?: string,
    expectedSubjectType?: OccupationalHealthEsocialSubjectType,
    expectedSubjectId?: string,
  ): Promise<OccupationalHealthEsocialTransmissionRecord> {
    await this.requireTenant(tenantId);
    const existing = await this.prisma.occupationalHealthEsocialTransmission.findFirst({
      where: { id: transmissionId, tenantId },
    });
    if (!existing) {
      throw new NotFoundException(`occupational health eSocial transmission ${transmissionId} not found`);
    }
    if (expectedSubjectType !== undefined || expectedSubjectId !== undefined) {
      if (expectedSubjectType === undefined || expectedSubjectId === undefined) {
        throw new ConflictException('incomplete occupational health eSocial route context');
      }
      if (existing.subjectType !== expectedSubjectType || existing.subjectId !== expectedSubjectId) {
        throw new NotFoundException(
          `occupational health eSocial transmission ${transmissionId} not found for ${expectedSubjectType} ${expectedSubjectId}`,
        );
      }
    }
    if (existing.status !== 'failed') {
      throw new ConflictException(`occupational health eSocial transmission ${transmissionId} is not failed`);
    }

    const source = await this.loadOccupationalHealthEsocialSource(tenantId, existing.subjectType as OccupationalHealthEsocialSubjectType, existing.subjectId);
    const now = new Date();
    const payload = this.buildOccupationalHealthEsocialPayload(source, existing.eventCode, actor, notes);

    const updated = await this.prisma.$transaction(async (tx) => {
      const record = await tx.occupationalHealthEsocialTransmission.update({
        where: { id: transmissionId },
        data: {
          companyId: source.companyId ?? null,
          employeeId: source.employeeId ?? null,
          environmentId: source.environmentId ?? null,
          catId: source.catId ?? null,
          examId: source.examId ?? null,
          status: 'queued',
          payload,
          errorMessage: null,
          receiptNumber: null,
          response: Prisma.JsonNull,
          queuedAt: now,
          sentAt: null,
          processedAt: null,
          attempts: 0,
        },
      });

      await tx.auditEvent.create({
        data: this.auditData(
          tenantId,
          'occupational_health.esocial.requeued',
          'occupationalHealthEsocialTransmission',
          transmissionId,
          {
            subjectType: existing.subjectType,
            subjectId: existing.subjectId,
            eventCode: existing.eventCode,
            transmissionId,
            status: 'queued',
            actor,
            notes,
          },
          now,
        ),
      });

      return record;
    });

    try {
      await this.enqueueOccupationalHealthEsocialTransmission(updated.id);
      return this.toOccupationalHealthEsocialTransmissionRecord(updated);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      await this.markOccupationalHealthEsocialTransmissionFailed(updated.id, message);
      throw new ConflictException(`failed to requeue occupational health eSocial transmission ${updated.id}: ${message}`);
    }
  }

  async markOccupationalHealthEsocialTransmissionSent(
    transmissionId: string,
    receiptNumber: string,
    response: Record<string, string | number | boolean | undefined>,
  ): Promise<OccupationalHealthEsocialTransmissionRecord> {
    const existing = await this.prisma.occupationalHealthEsocialTransmission.findUnique({
      where: { id: transmissionId },
    });
    if (!existing) {
      throw new NotFoundException(`occupational health eSocial transmission ${transmissionId} not found`);
    }

    const now = new Date();
    const updated = await this.prisma.$transaction(async (tx) => {
      const record = await tx.occupationalHealthEsocialTransmission.update({
        where: { id: transmissionId },
        data: {
          status: 'sent',
          receiptNumber,
          response,
          sentAt: now,
          processedAt: now,
          attempts: existing.attempts + 1,
          errorMessage: null,
        },
      });

      await tx.auditEvent.create({
        data: this.auditData(
          existing.tenantId,
          'occupational_health.esocial.sent',
          'occupationalHealthEsocialTransmission',
          transmissionId,
          {
            subjectType: existing.subjectType,
            subjectId: existing.subjectId,
            eventCode: existing.eventCode,
            receiptNumber,
            status: 'sent',
          },
          now,
        ),
      });

      return record;
    });

    return this.toOccupationalHealthEsocialTransmissionRecord(updated);
  }

  async markOccupationalHealthEsocialTransmissionFailed(
    transmissionId: string,
    errorMessage: string,
  ): Promise<OccupationalHealthEsocialTransmissionRecord> {
    const existing = await this.prisma.occupationalHealthEsocialTransmission.findUnique({
      where: { id: transmissionId },
    });
    if (!existing) {
      throw new NotFoundException(`occupational health eSocial transmission ${transmissionId} not found`);
    }

    const now = new Date();
    const updated = await this.prisma.$transaction(async (tx) => {
      const record = await tx.occupationalHealthEsocialTransmission.update({
        where: { id: transmissionId },
        data: {
          status: 'failed',
          errorMessage,
          processedAt: now,
          attempts: existing.attempts + 1,
        },
      });

      await tx.auditEvent.create({
        data: this.auditData(
          existing.tenantId,
          'occupational_health.esocial.failed',
          'occupationalHealthEsocialTransmission',
          transmissionId,
          {
            subjectType: existing.subjectType,
            subjectId: existing.subjectId,
            eventCode: existing.eventCode,
            errorMessage,
            status: 'failed',
          },
          now,
        ),
      });

      return record;
    });

    return this.toOccupationalHealthEsocialTransmissionRecord(updated);
  }

  async calculateNightShiftAllowance(
    tenantId: string,
    employeeId: string,
    periodStart: string,
    periodEnd: string,
    actor?: string,
    notes?: string,
  ): Promise<NightShiftAllowanceCalculationRecord> {
    await this.requireTenant(tenantId);
    await this.requireEmployee(tenantId, employeeId);

    const periodStartDate = new Date(periodStart);
    const periodEndDate = new Date(periodEnd);
    if (Number.isNaN(periodStartDate.getTime()) || Number.isNaN(periodEndDate.getTime()) || periodEndDate <= periodStartDate) {
      throw new ConflictException('invalid night shift allowance period');
    }

    const marks = await this.prisma.pointMark.findMany({
      where: {
        tenantId,
        employeeId,
        occurredAt: {
          gte: periodStartDate,
          lte: periodEndDate,
        },
      },
      orderBy: { occurredAt: 'asc' },
    });

    if (marks.length < 2 || marks.length % 2 !== 0) {
      throw new ConflictException('point marks must be paired to calculate night shift allowance');
    }

    const now = new Date();
    const baseReference = 'point_marks_interval_utc_v1';
    const percentage = 20;
    const reducedFactor = 0.875;
    const items = marks.reduce<
      Array<{
        date: Date;
        minutes: number;
        percentage: number;
        reason: string;
        reducedHourFactor: number;
        sourceReference: string;
      }>
    >((acc, mark, index, source) => {
      if (index % 2 !== 0) {
        return acc;
      }

      const start = mark.occurredAt;
      const end = source[index + 1]?.occurredAt;
      if (!end) {
        return acc;
      }

      const minutes = this.calculateNightOverlapMinutes(start, end);
      if (minutes <= 0) {
        return acc;
      }

      acc.push({
        date: start,
        minutes,
        percentage,
        reason: 'night_window_overlap',
        reducedHourFactor: reducedFactor,
        sourceReference: `point_mark:${mark.id}:${source[index + 1].id}`,
      });

      return acc;
    }, []);

    const totalMinutes = items.reduce((sum, item) => sum + item.minutes, 0);
    const reducedMinutes = totalMinutes > 0 ? Math.round(totalMinutes / reducedFactor) : 0;

    const calculation = await this.prisma.$transaction(async (tx) => {
      const created = await tx.nightShiftAllowanceCalculation.create({
        data: {
          tenantId,
          employeeId,
          periodStart: periodStartDate,
          periodEnd: periodEndDate,
          status: 'calculated',
          nightPeriodReference: '22:00-05:00',
          calculationBase: baseReference,
          totalMinutes,
          reducedMinutes,
          percentage,
          notes,
          calculatedBy: actor,
          calculatedAt: now,
        },
      });

      for (const item of items) {
        await tx.nightShiftAllowanceItem.create({
          data: {
            tenantId,
            calculationId: created.id,
            date: item.date,
            minutes: item.minutes,
            percentage: item.percentage,
            reason: item.reason,
            reducedHourFactor: item.reducedHourFactor,
            sourceReference: item.sourceReference,
          },
        });
      }

      await tx.auditEvent.create({
        data: this.auditData(
          tenantId,
          'night_shift_allowance.calculated',
          'nightShiftAllowanceCalculation',
          created.id,
          {
            employeeId,
            periodStart: periodStartDate.toISOString(),
            periodEnd: periodEndDate.toISOString(),
            totalMinutes: String(totalMinutes),
            percentage: String(percentage),
            actor,
          },
          now,
        ),
      });

      return created;
    });

    return this.getNightShiftAllowanceCalculation(tenantId, calculation.id);
  }

  async getNightShiftAllowanceCalculation(
    tenantId: string,
    calculationId: string,
  ): Promise<NightShiftAllowanceCalculationRecord> {
    await this.requireTenant(tenantId);
    const calculation = await this.prisma.nightShiftAllowanceCalculation.findFirst({
      where: { id: calculationId, tenantId },
      include: {
        items: {
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    if (!calculation) {
      throw new NotFoundException(`night shift allowance calculation ${calculationId} not found`);
    }

    return this.toNightShiftAllowanceCalculationRecord(calculation);
  }

  async approveNightShiftAllowanceCalculation(
    tenantId: string,
    calculationId: string,
    actor?: string,
  ): Promise<NightShiftAllowanceCalculationRecord> {
    await this.requireTenant(tenantId);
    const calculation = await this.prisma.nightShiftAllowanceCalculation.findFirst({
      where: { id: calculationId, tenantId },
    });

    if (!calculation) {
      throw new NotFoundException(`night shift allowance calculation ${calculationId} not found`);
    }
    if (calculation.status === 'approved') {
      throw new ConflictException(`night shift allowance calculation ${calculationId} is already approved`);
    }

    const now = new Date();
    const updated = await this.prisma.$transaction(async (tx) => {
      const record = await tx.nightShiftAllowanceCalculation.update({
        where: { id: calculationId },
        data: {
          status: 'approved',
          approvedBy: actor,
          approvedAt: now,
        },
        include: {
          items: {
            orderBy: { createdAt: 'asc' },
          },
        },
      });

      await tx.auditEvent.create({
        data: this.auditData(
          tenantId,
          'night_shift_allowance.approved',
          'nightShiftAllowanceCalculation',
          calculationId,
          {
            employeeId: calculation.employeeId,
            status: 'approved',
            actor,
          },
          now,
        ),
      });

      return record;
    });

    return this.toNightShiftAllowanceCalculationRecord(updated);
  }

  async calculateWeeklyRestAllowance(
    tenantId: string,
    employeeId: string,
    periodStart: string,
    periodEnd: string,
    actor?: string,
    notes?: string,
  ): Promise<WeeklyRestAllowanceCalculationRecord> {
    await this.requireTenant(tenantId);
    const employee = await this.requireEmployee(tenantId, employeeId);

    const periodStartDate = new Date(periodStart);
    const periodEndDate = new Date(periodEnd);
    if (Number.isNaN(periodStartDate.getTime()) || Number.isNaN(periodEndDate.getTime()) || periodEndDate <= periodStartDate) {
      throw new ConflictException('invalid weekly rest allowance period');
    }

    const marks = await this.prisma.pointMark.findMany({
      where: {
        tenantId,
        employeeId,
        occurredAt: {
          gte: periodStartDate,
          lte: periodEndDate,
        },
      },
      orderBy: { occurredAt: 'asc' },
    });

    if (marks.length < 2 || marks.length % 2 !== 0) {
      throw new ConflictException('point marks must be paired to calculate weekly rest allowance');
    }

    const holidayCalendars = await this.prisma.pointHolidayCalendar.findMany({
      where: {
        tenantId,
        OR: [{ companyId: null }, { companyId: employee.companyId }],
      },
    });

    const intervals = marks.reduce<Array<{ start: Date; end: Date; sourceReference: string }>>((acc, mark, index, source) => {
      if (index % 2 !== 0) {
        return acc;
      }

      const end = source[index + 1]?.occurredAt;
      if (!end) {
        return acc;
      }

      acc.push({
        start: mark.occurredAt,
        end,
        sourceReference: `point_mark:${mark.id}:${source[index + 1].id}`,
      });

      return acc;
    }, []);

    const items: Array<{
      date: Date;
      dayType: string;
      minutes: number;
      percentage: number;
      reason: string;
      sourceReference: string;
    }> = [];
    let totalMinutes = 0;
    let affectedDays = 0;
    let restDays = 0;

    let cursor = new Date(Date.UTC(periodStartDate.getUTCFullYear(), periodStartDate.getUTCMonth(), periodStartDate.getUTCDate(), 0, 0, 0, 0));
    const finalDay = new Date(Date.UTC(periodEndDate.getUTCFullYear(), periodEndDate.getUTCMonth(), periodEndDate.getUTCDate(), 0, 0, 0, 0));

    while (cursor <= finalDay) {
      const dayStart = new Date(Date.UTC(cursor.getUTCFullYear(), cursor.getUTCMonth(), cursor.getUTCDate(), 0, 0, 0, 0));
      const dayEnd = new Date(Date.UTC(cursor.getUTCFullYear(), cursor.getUTCMonth(), cursor.getUTCDate() + 1, 0, 0, 0, 0));
      const isSunday = cursor.getUTCDay() === 0;
      const isHoliday = holidayCalendars.some((calendar) => this.matchesHolidayCalendar(calendar, cursor));
      if (isSunday || isHoliday) {
        const dayType = isHoliday ? 'holiday' : 'sunday';
        const minutes = intervals.reduce((sum, interval) => sum + this.overlapMinutes(interval.start, interval.end, dayStart, dayEnd), 0);
        const percentage = minutes > 0 ? 100 : 0;
        const reason = minutes > 0 ? 'work_on_rest_day' : 'rest_day_maintained';
        if (minutes > 0) {
          affectedDays += 1;
          totalMinutes += minutes;
        } else {
          restDays += 1;
        }

        items.push({
          date: dayStart,
          dayType,
          minutes,
          percentage,
          reason,
          sourceReference: `weekly_rest:${dayType}:${dayStart.toISOString()}`,
        });
      }

      cursor = dayEnd;
    }

    const now = new Date();
    const calculation = await this.prisma.$transaction(async (tx) => {
      const created = await tx.weeklyRestAllowanceCalculation.create({
        data: {
          tenantId,
          employeeId,
          periodStart: periodStartDate,
          periodEnd: periodEndDate,
          status: 'calculated',
          ruleReference: 'weekly_rest_policy_v1',
          calculationBase: 'point_marks_interval_utc_v1',
          totalMinutes,
          affectedDays,
          restDays,
          notes,
          calculatedBy: actor,
          calculatedAt: now,
        },
      });

      for (const item of items) {
        await tx.weeklyRestAllowanceItem.create({
          data: {
            tenantId,
            calculationId: created.id,
            date: item.date,
            dayType: item.dayType,
            minutes: item.minutes,
            percentage: item.percentage,
            reason: item.reason,
            sourceReference: item.sourceReference,
          },
        });
      }

      await tx.auditEvent.create({
        data: this.auditData(
          tenantId,
          'weekly_rest_allowance.calculated',
          'weeklyRestAllowanceCalculation',
          created.id,
          {
            employeeId,
            periodStart: periodStartDate.toISOString(),
            periodEnd: periodEndDate.toISOString(),
            totalMinutes: String(totalMinutes),
            affectedDays: String(affectedDays),
            restDays: String(restDays),
            actor,
          },
          now,
        ),
      });

      return created;
    });

    return this.getWeeklyRestAllowanceCalculation(tenantId, calculation.id);
  }

  async getWeeklyRestAllowanceCalculation(
    tenantId: string,
    calculationId: string,
  ): Promise<WeeklyRestAllowanceCalculationRecord> {
    await this.requireTenant(tenantId);
    const calculation = await this.prisma.weeklyRestAllowanceCalculation.findFirst({
      where: { id: calculationId, tenantId },
      include: {
        items: {
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    if (!calculation) {
      throw new NotFoundException(`weekly rest allowance calculation ${calculationId} not found`);
    }

    return this.toWeeklyRestAllowanceCalculationRecord(calculation);
  }

  async approveWeeklyRestAllowanceCalculation(
    tenantId: string,
    calculationId: string,
    actor?: string,
  ): Promise<WeeklyRestAllowanceCalculationRecord> {
    await this.requireTenant(tenantId);
    const calculation = await this.prisma.weeklyRestAllowanceCalculation.findFirst({
      where: { id: calculationId, tenantId },
    });

    if (!calculation) {
      throw new NotFoundException(`weekly rest allowance calculation ${calculationId} not found`);
    }
    if (calculation.status === 'approved') {
      throw new ConflictException(`weekly rest allowance calculation ${calculationId} is already approved`);
    }

    const now = new Date();
    const updated = await this.prisma.$transaction(async (tx) => {
      const record = await tx.weeklyRestAllowanceCalculation.update({
        where: { id: calculationId },
        data: {
          status: 'approved',
          approvedBy: actor,
          approvedAt: now,
        },
        include: {
          items: {
            orderBy: { createdAt: 'asc' },
          },
        },
      });

      await tx.auditEvent.create({
        data: this.auditData(
          tenantId,
          'weekly_rest_allowance.approved',
          'weeklyRestAllowanceCalculation',
          calculationId,
          {
            employeeId: calculation.employeeId,
            status: 'approved',
            actor,
          },
          now,
        ),
      });

      return record;
    });

    return this.toWeeklyRestAllowanceCalculationRecord(updated);
  }

  async calculateThirteenthSalary(
    tenantId: string,
    employeeId: string,
    referenceYear: number,
    salaryBaseCents: number,
    variableAverageAmountCents = 0,
    employerChargesAmountCents = 0,
    actor?: string,
    notes?: string,
  ): Promise<ThirteenthSalaryCalculationRecord> {
    await this.requireTenant(tenantId);
    await this.requireEmployee(tenantId, employeeId);

    if (!Number.isInteger(referenceYear) || referenceYear < 2000) {
      throw new ConflictException('invalid reference year for thirteenth salary');
    }
    if (!Number.isInteger(salaryBaseCents) || salaryBaseCents <= 0) {
      throw new ConflictException('salary base must be greater than zero');
    }
    if (!Number.isInteger(variableAverageAmountCents) || variableAverageAmountCents < 0) {
      throw new ConflictException('variable average must not be negative');
    }
    if (!Number.isInteger(employerChargesAmountCents) || employerChargesAmountCents < 0) {
      throw new ConflictException('employer charges must not be negative');
    }

    const admission = await this.prisma.admissionRequest.findFirst({
      where: { tenantId, employeeId },
      include: { contract: true },
      orderBy: { requestedAt: 'desc' },
    });
    const termination = await this.prisma.terminationRequest.findFirst({
      where: { tenantId, employeeId, status: 'effective' },
      orderBy: { effectiveAt: 'desc' },
    });

    const employmentStart = this.clampToReferenceYear(
      admission?.contract?.effectiveFrom ?? admission?.requestedAt ?? new Date(),
      referenceYear,
    );
    const employmentEnd = this.clampToReferenceYear(
      termination?.effectiveAt ?? new Date(Date.UTC(referenceYear, 11, 31, 23, 59, 59, 999)),
      referenceYear,
    );
    const eligibleMonths = this.countThirteenthEligibleMonths(employmentStart, employmentEnd, referenceYear);
    const baseAmountCents = Math.floor((salaryBaseCents * eligibleMonths) / 12);
    const totalAmountCents = baseAmountCents + variableAverageAmountCents;
    const firstParcelAmountCents = Math.floor(baseAmountCents / 2);
    const secondParcelAmountCents = baseAmountCents - firstParcelAmountCents + variableAverageAmountCents;
    const now = new Date();

    const created = await this.prisma.$transaction(async (tx) => {
      const record = await tx.thirteenthSalaryCalculation.create({
        data: {
          tenantId,
          employeeId,
          referenceYear,
          status: 'calculated',
          salaryBaseCents,
          eligibleMonths,
          variableAverageAmountCents,
          employerChargesAmountCents,
          totalAmountCents,
          firstParcelAmountCents,
          secondParcelAmountCents,
          notes,
          calculatedBy: actor,
          calculatedAt: now,
        },
      });

      await tx.auditEvent.create({
        data: this.auditData(
          tenantId,
          'thirteenth_salary.calculated',
          'thirteenthSalaryCalculation',
          record.id,
          {
            employeeId,
            referenceYear: String(referenceYear),
            eligibleMonths: String(eligibleMonths),
            variableAverageAmountCents: String(variableAverageAmountCents),
            employerChargesAmountCents: String(employerChargesAmountCents),
            totalAmountCents: String(totalAmountCents),
            actor,
          },
          now,
        ),
      });

      return record;
    });

    return this.toThirteenthSalaryCalculationRecord(created);
  }

  async getThirteenthSalaryCalculation(
    tenantId: string,
    calculationId: string,
  ): Promise<ThirteenthSalaryCalculationRecord> {
    await this.requireTenant(tenantId);
    const calculation = await this.prisma.thirteenthSalaryCalculation.findFirst({
      where: { id: calculationId, tenantId },
    });

    if (!calculation) {
      throw new NotFoundException(`thirteenth salary calculation ${calculationId} not found`);
    }

    return this.toThirteenthSalaryCalculationRecord(calculation);
  }

  async approveThirteenthSalaryCalculation(
    tenantId: string,
    calculationId: string,
    actor?: string,
  ): Promise<ThirteenthSalaryCalculationRecord> {
    await this.requireTenant(tenantId);
    const calculation = await this.prisma.thirteenthSalaryCalculation.findFirst({
      where: { id: calculationId, tenantId },
    });

    if (!calculation) {
      throw new NotFoundException(`thirteenth salary calculation ${calculationId} not found`);
    }
    if (calculation.status === 'approved') {
      throw new ConflictException(`thirteenth salary calculation ${calculationId} is already approved`);
    }

    const now = new Date();
    const updated = await this.prisma.$transaction(async (tx) => {
      const record = await tx.thirteenthSalaryCalculation.update({
        where: { id: calculationId },
        data: {
          status: 'approved',
          approvedBy: actor,
          approvedAt: now,
        },
      });

      await tx.auditEvent.create({
        data: this.auditData(
          tenantId,
          'thirteenth_salary.approved',
          'thirteenthSalaryCalculation',
          calculationId,
          {
            employeeId: calculation.employeeId,
            referenceYear: String(calculation.referenceYear),
            actor,
          },
          now,
        ),
      });

      return record;
    });

    return this.toThirteenthSalaryCalculationRecord(updated);
  }

  async sendThirteenthSalaryCalculationToPayroll(
    tenantId: string,
    calculationId: string,
    actor?: string,
    notes?: string,
  ): Promise<ThirteenthSalaryCalculationRecord> {
    await this.requireTenant(tenantId);
    const calculation = await this.prisma.thirteenthSalaryCalculation.findFirst({
      where: { id: calculationId, tenantId },
    });

    if (!calculation) {
      throw new NotFoundException(`thirteenth salary calculation ${calculationId} not found`);
    }
    if (calculation.status !== 'approved') {
      throw new ConflictException(`thirteenth salary calculation ${calculationId} must be approved before payroll integration`);
    }
    if (calculation.payrollBatchId) {
      throw new ConflictException(`thirteenth salary calculation ${calculationId} is already linked to payroll`);
    }

    const employee = await this.requireEmployee(tenantId, calculation.employeeId);
    const payrollReceiptNumber = `PAY-${calculation.referenceYear}-${calculation.id.slice(0, 8).toUpperCase()}`;
    const now = new Date();
    const sourcePeriodStart = new Date(Date.UTC(calculation.referenceYear, 0, 1, 0, 0, 0, 0));
    const sourcePeriodEnd = new Date(Date.UTC(calculation.referenceYear, 11, 31, 23, 59, 59, 999));
    const firstParcelDueAt = new Date(Date.UTC(calculation.referenceYear, 10, 30, 23, 59, 59, 999));
    const secondParcelDueAt = new Date(Date.UTC(calculation.referenceYear, 11, 20, 23, 59, 59, 999));

    const items = [
      {
        sourceEventType: 'thirteenth_salary',
        sourceEventId: calculation.id,
        payrollRubricCode: '13SAL_1PARCEL',
        quantityMinutes: 0,
        amountCents: calculation.firstParcelAmountCents,
        referenceDate: firstParcelDueAt,
        status: 'sent',
        reason: 'first parcel of thirteenth salary',
        sourceReference: `${calculation.referenceYear}-first-parcel`,
      },
      {
        sourceEventType: 'thirteenth_salary',
        sourceEventId: calculation.id,
        payrollRubricCode: '13SAL_2PARCEL',
        quantityMinutes: 0,
        amountCents: calculation.secondParcelAmountCents,
        referenceDate: secondParcelDueAt,
        status: 'sent',
        reason: 'second parcel of thirteenth salary',
        sourceReference: `${calculation.referenceYear}-second-parcel`,
      },
      {
        sourceEventType: 'thirteenth_salary',
        sourceEventId: calculation.id,
        payrollRubricCode: '13SAL_ENCARGOS',
        quantityMinutes: 0,
        amountCents: calculation.employerChargesAmountCents,
        referenceDate: secondParcelDueAt,
        status: 'sent',
        reason: 'employer charges related to thirteenth salary',
        sourceReference: `${calculation.referenceYear}-charges`,
      },
    ];

    const updated = await this.prisma.$transaction(async (tx) => {
      const batch = await tx.timeSheetPayrollEventBatch.create({
        data: {
          tenantId,
          employeeId: calculation.employeeId,
          companyId: employee.companyId,
          sourcePeriodStart,
          sourcePeriodEnd,
          payrollPeriod: `${calculation.referenceYear}-13`,
          status: 'sent',
          totalMinutes: 0,
          totalAmountCents: calculation.totalAmountCents + calculation.employerChargesAmountCents,
          notes: notes ?? calculation.notes,
          consolidatedBy: actor,
          consolidatedAt: now,
          approvedBy: actor,
          approvedAt: now,
          payrollReceiptNumber,
          sentBy: actor,
          sentAt: now,
        },
      });

      for (const item of items) {
        await tx.timeSheetPayrollEventBatchItem.create({
          data: {
            tenantId,
            batchId: batch.id,
            sourceEventType: item.sourceEventType,
            sourceEventId: item.sourceEventId,
            payrollRubricCode: item.payrollRubricCode,
            quantityMinutes: item.quantityMinutes,
            amountCents: item.amountCents,
            referenceDate: item.referenceDate,
            status: item.status,
            reason: item.reason,
            sourceReference: item.sourceReference,
          },
        });
      }

      const record = await tx.thirteenthSalaryCalculation.update({
        where: { id: calculationId },
        data: {
          payrollBatchId: batch.id,
          payrollStatus: 'sent',
          payrollReceiptNumber,
          payrollSentBy: actor,
          payrollSentAt: now,
        },
      });

      await tx.auditEvent.create({
        data: this.auditData(
          tenantId,
          'thirteenth_salary.sent_to_payroll',
          'thirteenthSalaryCalculation',
          calculationId,
          {
            employeeId: calculation.employeeId,
            referenceYear: String(calculation.referenceYear),
            payrollBatchId: batch.id,
            payrollReceiptNumber,
            actor,
            notes,
          },
          now,
        ),
      });

      return record;
    });

    return this.toThirteenthSalaryCalculationRecord(updated);
  }

  async consolidateTimeSheetPayrollEvents(
    tenantId: string,
    employeeId: string,
    sourcePeriodStart: string,
    sourcePeriodEnd: string,
    payrollPeriod: string,
    actor?: string,
    notes?: string,
  ): Promise<TimeSheetPayrollEventBatchRecord> {
    await this.requireTenant(tenantId);
    const employee = await this.requireEmployee(tenantId, employeeId);

    const sourcePeriodStartDate = new Date(sourcePeriodStart);
    const sourcePeriodEndDate = new Date(sourcePeriodEnd);
    if (
      Number.isNaN(sourcePeriodStartDate.getTime()) ||
      Number.isNaN(sourcePeriodEndDate.getTime()) ||
      sourcePeriodEndDate <= sourcePeriodStartDate
    ) {
      throw new ConflictException('invalid payroll consolidation period');
    }

    const nightCalculations = await this.prisma.nightShiftAllowanceCalculation.findMany({
      where: {
        tenantId,
        employeeId,
        status: 'approved',
        periodStart: { lte: sourcePeriodEndDate },
        periodEnd: { gte: sourcePeriodStartDate },
      },
      include: {
        items: {
          orderBy: { createdAt: 'asc' },
        },
      },
      orderBy: { createdAt: 'asc' },
    });

    const weeklyCalculations = await this.prisma.weeklyRestAllowanceCalculation.findMany({
      where: {
        tenantId,
        employeeId,
        status: 'approved',
        periodStart: { lte: sourcePeriodEndDate },
        periodEnd: { gte: sourcePeriodStartDate },
      },
      include: {
        items: {
          orderBy: { createdAt: 'asc' },
        },
      },
      orderBy: { createdAt: 'asc' },
    });

    if (nightCalculations.length === 0 && weeklyCalculations.length === 0) {
      throw new ConflictException('no approved point events available for payroll consolidation');
    }

    const items: Array<{
      sourceEventType: string;
      sourceEventId: string;
      payrollRubricCode: string;
      quantityMinutes: number;
      amountCents: number;
      referenceDate: Date;
      status: string;
      reason?: string;
      sourceReference: string;
    }> = [];

    for (const calculation of nightCalculations) {
      const quantityMinutes = calculation.totalMinutes;
      items.push({
        sourceEventType: 'night_shift_allowance',
        sourceEventId: calculation.id,
        payrollRubricCode: 'ADIC_NOTURNO',
        quantityMinutes,
        amountCents: 0,
        referenceDate: calculation.periodEnd,
        status: 'ready',
        reason: calculation.notes ?? 'night_shift_allowance_approved',
        sourceReference: `night_shift_allowance_calculation:${calculation.id}`,
      });
    }

    for (const calculation of weeklyCalculations) {
      const quantityMinutes = calculation.totalMinutes;
      items.push({
        sourceEventType: 'weekly_rest_allowance',
        sourceEventId: calculation.id,
        payrollRubricCode: 'DSR',
        quantityMinutes,
        amountCents: 0,
        referenceDate: calculation.periodEnd,
        status: 'ready',
        reason: calculation.notes ?? 'weekly_rest_allowance_approved',
        sourceReference: `weekly_rest_allowance_calculation:${calculation.id}`,
      });
    }

    const totalMinutes = items.reduce((sum, item) => sum + item.quantityMinutes, 0);
    const totalAmountCents = items.reduce((sum, item) => sum + item.amountCents, 0);
    const now = new Date();

    const batch = await this.prisma.$transaction(async (tx) => {
      const created = await tx.timeSheetPayrollEventBatch.create({
        data: {
          tenantId,
          employeeId,
          companyId: employee.companyId,
          sourcePeriodStart: sourcePeriodStartDate,
          sourcePeriodEnd: sourcePeriodEndDate,
          payrollPeriod,
          status: 'consolidated',
          totalMinutes,
          totalAmountCents,
          notes,
          consolidatedBy: actor,
          consolidatedAt: now,
        },
      });

      for (const item of items) {
        await tx.timeSheetPayrollEventBatchItem.create({
          data: {
            tenantId,
            batchId: created.id,
            sourceEventType: item.sourceEventType,
            sourceEventId: item.sourceEventId,
            payrollRubricCode: item.payrollRubricCode,
            quantityMinutes: item.quantityMinutes,
            amountCents: item.amountCents,
            referenceDate: item.referenceDate,
            status: item.status,
            reason: item.reason,
            sourceReference: item.sourceReference,
          },
        });
      }

      await tx.auditEvent.create({
        data: this.auditData(
          tenantId,
          'time_sheet_payroll_events.consolidated',
          'timeSheetPayrollEventBatch',
          created.id,
          {
            employeeId,
            payrollPeriod,
            sourcePeriodStart: sourcePeriodStartDate.toISOString(),
            sourcePeriodEnd: sourcePeriodEndDate.toISOString(),
            totalMinutes: String(totalMinutes),
            totalAmountCents: String(totalAmountCents),
            actor,
          },
          now,
        ),
      });

      return created;
    });

    return this.getTimeSheetPayrollEventBatch(tenantId, batch.id);
  }

  async getTimeSheetPayrollEventBatch(
    tenantId: string,
    batchId: string,
  ): Promise<TimeSheetPayrollEventBatchRecord> {
    await this.requireTenant(tenantId);
    const batch = await this.prisma.timeSheetPayrollEventBatch.findFirst({
      where: { id: batchId, tenantId },
      include: {
        items: {
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    if (!batch) {
      throw new NotFoundException(`time sheet payroll event batch ${batchId} not found`);
    }

    return this.toTimeSheetPayrollEventBatchRecord(batch);
  }

  async approveTimeSheetPayrollEventBatch(
    tenantId: string,
    batchId: string,
    actor?: string,
  ): Promise<TimeSheetPayrollEventBatchRecord> {
    await this.requireTenant(tenantId);
    const batch = await this.prisma.timeSheetPayrollEventBatch.findFirst({
      where: { id: batchId, tenantId },
    });

    if (!batch) {
      throw new NotFoundException(`time sheet payroll event batch ${batchId} not found`);
    }
    if (batch.status === 'approved') {
      throw new ConflictException(`time sheet payroll event batch ${batchId} is already approved`);
    }

    const now = new Date();
    const updated = await this.prisma.$transaction(async (tx) => {
      const record = await tx.timeSheetPayrollEventBatch.update({
        where: { id: batchId },
        data: {
          status: 'approved',
          approvedBy: actor,
          approvedAt: now,
        },
        include: {
          items: {
            orderBy: { createdAt: 'asc' },
          },
        },
      });

      await tx.auditEvent.create({
        data: this.auditData(
          tenantId,
          'time_sheet_payroll_events.approved',
          'timeSheetPayrollEventBatch',
          batchId,
          {
            employeeId: batch.employeeId,
            payrollPeriod: batch.payrollPeriod,
            status: 'approved',
            actor,
          },
          now,
        ),
      });

      return record;
    });

    return this.toTimeSheetPayrollEventBatchRecord(updated);
  }

  async sendTimeSheetPayrollEventBatchToPayroll(
    tenantId: string,
    batchId: string,
    actor?: string,
  ): Promise<TimeSheetPayrollEventBatchRecord> {
    await this.requireTenant(tenantId);
    const batch = await this.prisma.timeSheetPayrollEventBatch.findFirst({
      where: { id: batchId, tenantId },
    });

    if (!batch) {
      throw new NotFoundException(`time sheet payroll event batch ${batchId} not found`);
    }
    if (batch.status !== 'approved') {
      throw new ConflictException(`time sheet payroll event batch ${batchId} is not approved`);
    }

    const now = new Date();
    const payrollReceiptNumber = `PAY-${batch.id.slice(0, 8).toUpperCase()}`;
    const updated = await this.prisma.$transaction(async (tx) => {
      const record = await tx.timeSheetPayrollEventBatch.update({
        where: { id: batchId },
        data: {
          status: 'sent',
          payrollReceiptNumber,
          sentBy: actor,
          sentAt: now,
        },
        include: {
          items: {
            orderBy: { createdAt: 'asc' },
          },
        },
      });

      await tx.auditEvent.create({
        data: this.auditData(
          tenantId,
          'time_sheet_payroll_events.sent_to_payroll',
          'timeSheetPayrollEventBatch',
          batchId,
          {
            employeeId: batch.employeeId,
            payrollPeriod: batch.payrollPeriod,
            payrollReceiptNumber,
            status: 'sent',
            actor,
          },
          now,
        ),
      });

      return record;
    });

    return this.toTimeSheetPayrollEventBatchRecord(updated);
  }

  async sendTimeSheetPayrollEventBatchToErp(
    tenantId: string,
    batchId: string,
    actor?: string,
  ): Promise<TimeSheetPayrollEventBatchRecord> {
    await this.requireTenant(tenantId);
    const batch = await this.prisma.timeSheetPayrollEventBatch.findFirst({
      where: { id: batchId, tenantId },
    });

    if (!batch) {
      throw new NotFoundException(`time sheet payroll event batch ${batchId} not found`);
    }
    if (batch.status !== 'sent') {
      throw new ConflictException(`time sheet payroll event batch ${batchId} must be sent to payroll before ERP sync`);
    }

    const now = new Date();
    const erpReceiptNumber = `ERP-${batch.id.slice(0, 8).toUpperCase()}`;
    const updated = await this.prisma.$transaction(async (tx) => {
      const record = await tx.timeSheetPayrollEventBatch.update({
        where: { id: batchId },
        data: {
          erpStatus: 'sent',
          erpReceiptNumber,
          erpSentBy: actor,
          erpSentAt: now,
        },
        include: {
          items: {
            orderBy: { createdAt: 'asc' },
          },
        },
      });

      await tx.auditEvent.create({
        data: this.auditData(
          tenantId,
          'time_sheet_payroll_events.sent_to_erp',
          'timeSheetPayrollEventBatch',
          batchId,
          {
            employeeId: batch.employeeId,
            payrollPeriod: batch.payrollPeriod,
            erpReceiptNumber,
            status: 'sent',
            actor,
          },
          now,
        ),
      });

      return record;
    });

    return this.toTimeSheetPayrollEventBatchRecord(updated);
  }

  async syncTimeSheetPayrollEventBatchWithBank(
    tenantId: string,
    batchId: string,
    actor?: string,
  ): Promise<TimeSheetPayrollEventBatchRecord> {
    await this.requireTenant(tenantId);
    const batch = await this.prisma.timeSheetPayrollEventBatch.findFirst({
      where: { id: batchId, tenantId },
    });

    if (!batch) {
      throw new NotFoundException(`time sheet payroll event batch ${batchId} not found`);
    }
    if (batch.status !== 'sent') {
      throw new ConflictException(`time sheet payroll event batch ${batchId} must be sent to payroll before bank sync`);
    }
    if (batch.erpStatus !== 'sent') {
      throw new ConflictException(`time sheet payroll event batch ${batchId} must be synced to ERP before bank sync`);
    }

    const now = new Date();
    const bankReceiptNumber = `BANK-${batch.id.slice(0, 8).toUpperCase()}`;
    const updated = await this.prisma.$transaction(async (tx) => {
      const record = await tx.timeSheetPayrollEventBatch.update({
        where: { id: batchId },
        data: {
          bankStatus: 'sent',
          bankReceiptNumber,
          bankSentBy: actor,
          bankSentAt: now,
        },
        include: {
          items: {
            orderBy: { createdAt: 'asc' },
          },
        },
      });

      await tx.auditEvent.create({
        data: this.auditData(
          tenantId,
          'time_sheet_payroll_events.sent_to_bank',
          'timeSheetPayrollEventBatch',
          batchId,
          {
            employeeId: batch.employeeId,
            payrollPeriod: batch.payrollPeriod,
            bankReceiptNumber,
            status: 'sent',
            actor,
          },
          now,
        ),
      });

      return record;
    });

    return this.toTimeSheetPayrollEventBatchRecord(updated);
  }

  async syncBenefitsIntegration(
    tenantId: string,
    employeeId: string,
    benefitCode: string,
    movementType: 'include' | 'exclude' | 'update' | 'reconcile',
    actor?: string,
    notes?: string,
  ): Promise<ApiIntegrationRequestRecord> {
    await this.requireTenant(tenantId);
    await this.requireEmployee(tenantId, employeeId);

    const now = new Date();
    const integrationType = 'benefits';
    const operation = movementType;
    const payload = {
      employeeId,
      benefitCode,
      movementType,
      notes,
    };

    const created = await this.prisma.$transaction(async (tx) => {
      const request = await tx.apiIntegrationRequest.create({
        data: {
          tenantId,
          integrationType,
          operation,
          status: 'completed',
          attempts: 1,
          subject: employeeId,
          externalReference: benefitCode,
          payload,
          response: {
            accepted: true,
            movementType,
          },
          requestedBy: actor,
          requestedAt: now,
          lastAttemptAt: now,
          completedAt: now,
        },
        include: {
          histories: {
            orderBy: { createdAt: 'asc' },
          },
        },
      });

      await tx.apiIntegrationRequestHistory.create({
        data: {
          tenantId,
          requestId: request.id,
          eventType: 'ApiBenefitsSyncCompleted',
          details: {
            employeeId,
            benefitCode,
            movementType,
            actor,
          },
        },
      });

      await tx.auditEvent.create({
        data: this.auditData(
          tenantId,
          'integrations.benefits.synced',
          'apiIntegrationRequest',
          request.id,
          {
            employeeId,
            benefitCode,
            movementType,
            actor,
          },
          now,
        ),
      });

      return request;
    });

    return this.toApiIntegrationRequestRecord(created);
  }

  async syncIdentityIntegration(
    tenantId: string,
    subject: string,
    action: 'provision' | 'deprovision' | 'sync',
    actor?: string,
    notes?: string,
  ): Promise<ApiIntegrationRequestRecord> {
    await this.requireTenant(tenantId);

    const now = new Date();
    const integrationType = 'identity';
    const operation = action;
    const created = await this.prisma.$transaction(async (tx) => {
      const request = await tx.apiIntegrationRequest.create({
        data: {
          tenantId,
          integrationType,
          operation,
          status: 'completed',
          attempts: 1,
          subject,
          payload: {
            subject,
            action,
            notes,
          },
          response: {
            accepted: true,
            action,
          },
          requestedBy: actor,
          requestedAt: now,
          lastAttemptAt: now,
          completedAt: now,
        },
        include: {
          histories: {
            orderBy: { createdAt: 'asc' },
          },
        },
      });

      await tx.apiIntegrationRequestHistory.create({
        data: {
          tenantId,
          requestId: request.id,
          eventType: 'ApiIdentitySyncCompleted',
          details: {
            subject,
            action,
            actor,
          },
        },
      });

      await tx.auditEvent.create({
        data: this.auditData(
          tenantId,
          'integrations.identity.synced',
          'apiIntegrationRequest',
          request.id,
          {
            subject,
            action,
            actor,
          },
          now,
        ),
      });

      return request;
    });

    return this.toApiIntegrationRequestRecord(created);
  }

  async monitorIntegrations(
    tenantId: string,
    integrationType?: string,
    status?: string,
  ): Promise<IntegrationMonitoringSnapshotRecord> {
    await this.requireTenant(tenantId);

    const where: {
      tenantId: string;
      integrationType?: string;
      status?: string;
    } = {
      tenantId,
    };
    if (integrationType) {
      where.integrationType = integrationType;
    }
    if (status) {
      where.status = status;
    }

    const [total, requested, completed, failed, dlq, benefits, identity, attempts, last] = await Promise.all([
      this.prisma.apiIntegrationRequest.count({ where }),
      this.prisma.apiIntegrationRequest.count({ where: { ...where, status: 'requested' } }),
      this.prisma.apiIntegrationRequest.count({ where: { ...where, status: 'completed' } }),
      this.prisma.apiIntegrationRequest.count({ where: { ...where, status: 'failed' } }),
      this.prisma.apiIntegrationRequest.count({ where: { ...where, status: 'dlq' } }),
      this.prisma.apiIntegrationRequest.count({ where: { ...where, integrationType: 'benefits' } }),
      this.prisma.apiIntegrationRequest.count({ where: { ...where, integrationType: 'identity' } }),
      this.prisma.apiIntegrationRequest.aggregate({
        where,
        _sum: {
          attempts: true,
        },
      }),
      this.prisma.apiIntegrationRequest.findFirst({
        where,
        orderBy: { requestedAt: 'desc' },
        select: { requestedAt: true },
      }),
    ]);

    const snapshot: IntegrationMonitoringSnapshotRecord = {
      tenantId,
      counts: {
        total,
        requested,
        completed,
        failed,
        dlq,
        benefits,
        identity,
        attempts: attempts._sum.attempts ?? 0,
      },
      lastRequestedAt: last?.requestedAt.toISOString(),
      alerts: dlq > 0
        ? [{
            integrationType: integrationType ?? 'all',
            severity: 'critical',
            message: 'integration dead letters require intervention',
          }]
        : failed > 0
        ? [{
            integrationType: integrationType ?? 'all',
            severity: 'warning',
            message: 'integration failures require review',
          }]
        : [],
    };

    await this.prisma.auditEvent.create({
      data: this.auditData(
        tenantId,
        'integrations.monitored',
        'apiIntegrationRequest',
        randomUUID(),
        {
          integrationType,
          status,
          total: String(total),
          failed: String(failed),
          dlq: String(dlq),
        },
        new Date(),
      ),
    });

    return snapshot;
  }

  async failIntegrationRequest(
    tenantId: string,
    requestId: string,
    reason: string,
    actor?: string,
  ): Promise<ApiIntegrationRequestRecord> {
    await this.requireTenant(tenantId);
    const request = await this.prisma.apiIntegrationRequest.findFirst({
      where: { id: requestId, tenantId },
      include: { histories: { orderBy: { createdAt: 'asc' } } },
    });

    if (!request) {
      throw new NotFoundException(`integration request ${requestId} not found`);
    }
    if (request.status === 'dlq') {
      throw new ConflictException(`integration request ${requestId} is dead-lettered`);
    }

    const now = new Date();
    const updated = await this.prisma.$transaction(async (tx) => {
      const record = await tx.apiIntegrationRequest.update({
        where: { id: requestId },
        data: {
          status: 'failed',
          failureReason: reason,
          lastAttemptAt: now,
          attempts: request.attempts + 1,
          completedAt: null,
        },
        include: { histories: { orderBy: { createdAt: 'asc' } } },
      });

      await tx.apiIntegrationRequestHistory.create({
        data: {
          tenantId,
          requestId,
          eventType: 'ApiIntegrationSyncFailed',
          details: {
            reason,
            actor,
          },
        },
      });

      await tx.auditEvent.create({
        data: this.auditData(
          tenantId,
          'integrations.failed',
          'apiIntegrationRequest',
          requestId,
          {
            integrationType: request.integrationType,
            operation: request.operation,
            reason,
            actor,
          },
          now,
        ),
      });

      return record;
    });

    return this.toApiIntegrationRequestRecord(updated);
  }

  async retryIntegrationRequest(
    tenantId: string,
    requestId: string,
    actor?: string,
    notes?: string,
  ): Promise<ApiIntegrationRequestRecord> {
    await this.requireTenant(tenantId);
    const request = await this.prisma.apiIntegrationRequest.findFirst({
      where: { id: requestId, tenantId },
      include: { histories: { orderBy: { createdAt: 'asc' } } },
    });

    if (!request) {
      throw new NotFoundException(`integration request ${requestId} not found`);
    }
    if (request.status !== 'failed') {
      throw new ConflictException(`integration request ${requestId} is not failed`);
    }

    const now = new Date();
    const updated = await this.prisma.$transaction(async (tx) => {
      const record = await tx.apiIntegrationRequest.update({
        where: { id: requestId },
        data: {
          status: 'requested',
          lastAttemptAt: now,
          attempts: request.attempts + 1,
          failureReason: null,
          dlqReason: null,
          dlqAt: null,
        },
        include: { histories: { orderBy: { createdAt: 'asc' } } },
      });

      await tx.apiIntegrationRequestHistory.create({
        data: {
          tenantId,
          requestId,
          eventType: 'ApiIntegrationRetried',
          details: {
            actor,
            notes,
          },
        },
      });

      await tx.auditEvent.create({
        data: this.auditData(
          tenantId,
          'integrations.requeued',
          'apiIntegrationRequest',
          requestId,
          {
            integrationType: request.integrationType,
            operation: request.operation,
            actor,
            notes,
          },
          now,
        ),
      });

      return record;
    });

    return this.toApiIntegrationRequestRecord(updated);
  }

  async deadLetterIntegrationRequest(
    tenantId: string,
    requestId: string,
    reason: string,
    actor?: string,
  ): Promise<ApiIntegrationRequestRecord> {
    await this.requireTenant(tenantId);
    const request = await this.prisma.apiIntegrationRequest.findFirst({
      where: { id: requestId, tenantId },
      include: { histories: { orderBy: { createdAt: 'asc' } } },
    });

    if (!request) {
      throw new NotFoundException(`integration request ${requestId} not found`);
    }
    if (request.status === 'dlq') {
      throw new ConflictException(`integration request ${requestId} is already dead-lettered`);
    }

    const now = new Date();
    const updated = await this.prisma.$transaction(async (tx) => {
      const record = await tx.apiIntegrationRequest.update({
        where: { id: requestId },
        data: {
          status: 'dlq',
          dlqReason: reason,
          dlqAt: now,
          lastAttemptAt: now,
          attempts: request.attempts + 1,
        },
        include: { histories: { orderBy: { createdAt: 'asc' } } },
      });

      await tx.apiIntegrationRequestHistory.create({
        data: {
          tenantId,
          requestId,
          eventType: 'ApiIntegrationDeadLettered',
          details: {
            reason,
            actor,
          },
        },
      });

      await tx.auditEvent.create({
        data: this.auditData(
          tenantId,
          'integrations.dead_lettered',
          'apiIntegrationRequest',
          requestId,
          {
            integrationType: request.integrationType,
            operation: request.operation,
            reason,
            actor,
          },
          now,
        ),
      });

      return record;
    });

    return this.toApiIntegrationRequestRecord(updated);
  }

  async summary(tenantId: string): Promise<{
    tenant: TenantRecord;
    counts: {
      companies: number;
      persons: number;
      employees: number;
      pointMarks: number;
      auditEvents: number;
    };
    lastAuditEventAt: string | null;
  }> {
    const tenant = await this.requireTenant(tenantId);
    const [companies, persons, employees, pointMarks, auditEvents] = await Promise.all([
      this.prisma.company.count({ where: { tenantId } }),
      this.prisma.person.count({ where: { tenantId } }),
      this.prisma.employee.count({ where: { tenantId } }),
      this.prisma.pointMark.count({ where: { tenantId } }),
      this.prisma.auditEvent.findMany({
        where: { tenantId },
        orderBy: { occurredAt: 'asc' },
        select: { occurredAt: true },
      }),
    ]);

    return {
      tenant: this.toTenantRecord(tenant),
      counts: {
        companies,
        persons,
        employees,
        pointMarks,
        auditEvents: auditEvents.length,
      },
      lastAuditEventAt: auditEvents.length > 0 ? auditEvents[auditEvents.length - 1]?.occurredAt.toISOString() ?? null : null,
    };
  }

  async analyticsOverview(tenantId: string): Promise<TenantAnalyticsOverviewRecord> {
    const summary = await this.summary(tenantId);
    const [admissions, terminations, offboardings, rescissions, openAdmissions, openTerminations, openOffboardings, openRescissions, integrationRequests, failedIntegrations, dlqIntegrations, attempts, lastRequested] = await Promise.all([
      this.prisma.admissionRequest.count({ where: { tenantId } }),
      this.prisma.terminationRequest.count({ where: { tenantId } }),
      this.prisma.terminationOffboarding.count({ where: { tenantId } }),
      this.prisma.rescissionRequest.count({ where: { tenantId } }),
      this.prisma.admissionRequest.count({
        where: {
          tenantId,
          status: { in: ['draft', 'pending_documents', 'under_review'] },
        },
      }),
      this.prisma.terminationRequest.count({
        where: {
          tenantId,
          status: { in: ['draft', 'approved'] },
        },
      }),
      this.prisma.terminationOffboarding.count({
        where: {
          tenantId,
          status: { in: ['draft'] },
        },
      }),
      this.prisma.rescissionRequest.count({
        where: {
          tenantId,
          status: { in: ['draft', 'calculated', 'documented'] },
        },
      }),
      this.prisma.apiIntegrationRequest.count({ where: { tenantId } }),
      this.prisma.apiIntegrationRequest.count({ where: { tenantId, status: 'failed' } }),
      this.prisma.apiIntegrationRequest.count({ where: { tenantId, status: 'dlq' } }),
      this.prisma.apiIntegrationRequest.aggregate({
        where: { tenantId },
        _sum: { attempts: true },
      }),
      this.prisma.apiIntegrationRequest.findFirst({
        where: { tenantId },
        orderBy: { requestedAt: 'desc' },
        select: { requestedAt: true },
      }),
    ]);

    const workflowPressure = openAdmissions + openTerminations + openOffboardings + openRescissions;
    const alerts: TenantAnalyticsOverviewRecord['alerts'] = workflowPressure > 0
      ? [
          {
            code: 'workflow-open-items',
            severity: 'info' as const,
            message: 'open workflow items require operational follow-up',
          },
        ]
      : [];

    if (failedIntegrations > 0) {
      alerts.push({
        code: 'integration-failures',
        severity: dlqIntegrations > 0 ? 'critical' : 'warning',
        message: dlqIntegrations > 0 ? 'dead letters require intervention' : 'integration failures require review',
      });
    }

    return {
      tenantId,
      generatedAt: new Date().toISOString(),
      counts: {
        employees: summary.counts.employees,
        pointMarks: summary.counts.pointMarks,
        auditEvents: summary.counts.auditEvents,
        admissions,
        terminations,
        offboardings,
        rescissions,
        openAdmissions,
        openTerminations,
        openOffboardings,
        openRescissions,
        integrationRequests,
        failedIntegrations,
        dlqIntegrations,
        attempts: attempts._sum.attempts ?? 0,
      },
      signals: {
        headcount: summary.counts.employees,
        workflowPressure,
        lastAuditEventAt: summary.lastAuditEventAt,
        lastRequestedAt: lastRequested?.requestedAt.toISOString() ?? null,
      },
      privacy: {
        retentionModel: 'class-based',
        exportFormats: ['json', 'csv', 'pdf', 'zip'],
        maskingLevels: ['strict', 'controlled', 'aggregate'],
      },
      alerts,
    };
  }

  async getPlatformTelemetry(): Promise<PlatformTelemetryRecord> {
    const [
      tenants,
      companies,
      persons,
      employees,
      pointMarks,
      admissions,
      terminations,
      rescissions,
      payrollBatches,
      integrationRequests,
    ] = await Promise.allSettled([
      this.prisma.tenant.count(),
      this.prisma.company.count(),
      this.prisma.person.count(),
      this.prisma.employee.count(),
      this.prisma.pointMark.count(),
      this.prisma.admissionRequest.count(),
      this.prisma.terminationRequest.count(),
      this.prisma.rescissionRequest.count(),
      this.prisma.timeSheetPayrollEventBatch.count(),
      this.prisma.apiIntegrationRequest.count(),
    ]);

    const toCount = (result: PromiseSettledResult<number>): number =>
      result.status === 'fulfilled' ? result.value : 0;

    return {
      service: 'rh-api',
      generatedAt: new Date().toISOString(),
      counts: {
        tenants: toCount(tenants),
        companies: toCount(companies),
        persons: toCount(persons),
        employees: toCount(employees),
        pointMarks: toCount(pointMarks),
        admissions: toCount(admissions),
        terminations: toCount(terminations),
        rescissions: toCount(rescissions),
        payrollBatches: toCount(payrollBatches),
        integrationRequests: toCount(integrationRequests),
      },
    };
  }

  async listAuditEvents(tenantId: string): Promise<AuditEventRecord[]> {
    await this.requireTenant(tenantId);
    const events = await this.prisma.auditEvent.findMany({
      where: { tenantId },
      orderBy: { occurredAt: 'asc' },
    });

    return events.map((event) => this.toAuditEventRecord(event));
  }

  async createBenefitCatalog(
    tenantId: string,
    code: string,
    name: string,
    benefitType: string,
    actor?: string,
    description?: string,
  ): Promise<BenefitCatalogRecord> {
    await this.requireTenant(tenantId);
    const now = new Date();
    const created = await this.prisma.$transaction(async (tx) => {
      const record = await tx.benefitCatalog.upsert({
        where: {
          tenantId_code: {
            tenantId,
            code,
          },
        },
        update: {
          name,
          benefitType,
          description,
          active: true,
          createdBy: actor,
        },
        create: {
          tenantId,
          code,
          name,
          benefitType,
          description,
          active: true,
          createdBy: actor,
        },
      });

      await tx.auditEvent.create({
        data: this.auditData(
          tenantId,
          'benefit_catalog.created',
          'benefitCatalog',
          record.id,
          { code, name, benefitType, actor },
          now,
        ),
      });

      return record;
    });

    return this.toBenefitCatalogRecord(created);
  }

  async listBenefitCatalogs(tenantId: string): Promise<BenefitCatalogRecord[]> {
    await this.requireTenant(tenantId);
    const catalogs = await this.prisma.benefitCatalog.findMany({
      where: { tenantId },
      orderBy: { createdAt: 'asc' },
    });

    return catalogs.map((catalog) => this.toBenefitCatalogRecord(catalog));
  }

  async grantBenefitToEmployee(
    tenantId: string,
    employeeId: string,
    benefitCatalogId: string,
    actor?: string,
    notes?: string,
    startsAt?: string,
  ): Promise<EmployeeBenefitRecord> {
    await this.requireTenant(tenantId);
    await this.requireEmployee(tenantId, employeeId);
    const catalog = await this.prisma.benefitCatalog.findFirst({ where: { id: benefitCatalogId, tenantId } });
    if (!catalog) {
      throw new NotFoundException(`benefit catalog ${benefitCatalogId} not found`);
    }

    const effectiveStartsAt = startsAt ? new Date(startsAt) : new Date();
    const now = new Date();
    const created = await this.prisma.$transaction(async (tx) => {
      const record = await tx.employeeBenefit.upsert({
        where: {
          tenantId_employeeId_benefitCatalogId: {
            tenantId,
            employeeId,
            benefitCatalogId,
          },
        },
        update: {
          status: 'active',
          endsAt: null,
          notes,
          requestedBy: actor,
          requestedAt: now,
          changedBy: actor,
          changedAt: now,
          startsAt: effectiveStartsAt,
        },
        create: {
          tenantId,
          employeeId,
          benefitCatalogId,
          status: 'active',
          startsAt: effectiveStartsAt,
          notes,
          requestedBy: actor,
          requestedAt: now,
          changedBy: actor,
          changedAt: now,
        },
        include: {
          benefitCatalog: true,
        },
      });

      await tx.auditEvent.create({
        data: this.auditData(
          tenantId,
          'benefit.assigned',
          'employeeBenefit',
          record.id,
          { employeeId, benefitCatalogId, code: catalog.code, actor, notes },
          now,
        ),
      });

      return record;
    });

    return this.toEmployeeBenefitRecord(created);
  }

  async listEmployeeBenefits(tenantId: string, employeeId?: string): Promise<EmployeeBenefitRecord[]> {
    await this.requireTenant(tenantId);
    const benefits = await this.prisma.employeeBenefit.findMany({
      where: {
        tenantId,
        ...(employeeId ? { employeeId } : {}),
      },
      include: {
        benefitCatalog: true,
      },
      orderBy: { createdAt: 'asc' },
    });

    return benefits.map((benefit) => this.toEmployeeBenefitRecord(benefit));
  }

  async suspendEmployeeBenefit(
    tenantId: string,
    employeeBenefitId: string,
    actor?: string,
    notes?: string,
  ): Promise<EmployeeBenefitRecord> {
    await this.requireTenant(tenantId);
    const benefit = await this.prisma.employeeBenefit.findFirst({
      where: { id: employeeBenefitId, tenantId },
      include: { benefitCatalog: true },
    });
    if (!benefit) {
      throw new NotFoundException(`employee benefit ${employeeBenefitId} not found`);
    }
    if (benefit.status === 'cancelled') {
      throw new ConflictException(`employee benefit ${employeeBenefitId} is cancelled`);
    }

    const now = new Date();
    const updated = await this.prisma.$transaction(async (tx) => {
      const record = await tx.employeeBenefit.update({
        where: { id: employeeBenefitId },
        data: {
          status: 'suspended',
          endsAt: now,
          changedBy: actor,
          changedAt: now,
          notes: notes ?? benefit.notes,
        },
        include: { benefitCatalog: true },
      });

      await tx.auditEvent.create({
        data: this.auditData(
          tenantId,
          'benefit.suspended',
          'employeeBenefit',
          employeeBenefitId,
          { employeeBenefitId, employeeId: benefit.employeeId, benefitCatalogId: benefit.benefitCatalogId, actor, notes },
          now,
        ),
      });

      return record;
    });

    return this.toEmployeeBenefitRecord(updated);
  }

  async cancelEmployeeBenefit(
    tenantId: string,
    employeeBenefitId: string,
    actor?: string,
    notes?: string,
  ): Promise<EmployeeBenefitRecord> {
    await this.requireTenant(tenantId);
    const benefit = await this.prisma.employeeBenefit.findFirst({
      where: { id: employeeBenefitId, tenantId },
      include: { benefitCatalog: true },
    });
    if (!benefit) {
      throw new NotFoundException(`employee benefit ${employeeBenefitId} not found`);
    }
    if (benefit.status === 'cancelled') {
      throw new ConflictException(`employee benefit ${employeeBenefitId} is cancelled`);
    }

    const now = new Date();
    const updated = await this.prisma.$transaction(async (tx) => {
      const record = await tx.employeeBenefit.update({
        where: { id: employeeBenefitId },
        data: {
          status: 'cancelled',
          endsAt: now,
          changedBy: actor,
          changedAt: now,
          notes: notes ?? benefit.notes,
        },
        include: { benefitCatalog: true },
      });

      await tx.auditEvent.create({
        data: this.auditData(
          tenantId,
          'benefit.cancelled',
          'employeeBenefit',
          employeeBenefitId,
          { employeeBenefitId, employeeId: benefit.employeeId, benefitCatalogId: benefit.benefitCatalogId, actor, notes },
          now,
        ),
      });

      return record;
    });

    return this.toEmployeeBenefitRecord(updated);
  }

  async createVacationBalance(
    tenantId: string,
    employeeId: string,
    actor?: string,
    notes?: string,
    referenceStart?: string,
    referenceEnd?: string,
    accruedDays = 30,
  ): Promise<VacationBalanceRecord> {
    await this.requireTenant(tenantId);
    const employee = await this.requireEmployee(tenantId, employeeId);
    const admission = await this.prisma.admissionRequest.findFirst({
      where: { tenantId, employeeId },
      include: { contract: true },
      orderBy: { requestedAt: 'desc' },
    });
    const effectiveReferenceStart = referenceStart
      ? new Date(referenceStart)
      : admission?.contract?.effectiveFrom ?? employee.createdAt;
    const effectiveReferenceEnd = referenceEnd
      ? new Date(referenceEnd)
      : this.addUtcMonths(effectiveReferenceStart, 12, -1);

    const now = new Date();
    const created = await this.prisma.$transaction(async (tx) => {
      const record = await tx.vacationBalance.upsert({
        where: {
          tenantId_employeeId_referenceStart_referenceEnd: {
            tenantId,
            employeeId,
            referenceStart: effectiveReferenceStart,
            referenceEnd: effectiveReferenceEnd,
          },
        },
        update: {
          accruedDays,
          availableDays: accruedDays,
          status: 'open',
          notes,
          createdBy: actor,
        },
        create: {
          tenantId,
          employeeId,
          referenceStart: effectiveReferenceStart,
          referenceEnd: effectiveReferenceEnd,
          accruedDays,
          takenDays: 0,
          availableDays: accruedDays,
          status: 'open',
          notes,
          createdBy: actor,
        },
        include: { employee: true },
      });

      await tx.auditEvent.create({
        data: this.auditData(
          tenantId,
          'vacation_balance.created',
          'vacationBalance',
          record.id,
          { employeeId, actor, accruedDays: String(accruedDays), notes },
          now,
        ),
      });

      return record;
    });

    return this.toVacationBalanceRecord(created);
  }

  async listVacationBalances(tenantId: string, employeeId?: string): Promise<VacationBalanceRecord[]> {
    await this.requireTenant(tenantId);
    const balances = await this.prisma.vacationBalance.findMany({
      where: {
        tenantId,
        ...(employeeId ? { employeeId } : {}),
      },
      orderBy: { createdAt: 'asc' },
    });

    return balances.map((balance) => this.toVacationBalanceRecord(balance));
  }

  async requestVacation(
    tenantId: string,
    employeeId: string,
    vacationBalanceId: string,
    plannedStart: string,
    plannedEnd: string,
    actor?: string,
    notes?: string,
    options?: {
      periods?: VacationRequestPeriodInput[];
      abonoDays?: number;
      salaryBaseCents?: number;
    },
  ): Promise<VacationRequestRecord> {
    await this.requireTenant(tenantId);
    await this.requireEmployee(tenantId, employeeId);
    const balance = await this.prisma.vacationBalance.findFirst({
      where: { id: vacationBalanceId, tenantId, employeeId },
    });
    if (!balance) {
      throw new NotFoundException(`vacation balance ${vacationBalanceId} not found`);
    }

    const concessiveWindow = this.getVacationConcessiveWindow(balance.referenceEnd);
    const periodsInput = options?.periods?.length
      ? options.periods
      : [{ plannedStart, plannedEnd }];
    if (periodsInput.length > 3) {
      throw new ConflictException('vacation request cannot have more than 3 periods');
    }

    const periods = periodsInput.map((period, index) => {
      const plannedStartAt = new Date(period.plannedStart);
      const plannedEndAt = new Date(period.plannedEnd);
      if (Number.isNaN(plannedStartAt.getTime()) || Number.isNaN(plannedEndAt.getTime())) {
        throw new ConflictException(`vacation period ${index + 1} has invalid dates`);
      }
      if (plannedEndAt.getTime() < plannedStartAt.getTime()) {
        throw new ConflictException(`vacation period ${index + 1} ends before it starts`);
      }
      if (plannedStartAt.getTime() < concessiveWindow.start.getTime()) {
        throw new ConflictException(
          `vacation request ${vacationBalanceId} starts before the concessive window opens`,
        );
      }
      if (plannedEndAt.getTime() > concessiveWindow.end.getTime()) {
        throw new ConflictException(
          `vacation request ${vacationBalanceId} ends after the concessive window closes`,
        );
      }
      return {
        plannedStart: plannedStartAt,
        plannedEnd: plannedEndAt,
        requestedDays: this.countInclusiveDays(plannedStartAt, plannedEndAt),
      };
    }).sort((a, b) => a.plannedStart.getTime() - b.plannedStart.getTime());

    for (let index = 1; index < periods.length; index += 1) {
      const previous = periods[index - 1];
      const current = periods[index];
      if (current.plannedStart.getTime() <= previous.plannedEnd.getTime()) {
        throw new ConflictException('vacation periods must not overlap');
      }
    }

    const requestedDays = periods.reduce((total, period) => total + period.requestedDays, 0);
    const abonoDays = Math.max(0, options?.abonoDays ?? 0);
    if (requestedDays <= 0) {
      throw new ConflictException(`vacation balance ${vacationBalanceId} has insufficient days`);
    }
    if (periods.length > 1) {
      if (periods.some((period) => period.requestedDays < 5)) {
        throw new ConflictException('fracionamento must keep the smaller periods with at least 5 days');
      }
      if (Math.max(...periods.map((period) => period.requestedDays)) < 14) {
        throw new ConflictException('fracionamento must keep one period of at least 14 days');
      }
    }
    if (abonoDays > Math.floor(requestedDays / 2)) {
      throw new ConflictException('abonoDays exceeds the maximum allowed conversion');
    }

    const consumedDays = requestedDays + abonoDays;
    if (balance.availableDays < consumedDays) {
      throw new ConflictException(`vacation balance ${vacationBalanceId} has insufficient days`);
    }

    const salaryBaseCents = options?.salaryBaseCents;
    const vacationBaseAmountCents = salaryBaseCents
      ? Math.floor((salaryBaseCents * requestedDays) / 30)
      : 0;
    const vacationAmountCents = salaryBaseCents
      ? vacationBaseAmountCents + Math.floor(vacationBaseAmountCents / 3)
      : 0;
    const abonoAmountCents = salaryBaseCents
      ? Math.floor((salaryBaseCents * abonoDays) / 30)
      : 0;

    const overlappingRequest = await this.prisma.vacationRequest.findFirst({
      where: {
        tenantId,
        vacationBalanceId,
        status: { not: 'cancelled' },
        OR: periods.map((period) => ({
          plannedStart: { lte: period.plannedEnd },
          plannedEnd: { gte: period.plannedStart },
        })),
      },
      select: {
        id: true,
        plannedStart: true,
        plannedEnd: true,
        status: true,
      },
    });
    if (overlappingRequest) {
      throw new ConflictException(
        `vacation request ${overlappingRequest.id} overlaps with the requested period`,
      );
    }

    const now = new Date();
    const created = await this.prisma.$transaction(async (tx) => {
      const record = await tx.vacationRequest.create({
        data: {
          tenantId,
          employeeId,
          vacationBalanceId,
          plannedStart: periods[0]!.plannedStart,
          plannedEnd: periods[periods.length - 1]!.plannedEnd,
          requestedDays,
          consumedDays,
          abonoDays,
          salaryBaseCents,
          vacationAmountCents,
          abonoAmountCents,
          status: 'requested',
          notes,
          requestedBy: actor,
          requestedAt: now,
          periods: {
            create: periods.map((period, index) => ({
              tenantId,
              sequence: index + 1,
              plannedStart: period.plannedStart,
              plannedEnd: period.plannedEnd,
              requestedDays: period.requestedDays,
            })),
          },
        },
        include: {
          balance: true,
          periods: {
            orderBy: { sequence: 'asc' },
          },
        },
      });

      await tx.auditEvent.create({
        data: this.auditData(
          tenantId,
          'vacation.requested',
          'vacationRequest',
          record.id,
          {
            employeeId,
            vacationBalanceId,
            requestedDays: String(requestedDays),
            consumedDays: String(consumedDays),
            abonoDays: String(abonoDays),
            actor,
            notes,
          },
          now,
        ),
      });

      return record;
    });

    return this.toVacationRequestRecord(created);
  }

  async listVacationRequests(tenantId: string, employeeId?: string): Promise<VacationRequestRecord[]> {
    await this.requireTenant(tenantId);
    const requests = await this.prisma.vacationRequest.findMany({
      where: {
        tenantId,
        ...(employeeId ? { employeeId } : {}),
      },
      include: {
        balance: true,
        periods: {
          orderBy: { sequence: 'asc' },
        },
      },
      orderBy: { createdAt: 'asc' },
    });

    return requests.map((request) => this.toVacationRequestRecord(request));
  }

  async approveVacationRequest(
    tenantId: string,
    vacationRequestId: string,
    actor?: string,
    notes?: string,
  ): Promise<VacationRequestRecord> {
    await this.requireTenant(tenantId);
    const request = await this.prisma.vacationRequest.findFirst({
      where: { id: vacationRequestId, tenantId },
      include: {
        balance: true,
        periods: {
          orderBy: { sequence: 'asc' },
        },
      },
    });
    if (!request) {
      throw new NotFoundException(`vacation request ${vacationRequestId} not found`);
    }
    if (request.status === 'cancelled') {
      throw new ConflictException(`vacation request ${vacationRequestId} is cancelled`);
    }
    if (request.status === 'approved') {
      throw new ConflictException(`vacation request ${vacationRequestId} is already approved`);
    }
    if (request.status === 'paid') {
      throw new ConflictException(`vacation request ${vacationRequestId} is already paid`);
    }
    if (request.balance.availableDays < request.consumedDays) {
      throw new ConflictException(`vacation balance ${request.vacationBalanceId} has insufficient days`);
    }

    const now = new Date();
    const updated = await this.prisma.$transaction(async (tx) => {
      const record = await tx.vacationRequest.update({
        where: { id: vacationRequestId },
        data: {
          status: 'approved',
          decidedBy: actor,
          decidedAt: now,
          notes: notes ?? request.notes,
        },
        include: {
          balance: true,
          periods: {
            orderBy: { sequence: 'asc' },
          },
        },
      });

      await tx.vacationBalance.update({
        where: { id: request.vacationBalanceId },
        data: {
          takenDays: request.balance.takenDays + request.consumedDays,
          availableDays: request.balance.availableDays - request.consumedDays,
          status: request.balance.availableDays - request.consumedDays <= 0 ? 'depleted' : 'open',
        },
      });

      await tx.auditEvent.create({
        data: this.auditData(
          tenantId,
          'vacation.approved',
          'vacationRequest',
          vacationRequestId,
          { vacationRequestId, employeeId: request.employeeId, actor, notes },
          now,
        ),
      });

      return record;
    });

    const refreshed = await this.prisma.vacationRequest.findFirst({
      where: { id: vacationRequestId, tenantId },
      include: {
        balance: true,
        periods: {
          orderBy: { sequence: 'asc' },
        },
      },
    });
    if (!refreshed) {
      throw new NotFoundException(`vacation request ${vacationRequestId} not found after approval`);
    }

    return this.toVacationRequestRecord(refreshed);
  }

  async issueVacationNotice(
    tenantId: string,
    vacationRequestId: string,
    actor?: string,
    notes?: string,
  ): Promise<VacationRequestRecord> {
    await this.requireTenant(tenantId);
    const request = await this.prisma.vacationRequest.findFirst({
      where: { id: vacationRequestId, tenantId },
      include: {
        balance: true,
        periods: {
          orderBy: { sequence: 'asc' },
        },
      },
    });
    if (!request) {
      throw new NotFoundException(`vacation request ${vacationRequestId} not found`);
    }
    if (request.status === 'cancelled') {
      throw new ConflictException(`vacation request ${vacationRequestId} is cancelled`);
    }
    if (request.status === 'paid') {
      throw new ConflictException(`vacation request ${vacationRequestId} is already paid`);
    }

    const now = new Date();
    const noticeIssuedAt = now;
    const noticeProtocol = `VAC-${randomUUID().slice(0, 8).toUpperCase()}`;
    const paymentDueAt = this.subtractUtcDays(request.plannedStart, 2);

    const updated = await this.prisma.$transaction(async (tx) => {
      const record = await tx.vacationRequest.update({
        where: { id: vacationRequestId },
        data: {
          status: 'notified',
          decidedBy: actor,
          decidedAt: now,
          noticeIssuedAt,
          noticeProtocol,
          paymentDueAt,
          notes: notes ?? request.notes,
        },
        include: {
          balance: true,
          periods: {
            orderBy: { sequence: 'asc' },
          },
        },
      });

      await tx.auditEvent.create({
        data: this.auditData(
          tenantId,
          'vacation.notified',
          'vacationRequest',
          vacationRequestId,
          { vacationRequestId, employeeId: request.employeeId, actor, noticeProtocol },
          now,
        ),
      });

      return record;
    });

    const refreshed = await this.prisma.vacationRequest.findFirst({
      where: { id: vacationRequestId, tenantId },
      include: {
        balance: true,
        periods: {
          orderBy: { sequence: 'asc' },
        },
      },
    });
    if (!refreshed) {
      throw new NotFoundException(`vacation request ${vacationRequestId} not found after cancellation`);
    }

    return this.toVacationRequestRecord(refreshed);
  }

  async markVacationPayment(
    tenantId: string,
    vacationRequestId: string,
    actor?: string,
    notes?: string,
  ): Promise<VacationRequestRecord> {
    await this.requireTenant(tenantId);
    const request = await this.prisma.vacationRequest.findFirst({
      where: { id: vacationRequestId, tenantId },
      include: {
        balance: true,
        periods: {
          orderBy: { sequence: 'asc' },
        },
      },
    });
    if (!request) {
      throw new NotFoundException(`vacation request ${vacationRequestId} not found`);
    }
    if (request.status === 'cancelled') {
      throw new ConflictException(`vacation request ${vacationRequestId} is cancelled`);
    }
    if (!request.noticeIssuedAt) {
      throw new ConflictException(`vacation request ${vacationRequestId} does not have a notice issued`);
    }
    if (request.status === 'paid') {
      throw new ConflictException(`vacation request ${vacationRequestId} is already paid`);
    }

    const now = new Date();
    const updated = await this.prisma.$transaction(async (tx) => {
      const record = await tx.vacationRequest.update({
        where: { id: vacationRequestId },
        data: {
          status: 'paid',
          decidedBy: actor,
          decidedAt: now,
          paidAt: now,
          paidBy: actor,
          notes: notes ?? request.notes,
        },
        include: {
          balance: true,
          periods: {
            orderBy: { sequence: 'asc' },
          },
        },
      });

      await tx.auditEvent.create({
        data: this.auditData(
          tenantId,
          'vacation.paid',
          'vacationRequest',
          vacationRequestId,
          { vacationRequestId, employeeId: request.employeeId, actor },
          now,
        ),
      });

      return record;
    });

    return this.toVacationRequestRecord(updated);
  }

  async sendVacationRequestToPayroll(
    tenantId: string,
    vacationRequestId: string,
    actor?: string,
    notes?: string,
  ): Promise<VacationRequestRecord> {
    await this.requireTenant(tenantId);
    const request = await this.prisma.vacationRequest.findFirst({
      where: { id: vacationRequestId, tenantId },
      include: {
        balance: true,
        periods: {
          orderBy: { sequence: 'asc' },
        },
      },
    });
    if (!request) {
      throw new NotFoundException(`vacation request ${vacationRequestId} not found`);
    }
    if (request.status !== 'paid') {
      throw new ConflictException(`vacation request ${vacationRequestId} must be paid before payroll integration`);
    }
    if (request.payrollBatchId) {
      throw new ConflictException(`vacation request ${vacationRequestId} is already integrated with payroll`);
    }
    const employee = await this.requireEmployee(tenantId, request.employeeId);

    const payrollPeriod = `${request.plannedStart.getUTCFullYear()}-${String(request.plannedStart.getUTCMonth() + 1).padStart(2, '0')}`;
    const now = new Date();
    const payrollReceiptNumber = `PAY-${randomUUID().slice(0, 8).toUpperCase()}`;
    const items = [
      {
        sourceEventType: 'vacation_request',
        sourceEventId: request.id,
        payrollRubricCode: 'FERIAS',
        quantityMinutes: request.requestedDays * 24 * 60,
        amountCents: request.vacationAmountCents,
        referenceDate: request.plannedStart,
        status: 'ready',
        reason: request.notes ?? 'vacation_paid',
        sourceReference: `vacation_request:${request.id}`,
      },
      ...(request.abonoDays > 0
        ? [
            {
              sourceEventType: 'vacation_abono',
              sourceEventId: request.id,
              payrollRubricCode: 'ABONO_FERIAS',
              quantityMinutes: request.abonoDays * 24 * 60,
              amountCents: request.abonoAmountCents,
              referenceDate: request.plannedStart,
              status: 'ready',
              reason: request.notes ?? 'vacation_abono_paid',
              sourceReference: `vacation_abono:${request.id}`,
            },
          ]
        : []),
    ];
    const totalMinutes = items.reduce((sum, item) => sum + item.quantityMinutes, 0);
    const totalAmountCents = items.reduce((sum, item) => sum + item.amountCents, 0);

    await this.prisma.$transaction(async (tx) => {
      const batch = await tx.timeSheetPayrollEventBatch.create({
        data: {
          tenantId,
          employeeId: request.employeeId,
          companyId: employee.companyId,
          sourcePeriodStart: request.plannedStart,
          sourcePeriodEnd: request.plannedEnd,
          payrollPeriod,
          status: 'sent',
          totalMinutes,
          totalAmountCents,
          notes: notes ?? request.notes,
          consolidatedBy: actor,
          consolidatedAt: now,
          approvedBy: actor,
          approvedAt: now,
          payrollReceiptNumber,
          sentBy: actor,
          sentAt: now,
        },
      });

      for (const item of items) {
        await tx.timeSheetPayrollEventBatchItem.create({
          data: {
            tenantId,
            batchId: batch.id,
            sourceEventType: item.sourceEventType,
            sourceEventId: item.sourceEventId,
            payrollRubricCode: item.payrollRubricCode,
            quantityMinutes: item.quantityMinutes,
            amountCents: item.amountCents,
            referenceDate: item.referenceDate,
            status: item.status,
            reason: item.reason,
            sourceReference: item.sourceReference,
          },
        });
      }

      await tx.vacationRequest.update({
        where: { id: vacationRequestId },
        data: {
          payrollBatchId: batch.id,
          payrollStatus: 'sent',
          payrollReceiptNumber,
          payrollSentBy: actor,
          payrollSentAt: now,
        },
      });

      await tx.auditEvent.create({
        data: this.auditData(
          tenantId,
          'vacation.sent_to_payroll',
          'vacationRequest',
          vacationRequestId,
          {
            vacationRequestId,
            employeeId: request.employeeId,
            payrollBatchId: batch.id,
            payrollReceiptNumber,
            actor,
            notes,
          },
          now,
        ),
      });
    });

    const refreshed = await this.prisma.vacationRequest.findFirst({
      where: { id: vacationRequestId, tenantId },
      include: {
        balance: true,
        periods: {
          orderBy: { sequence: 'asc' },
        },
      },
    });
    if (!refreshed) {
      throw new NotFoundException(`vacation request ${vacationRequestId} not found after payroll integration`);
    }

    return this.toVacationRequestRecord(refreshed);
  }

  async listVacationEsocialTransmissions(
    tenantId: string,
    vacationRequestId: string,
  ): Promise<VacationEsocialTransmissionRecord[]> {
    await this.requireTenant(tenantId);
    const request = await this.prisma.vacationRequest.findFirst({
      where: { id: vacationRequestId, tenantId },
      select: { id: true },
    });
    if (!request) {
      throw new NotFoundException(`vacation request ${vacationRequestId} not found`);
    }
    const transmissions = await this.prisma.vacationEsocialTransmission.findMany({
      where: { tenantId, vacationRequestId },
      orderBy: { createdAt: 'asc' },
    });

    return transmissions.map((transmission) => this.toVacationEsocialTransmissionRecord(transmission));
  }

  async queueVacationEsocialTransmission(
    tenantId: string,
    vacationRequestId: string,
    eventCode: string | undefined,
    actor?: string,
    notes?: string,
  ): Promise<VacationEsocialTransmissionRecord> {
    await this.requireTenant(tenantId);
    const request = await this.prisma.vacationRequest.findFirst({
      where: { id: vacationRequestId, tenantId },
      include: {
        balance: true,
        periods: {
          orderBy: { sequence: 'asc' },
        },
        payrollBatch: true,
      },
    });
    if (!request) {
      throw new NotFoundException(`vacation request ${vacationRequestId} not found`);
    }
    if (request.status === 'cancelled') {
      throw new ConflictException(`vacation request ${vacationRequestId} is cancelled`);
    }
    if (!request.noticeIssuedAt) {
      throw new ConflictException(`vacation request ${vacationRequestId} must have a notice issued before eSocial integration`);
    }

    const resolvedEventCode = eventCode ?? 'S-2230';
    if (resolvedEventCode !== 'S-2230') {
      throw new ConflictException(`unsupported vacation eSocial event ${resolvedEventCode}`);
    }

    const existing = await this.prisma.vacationEsocialTransmission.findUnique({
      where: {
        vacationRequestId_eventCode: {
          vacationRequestId,
          eventCode: resolvedEventCode,
        },
      },
    });

    const now = new Date();
    const payload = this.buildVacationEsocialPayload(request, resolvedEventCode, actor, notes);

    const transmission = await this.prisma.$transaction(async (tx) => {
      if (existing) {
        return tx.vacationEsocialTransmission.update({
          where: { id: existing.id },
          data: {
            status: 'queued',
            payload,
            errorMessage: null,
            receiptNumber: null,
            response: Prisma.JsonNull,
            queuedAt: now,
            sentAt: null,
            processedAt: null,
            attempts: 0,
          },
        });
      }

      return tx.vacationEsocialTransmission.create({
        data: {
          tenantId,
          vacationRequestId,
          eventCode: resolvedEventCode,
          status: 'queued',
          payload,
          queuedAt: now,
        },
      });
    });

    await this.prisma.auditEvent.create({
      data: this.auditData(
        tenantId,
        'vacation.esocial.queued',
        'vacationEsocialTransmission',
        transmission.id,
        {
          vacationRequestId,
          eventCode: resolvedEventCode,
          transmissionId: transmission.id,
          status: 'queued',
          actor,
          notes,
        },
        now,
      ),
    });

    try {
      await this.enqueueVacationEsocialTransmission(transmission.id);
      return this.toVacationEsocialTransmissionRecord(transmission);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      const failed = await this.markVacationEsocialTransmissionFailed(transmission.id, message);
      throw new ConflictException(`failed to enqueue vacation eSocial transmission ${transmission.id}: ${message}`);
    }
  }

  async markVacationEsocialTransmissionSent(
    transmissionId: string,
    receiptNumber: string,
    response: Record<string, string | number | boolean | undefined>,
  ): Promise<VacationEsocialTransmissionRecord> {
    const existing = await this.prisma.vacationEsocialTransmission.findUnique({
      where: { id: transmissionId },
    });
    if (!existing) {
      throw new NotFoundException(`vacation eSocial transmission ${transmissionId} not found`);
    }

    const now = new Date();
    const updated = await this.prisma.$transaction(async (tx) => {
      const record = await tx.vacationEsocialTransmission.update({
        where: { id: transmissionId },
        data: {
          status: 'sent',
          receiptNumber,
          response,
          sentAt: now,
          processedAt: now,
          attempts: existing.attempts + 1,
          errorMessage: null,
        },
      });

      await tx.auditEvent.create({
        data: this.auditData(
          existing.tenantId,
          'vacation.esocial.sent',
          'vacationEsocialTransmission',
          transmissionId,
          {
            vacationRequestId: existing.vacationRequestId,
            transmissionId,
            eventCode: existing.eventCode,
            receiptNumber,
            status: 'sent',
          },
          now,
        ),
      });

      return record;
    });

    return this.toVacationEsocialTransmissionRecord(updated);
  }

  async markVacationEsocialTransmissionFailed(
    transmissionId: string,
    errorMessage: string,
  ): Promise<VacationEsocialTransmissionRecord> {
    const existing = await this.prisma.vacationEsocialTransmission.findUnique({
      where: { id: transmissionId },
    });
    if (!existing) {
      throw new NotFoundException(`vacation eSocial transmission ${transmissionId} not found`);
    }

    const now = new Date();
    const updated = await this.prisma.$transaction(async (tx) => {
      const record = await tx.vacationEsocialTransmission.update({
        where: { id: transmissionId },
        data: {
          status: 'failed',
          errorMessage,
          processedAt: now,
          attempts: existing.attempts + 1,
        },
      });

      await tx.auditEvent.create({
        data: this.auditData(
          existing.tenantId,
          'vacation.esocial.failed',
          'vacationEsocialTransmission',
          transmissionId,
          {
            vacationRequestId: existing.vacationRequestId,
            transmissionId,
            eventCode: existing.eventCode,
            errorMessage,
            status: 'failed',
          },
          now,
        ),
      });

      return record;
    });

    return this.toVacationEsocialTransmissionRecord(updated);
  }

  async retryVacationEsocialTransmission(
    tenantId: string,
    transmissionId: string,
    actor?: string,
    notes?: string,
  ): Promise<VacationEsocialTransmissionRecord> {
    await this.requireTenant(tenantId);
    const existing = await this.prisma.vacationEsocialTransmission.findFirst({
      where: { id: transmissionId, tenantId },
      include: {
        request: {
          include: {
            balance: true,
            periods: {
              orderBy: { sequence: 'asc' },
            },
          },
        },
      },
    });
    if (!existing) {
      throw new NotFoundException(`vacation eSocial transmission ${transmissionId} not found`);
    }
    if (existing.status !== 'failed') {
      throw new ConflictException(`vacation eSocial transmission ${transmissionId} is not failed`);
    }

    const now = new Date();
    const payload = this.buildVacationEsocialPayload(existing.request, existing.eventCode, actor, notes);

    const updated = await this.prisma.$transaction(async (tx) => {
      const record = await tx.vacationEsocialTransmission.update({
        where: { id: transmissionId },
        data: {
          status: 'queued',
          payload,
          errorMessage: null,
          receiptNumber: null,
          response: Prisma.JsonNull,
          queuedAt: now,
          sentAt: null,
          processedAt: null,
          attempts: 0,
        },
      });

      await tx.auditEvent.create({
        data: this.auditData(
          tenantId,
          'vacation.esocial.requeued',
          'vacationEsocialTransmission',
          transmissionId,
          {
            vacationRequestId: existing.vacationRequestId,
            transmissionId,
            eventCode: existing.eventCode,
            status: 'queued',
            actor,
            notes,
          },
          now,
        ),
      });

      return record;
    });

    try {
      await this.enqueueVacationEsocialTransmission(updated.id);
      return this.toVacationEsocialTransmissionRecord(updated);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      await this.markVacationEsocialTransmissionFailed(updated.id, message);
      throw new ConflictException(`failed to requeue vacation eSocial transmission ${updated.id}: ${message}`);
    }
  }

  async cancelVacationRequest(
    tenantId: string,
    vacationRequestId: string,
    actor?: string,
    notes?: string,
  ): Promise<VacationRequestRecord> {
    await this.requireTenant(tenantId);
    const request = await this.prisma.vacationRequest.findFirst({
      where: { id: vacationRequestId, tenantId },
      include: {
        balance: true,
        periods: {
          orderBy: { sequence: 'asc' },
        },
      },
    });
    if (!request) {
      throw new NotFoundException(`vacation request ${vacationRequestId} not found`);
    }
    if (request.status === 'cancelled') {
      throw new ConflictException(`vacation request ${vacationRequestId} is cancelled`);
    }
    if (request.status === 'paid') {
      throw new ConflictException(`vacation request ${vacationRequestId} is already paid`);
    }

    const now = new Date();
    const updated = await this.prisma.$transaction(async (tx) => {
      const record = await tx.vacationRequest.update({
        where: { id: vacationRequestId },
        data: {
          status: 'cancelled',
          decidedBy: actor,
          decidedAt: now,
          notes: notes ?? request.notes,
        },
        include: {
          balance: true,
          periods: {
            orderBy: { sequence: 'asc' },
          },
        },
      });

      if (request.status === 'approved') {
        await tx.vacationBalance.update({
          where: { id: request.vacationBalanceId },
          data: {
            takenDays: Math.max(0, request.balance.takenDays - request.consumedDays),
            availableDays: request.balance.availableDays + request.consumedDays,
            status: 'open',
          },
        });
      }

      await tx.auditEvent.create({
        data: this.auditData(
          tenantId,
          'vacation.cancelled',
          'vacationRequest',
          vacationRequestId,
          { vacationRequestId, employeeId: request.employeeId, actor, notes },
          now,
        ),
      });

      return record;
    });

    return this.toVacationRequestRecord(updated);
  }

  async hasTenantAccess(subject: string, tenantId: string): Promise<boolean> {
    const grant = await this.prisma.tenantAccess.findUnique({
      where: {
        tenantId_subject: {
          tenantId,
          subject,
        },
      },
    });

    return Boolean(grant);
  }

  async listTenantAccess(subject: string): Promise<TenantAccessGrantRecord[]> {
    const grants = await this.prisma.tenantAccess.findMany({
      where: { subject },
      orderBy: { createdAt: 'asc' },
    });

    return grants.map((grant) => ({
      id: grant.id,
      tenantId: grant.tenantId,
      subject: grant.subject,
      role: grant.role,
      createdAt: grant.createdAt.toISOString(),
    }));
  }

  async listAccessibleTenants(subject: string): Promise<TenantAccessWithTenantRecord[]> {
    const grants = await this.prisma.tenantAccess.findMany({
      where: { subject },
      include: {
        tenant: true,
      },
      orderBy: { createdAt: 'asc' },
    });

    return grants.map((grant) => ({
      id: grant.id,
      tenantId: grant.tenantId,
      subject: grant.subject,
      role: grant.role,
      createdAt: grant.createdAt.toISOString(),
      tenant: this.toTenantRecord(grant.tenant),
    }));
  }

  async grantTenantAccess(tenantId: string, subject: string, role: string): Promise<TenantAccessGrantRecord> {
    await this.requireTenant(tenantId);

    const grant = await this.prisma.tenantAccess.upsert({
      where: {
        tenantId_subject: {
          tenantId,
          subject,
        },
      },
      update: {
        role,
      },
      create: {
        tenantId,
        subject,
        role,
      },
    });

    return {
      id: grant.id,
      tenantId: grant.tenantId,
      subject: grant.subject,
      role: grant.role,
      createdAt: grant.createdAt.toISOString(),
    };
  }

  private async requireTenant(tenantId: string) {
    const tenant = await this.prisma.tenant.findUnique({ where: { id: tenantId } });
    if (!tenant) {
      throw new NotFoundException(`tenant ${tenantId} not found`);
    }

    return tenant;
  }

  private async requireCompany(tenantId: string, companyId: string) {
    const company = await this.prisma.company.findFirst({ where: { id: companyId, tenantId } });
    if (!company) {
      throw new NotFoundException(`company ${companyId} not found`);
    }

    return company;
  }

  private async requirePerson(tenantId: string, personId: string) {
    const person = await this.prisma.person.findFirst({ where: { id: personId, tenantId } });
    if (!person) {
      throw new NotFoundException(`person ${personId} not found`);
    }

    return person;
  }

  private async requireEmployee(tenantId: string, employeeId: string) {
    const employee = await this.prisma.employee.findFirst({ where: { id: employeeId, tenantId } });
    if (!employee) {
      throw new NotFoundException(`employee ${employeeId} not found`);
    }

    return employee;
  }

  private async requireRecruitmentVacancyRequest(tenantId: string, vacancyRequestId: string) {
    const request = await this.prisma.recruitmentVacancyRequest.findFirst({
      where: { id: vacancyRequestId, tenantId },
    });
    if (!request) {
      throw new NotFoundException(`recruitment vacancy request ${vacancyRequestId} not found`);
    }

    return request;
  }

  private async requireRecruitmentCandidate(tenantId: string, candidateId: string) {
    const candidate = await this.prisma.recruitmentCandidate.findFirst({ where: { id: candidateId, tenantId } });
    if (!candidate) {
      throw new NotFoundException(`recruitment candidate ${candidateId} not found`);
    }

    return candidate;
  }

  private async requireAdmission(tenantId: string, admissionId: string) {
    const admission = await this.prisma.admissionRequest.findFirst({ where: { id: admissionId, tenantId } });
    if (!admission) {
      throw new NotFoundException(`admission ${admissionId} not found`);
    }

    return admission;
  }

  private async requireTermination(tenantId: string, terminationId: string) {
    const termination = await this.prisma.terminationRequest.findFirst({ where: { id: terminationId, tenantId } });
    if (!termination) {
      throw new NotFoundException(`termination ${terminationId} not found`);
    }

    return termination;
  }

  private async requireOffboarding(tenantId: string, offboardingId: string) {
    const offboarding = await this.prisma.terminationOffboarding.findFirst({ where: { id: offboardingId, tenantId } });
    if (!offboarding) {
      throw new NotFoundException(`offboarding ${offboardingId} not found`);
    }

    return offboarding;
  }

  private async requireRescission(tenantId: string, rescissionId: string) {
    const rescission = await this.prisma.rescissionRequest.findFirst({ where: { id: rescissionId, tenantId } });
    if (!rescission) {
      throw new NotFoundException(`rescission ${rescissionId} not found`);
    }

    return rescission;
  }

  private auditData(
    tenantId: string,
    action: string,
    entityType: string,
    entityId: string,
    details: Record<string, string | undefined>,
    occurredAt: Date,
  ): Prisma.AuditEventCreateInput {
    return {
      tenant: { connect: { id: tenantId } },
      action,
      entityType,
      entityId,
      occurredAt,
      details,
    };
  }

  private toTenantRecord(tenant: Awaited<ReturnType<typeof this.requireTenant>>): TenantRecord {
    return {
      id: tenant.id,
      name: tenant.name,
      slug: tenant.slug,
      createdAt: tenant.createdAt.toISOString(),
      updatedAt: tenant.updatedAt.toISOString(),
    };
  }

  private toCompanyRecord(company: Awaited<ReturnType<typeof this.requireCompany>>): CompanyRecord {
    return {
      id: company.id,
      tenantId: company.tenantId,
      legalName: company.legalName,
      tradeName: company.tradeName ?? undefined,
      cnpj: company.cnpj ?? undefined,
      createdAt: company.createdAt.toISOString(),
      updatedAt: company.updatedAt.toISOString(),
    };
  }

  private toPersonRecord(person: Awaited<ReturnType<typeof this.requirePerson>>): PersonRecord {
    return {
      id: person.id,
      tenantId: person.tenantId,
      fullName: person.fullName,
      cpf: person.cpf ?? undefined,
      createdAt: person.createdAt.toISOString(),
      updatedAt: person.updatedAt.toISOString(),
    };
  }

  private toEmployeeRecord(employee: Awaited<ReturnType<typeof this.requireEmployee>>): EmployeeRecord {
    return {
      id: employee.id,
      tenantId: employee.tenantId,
      companyId: employee.companyId,
      personId: employee.personId,
      code: employee.code ?? undefined,
      createdAt: employee.createdAt.toISOString(),
      updatedAt: employee.updatedAt.toISOString(),
    };
  }

  private toRecruitmentVacancyRequestRecord(request: {
    id: string;
    tenantId: string;
    companyId: string | null;
    code: string;
    title: string;
    department: string | null;
    headcount: number;
    status: string;
    requestedBy: string | null;
    requestedAt: Date;
    approvedBy: string | null;
    approvedAt: Date | null;
    publishedBy: string | null;
    publishedAt: Date | null;
    notes: string | null;
    createdAt: Date;
    updatedAt: Date;
  }): RecruitmentVacancyRequestRecord {
    return {
      id: request.id,
      tenantId: request.tenantId,
      companyId: request.companyId ?? undefined,
      code: request.code,
      title: request.title,
      department: request.department ?? undefined,
      headcount: request.headcount,
      status: request.status,
      requestedBy: request.requestedBy ?? undefined,
      requestedAt: request.requestedAt.toISOString(),
      approvedBy: request.approvedBy ?? undefined,
      approvedAt: request.approvedAt?.toISOString(),
      publishedBy: request.publishedBy ?? undefined,
      publishedAt: request.publishedAt?.toISOString(),
      notes: request.notes ?? undefined,
      createdAt: request.createdAt.toISOString(),
      updatedAt: request.updatedAt.toISOString(),
    };
  }

  private toRecruitmentCandidateRecord(candidate: {
    id: string;
    tenantId: string;
    companyId: string | null;
    vacancyRequestId: string;
    fullName: string;
    email: string | null;
    phone: string | null;
    source: string | null;
    status: string;
    stage: string;
    appliedAt: Date;
    movedBy: string | null;
    movedAt: Date | null;
    notes: string | null;
    createdAt: Date;
    updatedAt: Date;
  }): RecruitmentCandidateRecord {
    return {
      id: candidate.id,
      tenantId: candidate.tenantId,
      companyId: candidate.companyId ?? undefined,
      vacancyRequestId: candidate.vacancyRequestId,
      fullName: candidate.fullName,
      email: candidate.email ?? undefined,
      phone: candidate.phone ?? undefined,
      source: candidate.source ?? undefined,
      status: candidate.status,
      stage: candidate.stage,
      appliedAt: candidate.appliedAt.toISOString(),
      movedBy: candidate.movedBy ?? undefined,
      movedAt: candidate.movedAt?.toISOString(),
      notes: candidate.notes ?? undefined,
      createdAt: candidate.createdAt.toISOString(),
      updatedAt: candidate.updatedAt.toISOString(),
    };
  }

  private toRecruitmentInterviewRecord(interview: {
    id: string;
    tenantId: string;
    companyId: string | null;
    vacancyRequestId: string;
    candidateId: string;
    scheduledAt: Date;
    completedAt: Date | null;
    status: string;
    interviewerName: string | null;
    location: string | null;
    notes: string | null;
    createdAt: Date;
    updatedAt: Date;
  }): RecruitmentInterviewRecord {
    return {
      id: interview.id,
      tenantId: interview.tenantId,
      companyId: interview.companyId ?? undefined,
      vacancyRequestId: interview.vacancyRequestId,
      candidateId: interview.candidateId,
      scheduledAt: interview.scheduledAt.toISOString(),
      completedAt: interview.completedAt?.toISOString(),
      status: interview.status,
      interviewerName: interview.interviewerName ?? undefined,
      location: interview.location ?? undefined,
      notes: interview.notes ?? undefined,
      createdAt: interview.createdAt.toISOString(),
      updatedAt: interview.updatedAt.toISOString(),
    };
  }

  private toRecruitmentCandidateEvaluationRecord(evaluation: {
    id: string;
    tenantId: string;
    companyId: string | null;
    vacancyRequestId: string;
    candidateId: string;
    interviewId: string | null;
    evaluatorName: string | null;
    score: number;
    recommendation: string;
    evaluatedAt: Date;
    notes: string | null;
    createdAt: Date;
    updatedAt: Date;
  }): RecruitmentCandidateEvaluationRecord {
    return {
      id: evaluation.id,
      tenantId: evaluation.tenantId,
      companyId: evaluation.companyId ?? undefined,
      vacancyRequestId: evaluation.vacancyRequestId,
      candidateId: evaluation.candidateId,
      interviewId: evaluation.interviewId ?? undefined,
      evaluatorName: evaluation.evaluatorName ?? undefined,
      score: evaluation.score,
      recommendation: evaluation.recommendation,
      evaluatedAt: evaluation.evaluatedAt.toISOString(),
      notes: evaluation.notes ?? undefined,
      createdAt: evaluation.createdAt.toISOString(),
      updatedAt: evaluation.updatedAt.toISOString(),
    };
  }

  private toRecruitmentProposalRecord(proposal: {
    id: string;
    tenantId: string;
    companyId: string | null;
    vacancyRequestId: string;
    candidateId: string;
    salaryBaseCents: number | null;
    startAt: Date | null;
    status: string;
    notes: string | null;
    convertedAt: Date | null;
    convertedBy: string | null;
    admissionRequestId: string | null;
    createdAt: Date;
    updatedAt: Date;
  }): RecruitmentProposalRecord {
    return {
      id: proposal.id,
      tenantId: proposal.tenantId,
      companyId: proposal.companyId ?? undefined,
      vacancyRequestId: proposal.vacancyRequestId,
      candidateId: proposal.candidateId,
      salaryBaseCents: proposal.salaryBaseCents ?? undefined,
      startAt: proposal.startAt?.toISOString(),
      status: proposal.status,
      notes: proposal.notes ?? undefined,
      convertedAt: proposal.convertedAt?.toISOString(),
      convertedBy: proposal.convertedBy ?? undefined,
      admissionRequestId: proposal.admissionRequestId ?? undefined,
      createdAt: proposal.createdAt.toISOString(),
      updatedAt: proposal.updatedAt.toISOString(),
    };
  }

  private toBenefitCatalogRecord(catalog: {
    id: string;
    tenantId: string;
    code: string;
    name: string;
    benefitType: string;
    description: string | null;
    active: boolean;
    createdBy: string | null;
    createdAt: Date;
    updatedAt: Date;
  }): BenefitCatalogRecord {
    return {
      id: catalog.id,
      tenantId: catalog.tenantId,
      code: catalog.code,
      name: catalog.name,
      benefitType: catalog.benefitType,
      description: catalog.description ?? undefined,
      active: catalog.active,
      createdBy: catalog.createdBy ?? undefined,
      createdAt: catalog.createdAt.toISOString(),
      updatedAt: catalog.updatedAt.toISOString(),
    };
  }

  private toEmployeeBenefitRecord(benefit: {
    id: string;
    tenantId: string;
    employeeId: string;
    benefitCatalogId: string;
    status: string;
    startsAt: Date;
    endsAt: Date | null;
    notes: string | null;
    requestedBy: string | null;
    requestedAt: Date;
    changedBy: string | null;
    changedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    benefitCatalog?: {
      id: string;
      tenantId: string;
      code: string;
      name: string;
      benefitType: string;
      description: string | null;
      active: boolean;
      createdBy: string | null;
      createdAt: Date;
      updatedAt: Date;
    } | null;
  }): EmployeeBenefitRecord {
    return {
      id: benefit.id,
      tenantId: benefit.tenantId,
      employeeId: benefit.employeeId,
      benefitCatalogId: benefit.benefitCatalogId,
      status: benefit.status,
      startsAt: benefit.startsAt.toISOString(),
      endsAt: benefit.endsAt?.toISOString(),
      notes: benefit.notes ?? undefined,
      requestedBy: benefit.requestedBy ?? undefined,
      requestedAt: benefit.requestedAt.toISOString(),
      changedBy: benefit.changedBy ?? undefined,
      changedAt: benefit.changedAt?.toISOString(),
      createdAt: benefit.createdAt.toISOString(),
      updatedAt: benefit.updatedAt.toISOString(),
      benefitCatalog: benefit.benefitCatalog ? this.toBenefitCatalogRecord(benefit.benefitCatalog) : undefined,
    };
  }

  private toVacationBalanceRecord(balance: {
    id: string;
    tenantId: string;
    employeeId: string;
    referenceStart: Date;
    referenceEnd: Date;
    accruedDays: number;
    takenDays: number;
    availableDays: number;
    status: string;
    notes: string | null;
    createdBy: string | null;
    createdAt: Date;
    updatedAt: Date;
  }, now = new Date()): VacationBalanceRecord {
    const concessiveWindow = this.getVacationConcessiveWindow(balance.referenceEnd, now);
    return {
      id: balance.id,
      tenantId: balance.tenantId,
      employeeId: balance.employeeId,
      referenceStart: balance.referenceStart.toISOString(),
      referenceEnd: balance.referenceEnd.toISOString(),
      concessiveStart: concessiveWindow.start.toISOString(),
      concessiveEnd: concessiveWindow.end.toISOString(),
      concessiveStatus: concessiveWindow.status,
      daysUntilConcessiveEnd: concessiveWindow.daysUntilEnd,
      canScheduleVacation: concessiveWindow.canSchedule,
      accruedDays: balance.accruedDays,
      takenDays: balance.takenDays,
      availableDays: balance.availableDays,
      status: balance.status,
      notes: balance.notes ?? undefined,
      createdBy: balance.createdBy ?? undefined,
      createdAt: balance.createdAt.toISOString(),
      updatedAt: balance.updatedAt.toISOString(),
    };
  }

  private toVacationRequestRecord(request: {
    id: string;
    tenantId: string;
    employeeId: string;
    vacationBalanceId: string;
    plannedStart: Date;
    plannedEnd: Date;
    requestedDays: number;
    consumedDays: number;
    abonoDays: number;
    salaryBaseCents: number | null;
    vacationAmountCents: number;
    abonoAmountCents: number;
    status: string;
    notes: string | null;
    requestedBy: string | null;
    requestedAt: Date;
    decidedBy: string | null;
    decidedAt: Date | null;
    noticeIssuedAt: Date | null;
    noticeProtocol: string | null;
    paymentDueAt: Date | null;
  paidAt: Date | null;
  paidBy: string | null;
  payrollBatchId: string | null;
  payrollStatus: string | null;
  payrollReceiptNumber: string | null;
  payrollSentBy: string | null;
  payrollSentAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
    balance?: {
      id: string;
      tenantId: string;
      employeeId: string;
      referenceStart: Date;
      referenceEnd: Date;
      accruedDays: number;
      takenDays: number;
      availableDays: number;
      status: string;
      notes: string | null;
      createdBy: string | null;
      createdAt: Date;
      updatedAt: Date;
    } | null;
    periods?: {
      id: string;
      tenantId: string;
      vacationRequestId: string;
      sequence: number;
      plannedStart: Date;
      plannedEnd: Date;
      requestedDays: number;
      createdAt: Date;
      updatedAt: Date;
    }[];
  }): VacationRequestRecord {
    return {
      id: request.id,
      tenantId: request.tenantId,
      employeeId: request.employeeId,
      vacationBalanceId: request.vacationBalanceId,
      plannedStart: request.plannedStart.toISOString(),
      plannedEnd: request.plannedEnd.toISOString(),
      requestedDays: request.requestedDays,
      consumedDays: request.consumedDays,
      abonoDays: request.abonoDays,
      salaryBaseCents: request.salaryBaseCents ?? undefined,
      vacationAmountCents: request.vacationAmountCents,
      abonoAmountCents: request.abonoAmountCents,
      status: request.status,
      notes: request.notes ?? undefined,
      requestedBy: request.requestedBy ?? undefined,
      requestedAt: request.requestedAt.toISOString(),
      decidedBy: request.decidedBy ?? undefined,
      decidedAt: request.decidedAt?.toISOString(),
      noticeIssuedAt: request.noticeIssuedAt?.toISOString(),
      noticeProtocol: request.noticeProtocol ?? undefined,
      paymentDueAt: request.paymentDueAt?.toISOString(),
      paidAt: request.paidAt?.toISOString(),
      paidBy: request.paidBy ?? undefined,
      payrollBatchId: request.payrollBatchId ?? undefined,
      payrollStatus: request.payrollStatus ?? undefined,
      payrollReceiptNumber: request.payrollReceiptNumber ?? undefined,
      payrollSentBy: request.payrollSentBy ?? undefined,
      payrollSentAt: request.payrollSentAt?.toISOString(),
      createdAt: request.createdAt.toISOString(),
      updatedAt: request.updatedAt.toISOString(),
      balance: request.balance ? this.toVacationBalanceRecord(request.balance, request.requestedAt) : undefined,
      periods: request.periods
        ? request.periods.map((period) => this.toVacationRequestPeriodRecord(period))
        : [],
    };
  }

  private toVacationRequestPeriodRecord(period: {
    id: string;
    tenantId: string;
    vacationRequestId: string;
    sequence: number;
    plannedStart: Date;
    plannedEnd: Date;
    requestedDays: number;
    createdAt: Date;
    updatedAt: Date;
  }): VacationRequestPeriodRecord {
    return {
      id: period.id,
      tenantId: period.tenantId,
      vacationRequestId: period.vacationRequestId,
      sequence: period.sequence,
      plannedStart: period.plannedStart.toISOString(),
      plannedEnd: period.plannedEnd.toISOString(),
      requestedDays: period.requestedDays,
      createdAt: period.createdAt.toISOString(),
      updatedAt: period.updatedAt.toISOString(),
    };
  }

  private toVacationEsocialTransmissionRecord(transmission: {
    id: string;
    tenantId: string;
    vacationRequestId: string;
    eventCode: string;
    status: string;
    payload: Prisma.JsonValue;
    receiptNumber: string | null;
    response: Prisma.JsonValue | null;
    errorMessage: string | null;
    queuedAt: Date;
    sentAt: Date | null;
    processedAt: Date | null;
    attempts: number;
    createdAt: Date;
    updatedAt: Date;
  }): VacationEsocialTransmissionRecord {
    return {
      id: transmission.id,
      tenantId: transmission.tenantId,
      vacationRequestId: transmission.vacationRequestId,
      eventCode: transmission.eventCode,
      status: transmission.status,
      payload: (transmission.payload as Record<string, string | number | boolean | undefined>) ?? {},
      receiptNumber: transmission.receiptNumber ?? undefined,
      response: transmission.response
        ? (transmission.response as Record<string, string | number | boolean | undefined>)
        : undefined,
      errorMessage: transmission.errorMessage ?? undefined,
      queuedAt: transmission.queuedAt.toISOString(),
      sentAt: transmission.sentAt?.toISOString(),
      processedAt: transmission.processedAt?.toISOString(),
      attempts: transmission.attempts,
      createdAt: transmission.createdAt.toISOString(),
      updatedAt: transmission.updatedAt.toISOString(),
    };
  }

  private getVacationConcessiveWindow(referenceEnd: Date, now = new Date()) {
    const start = new Date(Date.UTC(
      referenceEnd.getUTCFullYear(),
      referenceEnd.getUTCMonth(),
      referenceEnd.getUTCDate() + 1,
      0,
      0,
      0,
      0,
    ));
    const end = new Date(this.addUtcMonths(start, 12).getTime() - 1);
    const daysUntilEnd = Math.ceil((end.getTime() - now.getTime()) / (24 * 60 * 60 * 1000));
    const canSchedule = now.getTime() <= end.getTime();
    const status = !canSchedule
      ? 'expired'
      : daysUntilEnd <= 30
        ? 'near_expiry'
        : 'open';

    return {
      start,
      end,
      daysUntilEnd: Math.max(0, daysUntilEnd),
      canSchedule,
      status,
    };
  }

  private addUtcMonths(date: Date, months: number, offsetMs = 0): Date {
    return new Date(
      Date.UTC(
        date.getUTCFullYear(),
        date.getUTCMonth() + months,
        date.getUTCDate(),
        date.getUTCHours(),
        date.getUTCMinutes(),
        date.getUTCSeconds(),
        date.getUTCMilliseconds(),
      ) + offsetMs,
    );
  }

  private subtractUtcDays(date: Date, days: number): Date {
    return new Date(Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate() - days,
      0,
      0,
      0,
      0,
    ));
  }

  private addUtcDays(date: Date, days: number): Date {
    return new Date(Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate() + days,
      0,
      0,
      0,
      0,
    ));
  }

  private countInclusiveDays(start: Date, end: Date): number {
    return Math.max(1, Math.floor((end.getTime() - start.getTime()) / (24 * 60 * 60 * 1000)) + 1);
  }

  private toAdmissionRecord(admission: {
    id: string;
    tenantId: string;
    sourceCandidateId?: string | null;
    sourceProposalId?: string | null;
    personId: string;
    companyId: string;
    employeeId: string;
    status: string;
    requestedBy: string | null;
    requestedAt: Date;
    createdAt: Date;
    updatedAt: Date;
  }): AdmissionRecord {
    return {
      id: admission.id,
      tenantId: admission.tenantId,
      sourceCandidateId: admission.sourceCandidateId ?? undefined,
      sourceProposalId: admission.sourceProposalId ?? undefined,
      personId: admission.personId,
      companyId: admission.companyId,
      employeeId: admission.employeeId,
      status: admission.status,
      requestedBy: admission.requestedBy ?? undefined,
      requestedAt: admission.requestedAt.toISOString(),
      createdAt: admission.createdAt.toISOString(),
      updatedAt: admission.updatedAt.toISOString(),
    };
  }

  private toAdmissionHistoryRecord(entry: {
    id: string;
    tenantId: string;
    admissionRequestId: string;
    eventType: string;
    fromStatus: string | null;
    toStatus: string | null;
    actor: string | null;
    occurredAt: Date;
    details: Prisma.JsonValue;
  }): AdmissionHistoryRecord {
    return {
      id: entry.id,
      tenantId: entry.tenantId,
      admissionRequestId: entry.admissionRequestId,
      eventType: entry.eventType,
      fromStatus: entry.fromStatus ?? undefined,
      toStatus: entry.toStatus ?? undefined,
      actor: entry.actor ?? undefined,
      occurredAt: entry.occurredAt.toISOString(),
      details: (entry.details as Record<string, string | undefined>) ?? {},
    };
  }

  private toAdmissionChecklistItemRecord(item: {
    id: string;
    tenantId: string;
    admissionRequestId: string;
    code: string;
    label: string;
    required: boolean;
    status: string;
    receivedBy: string | null;
    receivedAt: Date | null;
    notes: string | null;
    createdAt: Date;
    updatedAt: Date;
  }): AdmissionChecklistItemRecord {
    return {
      id: item.id,
      tenantId: item.tenantId,
      admissionRequestId: item.admissionRequestId,
      code: item.code,
      label: item.label,
      required: item.required,
      status: item.status,
      receivedBy: item.receivedBy ?? undefined,
      receivedAt: item.receivedAt?.toISOString(),
      notes: item.notes ?? undefined,
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString(),
    };
  }

  private toAdmissionContractRecord(contract: {
    id: string;
    tenantId: string;
    admissionRequestId: string;
    contractType: string;
    effectiveFrom: Date;
    status: string;
    notes: string | null;
    createdBy: string | null;
    createdAt: Date;
    updatedAt: Date;
  }): AdmissionContractRecord {
    return {
      id: contract.id,
      tenantId: contract.tenantId,
      admissionRequestId: contract.admissionRequestId,
      contractType: contract.contractType,
      effectiveFrom: contract.effectiveFrom.toISOString(),
      status: contract.status,
      notes: contract.notes ?? undefined,
      createdBy: contract.createdBy ?? undefined,
      createdAt: contract.createdAt.toISOString(),
      updatedAt: contract.updatedAt.toISOString(),
    };
  }

  private toAdmissionDocumentRecord(document: {
    id: string;
    tenantId: string;
    admissionRequestId: string;
    admissionContractId: string | null;
    documentType: string;
    title: string;
    status: string;
    signedBy: string | null;
    signedAt: Date | null;
    signatureMethod: string | null;
    content: Prisma.JsonValue;
    generatedBy: string | null;
    generatedAt: Date;
    createdAt: Date;
    updatedAt: Date;
  }): AdmissionDocumentRecord {
    return {
      id: document.id,
      tenantId: document.tenantId,
      admissionRequestId: document.admissionRequestId,
      admissionContractId: document.admissionContractId ?? undefined,
      documentType: document.documentType,
      title: document.title,
      status: document.status,
      signedBy: document.signedBy ?? undefined,
      signedAt: document.signedAt?.toISOString(),
      signatureMethod: document.signatureMethod ?? undefined,
      content: (document.content as Record<string, unknown>) ?? {},
      generatedBy: document.generatedBy ?? undefined,
      generatedAt: document.generatedAt.toISOString(),
      createdAt: document.createdAt.toISOString(),
      updatedAt: document.updatedAt.toISOString(),
    };
  }

  private toAdmissionEsocialTransmissionRecord(transmission: {
    id: string;
    tenantId: string;
    admissionRequestId: string;
    admissionContractId: string | null;
    eventCode: string;
    status: string;
    payload: Prisma.JsonValue;
    receiptNumber: string | null;
    response: Prisma.JsonValue | null;
    errorMessage: string | null;
    queuedAt: Date;
    sentAt: Date | null;
    processedAt: Date | null;
    attempts: number;
    createdAt: Date;
    updatedAt: Date;
  }): AdmissionEsocialTransmissionRecord {
    return {
      id: transmission.id,
      tenantId: transmission.tenantId,
      admissionRequestId: transmission.admissionRequestId,
      admissionContractId: transmission.admissionContractId ?? undefined,
      eventCode: transmission.eventCode,
      status: transmission.status,
      payload: transmission.payload as Record<string, string | undefined>,
      receiptNumber: transmission.receiptNumber ?? undefined,
      response: transmission.response ? (transmission.response as Record<string, string | undefined>) : undefined,
      errorMessage: transmission.errorMessage ?? undefined,
      queuedAt: transmission.queuedAt.toISOString(),
      sentAt: transmission.sentAt?.toISOString(),
      processedAt: transmission.processedAt?.toISOString(),
      attempts: transmission.attempts,
      createdAt: transmission.createdAt.toISOString(),
      updatedAt: transmission.updatedAt.toISOString(),
    };
  }

  private toTerminationRecord(termination: {
    id: string;
    tenantId: string;
    employeeId: string;
    status: string;
    reason: string;
    effectiveAt: Date;
    noticeType: string | null;
    requestedBy: string | null;
    requestedAt: Date;
    approvedBy: string | null;
    approvedAt: Date | null;
    effectiveBy: string | null;
    effectiveOn: Date | null;
    cancelledBy: string | null;
    cancelledAt: Date | null;
    notes: string | null;
    createdAt: Date;
    updatedAt: Date;
  }): TerminationRecord {
    return {
      id: termination.id,
      tenantId: termination.tenantId,
      employeeId: termination.employeeId,
      status: termination.status,
      reason: termination.reason,
      effectiveAt: termination.effectiveAt.toISOString(),
      noticeType: termination.noticeType ?? undefined,
      requestedBy: termination.requestedBy ?? undefined,
      requestedAt: termination.requestedAt.toISOString(),
      approvedBy: termination.approvedBy ?? undefined,
      approvedAt: termination.approvedAt?.toISOString(),
      effectiveBy: termination.effectiveBy ?? undefined,
      effectiveOn: termination.effectiveOn?.toISOString(),
      cancelledBy: termination.cancelledBy ?? undefined,
      cancelledAt: termination.cancelledAt?.toISOString(),
      notes: termination.notes ?? undefined,
      createdAt: termination.createdAt.toISOString(),
      updatedAt: termination.updatedAt.toISOString(),
    };
  }

  private toTerminationHistoryRecord(entry: {
    id: string;
    tenantId: string;
    terminationRequestId: string;
    eventType: string;
    fromStatus: string | null;
    toStatus: string | null;
    actor: string | null;
    occurredAt: Date;
    details: Prisma.JsonValue;
  }): TerminationHistoryRecord {
    return {
      id: entry.id,
      tenantId: entry.tenantId,
      terminationRequestId: entry.terminationRequestId,
      eventType: entry.eventType,
      fromStatus: entry.fromStatus ?? undefined,
      toStatus: entry.toStatus ?? undefined,
      actor: entry.actor ?? undefined,
      occurredAt: entry.occurredAt.toISOString(),
      details: (entry.details as Record<string, string | undefined>) ?? {},
    };
  }

  private toTerminationOffboardingRecord(offboarding: {
    id: string;
    tenantId: string;
    terminationRequestId: string;
    employeeId: string;
    status: string;
    requestedBy: string | null;
    requestedAt: Date;
    closedBy: string | null;
    closedAt: Date | null;
    cancelledBy: string | null;
    cancelledAt: Date | null;
    notes: string | null;
    createdAt: Date;
    updatedAt: Date;
  }): TerminationOffboardingRecord {
    return {
      id: offboarding.id,
      tenantId: offboarding.tenantId,
      terminationRequestId: offboarding.terminationRequestId,
      employeeId: offboarding.employeeId,
      status: offboarding.status,
      requestedBy: offboarding.requestedBy ?? undefined,
      requestedAt: offboarding.requestedAt.toISOString(),
      closedBy: offboarding.closedBy ?? undefined,
      closedAt: offboarding.closedAt?.toISOString(),
      cancelledBy: offboarding.cancelledBy ?? undefined,
      cancelledAt: offboarding.cancelledAt?.toISOString(),
      notes: offboarding.notes ?? undefined,
      createdAt: offboarding.createdAt.toISOString(),
      updatedAt: offboarding.updatedAt.toISOString(),
    };
  }

  private toTerminationOffboardingHistoryRecord(entry: {
    id: string;
    tenantId: string;
    terminationOffboardingId: string;
    eventType: string;
    fromStatus: string | null;
    toStatus: string | null;
    actor: string | null;
    occurredAt: Date;
    details: Prisma.JsonValue;
  }): TerminationOffboardingHistoryRecord {
    return {
      id: entry.id,
      tenantId: entry.tenantId,
      terminationOffboardingId: entry.terminationOffboardingId,
      eventType: entry.eventType,
      fromStatus: entry.fromStatus ?? undefined,
      toStatus: entry.toStatus ?? undefined,
      actor: entry.actor ?? undefined,
      occurredAt: entry.occurredAt.toISOString(),
      details: (entry.details as Record<string, string | undefined>) ?? {},
    };
  }

  private toTerminationEsocialTransmissionRecord(transmission: {
    id: string;
    tenantId: string;
    terminationRequestId: string;
    terminationOffboardingId: string;
    eventCode: string;
    status: string;
    payload: Prisma.JsonValue;
    receiptNumber: string | null;
    response: Prisma.JsonValue | null;
    errorMessage: string | null;
    queuedAt: Date;
    sentAt: Date | null;
    processedAt: Date | null;
    attempts: number;
    createdAt: Date;
    updatedAt: Date;
  }): TerminationEsocialTransmissionRecord {
    return {
      id: transmission.id,
      tenantId: transmission.tenantId,
      terminationRequestId: transmission.terminationRequestId,
      terminationOffboardingId: transmission.terminationOffboardingId,
      eventCode: transmission.eventCode,
      status: transmission.status,
      payload: transmission.payload as Record<string, string | undefined>,
      receiptNumber: transmission.receiptNumber ?? undefined,
      response: transmission.response ? (transmission.response as Record<string, string | undefined>) : undefined,
      errorMessage: transmission.errorMessage ?? undefined,
      queuedAt: transmission.queuedAt.toISOString(),
      sentAt: transmission.sentAt?.toISOString(),
      processedAt: transmission.processedAt?.toISOString(),
      attempts: transmission.attempts,
      createdAt: transmission.createdAt.toISOString(),
      updatedAt: transmission.updatedAt.toISOString(),
    };
  }

  private toRescissionRecord(rescission: {
    id: string;
    tenantId: string;
    terminationRequestId: string;
    employeeId: string;
    status: string;
    paymentDueAt: Date | null;
    requestedBy: string | null;
    requestedAt: Date;
    closedBy: string | null;
    closedAt: Date | null;
    notes: string | null;
    createdAt: Date;
    updatedAt: Date;
  }): RescissionRecord {
    return {
      id: rescission.id,
      tenantId: rescission.tenantId,
      terminationRequestId: rescission.terminationRequestId,
      employeeId: rescission.employeeId,
      status: rescission.status,
      paymentDueAt: rescission.paymentDueAt?.toISOString(),
      requestedBy: rescission.requestedBy ?? undefined,
      requestedAt: rescission.requestedAt.toISOString(),
      closedBy: rescission.closedBy ?? undefined,
      closedAt: rescission.closedAt?.toISOString(),
      notes: rescission.notes ?? undefined,
      createdAt: rescission.createdAt.toISOString(),
      updatedAt: rescission.updatedAt.toISOString(),
    };
  }

  private toRescissionHistoryRecord(entry: {
    id: string;
    tenantId: string;
    rescissionRequestId: string;
    eventType: string;
    fromStatus: string | null;
    toStatus: string | null;
    actor: string | null;
    occurredAt: Date;
    details: Prisma.JsonValue;
  }): RescissionHistoryRecord {
    return {
      id: entry.id,
      tenantId: entry.tenantId,
      rescissionRequestId: entry.rescissionRequestId,
      eventType: entry.eventType,
      fromStatus: entry.fromStatus ?? undefined,
      toStatus: entry.toStatus ?? undefined,
      actor: entry.actor ?? undefined,
      occurredAt: entry.occurredAt.toISOString(),
      details: (entry.details as Record<string, string | undefined>) ?? {},
    };
  }

  private toRescissionCalculationRecord(calculation: {
    id: string;
    tenantId: string;
    rescissionRequestId: string;
    status: string;
    referenceSalaryCents: number | null;
    noticeAmountCents: number;
    salaryBalanceAmountCents: number;
    vacationAmountCents: number;
    thirteenthAmountCents: number;
    fgtsAmountCents: number;
    fgtsPenaltyAmountCents: number;
    deductionsAmountCents: number;
    grossAmountCents: number;
    netAmountCents: number;
    notes: string | null;
    calculatedBy: string | null;
    calculatedAt: Date;
    createdAt: Date;
    updatedAt: Date;
  }): RescissionCalculationRecord {
    return {
      id: calculation.id,
      tenantId: calculation.tenantId,
      rescissionRequestId: calculation.rescissionRequestId,
      status: calculation.status,
      referenceSalaryCents: calculation.referenceSalaryCents ?? undefined,
      noticeAmountCents: calculation.noticeAmountCents,
      salaryBalanceAmountCents: calculation.salaryBalanceAmountCents,
      vacationAmountCents: calculation.vacationAmountCents,
      thirteenthAmountCents: calculation.thirteenthAmountCents,
      fgtsAmountCents: calculation.fgtsAmountCents,
      fgtsPenaltyAmountCents: calculation.fgtsPenaltyAmountCents,
      deductionsAmountCents: calculation.deductionsAmountCents,
      grossAmountCents: calculation.grossAmountCents,
      netAmountCents: calculation.netAmountCents,
      notes: calculation.notes ?? undefined,
      calculatedBy: calculation.calculatedBy ?? undefined,
      calculatedAt: calculation.calculatedAt.toISOString(),
      createdAt: calculation.createdAt.toISOString(),
      updatedAt: calculation.updatedAt.toISOString(),
    };
  }

  private toRescissionDocumentRecord(document: {
    id: string;
    tenantId: string;
    rescissionRequestId: string;
    calculationId: string | null;
    documentType: string;
    title: string;
    status: string;
    signedBy: string | null;
    signedAt: Date | null;
    signatureMethod: string | null;
    content: Prisma.JsonValue;
    generatedBy: string | null;
    generatedAt: Date;
    createdAt: Date;
    updatedAt: Date;
  }): RescissionDocumentRecord {
    return {
      id: document.id,
      tenantId: document.tenantId,
      rescissionRequestId: document.rescissionRequestId,
      calculationId: document.calculationId ?? undefined,
      documentType: document.documentType,
      title: document.title,
      status: document.status,
      signedBy: document.signedBy ?? undefined,
      signedAt: document.signedAt?.toISOString(),
      signatureMethod: document.signatureMethod ?? undefined,
      content: (document.content as Record<string, unknown>) ?? {},
      generatedBy: document.generatedBy ?? undefined,
      generatedAt: document.generatedAt.toISOString(),
      createdAt: document.createdAt.toISOString(),
      updatedAt: document.updatedAt.toISOString(),
    };
  }

  private toPointMarkRecord(pointMark: {
    id: string;
    tenantId: string;
    employeeId: string;
    occurredAt: Date;
    createdAt: Date;
  }): PointMarkRecord {
    return {
      id: pointMark.id,
      tenantId: pointMark.tenantId,
      employeeId: pointMark.employeeId,
      occurredAt: pointMark.occurredAt.toISOString(),
      createdAt: pointMark.createdAt.toISOString(),
    };
  }

  private toPointHolidayCalendarRecord(calendar: {
    id: string;
    tenantId: string;
    companyId: string | null;
    locale: string | null;
    title: string;
    isNational: boolean;
    validFrom: Date;
    validUntil: Date | null;
    notes: string | null;
    createdAt: Date;
    updatedAt: Date;
  }): PointHolidayCalendarRecord {
    return {
      id: calendar.id,
      tenantId: calendar.tenantId,
      companyId: calendar.companyId ?? undefined,
      locale: calendar.locale ?? undefined,
      title: calendar.title,
      isNational: calendar.isNational,
      validFrom: calendar.validFrom.toISOString(),
      validUntil: calendar.validUntil?.toISOString(),
      notes: calendar.notes ?? undefined,
      createdAt: calendar.createdAt.toISOString(),
      updatedAt: calendar.updatedAt.toISOString(),
    };
  }

  private toPointToleranceRuleRecord(rule: {
    id: string;
    tenantId: string;
    companyId: string | null;
    profile: string | null;
    jornada: string | null;
    toleranceMinutes: number;
    validFrom: Date;
    validUntil: Date | null;
    notes: string | null;
    createdAt: Date;
    updatedAt: Date;
  }): PointToleranceRuleRecord {
    return {
      id: rule.id,
      tenantId: rule.tenantId,
      companyId: rule.companyId ?? undefined,
      profile: rule.profile ?? undefined,
      jornada: rule.jornada ?? undefined,
      toleranceMinutes: rule.toleranceMinutes,
      validFrom: rule.validFrom.toISOString(),
      validUntil: rule.validUntil?.toISOString(),
      notes: rule.notes ?? undefined,
      createdAt: rule.createdAt.toISOString(),
      updatedAt: rule.updatedAt.toISOString(),
    };
  }

  private toPointDeviceRecord(device: {
    id: string;
    tenantId: string;
    companyId: string | null;
    label: string;
    deviceType: string;
    status: string;
    supportsOffline: boolean;
    supportsBiometrics: boolean;
    supportsGeo: boolean;
    notes: string | null;
    createdAt: Date;
    updatedAt: Date;
  }): PointDeviceRecord {
    return {
      id: device.id,
      tenantId: device.tenantId,
      companyId: device.companyId ?? undefined,
      label: device.label,
      deviceType: device.deviceType,
      status: device.status,
      supportsOffline: device.supportsOffline,
      supportsBiometrics: device.supportsBiometrics,
      supportsGeo: device.supportsGeo,
      notes: device.notes ?? undefined,
      createdAt: device.createdAt.toISOString(),
      updatedAt: device.updatedAt.toISOString(),
    };
  }

  private toOccupationalHealthEnvironmentRecord(environment: {
    id: string;
    tenantId: string;
    companyId: string | null;
    code: string;
    name: string;
    sector: string | null;
    active: boolean;
    validFrom: Date;
    validUntil: Date | null;
    notes: string | null;
    createdAt: Date;
    updatedAt: Date;
  }): OccupationalHealthEnvironmentRecord {
    return {
      id: environment.id,
      tenantId: environment.tenantId,
      companyId: environment.companyId ?? undefined,
      code: environment.code,
      name: environment.name,
      sector: environment.sector ?? undefined,
      active: environment.active,
      validFrom: environment.validFrom.toISOString(),
      validUntil: environment.validUntil?.toISOString(),
      notes: environment.notes ?? undefined,
      createdAt: environment.createdAt.toISOString(),
      updatedAt: environment.updatedAt.toISOString(),
    };
  }

  private toOccupationalHealthRiskRecord(risk: {
    id: string;
    tenantId: string;
    environmentId: string;
    code: string;
    name: string;
    severity: string;
    probability: string;
    controlMeasure: string | null;
    active: boolean;
    validFrom: Date;
    validUntil: Date | null;
    notes: string | null;
    createdAt: Date;
    updatedAt: Date;
  }): OccupationalHealthRiskRecord {
    return {
      id: risk.id,
      tenantId: risk.tenantId,
      environmentId: risk.environmentId,
      code: risk.code,
      name: risk.name,
      severity: risk.severity,
      probability: risk.probability,
      controlMeasure: risk.controlMeasure ?? undefined,
      active: risk.active,
      validFrom: risk.validFrom.toISOString(),
      validUntil: risk.validUntil?.toISOString(),
      notes: risk.notes ?? undefined,
      createdAt: risk.createdAt.toISOString(),
      updatedAt: risk.updatedAt.toISOString(),
    };
  }

  private toOccupationalHealthCatRecord(cat: {
    id: string;
    tenantId: string;
    companyId: string | null;
    employeeId: string;
    reportNumber: string;
    accidentType: string | null;
    occurredAt: Date;
    status: string;
    description: string;
    notifiedAt: Date | null;
    notes: string | null;
    createdAt: Date;
    updatedAt: Date;
  }): OccupationalHealthCatRecord {
    return {
      id: cat.id,
      tenantId: cat.tenantId,
      companyId: cat.companyId ?? undefined,
      employeeId: cat.employeeId,
      reportNumber: cat.reportNumber,
      accidentType: cat.accidentType ?? undefined,
      occurredAt: cat.occurredAt.toISOString(),
      status: cat.status,
      description: cat.description,
      notifiedAt: cat.notifiedAt?.toISOString(),
      notes: cat.notes ?? undefined,
      createdAt: cat.createdAt.toISOString(),
      updatedAt: cat.updatedAt.toISOString(),
    };
  }

  private toOccupationalHealthEpiCatalogRecord(catalog: {
    id: string;
    tenantId: string;
    companyId: string | null;
    code: string;
    name: string;
    active: boolean;
    validFrom: Date;
    validUntil: Date | null;
    notes: string | null;
    createdAt: Date;
    updatedAt: Date;
  }): OccupationalHealthEpiCatalogRecord {
    return {
      id: catalog.id,
      tenantId: catalog.tenantId,
      companyId: catalog.companyId ?? undefined,
      code: catalog.code,
      name: catalog.name,
      active: catalog.active,
      validFrom: catalog.validFrom.toISOString(),
      validUntil: catalog.validUntil?.toISOString(),
      notes: catalog.notes ?? undefined,
      createdAt: catalog.createdAt.toISOString(),
      updatedAt: catalog.updatedAt.toISOString(),
    };
  }

  private toOccupationalHealthEpiAssignmentRecord(assignment: {
    id: string;
    tenantId: string;
    companyId: string | null;
    employeeId: string;
    epiCatalogId: string;
    status: string;
    deliveredAt: Date;
    returnedAt: Date | null;
    receivedBy: string | null;
    notes: string | null;
    createdAt: Date;
    updatedAt: Date;
    epiCatalog?: {
      id: string;
      tenantId: string;
      companyId: string | null;
      code: string;
      name: string;
      active: boolean;
      validFrom: Date;
      validUntil: Date | null;
      notes: string | null;
      createdAt: Date;
      updatedAt: Date;
    } | null;
  }): OccupationalHealthEpiAssignmentRecord {
    return {
      id: assignment.id,
      tenantId: assignment.tenantId,
      companyId: assignment.companyId ?? undefined,
      employeeId: assignment.employeeId,
      epiCatalogId: assignment.epiCatalogId,
      status: assignment.status,
      deliveredAt: assignment.deliveredAt.toISOString(),
      returnedAt: assignment.returnedAt?.toISOString(),
      receivedBy: assignment.receivedBy ?? undefined,
      notes: assignment.notes ?? undefined,
      createdAt: assignment.createdAt.toISOString(),
      updatedAt: assignment.updatedAt.toISOString(),
      epiCatalog: assignment.epiCatalog ? this.toOccupationalHealthEpiCatalogRecord(assignment.epiCatalog) : undefined,
    };
  }

  private toOccupationalHealthPgrRecord(pgr: {
    id: string;
    tenantId: string;
    companyId: string | null;
    code: string;
    title: string;
    status: string;
    validFrom: Date;
    validUntil: Date | null;
    notes: string | null;
    createdAt: Date;
    updatedAt: Date;
  }): OccupationalHealthPgrRecord {
    return {
      id: pgr.id,
      tenantId: pgr.tenantId,
      companyId: pgr.companyId ?? undefined,
      code: pgr.code,
      title: pgr.title,
      status: pgr.status,
      validFrom: pgr.validFrom.toISOString(),
      validUntil: pgr.validUntil?.toISOString(),
      notes: pgr.notes ?? undefined,
      createdAt: pgr.createdAt.toISOString(),
      updatedAt: pgr.updatedAt.toISOString(),
    };
  }

  private toOccupationalHealthPcmsoRecord(program: {
    id: string;
    tenantId: string;
    companyId: string | null;
    code: string;
    title: string;
    status: string;
    validFrom: Date;
    validUntil: Date | null;
    notes: string | null;
    createdAt: Date;
    updatedAt: Date;
  }): OccupationalHealthPcmsoRecord {
    return {
      id: program.id,
      tenantId: program.tenantId,
      companyId: program.companyId ?? undefined,
      code: program.code,
      title: program.title,
      status: program.status,
      validFrom: program.validFrom.toISOString(),
      validUntil: program.validUntil?.toISOString(),
      notes: program.notes ?? undefined,
      createdAt: program.createdAt.toISOString(),
      updatedAt: program.updatedAt.toISOString(),
    };
  }

  private toOccupationalHealthExamRecord(exam: {
    id: string;
    tenantId: string;
    employeeId: string;
    environmentId: string | null;
    examType: string;
    status: string;
    scheduledAt: Date;
    performedAt: Date | null;
    result: string | null;
    expiresAt: Date | null;
    notes: string | null;
    createdAt: Date;
    updatedAt: Date;
    aso?: {
      id: string;
      tenantId: string;
      examId: string;
      employeeId: string;
      issuedAt: Date;
      result: string;
      issuer: string | null;
      notes: string | null;
      createdAt: Date;
      updatedAt: Date;
    } | null;
  }): OccupationalHealthExamRecord {
    return {
      id: exam.id,
      tenantId: exam.tenantId,
      employeeId: exam.employeeId,
      environmentId: exam.environmentId ?? undefined,
      examType: exam.examType,
      status: exam.status,
      scheduledAt: exam.scheduledAt.toISOString(),
      performedAt: exam.performedAt?.toISOString(),
      result: exam.result ?? undefined,
      expiresAt: exam.expiresAt?.toISOString(),
      notes: exam.notes ?? undefined,
      createdAt: exam.createdAt.toISOString(),
      updatedAt: exam.updatedAt.toISOString(),
      aso: exam.aso ? this.toOccupationalHealthAsoRecord(exam.aso) : undefined,
    };
  }

  private toOccupationalHealthAsoRecord(aso: {
    id: string;
    tenantId: string;
    examId: string;
    employeeId: string;
    issuedAt: Date;
    result: string;
    issuer: string | null;
    notes: string | null;
    createdAt: Date;
    updatedAt: Date;
  }): OccupationalHealthAsoRecord {
    return {
      id: aso.id,
      tenantId: aso.tenantId,
      examId: aso.examId,
      employeeId: aso.employeeId,
      issuedAt: aso.issuedAt.toISOString(),
      result: aso.result,
      issuer: aso.issuer ?? undefined,
      notes: aso.notes ?? undefined,
      createdAt: aso.createdAt.toISOString(),
      updatedAt: aso.updatedAt.toISOString(),
    };
  }

  private toOccupationalHealthTrainingCatalogRecord(catalog: {
    id: string;
    tenantId: string;
    companyId: string | null;
    code: string;
    title: string;
    description: string | null;
    mandatory: boolean;
    active: boolean;
    validFrom: Date;
    validUntil: Date | null;
    notes: string | null;
    createdAt: Date;
    updatedAt: Date;
  }): OccupationalHealthTrainingCatalogRecord {
    return {
      id: catalog.id,
      tenantId: catalog.tenantId,
      companyId: catalog.companyId ?? undefined,
      code: catalog.code,
      title: catalog.title,
      description: catalog.description ?? undefined,
      mandatory: catalog.mandatory,
      active: catalog.active,
      validFrom: catalog.validFrom.toISOString(),
      validUntil: catalog.validUntil?.toISOString(),
      notes: catalog.notes ?? undefined,
      createdAt: catalog.createdAt.toISOString(),
      updatedAt: catalog.updatedAt.toISOString(),
    };
  }

  private toOccupationalHealthTrainingAssignmentRecord(assignment: {
    id: string;
    tenantId: string;
    companyId: string | null;
    employeeId: string;
    trainingCatalogId: string;
    status: string;
    assignedAt: Date;
    dueAt: Date | null;
    completedAt: Date | null;
    expiresAt: Date | null;
    completedBy: string | null;
    score: number | null;
    notes: string | null;
    createdAt: Date;
    updatedAt: Date;
    trainingCatalog?: {
      id: string;
      tenantId: string;
      companyId: string | null;
      code: string;
      title: string;
      description: string | null;
      mandatory: boolean;
      active: boolean;
      validFrom: Date;
      validUntil: Date | null;
      notes: string | null;
      createdAt: Date;
      updatedAt: Date;
    } | null;
  }): OccupationalHealthTrainingAssignmentRecord {
    return {
      id: assignment.id,
      tenantId: assignment.tenantId,
      companyId: assignment.companyId ?? undefined,
      employeeId: assignment.employeeId,
      trainingCatalogId: assignment.trainingCatalogId,
      status: assignment.status,
      assignedAt: assignment.assignedAt.toISOString(),
      dueAt: assignment.dueAt?.toISOString(),
      completedAt: assignment.completedAt?.toISOString(),
      expiresAt: assignment.expiresAt?.toISOString(),
      completedBy: assignment.completedBy ?? undefined,
      score: assignment.score ?? undefined,
      notes: assignment.notes ?? undefined,
      createdAt: assignment.createdAt.toISOString(),
      updatedAt: assignment.updatedAt.toISOString(),
      trainingCatalog: assignment.trainingCatalog ? this.toOccupationalHealthTrainingCatalogRecord(assignment.trainingCatalog) : undefined,
    };
  }

  private toOccupationalHealthEsocialTransmissionRecord(transmission: {
    id: string;
    tenantId: string;
    subjectType: string;
    subjectId: string;
    companyId: string | null;
    employeeId: string | null;
    environmentId: string | null;
    catId: string | null;
    examId: string | null;
    eventCode: string;
    status: string;
    payload: Prisma.JsonValue;
    receiptNumber: string | null;
    response: Prisma.JsonValue | null;
    errorMessage: string | null;
    queuedAt: Date;
    sentAt: Date | null;
    processedAt: Date | null;
    attempts: number;
    createdAt: Date;
    updatedAt: Date;
  }): OccupationalHealthEsocialTransmissionRecord {
    return {
      id: transmission.id,
      tenantId: transmission.tenantId,
      subjectType: transmission.subjectType as OccupationalHealthEsocialSubjectType,
      subjectId: transmission.subjectId,
      companyId: transmission.companyId ?? undefined,
      employeeId: transmission.employeeId ?? undefined,
      environmentId: transmission.environmentId ?? undefined,
      catId: transmission.catId ?? undefined,
      examId: transmission.examId ?? undefined,
      eventCode: transmission.eventCode,
      status: transmission.status,
      payload: transmission.payload,
      receiptNumber: transmission.receiptNumber ?? undefined,
      response: transmission.response ?? undefined,
      errorMessage: transmission.errorMessage ?? undefined,
      queuedAt: transmission.queuedAt.toISOString(),
      sentAt: transmission.sentAt?.toISOString(),
      processedAt: transmission.processedAt?.toISOString(),
      attempts: transmission.attempts,
      createdAt: transmission.createdAt.toISOString(),
      updatedAt: transmission.updatedAt.toISOString(),
    };
  }

  private calculateNightOverlapMinutes(start: Date, end: Date): number {
    if (end <= start) {
      return 0;
    }

    let total = 0;
    let cursor = new Date(start);
    while (cursor < end) {
      const dayStart = Date.UTC(cursor.getUTCFullYear(), cursor.getUTCMonth(), cursor.getUTCDate(), 0, 0, 0, 0);
      const nextDayStart = dayStart + 24 * 60 * 60 * 1000;
      const dayEnd = new Date(nextDayStart);
      total += this.overlapMinutes(start, end, new Date(Date.UTC(cursor.getUTCFullYear(), cursor.getUTCMonth(), cursor.getUTCDate(), 0, 0, 0, 0)), new Date(Date.UTC(cursor.getUTCFullYear(), cursor.getUTCMonth(), cursor.getUTCDate(), 5, 0, 0, 0)));
      total += this.overlapMinutes(start, end, new Date(Date.UTC(cursor.getUTCFullYear(), cursor.getUTCMonth(), cursor.getUTCDate(), 22, 0, 0, 0)), dayEnd);
      cursor = dayEnd;
    }

    return total;
  }

  private overlapMinutes(startA: Date, endA: Date, startB: Date, endB: Date): number {
    const start = Math.max(startA.getTime(), startB.getTime());
    const end = Math.min(endA.getTime(), endB.getTime());
    return Math.max(0, Math.floor((end - start) / (60 * 1000)));
  }

  private toNightShiftAllowanceCalculationRecord(calculation: {
    id: string;
    tenantId: string;
    employeeId: string;
    periodStart: Date;
    periodEnd: Date;
    status: string;
    nightPeriodReference: string;
    calculationBase: string;
    totalMinutes: number;
    reducedMinutes: number;
    percentage: number;
    notes: string | null;
    calculatedBy: string | null;
    calculatedAt: Date;
    approvedBy: string | null;
    approvedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    items?: Array<{
      id: string;
      tenantId: string;
      calculationId: string;
      date: Date;
      minutes: number;
      percentage: number;
      reason: string;
      reducedHourFactor: number;
      sourceReference: string;
      createdAt: Date;
      updatedAt: Date;
    }>;
  }): NightShiftAllowanceCalculationRecord {
    return {
      id: calculation.id,
      tenantId: calculation.tenantId,
      employeeId: calculation.employeeId,
      periodStart: calculation.periodStart.toISOString(),
      periodEnd: calculation.periodEnd.toISOString(),
      status: calculation.status,
      nightPeriodReference: calculation.nightPeriodReference,
      calculationBase: calculation.calculationBase,
      totalMinutes: calculation.totalMinutes,
      reducedMinutes: calculation.reducedMinutes,
      percentage: calculation.percentage,
      notes: calculation.notes ?? undefined,
      calculatedBy: calculation.calculatedBy ?? undefined,
      calculatedAt: calculation.calculatedAt.toISOString(),
      approvedBy: calculation.approvedBy ?? undefined,
      approvedAt: calculation.approvedAt?.toISOString(),
      createdAt: calculation.createdAt.toISOString(),
      updatedAt: calculation.updatedAt.toISOString(),
      items: (calculation.items ?? []).map((item) => this.toNightShiftAllowanceItemRecord(item)),
    };
  }

  private toNightShiftAllowanceItemRecord(item: {
    id: string;
    tenantId: string;
    calculationId: string;
    date: Date;
    minutes: number;
    percentage: number;
    reason: string;
    reducedHourFactor: number;
    sourceReference: string;
    createdAt: Date;
    updatedAt: Date;
  }): NightShiftAllowanceItemRecord {
    return {
      id: item.id,
      tenantId: item.tenantId,
      calculationId: item.calculationId,
      date: item.date.toISOString(),
      minutes: item.minutes,
      percentage: item.percentage,
      reason: item.reason,
      reducedHourFactor: item.reducedHourFactor,
      sourceReference: item.sourceReference,
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString(),
    };
  }

  private toThirteenthSalaryCalculationRecord(calculation: {
    id: string;
    tenantId: string;
    employeeId: string;
    referenceYear: number;
    status: string;
    salaryBaseCents: number;
    eligibleMonths: number;
    totalAmountCents: number;
    firstParcelAmountCents: number;
    secondParcelAmountCents: number;
    notes: string | null;
    calculatedBy: string | null;
    calculatedAt: Date;
    approvedBy: string | null;
    approvedAt: Date | null;
    variableAverageAmountCents: number;
    employerChargesAmountCents: number;
    payrollBatchId: string | null;
    payrollStatus: string | null;
    payrollReceiptNumber: string | null;
    payrollSentBy: string | null;
    payrollSentAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
  }): ThirteenthSalaryCalculationRecord {
    return {
      id: calculation.id,
      tenantId: calculation.tenantId,
      employeeId: calculation.employeeId,
      referenceYear: calculation.referenceYear,
      status: calculation.status,
      salaryBaseCents: calculation.salaryBaseCents,
      eligibleMonths: calculation.eligibleMonths,
      variableAverageAmountCents: calculation.variableAverageAmountCents,
      employerChargesAmountCents: calculation.employerChargesAmountCents,
      totalAmountCents: calculation.totalAmountCents,
      firstParcelAmountCents: calculation.firstParcelAmountCents,
      secondParcelAmountCents: calculation.secondParcelAmountCents,
      notes: calculation.notes ?? undefined,
      calculatedBy: calculation.calculatedBy ?? undefined,
      calculatedAt: calculation.calculatedAt.toISOString(),
      approvedBy: calculation.approvedBy ?? undefined,
      approvedAt: calculation.approvedAt?.toISOString(),
      payrollBatchId: calculation.payrollBatchId ?? undefined,
      payrollStatus: calculation.payrollStatus ?? undefined,
      payrollReceiptNumber: calculation.payrollReceiptNumber ?? undefined,
      payrollSentBy: calculation.payrollSentBy ?? undefined,
      payrollSentAt: calculation.payrollSentAt?.toISOString(),
      createdAt: calculation.createdAt.toISOString(),
      updatedAt: calculation.updatedAt.toISOString(),
    };
  }

  private clampToReferenceYear(date: Date, referenceYear: number): Date {
    const yearStart = Date.UTC(referenceYear, 0, 1, 0, 0, 0, 0);
    const yearEnd = Date.UTC(referenceYear, 11, 31, 23, 59, 59, 999);
    const time = date.getTime();
    if (time < yearStart) {
      return new Date(yearStart);
    }
    if (time > yearEnd) {
      return new Date(yearEnd);
    }
    return date;
  }

  private countThirteenthEligibleMonths(start: Date, end: Date, referenceYear: number): number {
    let eligible = 0;
    for (let month = 0; month < 12; month += 1) {
      const monthStart = Date.UTC(referenceYear, month, 1, 0, 0, 0, 0);
      const monthEnd = Date.UTC(referenceYear, month + 1, 0, 23, 59, 59, 999);
      const overlapStart = Math.max(start.getTime(), monthStart);
      const overlapEnd = Math.min(end.getTime(), monthEnd);
      if (overlapEnd < overlapStart) {
        continue;
      }
      const overlapDays = Math.floor((overlapEnd - overlapStart) / (24 * 60 * 60 * 1000)) + 1;
      if (overlapDays >= 15) {
        eligible += 1;
      }
    }

    return eligible;
  }

  private matchesHolidayCalendar(
    calendar: {
      validFrom: Date;
      validUntil: Date | null;
    },
    day: Date,
  ): boolean {
    const dayStart = Date.UTC(day.getUTCFullYear(), day.getUTCMonth(), day.getUTCDate(), 0, 0, 0, 0);
    const dayEnd = Date.UTC(day.getUTCFullYear(), day.getUTCMonth(), day.getUTCDate(), 23, 59, 59, 999);
    const validFrom = new Date(calendar.validFrom);
    const validUntil = calendar.validUntil ?? calendar.validFrom;
    return dayEnd >= validFrom.getTime() && dayStart <= validUntil.getTime();
  }

  private toWeeklyRestAllowanceCalculationRecord(calculation: {
    id: string;
    tenantId: string;
    employeeId: string;
    periodStart: Date;
    periodEnd: Date;
    status: string;
    ruleReference: string;
    calculationBase: string;
    totalMinutes: number;
    affectedDays: number;
    restDays: number;
    notes: string | null;
    calculatedBy: string | null;
    calculatedAt: Date;
    approvedBy: string | null;
    approvedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    items?: Array<{
      id: string;
      tenantId: string;
      calculationId: string;
      date: Date;
      dayType: string;
      minutes: number;
      percentage: number;
      reason: string;
      sourceReference: string;
      createdAt: Date;
      updatedAt: Date;
    }>;
  }): WeeklyRestAllowanceCalculationRecord {
    return {
      id: calculation.id,
      tenantId: calculation.tenantId,
      employeeId: calculation.employeeId,
      periodStart: calculation.periodStart.toISOString(),
      periodEnd: calculation.periodEnd.toISOString(),
      status: calculation.status,
      ruleReference: calculation.ruleReference,
      calculationBase: calculation.calculationBase,
      totalMinutes: calculation.totalMinutes,
      affectedDays: calculation.affectedDays,
      restDays: calculation.restDays,
      notes: calculation.notes ?? undefined,
      calculatedBy: calculation.calculatedBy ?? undefined,
      calculatedAt: calculation.calculatedAt.toISOString(),
      approvedBy: calculation.approvedBy ?? undefined,
      approvedAt: calculation.approvedAt?.toISOString(),
      createdAt: calculation.createdAt.toISOString(),
      updatedAt: calculation.updatedAt.toISOString(),
      items: (calculation.items ?? []).map((item) => this.toWeeklyRestAllowanceItemRecord(item)),
    };
  }

  private toWeeklyRestAllowanceItemRecord(item: {
    id: string;
    tenantId: string;
    calculationId: string;
    date: Date;
    dayType: string;
    minutes: number;
    percentage: number;
    reason: string;
    sourceReference: string;
    createdAt: Date;
    updatedAt: Date;
  }): WeeklyRestAllowanceItemRecord {
    return {
      id: item.id,
      tenantId: item.tenantId,
      calculationId: item.calculationId,
      date: item.date.toISOString(),
      dayType: item.dayType,
      minutes: item.minutes,
      percentage: item.percentage,
      reason: item.reason,
      sourceReference: item.sourceReference,
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString(),
    };
  }

  private toTimeSheetPayrollEventBatchRecord(batch: {
    id: string;
    tenantId: string;
    employeeId: string;
    companyId: string;
    sourcePeriodStart: Date;
    sourcePeriodEnd: Date;
    payrollPeriod: string;
    status: string;
    totalMinutes: number;
    totalAmountCents: number;
    notes: string | null;
    consolidatedBy: string | null;
    consolidatedAt: Date;
    approvedBy: string | null;
    approvedAt: Date | null;
    payrollReceiptNumber: string | null;
    sentBy: string | null;
    sentAt: Date | null;
    erpStatus: string | null;
    erpReceiptNumber: string | null;
    erpSentBy: string | null;
    erpSentAt: Date | null;
    bankStatus: string | null;
    bankReceiptNumber: string | null;
    bankSentBy: string | null;
    bankSentAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    items?: Array<{
      id: string;
      tenantId: string;
      batchId: string;
      sourceEventType: string;
      sourceEventId: string;
      payrollRubricCode: string;
      quantityMinutes: number;
      amountCents: number;
      referenceDate: Date;
      status: string;
      reason: string | null;
      sourceReference: string;
      createdAt: Date;
      updatedAt: Date;
    }>;
  }): TimeSheetPayrollEventBatchRecord {
    return {
      id: batch.id,
      tenantId: batch.tenantId,
      employeeId: batch.employeeId,
      companyId: batch.companyId,
      sourcePeriodStart: batch.sourcePeriodStart.toISOString(),
      sourcePeriodEnd: batch.sourcePeriodEnd.toISOString(),
      payrollPeriod: batch.payrollPeriod,
      status: batch.status,
      totalMinutes: batch.totalMinutes,
      totalAmountCents: batch.totalAmountCents,
      notes: batch.notes ?? undefined,
      consolidatedBy: batch.consolidatedBy ?? undefined,
      consolidatedAt: batch.consolidatedAt.toISOString(),
      approvedBy: batch.approvedBy ?? undefined,
      approvedAt: batch.approvedAt?.toISOString(),
      payrollReceiptNumber: batch.payrollReceiptNumber ?? undefined,
      sentBy: batch.sentBy ?? undefined,
      sentAt: batch.sentAt?.toISOString(),
      erpStatus: batch.erpStatus ?? undefined,
      erpReceiptNumber: batch.erpReceiptNumber ?? undefined,
      erpSentBy: batch.erpSentBy ?? undefined,
      erpSentAt: batch.erpSentAt?.toISOString(),
      bankStatus: batch.bankStatus ?? undefined,
      bankReceiptNumber: batch.bankReceiptNumber ?? undefined,
      bankSentBy: batch.bankSentBy ?? undefined,
      bankSentAt: batch.bankSentAt?.toISOString(),
      createdAt: batch.createdAt.toISOString(),
      updatedAt: batch.updatedAt.toISOString(),
      items: (batch.items ?? []).map((item) => this.toTimeSheetPayrollEventBatchItemRecord(item)),
    };
  }

  private toTimeSheetPayrollEventBatchItemRecord(item: {
    id: string;
    tenantId: string;
    batchId: string;
    sourceEventType: string;
    sourceEventId: string;
    payrollRubricCode: string;
    quantityMinutes: number;
    amountCents: number;
    referenceDate: Date;
    status: string;
    reason: string | null;
    sourceReference: string;
    createdAt: Date;
    updatedAt: Date;
  }): TimeSheetPayrollEventBatchItemRecord {
    return {
      id: item.id,
      tenantId: item.tenantId,
      batchId: item.batchId,
      sourceEventType: item.sourceEventType,
      sourceEventId: item.sourceEventId,
      payrollRubricCode: item.payrollRubricCode,
      quantityMinutes: item.quantityMinutes,
      amountCents: item.amountCents,
      referenceDate: item.referenceDate.toISOString(),
      status: item.status,
      reason: item.reason ?? undefined,
      sourceReference: item.sourceReference,
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString(),
    };
  }

  private toApiIntegrationRequestRecord(request: {
    id: string;
    tenantId: string;
    integrationType: string;
    operation: string;
    status: string;
    attempts: number;
    subject: string | null;
    externalReference: string | null;
    payload: Prisma.JsonValue | null;
    response: Prisma.JsonValue | null;
    failureReason: string | null;
    dlqReason: string | null;
    requestedBy: string | null;
    requestedAt: Date;
    lastAttemptAt: Date | null;
    completedAt: Date | null;
    dlqAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    histories?: Array<{
      id: string;
      tenantId: string;
      requestId: string;
      eventType: string;
      details: Prisma.JsonValue | null;
      createdAt: Date;
      updatedAt: Date;
    }>;
  }): ApiIntegrationRequestRecord {
    return {
      id: request.id,
      tenantId: request.tenantId,
      integrationType: request.integrationType,
      operation: request.operation,
      status: request.status,
      attempts: request.attempts,
      subject: request.subject ?? undefined,
      externalReference: request.externalReference ?? undefined,
      payload: (request.payload as Record<string, unknown> | null) ?? undefined,
      response: (request.response as Record<string, unknown> | null) ?? undefined,
      failureReason: request.failureReason ?? undefined,
      dlqReason: request.dlqReason ?? undefined,
      requestedBy: request.requestedBy ?? undefined,
      requestedAt: request.requestedAt.toISOString(),
      lastAttemptAt: request.lastAttemptAt?.toISOString(),
      completedAt: request.completedAt?.toISOString(),
      dlqAt: request.dlqAt?.toISOString(),
      createdAt: request.createdAt.toISOString(),
      updatedAt: request.updatedAt.toISOString(),
      histories: (request.histories ?? []).map((history) => this.toApiIntegrationRequestHistoryRecord(history)),
    };
  }

  private toApiIntegrationRequestHistoryRecord(history: {
    id: string;
    tenantId: string;
    requestId: string;
    eventType: string;
    details: Prisma.JsonValue | null;
    createdAt: Date;
    updatedAt: Date;
  }): ApiIntegrationRequestHistoryRecord {
    return {
      id: history.id,
      tenantId: history.tenantId,
      requestId: history.requestId,
      eventType: history.eventType,
      details: (history.details as Record<string, unknown> | null) ?? undefined,
      createdAt: history.createdAt.toISOString(),
      updatedAt: history.updatedAt.toISOString(),
    };
  }

  private toAuditEventRecord(event: {
    id: string;
    tenantId: string;
    action: string;
    entityType: string;
    entityId: string;
    occurredAt: Date;
    details: Prisma.JsonValue;
  }): AuditEventRecord {
    return {
      id: event.id,
      tenantId: event.tenantId,
      action: event.action,
      entityType: event.entityType,
      entityId: event.entityId,
      occurredAt: event.occurredAt.toISOString(),
      details: (event.details as Record<string, string | undefined>) ?? {},
    };
  }
}
