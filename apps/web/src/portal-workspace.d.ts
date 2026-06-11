export type WorkspaceCardStatus = 'ok' | 'empty' | 'attention' | 'critical' | 'available' | 'offline' | 'authenticated';

export interface PortalWorkspaceSessionProfile {
  role?: string;
  displayName?: string;
}

export interface PortalWorkspaceSession {
  authenticated?: boolean;
  profile?: PortalWorkspaceSessionProfile | null;
}

export interface PortalWorkspaceTenant {
  name?: string;
  slug?: string;
}

export interface PortalWorkspaceActiveTenant {
  role?: string;
  tenant?: PortalWorkspaceTenant | null;
}

export interface PortalWorkspaceSummary {
  tenant?: PortalWorkspaceTenant | null;
  counts?: {
    employees?: number;
    auditEvents?: number;
  } | null;
  lastAuditEventAt?: string | null;
}

export interface PortalWorkspaceAdmissionLike {
  id: string;
  status?: string;
  personId?: string;
  companyId?: string;
  updatedAt?: string;
  createdAt?: string;
  requestedAt?: string;
}

export interface PortalWorkspaceTerminationLike {
  id: string;
  status?: string;
  reason?: string;
  employeeId?: string;
  updatedAt?: string;
  createdAt?: string;
  requestedAt?: string;
  approvedAt?: string;
  effectiveOn?: string;
}

export interface PortalWorkspaceOffboardingLike {
  id: string;
  status?: string;
  employeeId?: string;
  terminationRequestId?: string;
  updatedAt?: string;
  createdAt?: string;
  requestedAt?: string;
  closedAt?: string;
}

export interface PortalWorkspaceRescissionLike {
  id: string;
  status?: string;
  employeeId?: string;
  terminationRequestId?: string;
  paymentDueAt?: string;
  updatedAt?: string;
  createdAt?: string;
  requestedAt?: string;
  closedAt?: string;
}

export interface PortalWorkspaceMonitoring {
  counts?: {
    failed?: number;
    dlq?: number;
  } | null;
  alerts?: Array<{
    integrationType?: string;
    severity?: 'warning' | 'critical';
    message?: string;
  }>;
}

export interface PortalWorkspaceAnalytics {
  signals?: {
    headcount?: number;
    workflowPressure?: number;
    lastAuditEventAt?: string | null;
  } | null;
  counts?: {
    auditEvents?: number;
    failedIntegrations?: number;
    dlqIntegrations?: number;
    attempts?: number;
  } | null;
  privacy?: {
    retentionModel?: string;
    exportFormats?: string[];
    maskingLevels?: string[];
  } | null;
  alerts?: Array<{
    code?: string;
    severity?: 'info' | 'warning' | 'critical';
    message?: string;
  }>;
}

export interface PortalWorkspaceLatestAdmissionContract {
  contractType?: string;
  status?: string;
  effectiveFrom?: string;
  updatedAt?: string;
  createdBy?: string;
}

export interface PortalWorkspaceLatestPointReceipt {
  title?: string;
  receiptNumber?: string;
  generatedAt?: string;
  pointMark?: {
    occurredAt?: string;
  } | null;
  employee?: {
    code?: string;
    id?: string;
  } | null;
}

export interface PortalWorkspaceLatestRescissionDocument {
  id: string;
  documentType?: string;
}

export interface PortalWorkspaceLatestRescission extends PortalWorkspaceRescissionLike {
  documents?: PortalWorkspaceLatestRescissionDocument[];
}

export interface BuildPortalWorkspaceModelArgs {
  session?: PortalWorkspaceSession | null;
  activeTenant?: PortalWorkspaceActiveTenant | null;
  summary?: PortalWorkspaceSummary | null;
  admissions?: PortalWorkspaceAdmissionLike[];
  terminations?: PortalWorkspaceTerminationLike[];
  offboardings?: PortalWorkspaceOffboardingLike[];
  rescissions?: PortalWorkspaceRescissionLike[];
  monitoring?: PortalWorkspaceMonitoring | null;
  analytics?: PortalWorkspaceAnalytics | null;
  latestAdmissionContract?: PortalWorkspaceLatestAdmissionContract | null;
  latestPointReceipt?: PortalWorkspaceLatestPointReceipt | null;
  latestRescission?: PortalWorkspaceLatestRescission | null;
}

export interface PortalWorkspaceCard {
  key: string;
  label: string;
  title: string;
  detail: string;
  status: WorkspaceCardStatus;
}

export interface PortalWorkspaceDocumentCard {
  key: string;
  label: string;
  title: string;
  status: string;
  description: string;
  meta: string;
}

export interface PortalWorkspaceTimelineItem {
  key: string;
  title: string;
  subtitle: string;
  detail: string;
}

export interface PortalWorkspaceAnalyticsCards {
  cards: PortalWorkspaceCard[];
  alerts: PortalWorkspaceCard[];
  privacy: {
    retentionModel: string;
    exportFormats: string[];
    maskingLevels: string[];
  };
}

export interface PortalWorkspaceModel {
  collaboratorCards: PortalWorkspaceCard[];
  managerCards: PortalWorkspaceCard[];
  documentCards: PortalWorkspaceDocumentCard[];
  analyticsCards: PortalWorkspaceAnalyticsCards;
  complementaryRoadmap: PortalWorkspaceTimelineItem[];
  workflowTimeline: PortalWorkspaceTimelineItem[];
  exceptionCards: PortalWorkspaceCard[];
}

export function buildPortalWorkspaceModel(args: BuildPortalWorkspaceModelArgs): PortalWorkspaceModel;
