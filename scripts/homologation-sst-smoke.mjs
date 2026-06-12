const baseUrl = process.env.HOMOLOGATION_API_URL ?? 'http://172.17.0.3:3000';
const headers = {
  'content-type': 'application/json',
  'x-rh-user-id': process.env.HOMOLOGATION_SMOKE_USER_ID ?? 'sst-smoke-user',
  'x-rh-role': process.env.HOMOLOGATION_SMOKE_ROLE ?? 'admin',
};

const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, '');
const unique = `${timestamp}-${Math.random().toString(16).slice(2, 8)}`;

async function requestJson(path, options = {}) {
  const response = await fetch(`${baseUrl}${path}`, {
    headers: options.body ? { ...headers, ...(options.headers ?? {}) } : { ...(options.headers ?? {}) },
    ...options,
  });

  const text = await response.text();
  let body;
  try {
    body = text ? JSON.parse(text) : null;
  } catch {
    body = text;
  }

  if (!response.ok) {
    throw new Error(`${options.method ?? 'GET'} ${path} failed with ${response.status}: ${typeof body === 'string' ? body : JSON.stringify(body)}`);
  }

  return body;
}

async function main() {
  const health = await requestJson('/api/health');
  if (health?.status !== 'ok') {
    throw new Error(`Unexpected health payload: ${JSON.stringify(health)}`);
  }

  const tenant = await requestJson('/api/v1/tenants', {
    method: 'POST',
    body: JSON.stringify({
      name: `SST Smoke ${unique}`,
      slug: `sst-smoke-${unique}`,
    }),
  });

  const scopedHeaders = {
    'content-type': 'application/json',
    'x-rh-user-id': headers['x-rh-user-id'],
    'x-rh-role': headers['x-rh-role'],
    'x-rh-tenant-id': tenant.id,
  };

  const company = await requestJson(`/api/v1/tenants/${tenant.id}/companies`, {
    method: 'POST',
    headers: scopedHeaders,
    body: JSON.stringify({
      legalName: 'SST Smoke LTDA',
      tradeName: 'SST Smoke',
      cnpj: '11222333000144',
    }),
  });

  const person = await requestJson(`/api/v1/tenants/${tenant.id}/persons`, {
    method: 'POST',
    headers: scopedHeaders,
    body: JSON.stringify({
      fullName: 'Pessoa SST Smoke',
      cpf: '12312312399',
    }),
  });

  const employee = await requestJson(`/api/v1/tenants/${tenant.id}/employees`, {
    method: 'POST',
    headers: scopedHeaders,
    body: JSON.stringify({
      companyId: company.id,
      personId: person.id,
      code: 'SMK-SST-001',
    }),
  });

  const environment = await requestJson(`/api/v1/tenants/${tenant.id}/sst/environments`, {
    method: 'POST',
    headers: scopedHeaders,
    body: JSON.stringify({
      companyId: company.id,
      code: 'ENV-SMOKE-001',
      name: 'Area operacional de smoke',
      sector: 'Operacoes',
      validFrom: '2026-01-01T00:00:00.000Z',
      notes: 'Ambiente de validacao SST',
    }),
  });

  const risk = await requestJson(`/api/v1/tenants/${tenant.id}/sst/environments/${environment.id}/risks`, {
    method: 'POST',
    headers: scopedHeaders,
    body: JSON.stringify({
      code: 'RISK-SMOKE-001',
      name: 'Ruido operacional',
      severity: 'medium',
      probability: 'medium',
      controlMeasure: 'EPI e procedimento',
      validFrom: '2026-01-01T00:00:00.000Z',
      notes: 'Risco do smoke',
    }),
  });

  const pgr = await requestJson(`/api/v1/tenants/${tenant.id}/sst/pgrs`, {
    method: 'POST',
    headers: scopedHeaders,
    body: JSON.stringify({
      companyId: company.id,
      code: 'PGR-SMOKE-001',
      title: 'Programa de Gerenciamento de Riscos',
      status: 'active',
      validFrom: '2026-01-01T00:00:00.000Z',
      notes: 'PGR do smoke',
    }),
  });

  const pcmso = await requestJson(`/api/v1/tenants/${tenant.id}/sst/pcmsos`, {
    method: 'POST',
    headers: scopedHeaders,
    body: JSON.stringify({
      companyId: company.id,
      code: 'PCMSO-SMOKE-001',
      title: 'Programa de Controle Medico de Saude Ocupacional',
      status: 'active',
      validFrom: '2026-01-01T00:00:00.000Z',
      notes: 'PCMSO do smoke',
    }),
  });

  const cat = await requestJson(`/api/v1/tenants/${tenant.id}/sst/cats`, {
    method: 'POST',
    headers: scopedHeaders,
    body: JSON.stringify({
      companyId: company.id,
      employeeId: employee.id,
      reportNumber: 'CAT-SMOKE-001',
      accidentType: 'work_accident',
      occurredAt: '2026-03-01T08:15:00.000Z',
      status: 'open',
      description: 'Evento de validacao SST',
      notifiedAt: '2026-03-01T10:00:00.000Z',
      notes: 'CAT do smoke',
    }),
  });

  const epiCatalog = await requestJson(`/api/v1/tenants/${tenant.id}/sst/epi-catalogs`, {
    method: 'POST',
    headers: scopedHeaders,
    body: JSON.stringify({
      companyId: company.id,
      code: 'EPI-SMOKE-001',
      name: 'Capacete de seguranca',
      active: true,
      validFrom: '2026-01-01T00:00:00.000Z',
      notes: 'EPI do smoke',
    }),
  });

  const epiAssignment = await requestJson(`/api/v1/tenants/${tenant.id}/sst/epi-assignments`, {
    method: 'POST',
    headers: scopedHeaders,
    body: JSON.stringify({
      employeeId: employee.id,
      epiCatalogId: epiCatalog.id,
      deliveredAt: '2026-03-01T09:00:00.000Z',
      status: 'delivered',
      receivedBy: 'Colaborador Smoke',
      notes: 'Entrega do smoke',
    }),
  });

  const exam = await requestJson(`/api/v1/tenants/${tenant.id}/sst/exams`, {
    method: 'POST',
    headers: scopedHeaders,
    body: JSON.stringify({
      employeeId: employee.id,
      environmentId: environment.id,
      examType: 'admission',
      status: 'performed',
      scheduledAt: '2026-02-01T08:00:00.000Z',
      performedAt: '2026-02-01T08:30:00.000Z',
      result: 'fit',
      expiresAt: '2026-08-01T00:00:00.000Z',
      notes: 'Exame do smoke',
    }),
  });

  const aso = await requestJson(`/api/v1/tenants/${tenant.id}/sst/exams/${exam.id}/aso`, {
    method: 'POST',
    headers: scopedHeaders,
    body: JSON.stringify({
      result: 'fit',
      issuer: 'Medico do trabalho',
      issuedAt: '2026-02-01T09:00:00.000Z',
      notes: 'ASO do smoke',
    }),
  });

  const trainingCatalog = await requestJson(`/api/v1/tenants/${tenant.id}/sst/training-catalogs`, {
    method: 'POST',
    headers: scopedHeaders,
    body: JSON.stringify({
      companyId: company.id,
      code: 'TRN-SMOKE-001',
      title: 'Treinamento de seguranca operacional',
      description: 'Treinamento basico de SST',
      mandatory: true,
      active: true,
      validFrom: '2026-01-01T00:00:00.000Z',
      notes: 'Treinamento do smoke',
    }),
  });

  const trainingAssignment = await requestJson(`/api/v1/tenants/${tenant.id}/sst/training-assignments`, {
    method: 'POST',
    headers: scopedHeaders,
    body: JSON.stringify({
      employeeId: employee.id,
      trainingCatalogId: trainingCatalog.id,
      dueAt: '2026-03-15T00:00:00.000Z',
      expiresAt: '2026-09-15T00:00:00.000Z',
      score: 95,
      notes: 'Atribuicao do smoke',
    }),
  });

  const trainingCompleted = await requestJson(`/api/v1/tenants/${tenant.id}/sst/training-assignments/${trainingAssignment.id}/complete`, {
    method: 'POST',
    headers: scopedHeaders,
    body: JSON.stringify({
      completedAt: '2026-03-10T10:00:00.000Z',
      score: 97,
      notes: 'Conclusao do smoke',
    }),
  });

  const envTransmission = await requestJson(`/api/v1/tenants/${tenant.id}/sst/environments/${environment.id}/esocial-transmissions`, {
    method: 'POST',
    headers: scopedHeaders,
    body: JSON.stringify({ notes: 'Envio do smoke' }),
  });

  const checks = {
    tenant: tenant.id,
    company: company.id,
    person: person.id,
    employee: employee.id,
    environment: environment.code,
    risk: risk.code,
    pgr: pgr.code,
    pcmso: pcmso.code,
    cat: cat.reportNumber,
    epiCatalog: epiCatalog.code,
    epiAssignment: epiAssignment.status,
    exam: exam.examType,
    aso: aso.result,
    training: trainingCompleted.status,
    transmission: envTransmission.status,
  };

  console.log(JSON.stringify(checks, null, 2));
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
