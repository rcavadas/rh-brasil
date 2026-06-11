const OPEN_ADMISSION_STATUSES = new Set(['draft', 'pending_documents', 'under_review']);
const OPEN_TERMINATION_STATUSES = new Set(['draft', 'approved']);
const OPEN_OFFBOARDING_STATUSES = new Set(['draft']);
const OPEN_RESCISSION_STATUSES = new Set(['draft', 'calculated', 'documented']);

function latestByDate(records, fields) {
  if (!Array.isArray(records) || records.length === 0) {
    return null;
  }

  return [...records].sort((left, right) => {
    for (const field of fields) {
      const leftValue = Date.parse(left?.[field] ?? '');
      const rightValue = Date.parse(right?.[field] ?? '');
      if (Number.isNaN(leftValue) || Number.isNaN(rightValue) || leftValue === rightValue) {
        continue;
      }

      return rightValue - leftValue;
    }

    return 0;
  })[0] ?? null;
}

function formatShortDate(value) {
  if (!value) {
    return 'n/a';
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return 'n/a';
  }

  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

function countOpen(records, openStatuses) {
  return Array.isArray(records)
    ? records.filter((record) => openStatuses.has(String(record?.status ?? '').toLowerCase())).length
    : 0;
}

function buildDocumentCards({ latestAdmissionContract, latestPointReceipt, latestRescission }) {
  const cards = [];

  if (latestAdmissionContract) {
    cards.push({
      key: 'admission-contract',
      label: 'Contrato recente',
      title: latestAdmissionContract.contractType ?? 'Contrato de admissão',
      status: latestAdmissionContract.status ?? 'n/a',
      description: `Vigente desde ${formatShortDate(latestAdmissionContract.effectiveFrom)}.`,
      meta: `${formatShortDate(latestAdmissionContract.updatedAt)} · ${latestAdmissionContract.createdBy ?? 'sistema'}`,
    });
  }

  if (latestPointReceipt) {
    cards.push({
      key: 'point-receipt',
      label: 'Comprovante de ponto',
      title: latestPointReceipt.title ?? 'Comprovante de marcação',
      status: latestPointReceipt.receiptNumber ?? 'sem recibo',
      description: `Marcações registradas em ${formatShortDate(latestPointReceipt.pointMark?.occurredAt)}.`,
      meta: `${formatShortDate(latestPointReceipt.generatedAt)} · ${latestPointReceipt.employee?.code ?? latestPointReceipt.employee?.id ?? 'colaborador'}`,
    });
  }

  if (latestRescission) {
    cards.push({
      key: 'rescission-pack',
      label: 'Pacote rescisório',
      title: `Rescisão ${latestRescission.status}`,
      status: latestRescission.status,
      description: latestRescission.paymentDueAt
        ? `Pagamento previsto para ${formatShortDate(latestRescission.paymentDueAt)}.`
        : 'Sem prazo de pagamento calculado.',
      meta: `${formatShortDate(latestRescission.updatedAt)} · ${latestRescission.documents?.length ?? 0} documentos`,
    });
  }

  return cards;
}

function buildAnalyticsCards({ summary, monitoring, analytics }) {
  const headcount = analytics?.signals?.headcount ?? summary?.counts?.employees ?? 0;
  const workflowPressure = analytics?.signals?.workflowPressure ?? 0;
  const auditEvents = analytics?.counts?.auditEvents ?? summary?.counts?.auditEvents ?? 0;
  const failedIntegrations = analytics?.counts?.failedIntegrations ?? monitoring?.counts?.failed ?? 0;
  const dlqIntegrations = analytics?.counts?.dlqIntegrations ?? monitoring?.counts?.dlq ?? 0;
  const attempts = analytics?.counts?.attempts ?? monitoring?.counts?.attempts ?? 0;
  const privacy = analytics?.privacy ?? {
    retentionModel: 'class-based',
    exportFormats: ['json', 'csv', 'pdf', 'zip'],
    maskingLevels: ['strict', 'controlled', 'aggregate'],
  };

  const cards = [
    {
      key: 'analytics-headcount',
      label: 'Headcount',
      title: String(headcount),
      detail: 'Colaboradores ativos no tenant corrente.',
      status: headcount > 0 ? 'ok' : 'empty',
    },
    {
      key: 'analytics-workflow',
      label: 'Pressão de fluxo',
      title: String(workflowPressure),
      detail: 'Admissões, desligamentos, offboardings e rescisões em aberto.',
      status: workflowPressure > 0 ? 'attention' : 'ok',
    },
    {
      key: 'analytics-audit',
      label: 'Auditoria',
      title: String(auditEvents),
      detail: analytics?.signals?.lastAuditEventAt
        ? `Ultima evidencia em ${formatShortDate(analytics.signals.lastAuditEventAt)}.`
        : 'Nenhuma evidencia recente no tenant consultado.',
      status: auditEvents > 0 ? 'ok' : 'empty',
    },
    {
      key: 'analytics-risk',
      label: 'Integracoes',
      title: String(failedIntegrations),
      detail: `${dlqIntegrations} em DLQ · ${attempts} tentativas`,
      status: dlqIntegrations > 0 ? 'critical' : failedIntegrations > 0 ? 'attention' : 'ok',
    },
    {
      key: 'analytics-policy',
      label: 'LGPD',
      title: privacy.retentionModel,
      detail: `${privacy.exportFormats.join(', ')} · ${privacy.maskingLevels.join(', ')}`,
      status: 'ok',
    },
  ];

  const alerts = analytics?.alerts?.map((alert) => ({
    key: `analytics-alert-${alert.code}`,
    label: 'Sinal analitico',
    title: alert.code,
    detail: alert.message,
    status: alert.severity === 'critical' ? 'critical' : alert.severity === 'warning' ? 'attention' : 'ok',
  })) ?? [];

  return {
    cards,
    alerts,
    privacy,
  };
}

function buildComplementaryRoadmap() {
  return [
    {
      key: 'benefits',
      title: 'Benefícios completos',
      subtitle: '1. sequencia de entrega',
      detail: 'Elegibilidade, adesão e manutenção com integrações e documentos.',
    },
    {
      key: 'vacations',
      title: 'Férias completas',
      subtitle: '2. sequencia de entrega',
      detail: 'Aquisição, programação, concessão e auditoria de saldo.',
    },
    {
      key: 'thirteenth',
      title: '13º completo',
      subtitle: '3. sequencia de entrega',
      detail: 'Adiantamento, provisão, fechamento e impacto em folha.',
    },
    {
      key: 'sst',
      title: 'SST e medicina ocupacional',
      subtitle: '4. sequencia de entrega',
      detail: 'Exames, riscos, vencimentos e confidencialidade.',
    },
    {
      key: 'performance',
      title: 'Avaliação de desempenho',
      subtitle: '5. sequencia de entrega',
      detail: 'Ciclos, metas, feedback e PDI com histórico e acesso por papel.',
    },
    {
      key: 'recruiting',
      title: 'Recrutamento e seleção',
      subtitle: '6. sequencia de entrega',
      detail: 'Funil, triagem, entrevistas e conversão em pre-admissão.',
    },
    {
      key: 'lms',
      title: 'LMS',
      subtitle: '7. sequencia de entrega',
      detail: 'Cursos, trilhas, matrículas, execução e certificados.',
    },
    {
      key: 'expenses',
      title: 'Reembolsos e despesas',
      subtitle: '8. sequencia de entrega',
      detail: 'Aprovação, comprovação e controle financeiro com auditoria.',
    },
    {
      key: 'compliance',
      title: 'Compliance avançado',
      subtitle: '9. sequencia de entrega',
      detail: 'Controles, exceções e rastreio de uso entre domínios.',
    },
  ];
}

function buildWorkflowTimeline({ admissions, terminations, offboardings, rescissions, latestAuditEventAt }) {
  const items = [];

  const latestAdmission = latestByDate(admissions, ['updatedAt', 'createdAt', 'requestedAt']);
  if (latestAdmission) {
    items.push({
      key: `admission-${latestAdmission.id}`,
      title: 'Admissão mais recente',
      subtitle: latestAdmission.status,
      detail: `${latestAdmission.personId} · ${latestAdmission.companyId}`,
      occurredAt: latestAdmission.updatedAt ?? latestAdmission.createdAt ?? latestAdmission.requestedAt,
    });
  }

  const latestTermination = latestByDate(terminations, ['updatedAt', 'createdAt', 'approvedAt', 'effectiveOn']);
  if (latestTermination) {
    items.push({
      key: `termination-${latestTermination.id}`,
      title: 'Desligamento mais recente',
      subtitle: latestTermination.status,
      detail: `${latestTermination.reason} · ${latestTermination.employeeId}`,
      occurredAt: latestTermination.updatedAt ?? latestTermination.createdAt ?? latestTermination.requestedAt,
    });
  }

  const latestOffboarding = latestByDate(offboardings, ['updatedAt', 'createdAt', 'closedAt']);
  if (latestOffboarding) {
    items.push({
      key: `offboarding-${latestOffboarding.id}`,
      title: 'Offboarding mais recente',
      subtitle: latestOffboarding.status,
      detail: `${latestOffboarding.employeeId} · ${latestOffboarding.terminationRequestId}`,
      occurredAt: latestOffboarding.updatedAt ?? latestOffboarding.createdAt ?? latestOffboarding.requestedAt,
    });
  }

  const latestRescission = latestByDate(rescissions, ['updatedAt', 'createdAt', 'closedAt']);
  if (latestRescission) {
    items.push({
      key: `rescission-${latestRescission.id}`,
      title: 'Rescisão mais recente',
      subtitle: latestRescission.status,
      detail: latestRescission.paymentDueAt
        ? `Prazo ${formatShortDate(latestRescission.paymentDueAt)}`
        : `Vínculo ${latestRescission.terminationRequestId}`,
      occurredAt: latestRescission.updatedAt ?? latestRescission.createdAt ?? latestRescission.requestedAt,
    });
  }

  if (latestAuditEventAt) {
    items.push({
      key: 'audit-latest',
      title: 'Última auditoria',
      subtitle: 'audit trail',
      detail: formatShortDate(latestAuditEventAt),
      occurredAt: latestAuditEventAt,
    });
  }

  return items
    .sort((left, right) => Date.parse(right.occurredAt ?? '') - Date.parse(left.occurredAt ?? ''))
    .slice(0, 5);
}

export function buildPortalWorkspaceModel({
  session,
  activeTenant,
  summary,
  admissions = [],
  terminations = [],
  offboardings = [],
  rescissions = [],
  monitoring,
  analytics,
  latestAdmissionContract,
  latestPointReceipt,
  latestRescission,
}) {
  const role = activeTenant?.role ?? session?.profile?.role ?? 'n/a';
  const tenantName = activeTenant?.tenant?.name ?? summary?.tenant?.name ?? 'Sem tenant';
  const tenantSlug = activeTenant?.tenant?.slug ?? summary?.tenant?.slug ?? 'n/a';
  const pendingAdmissions = countOpen(admissions, OPEN_ADMISSION_STATUSES);
  const pendingTerminations = countOpen(terminations, OPEN_TERMINATION_STATUSES);
  const pendingOffboardings = countOpen(offboardings, OPEN_OFFBOARDING_STATUSES);
  const pendingRescissions = countOpen(rescissions, OPEN_RESCISSION_STATUSES);
  const integrationAlerts = monitoring?.alerts?.length ?? 0;
  const monitoredFailures = monitoring?.counts?.failed ?? 0;
  const monitoredDlq = monitoring?.counts?.dlq ?? 0;

  const collaboratorCards = [
    {
      key: 'collaborator-tenant',
      label: 'Contexto ativo',
      title: tenantName,
      detail: `${tenantSlug} · papel ${role}`,
      status: session?.authenticated ? 'authenticated' : 'offline',
    },
    {
      key: 'collaborator-point',
      label: 'Meu ponto',
      title: latestPointReceipt?.title ?? 'Sem comprovante recente',
      detail: latestPointReceipt
        ? `${latestPointReceipt.receiptNumber ?? 'sem número'} · ${formatShortDate(latestPointReceipt.generatedAt)}`
        : 'Nenhuma marcação recente na janela consultada.',
      status: latestPointReceipt ? 'available' : 'empty',
    },
    {
      key: 'collaborator-contract',
      label: 'Meu contrato',
      title: latestAdmissionContract?.contractType ?? 'Sem contrato recente',
      detail: latestAdmissionContract
        ? `${latestAdmissionContract.status} · ${formatShortDate(latestAdmissionContract.effectiveFrom)}`
        : 'A última admissão ainda não gerou snapshot contratual.',
      status: latestAdmissionContract ? 'ok' : 'empty',
    },
  ];

  const managerCards = [
    {
      key: 'manager-admissions',
      label: 'Admissões abertas',
      title: String(pendingAdmissions),
      detail: 'Fluxos em draft, pendência documental ou revisão.',
      status: pendingAdmissions > 0 ? 'attention' : 'ok',
    },
    {
      key: 'manager-terminations',
      label: 'Desligamentos abertos',
      title: String(pendingTerminations),
      detail: 'Solicitações ainda sem efetivação.',
      status: pendingTerminations > 0 ? 'attention' : 'ok',
    },
    {
      key: 'manager-rescissions',
      label: 'Rescisões abertas',
      title: String(pendingRescissions),
      detail: 'Rescisões calculadas ou aguardando documentação/fechamento.',
      status: pendingRescissions > 0 ? 'attention' : 'ok',
    },
    {
      key: 'manager-offboardings',
      label: 'Offboardings abertos',
      title: String(pendingOffboardings),
      detail: 'Saídas ainda em preparação.',
      status: pendingOffboardings > 0 ? 'attention' : 'ok',
    },
  ];

  const documentCards = buildDocumentCards({
    latestAdmissionContract,
    latestPointReceipt,
    latestRescission,
  });

  const analyticsCards = buildAnalyticsCards({
    summary,
    monitoring,
    analytics,
  });

  const complementaryRoadmap = buildComplementaryRoadmap();

  const workflowTimeline = buildWorkflowTimeline({
    admissions,
    terminations,
    offboardings,
    rescissions,
    latestAuditEventAt: summary?.lastAuditEventAt ?? null,
  });

  const exceptionCards = [
    {
      key: 'alerts',
      label: 'Alertas de integração',
      title: String(integrationAlerts),
      detail: 'Alertas gerados pelo monitoramento basico.',
      status: integrationAlerts > 0 ? 'attention' : 'ok',
    },
    {
      key: 'failures',
      label: 'Falhas persistidas',
      title: String(monitoredFailures),
      detail: 'Requests de integração com status failed.',
      status: monitoredFailures > 0 ? 'attention' : 'ok',
    },
    {
      key: 'dlq',
      label: 'Dead letters',
      title: String(monitoredDlq),
      detail: 'Requests em fila de erro aguardando triagem.',
      status: monitoredDlq > 0 ? 'attention' : 'ok',
    },
  ];

  return {
    collaboratorCards,
    managerCards,
    documentCards,
    analyticsCards,
    complementaryRoadmap,
    workflowTimeline,
    exceptionCards,
  };
}
