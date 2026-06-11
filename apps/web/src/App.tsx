import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { buildPortalWorkspaceModel } from './portal-workspace.js';

type TenantAccess = {
  id: string;
  tenantId: string;
  subject: string;
  role: string;
  createdAt: string;
  tenant: {
    id: string;
    name: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
  };
};

type TokenProfile = {
  subject: string;
  displayName: string;
  roles: string[];
  role: string;
};

type SessionSnapshot = {
  authenticated: boolean;
  profile: TokenProfile | null;
  expiresAt: number;
  activeTenantId: string;
  tenants: TenantAccess[];
};

type TenantSummary = {
  tenant: TenantAccess['tenant'];
  counts: {
    companies: number;
    persons: number;
    employees: number;
    pointMarks: number;
    auditEvents: number;
  };
  lastAuditEventAt: string | null;
};

type AdmissionListItem = {
  id: string;
  tenantId: string;
  personId: string;
  companyId: string;
  employeeId: string;
  status: string;
  requestedBy?: string;
  requestedAt: string;
  createdAt: string;
  updatedAt: string;
};

type AdmissionContractSnapshot = {
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

type PointMarkListItem = {
  id: string;
  tenantId: string;
  employeeId: string;
  occurredAt: string;
  createdAt: string;
};

type PointMarkReceiptSnapshot = {
  receiptNumber: string;
  generatedAt: string;
  pointMark: {
    id: string;
    tenantId: string;
    employeeId: string;
    occurredAt: string;
    createdAt: string;
  };
  employee: {
    id: string;
    tenantId: string;
    companyId: string;
    personId: string;
    code?: string;
    createdAt: string;
    updatedAt: string;
  };
  title: string;
  content: Record<string, string>;
};

type TerminationListItem = {
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

type OffboardingListItem = {
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

type RescissionListItem = {
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

type RescissionDocumentItem = {
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

type IntegrationMonitoringSnapshot = {
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

type AnalyticsOverviewSnapshot = {
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
    retentionModel: string;
    exportFormats: string[];
    maskingLevels: string[];
  };
  alerts: Array<{
    code: string;
    severity: 'info' | 'warning' | 'critical';
    message: string;
  }>;
};

type PortalWorkspace = {
  summary: TenantSummary | null;
  admissions: AdmissionListItem[];
  terminations: TerminationListItem[];
  offboardings: OffboardingListItem[];
  rescissions: RescissionListItem[];
  monitoring: IntegrationMonitoringSnapshot | null;
  analytics: AnalyticsOverviewSnapshot | null;
  latestAdmissionContract: AdmissionContractSnapshot | null;
  latestPointReceipt: PointMarkReceiptSnapshot | null;
  latestRescission: (RescissionListItem & { documents: RescissionDocumentItem[] }) | null;
};

type AuthState = 'anonymous' | 'loading' | 'ready' | 'error';
type TenantState = 'idle' | 'loading' | 'ready' | 'error';
type WorkspaceState = 'idle' | 'loading' | 'ready' | 'error';
type HttpError = Error & { status?: number };

const EMPTY_SESSION: SessionSnapshot = {
  authenticated: false,
  profile: null,
  expiresAt: 0,
  activeTenantId: '',
  tenants: [],
};

const EMPTY_WORKSPACE: PortalWorkspace = {
  summary: null,
  admissions: [],
  terminations: [],
  offboardings: [],
  rescissions: [],
  monitoring: null,
  analytics: null,
  latestAdmissionContract: null,
  latestPointReceipt: null,
  latestRescission: null,
};

async function fetchJson<T>(input: RequestInfo | URL, init?: RequestInit): Promise<T> {
  const response = await fetch(input, init);
  if (!response.ok) {
    const message = await response.text();
    const error = new Error(message || `Request failed (${response.status})`) as HttpError;
    error.status = response.status;
    throw error;
  }

  return (await response.json()) as T;
}

function pickLast<T extends { createdAt?: string; updatedAt?: string; requestedAt?: string; effectiveAt?: string; closedAt?: string }>(
  records: T[],
): T | null {
  if (records.length === 0) {
    return null;
  }

  return records[records.length - 1] ?? null;
}

export function App() {
  const [session, setSession] = useState<SessionSnapshot>(EMPTY_SESSION);
  const [authState, setAuthState] = useState<AuthState>('loading');
  const [tenantState, setTenantState] = useState<TenantState>('loading');
  const [workspaceState, setWorkspaceState] = useState<WorkspaceState>('loading');
  const [workspace, setWorkspace] = useState<PortalWorkspace>(EMPTY_WORKSPACE);
  const [statusMessage, setStatusMessage] = useState('Carregando sessao do BFF...');

  const activeTenant = useMemo(
    () => session.tenants.find((item) => item.tenantId === session.activeTenantId) ?? session.tenants[0] ?? null,
    [session.activeTenantId, session.tenants],
  );

  const expiresInMinutes = session.expiresAt ? Math.max(0, Math.ceil((session.expiresAt - Date.now()) / 60000)) : 0;

  const portalModel = useMemo(
    () =>
      buildPortalWorkspaceModel({
        session,
        activeTenant,
        summary: workspace.summary,
        admissions: workspace.admissions,
        terminations: workspace.terminations,
        offboardings: workspace.offboardings,
        rescissions: workspace.rescissions,
        monitoring: workspace.monitoring,
        analytics: workspace.analytics,
        latestAdmissionContract: workspace.latestAdmissionContract,
        latestPointReceipt: workspace.latestPointReceipt,
        latestRescission: workspace.latestRescission,
      }),
    [activeTenant, session, workspace],
  );

  const syncSession = async (): Promise<SessionSnapshot> => {
    const nextSession = await fetchJson<SessionSnapshot>('/api/session');
    setSession((current) => ({
      ...current,
      ...nextSession,
      tenants: nextSession.tenants ?? [],
      activeTenantId: nextSession.activeTenantId ?? '',
    }));
    setAuthState(nextSession.authenticated ? 'ready' : 'anonymous');
    setTenantState(nextSession.authenticated ? 'ready' : 'idle');
    if (nextSession.authenticated) {
      setStatusMessage('Sessao gerenciada pelo BFF. Tokens ficam no servidor.');
    } else {
      setStatusMessage('Sessao inativa. Entre com o Keycloak local para carregar o contexto.');
    }
    return nextSession;
  };

  const syncWorkspace = async (tenantId: string): Promise<PortalWorkspace> => {
    const [
      summaryResult,
      admissionsResult,
      terminationsResult,
      offboardingsResult,
      rescissionsResult,
      monitoringResult,
      analyticsResult,
      pointMarksResult,
    ] = await Promise.allSettled([
      fetchJson<TenantSummary>(`/api/v1/tenants/${tenantId}/summary`),
      fetchJson<AdmissionListItem[]>(`/api/v1/tenants/${tenantId}/admissions`),
      fetchJson<TerminationListItem[]>(`/api/v1/tenants/${tenantId}/terminations`),
      fetchJson<OffboardingListItem[]>(`/api/v1/tenants/${tenantId}/offboardings`),
      fetchJson<RescissionListItem[]>(`/api/v1/tenants/${tenantId}/rescissions`),
      fetchJson<IntegrationMonitoringSnapshot>(`/api/v1/tenants/${tenantId}/integrations/monitoring`),
      fetchJson<AnalyticsOverviewSnapshot>(`/api/v1/tenants/${tenantId}/analytics/overview`),
      fetchJson<PointMarkListItem[]>(`/api/v1/tenants/${tenantId}/point-marks`),
    ]);

    const summary = summaryResult.status === 'fulfilled' ? summaryResult.value : null;
    const admissions = admissionsResult.status === 'fulfilled' ? admissionsResult.value : [];
    const terminations = terminationsResult.status === 'fulfilled' ? terminationsResult.value : [];
    const offboardings = offboardingsResult.status === 'fulfilled' ? offboardingsResult.value : [];
    const rescissions = rescissionsResult.status === 'fulfilled' ? rescissionsResult.value : [];
    const monitoring = monitoringResult.status === 'fulfilled' ? monitoringResult.value : null;
    const analytics = analyticsResult.status === 'fulfilled' ? analyticsResult.value : null;
    const pointMarks = pointMarksResult.status === 'fulfilled' ? pointMarksResult.value : [];

    const latestAdmission = pickLast(admissions);
    const latestTermination = pickLast(terminations);
    const latestOffboarding = pickLast(offboardings);
    const latestRescission = pickLast(rescissions);
    const latestPointMark = pointMarks[0] ?? null;

    const latestAdmissionContract =
      latestAdmission && latestAdmission.status !== 'cancelled'
        ? await fetchJson<AdmissionContractSnapshot>(`/api/v1/tenants/${tenantId}/admissions/${latestAdmission.id}/contract`).catch(
            () => null,
          )
        : null;

    const latestPointReceipt = latestPointMark
      ? await fetchJson<PointMarkReceiptSnapshot>(`/api/v1/tenants/${tenantId}/point-marks/${latestPointMark.id}/receipt`).catch(
          () => null,
        )
      : null;

    const latestRescissionDocuments = latestRescission
      ? await fetchJson<RescissionDocumentItem[]>(`/api/v1/tenants/${tenantId}/rescissions/${latestRescission.id}/documents`).catch(
          () => [],
        )
      : [];

    return {
      summary,
      admissions,
      terminations,
      offboardings,
      rescissions,
      monitoring,
      analytics,
      latestAdmissionContract,
      latestPointReceipt,
      latestRescission: latestRescission ? { ...latestRescission, documents: latestRescissionDocuments } : null,
      latestTermination,
      latestOffboarding,
    } as PortalWorkspace & {
      latestTermination: TerminationListItem | null;
      latestOffboarding: OffboardingListItem | null;
    };
  };

  useEffect(() => {
    let cancelled = false;

    setAuthState('loading');
    setTenantState('loading');
    setStatusMessage('Carregando sessao do BFF...');

    void syncSession().catch((error: unknown) => {
      if (cancelled) {
        return;
      }

      const message = error instanceof Error ? error.message : 'Falha ao carregar a sessao.';
      setAuthState('error');
      setTenantState('error');
      setStatusMessage(message);
      setSession(EMPTY_SESSION);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!session.authenticated) {
      return;
    }

    if (session.expiresAt && Date.now() >= session.expiresAt) {
      void syncSession().catch(() => undefined);
      return;
    }

    if (!session.expiresAt) {
      return;
    }

    const timeout = window.setTimeout(() => {
      void syncSession().catch(() => undefined);
    }, Math.max(0, session.expiresAt - Date.now() - 60_000));

    return () => {
      window.clearTimeout(timeout);
    };
  }, [session.authenticated, session.expiresAt]);

  useEffect(() => {
    if (!session.authenticated || session.tenants.length === 0) {
      return;
    }

    if (session.activeTenantId) {
      return;
    }

    const firstTenantId = session.tenants[0]?.tenantId ?? '';
    if (!firstTenantId) {
      return;
    }

    void fetchJson<{ activeTenantId: string }>('/api/session/active-tenant', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ tenantId: firstTenantId }),
    })
      .then((payload) => {
        setSession((current) => ({
          ...current,
          activeTenantId: payload.activeTenantId,
        }));
        setStatusMessage('Tenant ativo selecionado pelo BFF.');
      })
      .catch((error: unknown) => {
        const message = error instanceof Error ? error.message : 'Falha ao selecionar tenant.';
        setTenantState('error');
        setStatusMessage(message);
      });
  }, [session.authenticated, session.activeTenantId, session.tenants]);

  useEffect(() => {
    if (!session.authenticated || !activeTenant) {
      setWorkspace(EMPTY_WORKSPACE);
      setWorkspaceState(session.authenticated ? 'idle' : 'idle');
      return;
    }

    let cancelled = false;
    setWorkspaceState('loading');
    setStatusMessage(`Carregando portal operacional de ${activeTenant.tenant.name}...`);

    void syncWorkspace(activeTenant.tenantId)
      .then((nextWorkspace) => {
        if (cancelled) {
          return;
        }

        setWorkspace({
          summary: nextWorkspace.summary,
          admissions: nextWorkspace.admissions,
          terminations: nextWorkspace.terminations,
          offboardings: nextWorkspace.offboardings,
          rescissions: nextWorkspace.rescissions,
          monitoring: nextWorkspace.monitoring,
          analytics: nextWorkspace.analytics,
          latestAdmissionContract: nextWorkspace.latestAdmissionContract,
          latestPointReceipt: nextWorkspace.latestPointReceipt,
          latestRescission: nextWorkspace.latestRescission,
        });
        setWorkspaceState('ready');
        setStatusMessage(`Portal operacional carregado para ${activeTenant.tenant.name}.`);
      })
      .catch((error: unknown) => {
        if (cancelled) {
          return;
        }

        const message = error instanceof Error ? error.message : 'Falha ao carregar o portal operacional.';
        setWorkspaceState('error');
        setStatusMessage(message);
        setWorkspace(EMPTY_WORKSPACE);
      });

    return () => {
      cancelled = true;
    };
  }, [activeTenant, session.authenticated]);

  function handleLogin(): void {
    window.location.assign('/auth/login');
  }

  function handleLogout(): void {
    window.location.assign('/auth/logout');
  }

  function handleSelectTenant(tenantId: string): void {
    setTenantState('loading');
    setStatusMessage('Atualizando tenant ativo no BFF...');

    void fetchJson<{ activeTenantId: string }>('/api/session/active-tenant', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ tenantId }),
    })
      .then((payload) => {
        setSession((current) => ({
          ...current,
          activeTenantId: payload.activeTenantId,
        }));
        setTenantState('ready');
        setStatusMessage('Tenant ativo atualizado.');
      })
      .catch((error: unknown) => {
        const message = error instanceof Error ? error.message : 'Falha ao atualizar tenant.';
        setTenantState('error');
        setStatusMessage(message);
      });
  }

  function handleRefresh(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    setTenantState('loading');
    setStatusMessage('Recarregando sessao e tenants...');

    void syncSession()
      .then((nextSession) => {
        if (!nextSession.authenticated) {
          return;
        }

        setTenantState('ready');
      })
      .catch((error: unknown) => {
        const message = error instanceof Error ? error.message : 'Falha ao atualizar a sessao.';
        setTenantState('error');
        setStatusMessage(message);
      });
  }

  return (
    <main className="shell">
      <section className="hero">
        <p className="eyebrow">RH Brasil</p>
        <h1>BFF com login OIDC real</h1>
        <p className="lede">
          O portal fala apenas com o próprio domínio. O BFF segura os tokens OIDC no servidor,
          injeta a autenticação nas chamadas ao backend e expõe ao navegador só o contexto necessário.
        </p>
      </section>

      <section className="workspace">
        <article className="panel panel--login">
          <div className="panel-header">
            <span>Sessao</span>
            <strong>{authState === 'ready' ? 'BFF autenticado' : 'Login do portal'}</strong>
          </div>

          <div className="session-meta">
            <div>
              <span>Subject</span>
              <strong>{session.profile?.displayName ?? 'Nao autenticado'}</strong>
            </div>
            <div>
              <span>Papel</span>
              <strong>{session.profile?.role ?? 'Sem sessao'}</strong>
            </div>
          </div>

          <div className="session-meta">
            <div>
              <span>Expira em</span>
              <strong>{session.authenticated ? `${expiresInMinutes} min` : 'n/a'}</strong>
            </div>
            <div>
              <span>Tokens</span>
              <strong>{session.authenticated ? 'no servidor' : 'indisponiveis'}</strong>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" onClick={handleLogin}>
              {session.authenticated ? 'Reentrar' : 'Entrar com Keycloak'}
            </button>
            <button type="button" className="button-secondary" onClick={handleLogout} disabled={!session.authenticated}>
              Sair
            </button>
          </div>

          <div className="status-row">
            <span className={`status-dot status-dot--${tenantState}`} />
            <p>{statusMessage}</p>
          </div>
        </article>

        <article className="panel panel--tenants">
          <div className="panel-header">
            <span>Contexto</span>
            <strong>Tenants acessiveis</strong>
          </div>

          {session.tenants.length === 0 ? (
            <p className="empty-state">
              Nenhum tenant disponivel no momento. Crie um tenant com o subject autenticado ou
              receba um grant via `POST /api/v1/tenants/:tenantId/access-grants`.
            </p>
          ) : (
            <div className="tenant-list">
              {session.tenants.map((item) => {
                const selected = item.tenantId === activeTenant?.tenantId;
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`tenant-card ${selected ? 'tenant-card--selected' : ''}`}
                    onClick={() => handleSelectTenant(item.tenantId)}
                  >
                    <div className="tenant-card__top">
                      <strong>{item.tenant.name}</strong>
                      <span>{item.role}</span>
                    </div>
                    <p>{item.tenant.slug}</p>
                    <small>{item.tenantId}</small>
                  </button>
                );
              })}
            </div>
          )}

          <form className="inline-action" onSubmit={handleRefresh}>
            <button type="submit" className="button-secondary">
              {session.authenticated ? 'Atualizar contexto' : 'Carregar sessao'}
            </button>
          </form>
        </article>
      </section>

      <section className="grid">
        <article>
          <span>Tenant ativo</span>
          <strong>{activeTenant ? activeTenant.tenant.name : 'Sem tenant selecionado'}</strong>
          <p>
            {activeTenant
              ? `${activeTenant.tenant.slug} · papel ${activeTenant.role}`
              : 'Selecione um tenant para concentrar a navegacao e a leitura do contexto.'}
          </p>
        </article>
        <article>
          <span>Persistencia</span>
          <strong>Contexto no servidor</strong>
          <p>
            O BFF guarda a sessao em cookie HttpOnly e concentra o tenant ativo no lado do servidor,
            reduzindo a exposicao de tokens no navegador.
          </p>
        </article>
        <article>
          <span>Operacao</span>
          <strong>Proxy de API transparente</strong>
          <p>
            As chamadas para `GET /api/v1/tenants/me/access` e demais rotas seguem pelo BFF, que injeta
            `Authorization` e `x-rh-tenant-id` antes de atingir o backend.
          </p>
        </article>
      </section>

      <section className="portal-workspace">
        <div className="portal-workspace__header">
          <div>
            <span>Onda 4</span>
            <strong>Portais e workflow</strong>
          </div>
          <p>
            Estado{' '}
            {workspaceState === 'ready'
              ? 'carregado'
              : workspaceState === 'loading'
                ? 'em carregamento'
                : workspaceState === 'error'
                  ? 'com falha'
                  : 'ocioso'}
            . A superfície abaixo consolida colaborador, gestor, documentos e exceções a partir do
            tenant ativo.
          </p>
        </div>

        <div className="portal-workspace__grid">
          <article className="portal-panel">
            <div className="panel-header">
              <span>Portal do colaborador</span>
              <strong>Autosserviço e contexto</strong>
            </div>
            <div className="portal-card-grid">
              {portalModel.collaboratorCards.map((card) => (
                <div key={card.key} className={`portal-card portal-card--${card.status}`}>
                  <span>{card.label}</span>
                  <strong>{card.title}</strong>
                  <p>{card.detail}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="portal-panel">
            <div className="panel-header">
              <span>Portal do gestor</span>
              <strong>Fila de aprovações</strong>
            </div>
            <div className="portal-card-grid">
              {portalModel.managerCards.map((card) => (
                <div key={card.key} className={`portal-card portal-card--${card.status}`}>
                  <span>{card.label}</span>
                  <strong>{card.title}</strong>
                  <p>{card.detail}</p>
                </div>
              ))}
            </div>
            <div className="exception-strip">
              {portalModel.exceptionCards.map((card) => (
                <div key={card.key} className={`exception-pill exception-pill--${card.status}`}>
                  <span>{card.label}</span>
                  <strong>{card.title}</strong>
                  <small>{card.detail}</small>
                </div>
              ))}
            </div>
          </article>

          <article className="portal-panel">
            <div className="panel-header">
              <span>Gestão documental</span>
              <strong>Documentos recentes</strong>
            </div>
            {portalModel.documentCards.length === 0 ? (
              <p className="empty-state">
                Nenhum documento recente disponível para o tenant ativo. O portal respeita o contexto,
                o papel e a retenção definida.
              </p>
            ) : (
              <div className="document-stack">
                {portalModel.documentCards.map((card) => (
                  <article key={card.key} className="document-card">
                    <span>{card.label}</span>
                    <strong>{card.title}</strong>
                    <small>{card.status}</small>
                    <p>{card.description}</p>
                    <em>{card.meta}</em>
                  </article>
                ))}
              </div>
            )}
          </article>

          <article className="portal-panel">
            <div className="panel-header">
              <span>Onda 5</span>
              <strong>BI, LGPD e auditoria</strong>
            </div>
            <div className="portal-card-grid">
              {portalModel.analyticsCards.cards.map((card) => (
                <div key={card.key} className={`portal-card portal-card--${card.status}`}>
                  <span>{card.label}</span>
                  <strong>{card.title}</strong>
                  <p>{card.detail}</p>
                </div>
              ))}
            </div>
            <div className="exception-strip">
              {portalModel.analyticsCards.alerts.map((card) => (
                <div key={card.key} className={`exception-pill exception-pill--${card.status}`}>
                  <span>{card.label}</span>
                  <strong>{card.title}</strong>
                  <small>{card.detail}</small>
                </div>
              ))}
            </div>
          </article>

          <article className="portal-panel portal-panel--timeline">
            <div className="panel-header">
              <span>Onda 6</span>
              <strong>Domínios complementares</strong>
            </div>
            <div className="timeline">
              {portalModel.complementaryRoadmap.map((item) => (
                <div key={item.key} className="timeline-item">
                  <span>{item.title}</span>
                  <strong>{item.subtitle}</strong>
                  <p>{item.detail}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="portal-panel portal-panel--timeline">
            <div className="panel-header">
              <span>Workflow genérico</span>
              <strong>Eventos e exceções</strong>
            </div>
            {portalModel.workflowTimeline.length === 0 ? (
              <p className="empty-state">Sem eventos recentes no tenant ativo.</p>
            ) : (
              <div className="timeline">
                {portalModel.workflowTimeline.map((item) => (
                  <div key={item.key} className="timeline-item">
                    <span>{item.title}</span>
                    <strong>{item.subtitle}</strong>
                    <p>{item.detail}</p>
                  </div>
                ))}
              </div>
            )}
          </article>
        </div>
      </section>
    </main>
  );
}
