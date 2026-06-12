import assert from 'node:assert/strict';
import { afterEach, beforeEach, test } from 'node:test';
import { PrismaClient } from '@prisma/client';
import { SliceStore } from '../src/slice.store.js';

process.env.DATABASE_URL ??= 'postgresql://rh:rh@localhost:5432/rh';

const prisma = new PrismaClient();

async function resetDatabase(): Promise<void> {
  await prisma.$executeRawUnsafe(`
    TRUNCATE TABLE
      "admission_checklist_items",
      "admission_contracts",
      "admission_documents",
      "admission_esocial_transmissions",
      "rescission_history",
      "rescission_requests",
      "termination_history",
      "termination_requests",
      "termination_offboarding_history",
      "termination_offboardings",
      "termination_esocial_transmissions",
      "api_integration_request_histories",
      "api_integration_requests",
      "employee_benefits",
      "benefit_catalogs",
      "recruitment_candidates",
      "recruitment_vacancy_requests",
      "recruitment_candidate_evaluations",
      "recruitment_interviews",
      "recruitment_proposals",
      "vacation_requests",
      "vacation_request_periods",
      "vacation_esocial_transmissions",
      "vacation_balances",
      "occupational_health_epi_assignments",
      "occupational_health_epi_catalogs",
      "occupational_health_cats",
      "occupational_health_pcmsos",
      "occupational_health_pgrs",
      "occupational_health_asos",
      "occupational_health_exams",
      "occupational_health_risks",
      "occupational_health_environments",
      "rescission_documents",
      "rescission_calculations",
      "point_devices",
      "point_tolerance_rules",
      "point_holiday_calendars",
      "night_shift_allowance_items",
      "night_shift_allowance_calculations",
      "weekly_rest_allowance_items",
      "weekly_rest_allowance_calculations",
      "time_sheet_payroll_event_batch_items",
      "time_sheet_payroll_event_batches",
      "tenant_access",
      "admission_history",
      "admission_requests",
      "audit_events",
      "point_marks",
      "employees",
      "employee_dependents",
      "privacy_consents",
      "data_subject_requests",
      "persons",
      "companies",
      "tenants"
    RESTART IDENTITY CASCADE;
  `);
}

beforeEach(async () => {
  await resetDatabase();
});

afterEach(async () => {
  await resetDatabase();
});

test('slice relacional persists tenant, company, person, employee, point and audit', async () => {
  const store = new SliceStore();

  const tenant = await store.createTenant('Empresa Teste', 'empresa-teste');
  const company = await store.createCompany(tenant.id, 'Empresa Teste LTDA', 'Teste', '12345678000190');
  const person = await store.createPerson(tenant.id, 'Pessoa Teste', '12345678901');
  const employee = await store.createEmployee(tenant.id, company.id, person.id, 'E-001');
  const point = await store.recordPointMark(tenant.id, employee.id);
  const points = await store.listPointMarks(tenant.id);
  const receipt = await store.getPointMarkReceipt(tenant.id, point.id);
  const summary = await store.summary(tenant.id);
  const events = await store.listAuditEvents(tenant.id);

  assert.equal(summary.counts.companies, 1);
  assert.equal(summary.counts.persons, 1);
  assert.equal(summary.counts.employees, 1);
  assert.equal(summary.counts.pointMarks, 1);
  assert.equal(summary.counts.auditEvents, 6);
  assert.equal(summary.tenant.id, tenant.id);
  assert.equal(point.employeeId, employee.id);
  assert.equal(points.length, 1);
  assert.equal(receipt.pointMark.id, point.id);
  assert.equal(receipt.employee.id, employee.id);
  assert.equal(events.at(-1)?.action, 'point_mark.receipt.generated');

  await store.close();
});

test('slice relacional manages employee dependents with audit trail', async () => {
  const store = new SliceStore();

  const tenant = await store.createTenant('Empresa Dependentes', 'empresa-dependentes');
  const company = await store.createCompany(tenant.id, 'Empresa Dependentes LTDA', 'Dependentes', '99887766000155');
  const person = await store.createPerson(tenant.id, 'Pessoa Dependente', '32132132100');
  const employee = await store.createEmployee(tenant.id, company.id, person.id, 'DEP-001');

  const dependent = await store.createEmployeeDependent(
    tenant.id,
    employee.id,
    {
      fullName: 'Dependente Teste',
      cpf: '12312312300',
      birthDate: '2012-05-10T00:00:00.000Z',
      relationshipType: 'filho(a)',
      notes: 'Cadastro inicial',
    },
    'oidc-user-1',
  );

  const updated = await store.updateEmployeeDependent(
    tenant.id,
    employee.id,
    dependent.id,
    {
      fullName: 'Dependente Teste Atualizado',
      notes: 'Atualizado para validacao',
    },
    'oidc-user-1',
  );

  const inactive = await store.inactivateEmployeeDependent(tenant.id, employee.id, dependent.id, 'oidc-user-1');
  const dependents = await store.listEmployeeDependents(tenant.id, employee.id);
  const events = await store.listAuditEvents(tenant.id);

  assert.equal(dependents.length, 1);
  assert.equal(dependents[0]?.id, dependent.id);
  assert.equal(updated.fullName, 'Dependente Teste Atualizado');
  assert.equal(inactive.status, 'inactive');
  assert.equal(events.at(-1)?.action, 'dependent.inactivated');

  await store.close();
});

test('slice relacional manages lgpd consent and subject requests with audit trail', async () => {
  const store = new SliceStore();

  const tenant = await store.createTenant('Empresa LGPD', 'empresa-lgpd');
  const company = await store.createCompany(tenant.id, 'Empresa LGPD LTDA', 'LGPD', '11223344000166');
  const person = await store.createPerson(tenant.id, 'Pessoa LGPD', '98765432100');
  const employee = await store.createEmployee(tenant.id, company.id, person.id, 'LGPD-001');

  const consent = await store.createPrivacyConsent(
    tenant.id,
    {
      subjectType: 'employee',
      subjectId: employee.id,
      purpose: 'benefits administration',
      scope: 'health-plan-processing',
      status: 'accepted',
      expiresAt: '2027-01-01T00:00:00.000Z',
      notes: 'initial consent',
    },
    'oidc-subject-consent',
  );

  const consents = await store.listPrivacyConsents(tenant.id);
  const revoked = await store.revokePrivacyConsent(tenant.id, consent.id, 'oidc-subject-consent', 'revoked on request');
  const request = await store.createDataSubjectRequest(
    tenant.id,
    {
      subjectType: 'employee',
      subjectId: employee.id,
      requestType: 'access',
      notes: 'needs a copy of the stored personal data',
    },
    'oidc-subject-request',
  );
  const requests = await store.listDataSubjectRequests(tenant.id);
  const resolved = await store.resolveDataSubjectRequest(
    tenant.id,
    request.id,
    {
      status: 'completed',
      responseSummary: 'data export prepared and delivered',
      notes: 'request closed',
    },
    'oidc-subject-request',
  );
  const events = await store.listAuditEvents(tenant.id);

  assert.equal(consents.length, 1);
  assert.equal(consents[0]?.status, 'accepted');
  assert.equal(revoked.status, 'revoked');
  assert.equal(requests.length, 1);
  assert.equal(resolved.status, 'completed');
  assert.equal(resolved.responseSummary, 'data export prepared and delivered');
  assert.equal(events.at(-1)?.action, 'privacy.request.resolved');
  assert.equal(events.length, 8);

  await store.close();
});

test('slice relacional exposes tenant analytics overview for BI and LGPD', async () => {
  const store = new SliceStore();

  const tenant = await store.createTenant('Empresa BI', 'empresa-bi');
  const company = await store.createCompany(tenant.id, 'Empresa BI LTDA', 'BI', '77889900000144');
  const person = await store.createPerson(tenant.id, 'Pessoa BI', '40404040404');
  const employee = await store.createEmployee(tenant.id, company.id, person.id, 'BI-001');

  await store.recordPointMark(tenant.id, employee.id);
  await store.createAdmission(tenant.id, person.id, company.id, employee.id, 'oidc-user-1');

  const analytics = await store.analyticsOverview(tenant.id);

  assert.equal(analytics.counts.employees, 1);
  assert.equal(analytics.counts.pointMarks, 1);
  assert.equal(analytics.counts.admissions, 1);
  assert.equal(analytics.counts.openAdmissions, 1);
  assert.equal(analytics.signals.headcount, 1);
  assert.equal(analytics.signals.workflowPressure, 1);
  assert.equal(analytics.privacy.retentionModel, 'class-based');
  assert.ok(analytics.privacy.exportFormats.includes('json'));
  assert.equal(analytics.alerts[0]?.code, 'workflow-open-items');

  await store.close();
});

test('slice relacional manages ats vacancy requests and candidates', async () => {
  const store = new SliceStore();

  const tenant = await store.createTenant('Empresa ATS', 'empresa-ats');
  const company = await store.createCompany(tenant.id, 'Empresa ATS LTDA', 'ATS', '11223344000155');

  const vacancy = await store.createRecruitmentVacancyRequest(
    tenant.id,
    {
      companyId: company.id,
      code: 'VAG-001',
      title: 'Analista de RH',
      department: 'People',
      headcount: 2,
      notes: 'Vaga prioritaria',
    },
    'oidc-user-1',
  );

  const approved = await store.approveRecruitmentVacancyRequest(tenant.id, vacancy.id, 'oidc-user-1');
  const published = await store.publishRecruitmentVacancyRequest(tenant.id, vacancy.id, 'oidc-user-1');
  const candidate = await store.createRecruitmentCandidate(
    tenant.id,
    vacancy.id,
    {
      fullName: 'Candidato ATS',
      email: 'candidato@example.com',
      source: 'portal',
      notes: 'Primeira triagem',
    },
    'oidc-user-1',
  );
  const moved = await store.moveRecruitmentCandidate(
    tenant.id,
    candidate.id,
    {
      stage: 'interview',
      notes: 'Entrevista agendada',
    },
    'oidc-user-1',
  );

  const vacancies = await store.listRecruitmentVacancyRequests(tenant.id);
  const candidates = await store.listRecruitmentCandidates(tenant.id, vacancy.id);
  const events = await store.listAuditEvents(tenant.id);

  assert.equal(vacancy.status, 'draft');
  assert.equal(approved.status, 'approved');
  assert.equal(published.status, 'published');
  assert.equal(candidate.stage, 'applied');
  assert.equal(moved.stage, 'interview');
  assert.equal(vacancies.length, 1);
  assert.equal(candidates.length, 1);
  assert.equal(candidates[0]?.fullName, 'Candidato ATS');
  assert.equal(events.at(-1)?.action, 'recruitment.candidate.moved');

  await store.close();
});

test('slice relacional schedules interviews and records candidate evaluations', async () => {
  const store = new SliceStore();

  const tenant = await store.createTenant('Empresa ATS Entrevistas', 'empresa-ats-entrevistas');
  const company = await store.createCompany(tenant.id, 'Empresa ATS Entrevistas LTDA', 'ATS Entrevistas', '22334455000166');

  const vacancy = await store.createRecruitmentVacancyRequest(
    tenant.id,
    {
      companyId: company.id,
      code: 'VAG-ENT-001',
      title: 'Analista de Talent Acquisition',
      department: 'People',
      headcount: 1,
    },
    'oidc-user-1',
  );
  await store.approveRecruitmentVacancyRequest(tenant.id, vacancy.id, 'oidc-user-1');
  await store.publishRecruitmentVacancyRequest(tenant.id, vacancy.id, 'oidc-user-1');

  const candidate = await store.createRecruitmentCandidate(
    tenant.id,
    vacancy.id,
    {
      fullName: 'Candidato Entrevista',
      source: 'site',
      notes: 'Candidato inicial',
    },
    'oidc-user-1',
  );

  const interview = await store.scheduleRecruitmentInterview(
    tenant.id,
    vacancy.id,
    candidate.id,
    {
      scheduledAt: '2026-06-20T14:00:00.000Z',
      interviewerName: 'Gestor de RH',
      location: 'Sala 2',
      notes: 'Entrevista inicial',
    },
    'oidc-user-1',
  );

  const evaluation = await store.recordRecruitmentCandidateEvaluation(
    tenant.id,
    interview.id,
    {
      score: 88,
      recommendation: 'advance',
      evaluatorName: 'Gestor de RH',
      evaluatedAt: '2026-06-20T14:45:00.000Z',
      notes: 'Bom fit para a vaga',
    },
    'oidc-user-1',
  );

  const interviews = await store.listRecruitmentInterviews(tenant.id, vacancy.id);
  const evaluations = await store.listRecruitmentCandidateEvaluations(tenant.id, vacancy.id);
  const refreshedCandidates = await store.listRecruitmentCandidates(tenant.id, vacancy.id);
  const events = await store.listAuditEvents(tenant.id);

  assert.equal(interview.status, 'scheduled');
  assert.equal(evaluation.score, 88);
  assert.equal(evaluation.recommendation, 'advance');
  assert.equal(interviews.length, 1);
  assert.equal(interviews[0]?.status, 'completed');
  assert.equal(evaluations.length, 1);
  assert.equal(refreshedCandidates[0]?.stage, 'evaluated');
  assert.equal(events.at(-1)?.action, 'recruitment.candidate.evaluated');

  await store.close();
});

test('slice relacional creates proposals and converts them to pre-admission', async () => {
  const store = new SliceStore();

  const tenant = await store.createTenant('Empresa ATS Proposta', 'empresa-ats-proposta');
  const company = await store.createCompany(tenant.id, 'Empresa ATS Proposta LTDA', 'ATS Proposta', '55667788000199');

  const vacancy = await store.createRecruitmentVacancyRequest(
    tenant.id,
    {
      companyId: company.id,
      code: 'VAG-PROP-001',
      title: 'Coordenador de People',
      department: 'People',
      headcount: 1,
    },
    'oidc-user-1',
  );
  await store.approveRecruitmentVacancyRequest(tenant.id, vacancy.id, 'oidc-user-1');
  await store.publishRecruitmentVacancyRequest(tenant.id, vacancy.id, 'oidc-user-1');

  const candidate = await store.createRecruitmentCandidate(
    tenant.id,
    vacancy.id,
    {
      fullName: 'Candidato Proposta',
      source: 'referral',
      notes: 'Candidato finalista',
    },
    'oidc-user-1',
  );

  const proposal = await store.createRecruitmentProposal(
    tenant.id,
    vacancy.id,
    candidate.id,
    {
      salaryBaseCents: 1200000,
      startAt: '2026-07-01T00:00:00.000Z',
      notes: 'Proposta final',
    },
    'oidc-user-1',
  );

  const converted = await store.convertRecruitmentProposalToPreAdmission(
    tenant.id,
    proposal.id,
    {
      personCpf: '90909090909',
      employeeCode: 'ATS-001',
      effectiveFrom: '2026-07-01T00:00:00.000Z',
      notes: 'Conversao para pre-admissao',
    },
    'oidc-user-1',
  );

  const proposals = await store.listRecruitmentProposals(tenant.id, vacancy.id);
  const admissions = await store.listAdmissions(tenant.id);
  const events = await store.listAuditEvents(tenant.id);

  assert.equal(proposal.status, 'proposed');
  assert.equal(converted.proposal.status, 'converted');
  assert.equal(converted.admission.status, 'draft');
  assert.equal(converted.admission.sourceCandidateId, candidate.id);
  assert.equal(converted.person.fullName, 'Candidato Proposta');
  assert.equal(converted.employee.code, 'ATS-001');
  assert.equal(proposals.length, 1);
  assert.equal(admissions.length, 1);
  assert.equal(admissions[0]?.sourceProposalId, proposal.id);
  assert.equal(events.at(-1)?.action, 'recruitment.proposal.converted');

  await store.close();
});

test('slice relacional manages benefit catalog and employee assignments', async () => {
  const store = new SliceStore();

  const tenant = await store.createTenant('Empresa Beneficios', 'empresa-beneficios');
  const company = await store.createCompany(tenant.id, 'Empresa Beneficios LTDA', 'Beneficios', '99001122000133');
  const person = await store.createPerson(tenant.id, 'Pessoa Beneficios', '50505050505');
  const employee = await store.createEmployee(tenant.id, company.id, person.id, 'BEN-001');

  const catalog = await store.createBenefitCatalog(
    tenant.id,
    'VT-001',
    'Vale-transporte',
    'transport',
    'oidc-user-1',
    'Beneficio de deslocamento',
  );
  const granted = await store.grantBenefitToEmployee(
    tenant.id,
    employee.id,
    catalog.id,
    'oidc-user-1',
    'Concessao inicial',
    '2026-06-01T00:00:00.000Z',
  );
  const suspended = await store.suspendEmployeeBenefit(tenant.id, granted.id, 'oidc-user-1', 'Pausa temporaria');
  const cancelled = await store.cancelEmployeeBenefit(tenant.id, granted.id, 'oidc-user-1', 'Encerramento definitivo');
  const catalogs = await store.listBenefitCatalogs(tenant.id);
  const benefits = await store.listEmployeeBenefits(tenant.id, employee.id);
  const events = await store.listAuditEvents(tenant.id);

  assert.equal(catalog.code, 'VT-001');
  assert.equal(granted.status, 'active');
  assert.equal(suspended.status, 'suspended');
  assert.equal(cancelled.status, 'cancelled');
  assert.equal(catalogs.length, 1);
  assert.equal(benefits.length, 1);
  assert.equal(benefits[0]?.benefitCatalog?.name, 'Vale-transporte');
  assert.equal(events.at(-1)?.action, 'benefit.cancelled');

  await store.close();
});

test('slice relacional manages occupational health environments and risks', async () => {
  const store = new SliceStore();

  const tenant = await store.createTenant('Empresa SST', 'empresa-sst');
  const company = await store.createCompany(tenant.id, 'Empresa SST LTDA', 'SST', '88990011000122');

  const environment = await store.createOccupationalHealthEnvironment(
    tenant.id,
    {
      companyId: company.id,
      code: 'ENV-001',
      name: 'Linha de produção',
      sector: 'Operações',
      active: true,
      validFrom: '2026-01-01T00:00:00.000Z',
      notes: 'Ambiente industrial inicial',
    },
    'oidc-user-1',
  );
  const risk = await store.createOccupationalHealthRisk(
    tenant.id,
    environment.id,
    {
      code: 'RISK-001',
      name: 'Ruído contínuo',
      severity: 'high',
      probability: 'medium',
      controlMeasure: 'Uso de protetor auricular',
      active: true,
      validFrom: '2026-01-01T00:00:00.000Z',
      notes: 'Risco mapeado no ambiente principal',
    },
    'oidc-user-1',
  );
  const environments = await store.listOccupationalHealthEnvironments(tenant.id);
  const risks = await store.listOccupationalHealthRisks(tenant.id, environment.id);
  const events = await store.listAuditEvents(tenant.id);

  assert.equal(environments.length, 1);
  assert.equal(environments[0]?.code, 'ENV-001');
  assert.equal(environments[0]?.companyId, company.id);
  assert.equal(risk.severity, 'high');
  assert.equal(risks.length, 1);
  assert.equal(risks[0]?.controlMeasure, 'Uso de protetor auricular');
  assert.equal(events.at(-1)?.action, 'occupational_health.risk.created');

  await store.close();
});

test('slice relacional manages occupational health programs', async () => {
  const store = new SliceStore();

  const tenant = await store.createTenant('Empresa PGR', 'empresa-pgr');
  const company = await store.createCompany(tenant.id, 'Empresa PGR LTDA', 'PGR', '22334455000166');

  const pgr = await store.createOccupationalHealthPgr(
    tenant.id,
    {
      companyId: company.id,
      code: 'PGR-001',
      title: 'Programa de Gerenciamento de Riscos',
      status: 'active',
      validFrom: '2026-01-01T00:00:00.000Z',
      notes: 'Primeira versao do programa',
    },
    'oidc-user-1',
  );
  const pcmso = await store.createOccupationalHealthPcmso(
    tenant.id,
    {
      companyId: company.id,
      code: 'PCMSO-001',
      title: 'Programa de Controle Medico de Saude Ocupacional',
      status: 'active',
      validFrom: '2026-01-01T00:00:00.000Z',
      notes: 'Primeira versao do programa medico',
    },
    'oidc-user-1',
  );
  const pgrs = await store.listOccupationalHealthPgrs(tenant.id);
  const pcmsos = await store.listOccupationalHealthPcmsos(tenant.id);
  const events = await store.listAuditEvents(tenant.id);

  assert.equal(pgr.code, 'PGR-001');
  assert.equal(pcmso.code, 'PCMSO-001');
  assert.equal(pgrs.length, 1);
  assert.equal(pcmsos.length, 1);
  assert.equal(events.at(-1)?.action, 'occupational_health.pcmso.created');

  await store.close();
});

test('slice relacional manages occupational health cats and epi', async () => {
  const store = new SliceStore();

  const tenant = await store.createTenant('Empresa CAT EPI', 'empresa-cat-epi');
  const company = await store.createCompany(tenant.id, 'Empresa CAT EPI LTDA', 'CATEPI', '33445566000177');
  const person = await store.createPerson(tenant.id, 'Pessoa CAT EPI', '80808080808');
  const employee = await store.createEmployee(tenant.id, company.id, person.id, 'CAT-001');

  const cat = await store.createOccupationalHealthCat(
    tenant.id,
    {
      companyId: company.id,
      employeeId: employee.id,
      reportNumber: 'CAT-001',
      accidentType: 'work_accident',
      occurredAt: '2026-03-01T08:15:00.000Z',
      status: 'open',
      description: 'Queda no posto de trabalho',
      notifiedAt: '2026-03-01T10:00:00.000Z',
      notes: 'Registro inicial',
    },
    'oidc-user-1',
  );

  const epiCatalog = await store.createOccupationalHealthEpiCatalog(
    tenant.id,
    {
      companyId: company.id,
      code: 'EPI-001',
      name: 'Capacete de seguranca',
      active: true,
      validFrom: '2026-01-01T00:00:00.000Z',
      notes: 'Uso obrigatorio na area operacional',
    },
    'oidc-user-1',
  );

  const updatedEpiCatalog = await store.updateOccupationalHealthEpiCatalog(
    tenant.id,
    epiCatalog.id,
    {
      name: 'Capacete de seguranca revisado',
      active: false,
      validUntil: '2026-12-31T00:00:00.000Z',
      notes: 'Uso obrigatorio revisado',
    },
    'oidc-user-1',
  );

  const epiAssignment = await store.deliverOccupationalHealthEpi(
    tenant.id,
    {
      employeeId: employee.id,
      epiCatalogId: epiCatalog.id,
      deliveredAt: '2026-03-01T09:00:00.000Z',
      status: 'delivered',
      receivedBy: 'Colaborador',
      notes: 'Entrega com ciencia',
    },
    'oidc-user-1',
  );

  const cats = await store.listOccupationalHealthCats(tenant.id);
  const epiCatalogs = await store.listOccupationalHealthEpiCatalogs(tenant.id);
  const epiAssignments = await store.listOccupationalHealthEpiAssignments(tenant.id);
  const events = await store.listAuditEvents(tenant.id);

  assert.equal(cat.reportNumber, 'CAT-001');
  assert.equal(epiCatalog.code, 'EPI-001');
  assert.equal(updatedEpiCatalog.name, 'Capacete de seguranca revisado');
  assert.equal(epiAssignment.epiCatalogId, epiCatalog.id);
  assert.equal(cats.length, 1);
  assert.equal(epiCatalogs.length, 1);
  assert.equal(epiCatalogs[0]?.active, false);
  assert.equal(epiAssignments.length, 1);
  assert.equal(events.at(-1)?.action, 'occupational_health.epi.delivered');

  await store.close();
});

test('slice relacional manages occupational health exams and aso', async () => {
  const store = new SliceStore();

  const tenant = await store.createTenant('Empresa ASO', 'empresa-aso');
  const company = await store.createCompany(tenant.id, 'Empresa ASO LTDA', 'ASO', '77889900000144');
  const person = await store.createPerson(tenant.id, 'Pessoa ASO', '70707070707');
  const employee = await store.createEmployee(tenant.id, company.id, person.id, 'ASO-001');
  const environment = await store.createOccupationalHealthEnvironment(
    tenant.id,
    {
      companyId: company.id,
      code: 'ENV-010',
      name: 'Posto administrativo',
      sector: 'Administrativo',
      active: true,
      validFrom: '2026-01-01T00:00:00.000Z',
      notes: 'Ambiente para exames admissionais',
    },
    'oidc-user-1',
  );

  const exam = await store.createOccupationalHealthExam(
    tenant.id,
    {
      employeeId: employee.id,
      environmentId: environment.id,
      examType: 'admission',
      status: 'performed',
      scheduledAt: '2026-02-01T08:00:00.000Z',
      performedAt: '2026-02-01T08:30:00.000Z',
      result: 'fit',
      expiresAt: '2026-08-01T00:00:00.000Z',
      notes: 'Exame admissional concluido',
    },
    'oidc-user-1',
  );

  const updatedExam = await store.updateOccupationalHealthExam(
    tenant.id,
    exam.id,
    {
      result: 'fit with restrictions',
      notes: 'Exame admissional atualizado',
    },
    'oidc-user-1',
  );

  const aso = await store.issueOccupationalHealthAso(
    tenant.id,
    exam.id,
    {
      result: 'fit',
      issuer: 'Medico do trabalho',
      issuedAt: '2026-02-01T09:00:00.000Z',
      notes: 'ASO admissional emitido',
    },
    'oidc-user-1',
  );

  const exams = await store.listOccupationalHealthExams(tenant.id);
  const fetchedAso = await store.getOccupationalHealthAso(tenant.id, exam.id);
  const events = await store.listAuditEvents(tenant.id);

  assert.equal(exams.length, 1);
  assert.equal(exams[0]?.examType, 'admission');
  assert.equal(exams[0]?.result, 'fit with restrictions');
  assert.equal(exams[0]?.aso?.result, 'fit');
  assert.equal(updatedExam.result, 'fit with restrictions');
  assert.equal(aso.issuer, 'Medico do trabalho');
  assert.equal(fetchedAso.examId, exam.id);
  assert.equal(events.at(-1)?.action, 'occupational_health.aso.issued');

  await store.close();
});

test('slice relacional queues occupational health esocial transmissions', async () => {
  const store = new SliceStore();

  const tenant = await store.createTenant('Empresa SST Esocial', 'empresa-sst-esocial');
  const company = await store.createCompany(tenant.id, 'Empresa SST Esocial LTDA', 'SSTE', '99001122000166');
  const person = await store.createPerson(tenant.id, 'Pessoa SST Esocial', '50505050505');
  const employee = await store.createEmployee(tenant.id, company.id, person.id, 'SST-001');

  const environment = await store.createOccupationalHealthEnvironment(
    tenant.id,
    {
      companyId: company.id,
      code: 'ENV-ES-001',
      name: 'Ambiente eSocial',
      sector: 'Operacoes',
      active: true,
      validFrom: '2026-01-01T00:00:00.000Z',
      notes: 'Ambiente para S-2240',
    },
    'oidc-user-1',
  );
  await store.createOccupationalHealthRisk(
    tenant.id,
    environment.id,
    {
      code: 'RISK-ES-001',
      name: 'Calor',
      severity: 'medium',
      probability: 'medium',
      controlMeasure: 'Ventilacao',
      active: true,
      validFrom: '2026-01-01T00:00:00.000Z',
      notes: 'Risco base para eSocial',
    },
    'oidc-user-1',
  );
  const cat = await store.createOccupationalHealthCat(
    tenant.id,
    {
      companyId: company.id,
      employeeId: employee.id,
      reportNumber: 'CAT-ES-001',
      accidentType: 'work_accident',
      occurredAt: '2026-03-02T08:15:00.000Z',
      status: 'open',
      description: 'Evento de teste para S-2210',
      notifiedAt: '2026-03-02T09:00:00.000Z',
      notes: 'CAT de teste',
    },
    'oidc-user-1',
  );
  const exam = await store.createOccupationalHealthExam(
    tenant.id,
    {
      employeeId: employee.id,
      environmentId: environment.id,
      examType: 'periodic',
      status: 'performed',
      scheduledAt: '2026-03-03T08:00:00.000Z',
      performedAt: '2026-03-03T08:30:00.000Z',
      result: 'fit',
      expiresAt: '2026-09-03T00:00:00.000Z',
      notes: 'Exame de teste para S-2220',
    },
    'oidc-user-1',
  );
  await store.issueOccupationalHealthAso(
    tenant.id,
    exam.id,
    {
      result: 'fit',
      issuer: 'Medico do trabalho',
      issuedAt: '2026-03-03T09:00:00.000Z',
      notes: 'ASO de teste',
    },
    'oidc-user-1',
  );

  const environmentTransmission = await store.queueOccupationalHealthEsocialTransmission(
    tenant.id,
    'environment',
    environment.id,
    'S-2240',
    'oidc-user-1',
    'Envio ambiental',
  );
  const catTransmission = await store.queueOccupationalHealthEsocialTransmission(
    tenant.id,
    'cat',
    cat.id,
    'S-2210',
    'oidc-user-1',
    'Envio CAT',
  );
  const examTransmission = await store.queueOccupationalHealthEsocialTransmission(
    tenant.id,
    'exam',
    exam.id,
    'S-2220',
    'oidc-user-1',
    'Envio exame',
  );

  const environmentList = await store.listOccupationalHealthEsocialTransmissions(tenant.id, 'environment', environment.id);
  const catList = await store.listOccupationalHealthEsocialTransmissions(tenant.id, 'cat', cat.id);
  const examList = await store.listOccupationalHealthEsocialTransmissions(tenant.id, 'exam', exam.id);
  const failed = await store.markOccupationalHealthEsocialTransmissionFailed(catTransmission.id, 'Falha simulada');
  const requeued = await store.retryOccupationalHealthEsocialTransmission(tenant.id, catTransmission.id, 'oidc-user-1', 'Reenvio');
  await store.markOccupationalHealthEsocialTransmissionFailed(environmentTransmission.id, 'Falha para rota incorreta');
  await assert.rejects(
    () =>
      store.retryOccupationalHealthEsocialTransmission(
        tenant.id,
        environmentTransmission.id,
        'oidc-user-1',
        'Reenvio incorreto',
        'cat',
        cat.id,
      ),
    /not found for cat/,
  );
  const events = await store.listAuditEvents(tenant.id);

  assert.equal(environmentTransmission.eventCode, 'S-2240');
  assert.equal(catTransmission.eventCode, 'S-2210');
  assert.equal(examTransmission.eventCode, 'S-2220');
  assert.equal(environmentList.length, 1);
  assert.equal(catList.length, 1);
  assert.equal(examList.length, 1);
  assert.equal(failed.status, 'failed');
  assert.equal(requeued.status, 'queued');
  assert.equal(events.at(-1)?.action, 'occupational_health.esocial.requeued');

  await store.close();
});

test('slice relacional manages occupational health training catalogs and assignments', async () => {
  const store = new SliceStore();

  const tenant = await store.createTenant('Empresa Treinamento SST', 'empresa-treinamento-sst');
  const company = await store.createCompany(tenant.id, 'Empresa Treinamento SST LTDA', 'TSST', '55001122000166');
  const person = await store.createPerson(tenant.id, 'Pessoa Treinamento SST', '40404040404');
  const employee = await store.createEmployee(tenant.id, company.id, person.id, 'TRN-001');

  const catalog = await store.createOccupationalHealthTrainingCatalog(
    tenant.id,
    {
      companyId: company.id,
      code: 'TRN-001',
      title: 'Treinamento de seguranca operacional',
      description: 'Treinamento basico de SST',
      mandatory: true,
      active: true,
      validFrom: '2026-01-01T00:00:00.000Z',
      notes: 'Treinamento inicial',
    },
    'oidc-user-1',
  );

  const updatedCatalog = await store.updateOccupationalHealthTrainingCatalog(
    tenant.id,
    catalog.id,
    {
      title: 'Treinamento de seguranca operacional revisado',
      description: 'Treinamento basico de SST atualizado',
      active: false,
      notes: 'Treinamento inicial revisado',
    },
    'oidc-user-1',
  );

  const assignment = await store.assignOccupationalHealthTraining(
    tenant.id,
    {
      employeeId: employee.id,
      trainingCatalogId: catalog.id,
      dueAt: '2026-03-15T00:00:00.000Z',
      expiresAt: '2026-09-15T00:00:00.000Z',
      score: 95,
      notes: 'Atribuicao inicial',
    },
    'oidc-user-1',
  );

  const catalogs = await store.listOccupationalHealthTrainingCatalogs(tenant.id);
  const assignments = await store.listOccupationalHealthTrainingAssignments(tenant.id);
  const completed = await store.completeOccupationalHealthTrainingAssignment(
    tenant.id,
    assignment.id,
    {
      completedAt: '2026-03-10T10:00:00.000Z',
      score: 97,
      notes: 'Conclusao validada',
    },
    'oidc-user-1',
  );
  const events = await store.listAuditEvents(tenant.id);

  assert.equal(catalog.code, 'TRN-001');
  assert.equal(updatedCatalog.title, 'Treinamento de seguranca operacional revisado');
  assert.equal(assignment.status, 'assigned');
  assert.equal(catalogs.length, 1);
  assert.equal(catalogs[0]?.active, false);
  assert.equal(assignments.length, 1);
  assert.equal(completed.status, 'completed');
  assert.equal(completed.completedBy, 'oidc-user-1');
  assert.equal(events.at(-1)?.action, 'occupational_health.training.completed');

  await store.close();
});

test('slice relacional manages vacation balance and request lifecycle', async () => {
  const store = new SliceStore();

  const tenant = await store.createTenant('Empresa Ferias', 'empresa-ferias');
  const company = await store.createCompany(tenant.id, 'Empresa Ferias LTDA', 'Ferias', '66001122000177');
  const person = await store.createPerson(tenant.id, 'Pessoa Ferias', '60606060606');
  const employee = await store.createEmployee(tenant.id, company.id, person.id, 'FER-001');

  const balance = await store.createVacationBalance(
    tenant.id,
    employee.id,
    'oidc-user-1',
    'Periodo anual',
    '2026-01-01T00:00:00.000Z',
    '2026-12-31T23:59:59.000Z',
    30,
  );
  const request = await store.requestVacation(
    tenant.id,
    employee.id,
    balance.id,
    '2027-01-01T00:00:00.000Z',
    '2027-01-10T00:00:00.000Z',
    'oidc-user-1',
    'Ferias programadas',
  );
  const approved = await store.approveVacationRequest(tenant.id, request.id, 'oidc-user-1', 'Aprovado');
  await assert.rejects(
    store.requestVacation(
      tenant.id,
      employee.id,
      balance.id,
      '2027-01-05T00:00:00.000Z',
      '2027-01-08T00:00:00.000Z',
      'oidc-user-1',
      'Conflito de agenda',
    ),
    /overlaps with the requested period/,
  );
  const cancelled = await store.cancelVacationRequest(tenant.id, request.id, 'oidc-user-1', 'Reprogramacao');
  const balances = await store.listVacationBalances(tenant.id, employee.id);
  const requests = await store.listVacationRequests(tenant.id, employee.id);
  const events = await store.listAuditEvents(tenant.id);

  assert.equal(balance.status, 'open');
  assert.equal(request.requestedDays, 10);
  assert.equal(balance.concessiveStart, '2027-01-01T00:00:00.000Z');
  assert.equal(balance.concessiveEnd, '2027-12-31T23:59:59.999Z');
  assert.equal(balance.concessiveStatus, 'open');
  assert.equal(balance.canScheduleVacation, true);
  assert.equal(approved.status, 'approved');
  assert.equal(cancelled.status, 'cancelled');
  assert.equal(balances[0]?.availableDays, 30);
  assert.equal(requests.length, 1);
  assert.equal(events.at(-1)?.action, 'vacation.cancelled');

  await store.close();
});

test('slice relacional issues vacation notice and payment after approval', async () => {
  const store = new SliceStore();

  const tenant = await store.createTenant('Empresa Ferias Pagamento', 'empresa-ferias-pagamento');
  const company = await store.createCompany(tenant.id, 'Empresa Ferias Pagamento LTDA', 'Ferias', '66001122000179');
  const person = await store.createPerson(tenant.id, 'Pessoa Ferias Pagamento', '60606060608');
  const employee = await store.createEmployee(tenant.id, company.id, person.id, 'FER-003');

  const balance = await store.createVacationBalance(
    tenant.id,
    employee.id,
    'oidc-user-1',
    'Periodo anual',
    '2026-01-01T00:00:00.000Z',
    '2026-12-31T23:59:59.000Z',
    30,
  );
  const request = await store.requestVacation(
    tenant.id,
    employee.id,
    balance.id,
    '2027-01-15T00:00:00.000Z',
    '2027-01-24T00:00:00.000Z',
    'oidc-user-1',
    'Ferias com aviso e pagamento',
  );
  const approved = await store.approveVacationRequest(tenant.id, request.id, 'oidc-user-1', 'Aprovado');
  const notified = await store.issueVacationNotice(tenant.id, request.id, 'oidc-user-1', 'Aviso formal');
  const paid = await store.markVacationPayment(tenant.id, request.id, 'oidc-user-1', 'Pagamento concluido');
  const requests = await store.listVacationRequests(tenant.id, employee.id);
  const events = await store.listAuditEvents(tenant.id);

  assert.equal(approved.status, 'approved');
  assert.equal(notified.status, 'notified');
  assert.equal(paid.status, 'paid');
  assert.ok(notified.noticeIssuedAt);
  assert.ok(notified.noticeProtocol);
  assert.equal(notified.paymentDueAt, '2027-01-13T00:00:00.000Z');
  assert.ok(paid.paidAt);
  assert.equal(paid.paidBy, 'oidc-user-1');
  assert.equal(requests[0]?.status, 'paid');
  assert.equal(events.at(-1)?.action, 'vacation.paid');

  await store.close();
});

test('slice relacional integrates paid vacation with payroll batch', async () => {
  const store = new SliceStore();

  const tenant = await store.createTenant('Empresa Ferias Folha', 'empresa-ferias-folha');
  const company = await store.createCompany(tenant.id, 'Empresa Ferias Folha LTDA', 'Ferias', '66001122000181');
  const person = await store.createPerson(tenant.id, 'Pessoa Ferias Folha', '60606060610');
  const employee = await store.createEmployee(tenant.id, company.id, person.id, 'FER-005');

  const balance = await store.createVacationBalance(
    tenant.id,
    employee.id,
    'oidc-user-1',
    'Periodo anual',
    '2026-01-01T00:00:00.000Z',
    '2026-12-31T23:59:59.000Z',
    30,
  );
  const request = await store.requestVacation(
    tenant.id,
    employee.id,
    balance.id,
    '2027-03-01T00:00:00.000Z',
    '2027-03-10T00:00:00.000Z',
    'oidc-user-1',
    'Ferias para folha',
    {
      salaryBaseCents: 300000,
    },
  );
  await store.approveVacationRequest(tenant.id, request.id, 'oidc-user-1', 'Aprovado');
  await store.issueVacationNotice(tenant.id, request.id, 'oidc-user-1', 'Aviso formal');
  await store.markVacationPayment(tenant.id, request.id, 'oidc-user-1', 'Pagamento concluido');
  const integrated = await store.sendVacationRequestToPayroll(tenant.id, request.id, 'oidc-user-1', 'Envio para folha');
  const events = await store.listAuditEvents(tenant.id);

  assert.equal(integrated.payrollStatus, 'sent');
  assert.ok(integrated.payrollBatchId);
  assert.ok(integrated.payrollReceiptNumber);
  assert.equal(events.at(-1)?.action, 'vacation.sent_to_payroll');

  await store.close();
});

test('slice relacional queues vacation esocial transmission', async () => {
  const store = new SliceStore();

  const tenant = await store.createTenant('Empresa Ferias Esocial', 'empresa-ferias-esocial');
  const company = await store.createCompany(tenant.id, 'Empresa Ferias Esocial LTDA', 'Ferias', '66001122000182');
  const person = await store.createPerson(tenant.id, 'Pessoa Ferias Esocial', '60606060611');
  const employee = await store.createEmployee(tenant.id, company.id, person.id, 'FER-006');

  const balance = await store.createVacationBalance(
    tenant.id,
    employee.id,
    'oidc-user-1',
    'Periodo anual',
    '2026-01-01T00:00:00.000Z',
    '2026-12-31T23:59:59.000Z',
    30,
  );
  const request = await store.requestVacation(
    tenant.id,
    employee.id,
    balance.id,
    '2027-04-01T00:00:00.000Z',
    '2027-04-10T00:00:00.000Z',
    'oidc-user-1',
    'Ferias para eSocial',
    {
      salaryBaseCents: 300000,
    },
  );
  await store.approveVacationRequest(tenant.id, request.id, 'oidc-user-1', 'Aprovado');
  await store.issueVacationNotice(tenant.id, request.id, 'oidc-user-1', 'Aviso formal');
  await store.markVacationPayment(tenant.id, request.id, 'oidc-user-1', 'Pagamento concluido');
  const queued = await store.queueVacationEsocialTransmission(tenant.id, request.id, 'S-2230', 'oidc-user-1', 'Envio para eSocial');
  const transmissions = await store.listVacationEsocialTransmissions(tenant.id, request.id);
  const events = await store.listAuditEvents(tenant.id);

  assert.equal(queued.eventCode, 'S-2230');
  assert.equal(queued.status, 'queued');
  assert.equal(transmissions.length, 1);
  assert.equal(transmissions[0]?.id, queued.id);
  assert.equal(events.at(-1)?.action, 'vacation.esocial.queued');

  await store.close();
});

test('slice relacional handles vacation fracionamento and abono pecuniario', async () => {
  const store = new SliceStore();

  const tenant = await store.createTenant('Empresa Ferias Fracionadas', 'empresa-ferias-fracionadas');
  const company = await store.createCompany(tenant.id, 'Empresa Ferias Fracionadas LTDA', 'Ferias', '66001122000180');
  const person = await store.createPerson(tenant.id, 'Pessoa Ferias Fracionadas', '60606060609');
  const employee = await store.createEmployee(tenant.id, company.id, person.id, 'FER-004');

  const balance = await store.createVacationBalance(
    tenant.id,
    employee.id,
    'oidc-user-1',
    'Periodo anual',
    '2026-01-01T00:00:00.000Z',
    '2026-12-31T23:59:59.000Z',
    30,
  );
  const request = await store.requestVacation(
    tenant.id,
    employee.id,
    balance.id,
    '2027-01-01T00:00:00.000Z',
    '2027-01-20T00:00:00.000Z',
    'oidc-user-1',
    'Ferias fracionadas com abono',
    {
      periods: [
        { plannedStart: '2027-01-01T00:00:00.000Z', plannedEnd: '2027-01-14T00:00:00.000Z' },
        { plannedStart: '2027-01-17T00:00:00.000Z', plannedEnd: '2027-01-22T00:00:00.000Z' },
      ],
      abonoDays: 10,
      salaryBaseCents: 300000,
    },
  );
  const approved = await store.approveVacationRequest(tenant.id, request.id, 'oidc-user-1', 'Aprovado');
  const requests = await store.listVacationRequests(tenant.id, employee.id);

  assert.equal(request.requestedDays, 20);
  assert.equal(request.consumedDays, 30);
  assert.equal(request.abonoDays, 10);
  assert.equal(request.vacationAmountCents, 266666);
  assert.equal(request.abonoAmountCents, 100000);
  assert.equal(request.periods.length, 2);
  assert.equal(request.periods[0]?.requestedDays, 14);
  assert.equal(request.periods[1]?.requestedDays, 6);
  assert.equal(approved.balance?.availableDays, 0);
  assert.equal(requests[0]?.periods.length, 2);

  await store.close();
});

test('slice relacional blocks vacation requests outside the concessive window', async () => {
  const store = new SliceStore();

  const tenant = await store.createTenant('Empresa Ferias Janela', 'empresa-ferias-janela');
  const company = await store.createCompany(tenant.id, 'Empresa Ferias Janela LTDA', 'Ferias', '66001122000178');
  const person = await store.createPerson(tenant.id, 'Pessoa Ferias Janela', '60606060607');
  const employee = await store.createEmployee(tenant.id, company.id, person.id, 'FER-002');

  const balance = await store.createVacationBalance(
    tenant.id,
    employee.id,
    'oidc-user-1',
    'Periodo anual',
    '2026-01-01T00:00:00.000Z',
    '2026-12-31T23:59:59.000Z',
    30,
  );

  await assert.rejects(
    store.requestVacation(
      tenant.id,
      employee.id,
      balance.id,
      '2026-07-01T00:00:00.000Z',
      '2026-07-10T00:00:00.000Z',
      'oidc-user-1',
      'Solicitacao fora da janela',
    ),
    /starts before the concessive window opens/,
  );

  await store.close();
});

test('slice relacional persists point governance configuration', async () => {
  const store = new SliceStore();

  const tenant = await store.createTenant('Empresa Ponto', 'empresa-ponto');
  const company = await store.createCompany(tenant.id, 'Empresa Ponto LTDA', 'Ponto', '11223344000155');

  const holiday = await store.createPointHolidayCalendar(
    tenant.id,
    {
      companyId: company.id,
      locale: 'SP',
      title: 'Feriado municipal',
      isNational: false,
      validFrom: '2026-01-01T00:00:00.000Z',
      validUntil: '2026-12-31T23:59:59.000Z',
      notes: 'Calendario local versionado',
    },
    'oidc-user-1',
  );
  const tolerance = await store.createPointToleranceRule(
    tenant.id,
    {
      companyId: company.id,
      profile: 'operacional',
      jornada: '44h',
      toleranceMinutes: 10,
      validFrom: '2026-01-01T00:00:00.000Z',
      notes: 'Tolerancia por jornada',
    },
    'oidc-user-1',
  );
  const device = await store.createPointDevice(
    tenant.id,
    {
      companyId: company.id,
      label: 'Relogio da portaria',
      deviceType: 'terminal',
      supportsOffline: true,
      supportsBiometrics: true,
      supportsGeo: false,
      notes: 'Dispositivo principal',
    },
    'oidc-user-1',
  );

  const updatedHoliday = await store.updatePointHolidayCalendar(
    tenant.id,
    holiday.id,
    {
      title: 'Feriado municipal atualizado',
      isNational: true,
      notes: 'Calendario local ajustado',
    },
    'oidc-user-1',
  );
  const updatedTolerance = await store.updatePointToleranceRule(
    tenant.id,
    tolerance.id,
    {
      toleranceMinutes: 15,
      notes: 'Tolerancia ajustada',
    },
    'oidc-user-1',
  );
  const updatedDevice = await store.updatePointDevice(
    tenant.id,
    device.id,
    {
      status: 'maintenance',
      supportsGeo: true,
      notes: 'Dispositivo em manutencao',
    },
    'oidc-user-1',
  );

  const holidays = await store.listPointHolidayCalendars(tenant.id);
  const tolerances = await store.listPointToleranceRules(tenant.id);
  const devices = await store.listPointDevices(tenant.id);
  const events = await store.listAuditEvents(tenant.id);

  assert.equal(updatedHoliday.title, 'Feriado municipal atualizado');
  assert.equal(updatedHoliday.isNational, true);
  assert.equal(updatedTolerance.toleranceMinutes, 15);
  assert.equal(updatedDevice.status, 'maintenance');
  assert.equal(updatedDevice.supportsGeo, true);
  assert.equal(holidays.length, 1);
  assert.equal(tolerances.length, 1);
  assert.equal(devices.length, 1);
  assert.equal(events.at(-1)?.action, 'point.device.updated');

  await store.close();
});

test('slice relacional updates occupational health environment and risk', async () => {
  const store = new SliceStore();

  const tenant = await store.createTenant('Empresa SST', 'empresa-sst');
  const company = await store.createCompany(tenant.id, 'Empresa SST LTDA', 'SST', '66554433000122');

  const environment = await store.createOccupationalHealthEnvironment(
    tenant.id,
    {
      companyId: company.id,
      code: 'ENV-01',
      name: 'Ambiente industrial',
      sector: 'produção',
      active: true,
      validFrom: '2026-01-01T00:00:00.000Z',
      notes: 'Ambiente inicial',
    },
    'oidc-user-1',
  );
  const risk = await store.createOccupationalHealthRisk(
    tenant.id,
    environment.id,
    {
      code: 'R-01',
      name: 'Ruído',
      severity: 'medium',
      probability: 'medium',
      controlMeasure: 'Protetor auricular',
      validFrom: '2026-01-01T00:00:00.000Z',
      notes: 'Risco inicial',
    },
    'oidc-user-1',
  );

  const updatedEnvironment = await store.updateOccupationalHealthEnvironment(
    tenant.id,
    environment.id,
    {
      name: 'Ambiente industrial atualizado',
      active: false,
      notes: 'Ambiente revisado',
    },
    'oidc-user-1',
  );
  const updatedRisk = await store.updateOccupationalHealthRisk(
    tenant.id,
    environment.id,
    risk.id,
    {
      severity: 'high',
      probability: 'low',
      controlMeasure: 'Barreira acústica',
      notes: 'Risco revisado',
    },
    'oidc-user-1',
  );

  const environments = await store.listOccupationalHealthEnvironments(tenant.id);
  const risks = await store.listOccupationalHealthRisks(tenant.id, environment.id);
  const events = await store.listAuditEvents(tenant.id);

  assert.equal(updatedEnvironment.name, 'Ambiente industrial atualizado');
  assert.equal(updatedEnvironment.active, false);
  assert.equal(updatedRisk.severity, 'high');
  assert.equal(updatedRisk.probability, 'low');
  assert.equal(environments.length, 1);
  assert.equal(risks.length, 1);
  assert.equal(events.at(-1)?.action, 'occupational_health.risk.updated');

  await store.close();
});

test('slice relacional updates occupational health pgr and pcmso', async () => {
  const store = new SliceStore();

  const tenant = await store.createTenant('Empresa Programas', 'empresa-programas');
  const company = await store.createCompany(tenant.id, 'Empresa Programas LTDA', 'Programas', '77889900000144');

  const pgr = await store.createOccupationalHealthPgr(
    tenant.id,
    {
      companyId: company.id,
      code: 'PGR-01',
      title: 'PGR inicial',
      status: 'draft',
      validFrom: '2026-01-01T00:00:00.000Z',
      notes: 'PGR inicial',
    },
    'oidc-user-1',
  );
  const pcmso = await store.createOccupationalHealthPcmso(
    tenant.id,
    {
      companyId: company.id,
      code: 'PCMSO-01',
      title: 'PCMSO inicial',
      status: 'draft',
      validFrom: '2026-01-01T00:00:00.000Z',
      notes: 'PCMSO inicial',
    },
    'oidc-user-1',
  );

  const updatedPgr = await store.updateOccupationalHealthPgr(
    tenant.id,
    pgr.id,
    {
      title: 'PGR atualizado',
      status: 'published',
      notes: 'PGR revisado',
    },
    'oidc-user-1',
  );
  const updatedPcmso = await store.updateOccupationalHealthPcmso(
    tenant.id,
    pcmso.id,
    {
      title: 'PCMSO atualizado',
      status: 'published',
      notes: 'PCMSO revisado',
    },
    'oidc-user-1',
  );

  const pgrs = await store.listOccupationalHealthPgrs(tenant.id);
  const psmcos = await store.listOccupationalHealthPcmsos(tenant.id);
  const events = await store.listAuditEvents(tenant.id);

  assert.equal(updatedPgr.title, 'PGR atualizado');
  assert.equal(updatedPgr.status, 'published');
  assert.equal(updatedPcmso.title, 'PCMSO atualizado');
  assert.equal(updatedPcmso.status, 'published');
  assert.equal(pgrs.length, 1);
  assert.equal(psmcos.length, 1);
  assert.equal(events.at(-1)?.action, 'occupational_health.pcmso.updated');

  await store.close();
});

test('slice relacional calculates and approves night shift allowance', async () => {
  const store = new SliceStore();

  const tenant = await store.createTenant('Empresa Noturno', 'empresa-noturno');
  const company = await store.createCompany(tenant.id, 'Empresa Noturno LTDA', 'Noturno', '44332211000199');
  const person = await store.createPerson(tenant.id, 'Pessoa Noturno', '10101010101');
  const employee = await store.createEmployee(tenant.id, company.id, person.id, 'N-001');

  await store.recordPointMark(tenant.id, employee.id, '2026-06-01T21:00:00.000Z');
  await store.recordPointMark(tenant.id, employee.id, '2026-06-02T02:00:00.000Z');

  const calculation = await store.calculateNightShiftAllowance(
    tenant.id,
    employee.id,
    '2026-06-01T00:00:00.000Z',
    '2026-06-02T23:59:59.000Z',
    'oidc-user-1',
    'Apuracao noturna inicial',
  );
  const approved = await store.approveNightShiftAllowanceCalculation(tenant.id, calculation.id, 'oidc-user-1');
  const loaded = await store.getNightShiftAllowanceCalculation(tenant.id, calculation.id);
  const summary = await store.summary(tenant.id);
  const events = await store.listAuditEvents(tenant.id);

  assert.equal(calculation.status, 'calculated');
  assert.equal(calculation.totalMinutes, 240);
  assert.equal(calculation.reducedMinutes, 274);
  assert.equal(calculation.percentage, 20);
  assert.equal(calculation.items.length, 1);
  assert.equal(calculation.items[0]?.minutes, 240);
  assert.equal(approved.status, 'approved');
  assert.equal(loaded.status, 'approved');
  assert.equal(loaded.items.length, 1);
  assert.equal(summary.counts.auditEvents, 8);
  assert.equal(events.at(-1)?.action, 'night_shift_allowance.approved');

  await store.close();
});

test('slice relacional calculates and approves weekly rest allowance', async () => {
  const store = new SliceStore();

  const tenant = await store.createTenant('Empresa DSR', 'empresa-dsr');
  const company = await store.createCompany(tenant.id, 'Empresa DSR LTDA', 'DSR', '99887766000188');
  const person = await store.createPerson(tenant.id, 'Pessoa DSR', '20202020202');
  const employee = await store.createEmployee(tenant.id, company.id, person.id, 'D-001');

  await store.recordPointMark(tenant.id, employee.id, '2026-06-07T21:00:00.000Z');
  await store.recordPointMark(tenant.id, employee.id, '2026-06-07T23:00:00.000Z');

  const calculation = await store.calculateWeeklyRestAllowance(
    tenant.id,
    employee.id,
    '2026-06-07T00:00:00.000Z',
    '2026-06-14T23:59:59.000Z',
    'oidc-user-1',
    'Apuracao DSR inicial',
  );
  const approved = await store.approveWeeklyRestAllowanceCalculation(tenant.id, calculation.id, 'oidc-user-1');
  const loaded = await store.getWeeklyRestAllowanceCalculation(tenant.id, calculation.id);
  const summary = await store.summary(tenant.id);
  const events = await store.listAuditEvents(tenant.id);

  assert.equal(calculation.status, 'calculated');
  assert.equal(calculation.totalMinutes, 120);
  assert.equal(calculation.affectedDays, 1);
  assert.equal(calculation.restDays, 1);
  assert.equal(calculation.items.length, 2);
  assert.equal(calculation.items[0]?.dayType, 'sunday');
  assert.equal(approved.status, 'approved');
  assert.equal(loaded.status, 'approved');
  assert.equal(loaded.items.length, 2);
  assert.equal(summary.counts.auditEvents, 8);
  assert.equal(events.at(-1)?.action, 'weekly_rest_allowance.approved');

  await store.close();
});

test('slice relacional calculates and approves thirteenth salary', async () => {
  const store = new SliceStore();

  const tenant = await store.createTenant('Empresa 13 Salario', 'empresa-13-salario');
  const company = await store.createCompany(tenant.id, 'Empresa 13 Salario LTDA', '13SAL', '77665544000155');
  const person = await store.createPerson(tenant.id, 'Pessoa 13 Salario', '30303030304');
  const employee = await store.createEmployee(tenant.id, company.id, person.id, '13-001');

  await store.createAdmission(tenant.id, person.id, company.id, employee.id, 'oidc-user-1');

  const calculation = await store.calculateThirteenthSalary(
    tenant.id,
    employee.id,
    2026,
    300000,
    25000,
    15000,
    'oidc-user-1',
    'Apuracao 13o inicial',
  );
  const approved = await store.approveThirteenthSalaryCalculation(tenant.id, calculation.id, 'oidc-user-1');
  const integrated = await store.sendThirteenthSalaryCalculationToPayroll(tenant.id, calculation.id, 'oidc-user-1');
  const loaded = await store.getThirteenthSalaryCalculation(tenant.id, calculation.id);
  const events = await store.listAuditEvents(tenant.id);

  assert.equal(calculation.status, 'calculated');
  assert.equal(calculation.eligibleMonths, 7);
  assert.equal(calculation.variableAverageAmountCents, 25000);
  assert.equal(calculation.employerChargesAmountCents, 15000);
  assert.equal(calculation.totalAmountCents, 200000);
  assert.equal(calculation.firstParcelAmountCents, 87500);
  assert.equal(calculation.secondParcelAmountCents, 112500);
  assert.equal(approved.status, 'approved');
  assert.equal(integrated.payrollStatus, 'sent');
  assert.ok(integrated.payrollBatchId);
  assert.ok(integrated.payrollReceiptNumber);
  assert.equal(loaded.status, 'approved');
  assert.equal(loaded.payrollStatus, 'sent');
  assert.equal(loaded.variableAverageAmountCents, 25000);
  assert.equal(loaded.employerChargesAmountCents, 15000);
  assert.equal(events.at(-1)?.action, 'thirteenth_salary.sent_to_payroll');

  await store.close();
});

test('slice relacional consolidates approved point events for payroll', async () => {
  const store = new SliceStore();

  const tenant = await store.createTenant('Empresa Folha', 'empresa-folha');
  const company = await store.createCompany(tenant.id, 'Empresa Folha LTDA', 'Folha', '55443322000166');
  const person = await store.createPerson(tenant.id, 'Pessoa Folha', '30303030303');
  const employee = await store.createEmployee(tenant.id, company.id, person.id, 'F-001');

  await store.recordPointMark(tenant.id, employee.id, '2026-06-01T21:00:00.000Z');
  await store.recordPointMark(tenant.id, employee.id, '2026-06-02T02:00:00.000Z');
  await store.recordPointMark(tenant.id, employee.id, '2026-06-07T21:00:00.000Z');
  await store.recordPointMark(tenant.id, employee.id, '2026-06-07T23:00:00.000Z');

  const night = await store.calculateNightShiftAllowance(
    tenant.id,
    employee.id,
    '2026-06-01T00:00:00.000Z',
    '2026-06-02T23:59:59.000Z',
    'oidc-user-1',
    'Apuracao noturna',
  );
  await store.approveNightShiftAllowanceCalculation(tenant.id, night.id, 'oidc-user-1');

  const weekly = await store.calculateWeeklyRestAllowance(
    tenant.id,
    employee.id,
    '2026-06-07T00:00:00.000Z',
    '2026-06-14T23:59:59.000Z',
    'oidc-user-1',
    'Apuracao DSR',
  );
  await store.approveWeeklyRestAllowanceCalculation(tenant.id, weekly.id, 'oidc-user-1');

  const batch = await store.consolidateTimeSheetPayrollEvents(
    tenant.id,
    employee.id,
    '2026-06-01T00:00:00.000Z',
    '2026-06-14T23:59:59.000Z',
    '2026-06',
    'oidc-user-1',
    'Consolidacao inicial para folha',
  );
  const approved = await store.approveTimeSheetPayrollEventBatch(tenant.id, batch.id, 'oidc-user-1');
  const sent = await store.sendTimeSheetPayrollEventBatchToPayroll(tenant.id, batch.id, 'oidc-user-1');
  const erpSynced = await store.sendTimeSheetPayrollEventBatchToErp(tenant.id, batch.id, 'oidc-user-1');
  const bankSynced = await store.syncTimeSheetPayrollEventBatchWithBank(tenant.id, batch.id, 'oidc-user-1');
  const benefitsSynced = await store.syncBenefitsIntegration(
    tenant.id,
    employee.id,
    'PLANO_SAUDE',
    'include',
    'oidc-user-1',
    'Inclusao automatica do plano',
  );
  const benefitsFailed = await store.failIntegrationRequest(
    tenant.id,
    benefitsSynced.id,
    'operadora indisponivel',
    'oidc-user-1',
  );
  const benefitsRetried = await store.retryIntegrationRequest(
    tenant.id,
    benefitsSynced.id,
    'oidc-user-1',
    'nova tentativa apos indisponibilidade',
  );
  const benefitsDlq = await store.deadLetterIntegrationRequest(
    tenant.id,
    benefitsSynced.id,
    'falha permanente na operadora',
    'oidc-user-1',
  );
  const identitySynced = await store.syncIdentityIntegration(
    tenant.id,
    'user-1',
    'sync',
    'oidc-user-1',
    'Sincronizacao de atributos',
  );
  const monitoring = await store.monitorIntegrations(tenant.id);
  const loaded = await store.getTimeSheetPayrollEventBatch(tenant.id, batch.id);
  const summary = await store.summary(tenant.id);
  const events = await store.listAuditEvents(tenant.id);

  assert.equal(batch.status, 'consolidated');
  assert.equal(batch.totalMinutes, 360);
  assert.equal(batch.totalAmountCents, 0);
  assert.equal(batch.items.length, 2);
  assert.equal(batch.items[0]?.payrollRubricCode, 'ADIC_NOTURNO');
  assert.equal(batch.items[1]?.payrollRubricCode, 'DSR');
  assert.equal(approved.status, 'approved');
  assert.equal(sent.status, 'sent');
  assert.ok(sent.payrollReceiptNumber);
  assert.equal(erpSynced.status, 'sent');
  assert.equal(erpSynced.erpStatus, 'sent');
  assert.ok(erpSynced.erpReceiptNumber);
  assert.equal(bankSynced.status, 'sent');
  assert.equal(bankSynced.bankStatus, 'sent');
  assert.ok(bankSynced.bankReceiptNumber);
  assert.equal(benefitsSynced.status, 'completed');
  assert.equal(benefitsSynced.integrationType, 'benefits');
  assert.equal(benefitsFailed.status, 'failed');
  assert.equal(benefitsRetried.status, 'requested');
  assert.equal(benefitsDlq.status, 'dlq');
  assert.equal(identitySynced.status, 'completed');
  assert.equal(identitySynced.integrationType, 'identity');
  assert.equal(monitoring.counts.total, 2);
  assert.equal(monitoring.counts.completed, 1);
  assert.equal(monitoring.counts.failed, 0);
  assert.equal(monitoring.counts.dlq, 1);
  assert.equal(monitoring.counts.attempts, 5);
  assert.equal(loaded.status, 'sent');
  assert.equal(loaded.erpStatus, 'sent');
  assert.equal(loaded.bankStatus, 'sent');
  assert.equal(loaded.items.length, 2);
  assert.equal(summary.counts.auditEvents, 23);
  assert.equal(events.at(-1)?.action, 'integrations.monitored');

  await store.close();
});

test('slice relacional persists admission request lifecycle', async () => {
  const store = new SliceStore();

  const tenant = await store.createTenant('Empresa Admissao', 'empresa-admissao');
  const company = await store.createCompany(tenant.id, 'Empresa Admissao LTDA', 'Admissao', '55667788000144');
  const person = await store.createPerson(tenant.id, 'Pessoa Admissao', '98765432100');
  const employee = await store.createEmployee(tenant.id, company.id, person.id, 'ADM-001');

  const admission = await store.createAdmission(tenant.id, person.id, company.id, employee.id, 'oidc-user-1');
  const loaded = await store.getAdmission(tenant.id, admission.id);
  const cancelled = await store.cancelAdmission(tenant.id, admission.id, 'oidc-user-1');
  const loadedAfterCancel = await store.getAdmission(tenant.id, admission.id);
  const list = await store.listAdmissions(tenant.id);
  const summary = await store.summary(tenant.id);
  const events = await store.listAuditEvents(tenant.id);

  assert.equal(admission.status, 'draft');
  assert.equal(loaded.history.length, 1);
  assert.equal(loaded.history[0]?.eventType, 'admission.created');
  assert.equal(loadedAfterCancel.history.length, 2);
  assert.equal(loadedAfterCancel.history.at(-1)?.eventType, 'admission.cancelled');
  assert.equal(cancelled.status, 'cancelled');
  assert.equal(list.length, 1);
  assert.equal(list[0]?.status, 'cancelled');
  assert.equal(summary.counts.auditEvents, 6);
  assert.equal(events.at(-1)?.action, 'admission.cancelled');

  await store.close();
});

test('admission request blocks mismatched person, company and employee', async () => {
  const store = new SliceStore();

  const tenant = await store.createTenant('Empresa Inconsistente', 'empresa-inconsistente');
  const companyA = await store.createCompany(tenant.id, 'Empresa A LTDA', 'A', '11111111000111');
  const companyB = await store.createCompany(tenant.id, 'Empresa B LTDA', 'B', '22222222000122');
  const person = await store.createPerson(tenant.id, 'Pessoa Inconsistente', '12312312312');
  const employee = await store.createEmployee(tenant.id, companyA.id, person.id, 'INC-001');

  await assert.rejects(
    () => store.createAdmission(tenant.id, person.id, companyB.id, employee.id, 'oidc-user-1'),
    /employee does not match the provided person and company/,
  );

  await store.close();
});

test('slice relacional persists admission checklist lifecycle', async () => {
  const store = new SliceStore();

  const tenant = await store.createTenant('Empresa Checklist', 'empresa-checklist');
  const company = await store.createCompany(tenant.id, 'Empresa Checklist LTDA', 'Checklist', '66778899000155');
  const person = await store.createPerson(tenant.id, 'Pessoa Checklist', '32132132109');
  const employee = await store.createEmployee(tenant.id, company.id, person.id, 'CHK-001');

  const admission = await store.createAdmission(tenant.id, person.id, company.id, employee.id, 'oidc-user-1');
  const checklist = await store.listAdmissionChecklist(tenant.id, admission.id);
  const firstItem = await store.receiveAdmissionChecklistItem(tenant.id, admission.id, checklist[0]!.id, 'oidc-user-1');
  const secondItem = await store.receiveAdmissionChecklistItem(tenant.id, admission.id, checklist[1]!.id, 'oidc-user-1');
  const thirdItem = await store.receiveAdmissionChecklistItem(tenant.id, admission.id, checklist[2]!.id, 'oidc-user-1');
  const loaded = await store.getAdmission(tenant.id, admission.id);
  const summary = await store.summary(tenant.id);
  const events = await store.listAuditEvents(tenant.id);

  assert.equal(checklist.length, 3);
  assert.equal(checklist[0]?.status, 'pending');
  assert.equal(firstItem.status, 'received');
  assert.equal(secondItem.status, 'received');
  assert.equal(thirdItem.status, 'received');
  assert.equal(loaded.history.length, 6);
  assert.equal(loaded.history.at(-1)?.eventType, 'admission.ready_for_contract');
  assert.equal(loaded.status, 'under_review');
  assert.equal(summary.counts.auditEvents, 10);
  assert.equal(events.at(-1)?.action, 'admission.ready_for_contract');

  await store.close();
});

test('slice relacional persists admission contract formalization', async () => {
  const store = new SliceStore();

  const tenant = await store.createTenant('Empresa Contrato', 'empresa-contrato');
  const company = await store.createCompany(tenant.id, 'Empresa Contrato LTDA', 'Contrato', '77889900000166');
  const person = await store.createPerson(tenant.id, 'Pessoa Contrato', '45645645678');
  const employee = await store.createEmployee(tenant.id, company.id, person.id, 'CON-001');

  const admission = await store.createAdmission(tenant.id, person.id, company.id, employee.id, 'oidc-user-1');
  const checklist = await store.listAdmissionChecklist(tenant.id, admission.id);
  for (const item of checklist) {
    await store.receiveAdmissionChecklistItem(tenant.id, admission.id, item.id, 'oidc-user-1');
  }

  const contract = await store.formalizeAdmissionContract(
    tenant.id,
    admission.id,
    'indeterminate',
    '2026-06-04T00:00:00.000Z',
    'oidc-user-1',
    'Contrato formalizado no MVP',
  );
  const loaded = await store.getAdmission(tenant.id, admission.id);
  const documents = await store.listAdmissionDocuments(tenant.id, admission.id);
  const signedDocument = await store.signAdmissionDocument(
    tenant.id,
    admission.id,
    documents[0]!.id,
    'govbr_advanced',
    'oidc-user-1',
  );
  const summary = await store.summary(tenant.id);
  const events = await store.listAuditEvents(tenant.id);

  assert.equal(contract.contractType, 'indeterminate');
  assert.equal(contract.status, 'formalized');
  assert.equal(loaded.status, 'completed');
  assert.equal(loaded.contract?.id, contract.id);
  assert.equal(loaded.documents.length, 1);
  assert.equal(loaded.documents[0]?.documentType, 'admission_contract_snapshot');
  assert.equal(loaded.documents[0]?.status, 'generated');
  assert.equal(signedDocument.status, 'signed');
  assert.equal(signedDocument.signatureMethod, 'govbr_advanced');
  assert.ok(loaded.history.some((entry) => entry.eventType === 'admission.contract.formalized'));
  assert.ok(loaded.history.some((entry) => entry.eventType === 'admission.document.generated'));
  assert.equal(summary.counts.auditEvents, 12);
  assert.equal(events.at(-1)?.action, 'admission.document.signed');

  await store.close();
});

test('slice relacional persists admission esocial transmission lifecycle', async () => {
  const store = new SliceStore();

  const tenant = await store.createTenant('Empresa eSocial', 'empresa-esocial');
  const company = await store.createCompany(tenant.id, 'Empresa eSocial LTDA', 'eSocial', '88990011000177');
  const person = await store.createPerson(tenant.id, 'Pessoa eSocial', '65465465432');
  const employee = await store.createEmployee(tenant.id, company.id, person.id, 'ESO-001');

  const admission = await store.createAdmission(tenant.id, person.id, company.id, employee.id, 'oidc-user-1');
  const checklist = await store.listAdmissionChecklist(tenant.id, admission.id);
  for (const item of checklist) {
    await store.receiveAdmissionChecklistItem(tenant.id, admission.id, item.id, 'oidc-user-1');
  }

  await store.formalizeAdmissionContract(
    tenant.id,
    admission.id,
    'indeterminate',
    '2026-06-04T00:00:00.000Z',
    'oidc-user-1',
    'Contrato formalizado para eSocial',
  );

  const queued = await store.queueAdmissionEsocialTransmission(
    tenant.id,
    admission.id,
    'S-2200',
    'oidc-user-1',
    'Envio S-2200 inicial',
  );
  const listAfterQueue = await store.listAdmissionEsocialTransmissions(tenant.id, admission.id);
  const sent = await store.markAdmissionEsocialTransmissionSent(queued.id, 'REC-2200-001', {
    receiptNumber: 'REC-2200-001',
    protocol: 'PROTO-2200-001',
    status: 'accepted',
  });
  const listAfterSent = await store.listAdmissionEsocialTransmissions(tenant.id, admission.id);
  const loaded = await store.getAdmission(tenant.id, admission.id);
  const summary = await store.summary(tenant.id);
  const events = await store.listAuditEvents(tenant.id);

  assert.equal(queued.eventCode, 'S-2200');
  assert.equal(queued.status, 'queued');
  assert.equal(listAfterQueue.length, 1);
  assert.equal(sent.status, 'sent');
  assert.equal(sent.receiptNumber, 'REC-2200-001');
  assert.equal(listAfterSent[0]?.status, 'sent');
  assert.equal(loaded.status, 'completed');
  assert.equal(summary.counts.auditEvents, 13);
  assert.equal(events.at(-1)?.action, 'admission.esocial.sent');

  await store.close();
});

test('slice relacional retries failed admission and termination esocial transmissions', async () => {
  const store = new SliceStore();

  const tenant = await store.createTenant('Empresa Reenvio', 'empresa-reenvio');
  const company = await store.createCompany(tenant.id, 'Empresa Reenvio LTDA', 'Reenvio', '99001122000133');
  const person = await store.createPerson(tenant.id, 'Pessoa Reenvio', '90909090909');
  const employee = await store.createEmployee(tenant.id, company.id, person.id, 'REN-001');

  const admission = await store.createAdmission(tenant.id, person.id, company.id, employee.id, 'oidc-user-1');
  const checklist = await store.listAdmissionChecklist(tenant.id, admission.id);
  for (const item of checklist) {
    await store.receiveAdmissionChecklistItem(tenant.id, admission.id, item.id, 'oidc-user-1');
  }
  await store.formalizeAdmissionContract(
    tenant.id,
    admission.id,
    'indeterminate',
    '2026-06-04T00:00:00.000Z',
    'oidc-user-1',
    'Contrato formalizado para reenvio',
  );
  const admissionTransmission = await store.queueAdmissionEsocialTransmission(
    tenant.id,
    admission.id,
    'S-2200',
    'oidc-user-1',
    'Envio inicial para reenvio',
  );
  await store.markAdmissionEsocialTransmissionFailed(admissionTransmission.id, 'Falha simulada de admissao');
  const admissionRetried = await store.retryAdmissionEsocialTransmission(
    tenant.id,
    admissionTransmission.id,
    'oidc-user-1',
    'Reenvio de admissao',
  );
  assert.equal(admissionRetried.status, 'queued');
  assert.equal(admissionRetried.attempts, 0);

  const termination = await store.createTermination(
    tenant.id,
    employee.id,
    'Rescisao para reenvio',
    '2026-06-10T00:00:00.000Z',
    'oidc-user-1',
    'aviso_previo',
    'Desligamento para reenvio',
  );
  await store.approveTermination(tenant.id, termination.id, 'oidc-user-1');
  await store.effectuateTermination(tenant.id, termination.id, 'oidc-user-1');
  const offboarding = await store.createOffboarding(tenant.id, termination.id, 'oidc-user-1', 'Offboarding para reenvio');
  await store.closeOffboarding(tenant.id, offboarding.id, 'oidc-user-1');
  const terminationTransmission = await store.queueTerminationEsocialTransmission(
    tenant.id,
    termination.id,
    'S-2299',
    'oidc-user-1',
    'Envio inicial de desligamento',
  );
  await store.markTerminationEsocialTransmissionFailed(terminationTransmission.id, 'Falha simulada de desligamento');
  const terminationRetried = await store.retryTerminationEsocialTransmission(
    tenant.id,
    terminationTransmission.id,
    'oidc-user-1',
    'Reenvio de desligamento',
  );
  const summary = await store.summary(tenant.id);
  const events = await store.listAuditEvents(tenant.id);

  assert.equal(terminationRetried.status, 'queued');
  assert.equal(terminationRetried.attempts, 0);
  assert.equal(summary.counts.auditEvents, 23);
  assert.equal(events.at(-1)?.action, 'termination.esocial.requeued');

  await store.close();
});

test('slice relacional persists termination lifecycle and blocks point marks after effective termination', async () => {
  const store = new SliceStore();

  const tenant = await store.createTenant('Empresa Desligamento', 'empresa-desligamento');
  const company = await store.createCompany(tenant.id, 'Empresa Desligamento LTDA', 'Desligamento', '99001122000188');
  const person = await store.createPerson(tenant.id, 'Pessoa Desligamento', '78978978900');
  const employee = await store.createEmployee(tenant.id, company.id, person.id, 'DES-001');

  const termination = await store.createTermination(
    tenant.id,
    employee.id,
    'Encerramento administrativo do vinculo',
    '2026-06-10T00:00:00.000Z',
    'oidc-user-1',
    'aviso_previo',
    'Desligamento administrativo em MVP',
  );
  const loadedAfterCreate = await store.getTermination(tenant.id, termination.id);
  const approved = await store.approveTermination(tenant.id, termination.id, 'oidc-user-1');
  const effective = await store.effectuateTermination(tenant.id, termination.id, 'oidc-user-1');
  const list = await store.listTerminations(tenant.id);
  const summary = await store.summary(tenant.id);
  const events = await store.listAuditEvents(tenant.id);

  assert.equal(termination.status, 'draft');
  assert.equal(loadedAfterCreate.histories.length, 1);
  assert.equal(loadedAfterCreate.histories[0]?.eventType, 'termination.created');
  assert.equal(approved.status, 'approved');
  assert.equal(effective.status, 'effective');
  assert.equal(list.length, 1);
  assert.equal(list[0]?.status, 'effective');
  assert.equal(summary.counts.auditEvents, 7);
  assert.equal(events.at(-1)?.action, 'termination.effective');

  await assert.rejects(() => store.recordPointMark(tenant.id, employee.id), /employee .* is terminated/);

  await store.close();
});

test('slice relacional persists rescission lifecycle after effective termination', async () => {
  const store = new SliceStore();

  const tenant = await store.createTenant('Empresa Rescisao', 'empresa-rescisao');
  const company = await store.createCompany(tenant.id, 'Empresa Rescisao LTDA', 'Rescisao', '99112233000155');
  const person = await store.createPerson(tenant.id, 'Pessoa Rescisao', '11122233344');
  const employee = await store.createEmployee(tenant.id, company.id, person.id, 'RES-001');

  const termination = await store.createTermination(
    tenant.id,
    employee.id,
    'Encerramento administrativo do vinculo',
    '2026-06-10T00:00:00.000Z',
    'oidc-user-1',
    'aviso_previo',
    'Desligamento administrativo para rescisao',
  );
  await store.approveTermination(tenant.id, termination.id, 'oidc-user-1');
  await store.effectuateTermination(tenant.id, termination.id, 'oidc-user-1');

  const rescission = await store.createRescission(tenant.id, termination.id, 'oidc-user-1', 'Rescisao iniciada');
  const loadedAfterCreate = await store.getRescission(tenant.id, rescission.id);
  const calculation = await store.calculateRescission(
    tenant.id,
    rescission.id,
    {
      referenceSalaryCents: 300000,
      noticeAmountCents: 30000,
      salaryBalanceAmountCents: 15000,
      vacationAmountCents: 25000,
      thirteenthAmountCents: 12000,
      fgtsAmountCents: 20000,
      fgtsPenaltyAmountCents: 4000,
      deductionsAmountCents: 5000,
      notes: 'Memoria de calculo rescisoria',
    },
    'oidc-user-1',
  );
  const generatedDocuments = await store.generateRescissionDocuments(tenant.id, rescission.id, 'oidc-user-1');
  for (const document of generatedDocuments) {
    await store.signRescissionDocument(
      tenant.id,
      rescission.id,
      document.id,
      'govbr_advanced',
      'oidc-user-1',
    );
  }
  const loadedAfterGenerate = await store.getRescission(tenant.id, rescission.id);
  const closed = await store.closeRescission(tenant.id, rescission.id, 'oidc-user-1');
  const list = await store.listRescissions(tenant.id);
  const documents = await store.listRescissionDocuments(tenant.id, rescission.id);
  const summary = await store.summary(tenant.id);
  const events = await store.listAuditEvents(tenant.id);

  assert.equal(rescission.status, 'draft');
  assert.equal(loadedAfterCreate.histories.length, 1);
  assert.equal(loadedAfterCreate.histories[0]?.eventType, 'rescission.created');
  assert.equal(calculation.status, 'calculated');
  assert.equal(calculation.grossAmountCents, 106000);
  assert.equal(calculation.netAmountCents, 101000);
  assert.equal(generatedDocuments.length, 3);
  assert.equal(loadedAfterGenerate.calculation?.id, calculation.id);
  assert.equal(loadedAfterGenerate.documents.length, 3);
  assert.equal(closed.status, 'closed');
  assert.equal(list.length, 1);
  assert.equal(list[0]?.status, 'closed');
  assert.equal(documents.length, 3);
  assert.equal(summary.counts.auditEvents, 14);
  assert.equal(events.at(-1)?.action, 'rescission.closed');

  await store.close();
});

test('slice relacional calculates rescission deadline and requires signed documents before closure', async () => {
  const store = new SliceStore();

  const tenant = await store.createTenant('Empresa Prazo', 'empresa-prazo');
  const company = await store.createCompany(tenant.id, 'Empresa Prazo LTDA', 'Prazo', '99334455000177');
  const person = await store.createPerson(tenant.id, 'Pessoa Prazo', '33344455566');
  const employee = await store.createEmployee(tenant.id, company.id, person.id, 'PRZ-001');

  const termination = await store.createTermination(
    tenant.id,
    employee.id,
    'Encerramento administrativo do vinculo',
    '2026-06-10T00:00:00.000Z',
    'oidc-user-1',
    'aviso_previo',
    'Desligamento administrativo para prazo rescisorio',
  );
  await store.approveTermination(tenant.id, termination.id, 'oidc-user-1');
  await store.effectuateTermination(tenant.id, termination.id, 'oidc-user-1');

  const rescission = await store.createRescission(tenant.id, termination.id, 'oidc-user-1', 'Rescisao com prazo');
  const loaded = await store.getRescission(tenant.id, rescission.id);
  const expectedDueDate = '2026-06-20T00:00:00.000Z';

  assert.equal(loaded.paymentDueAt, expectedDueDate);

  await store.calculateRescission(
    tenant.id,
    rescission.id,
    {
      referenceSalaryCents: 300000,
      noticeAmountCents: 30000,
      salaryBalanceAmountCents: 15000,
      vacationAmountCents: 25000,
      thirteenthAmountCents: 12000,
      fgtsAmountCents: 20000,
      fgtsPenaltyAmountCents: 4000,
      deductionsAmountCents: 5000,
      notes: 'Memoria de calculo rescisoria com prazo',
    },
    'oidc-user-1',
  );
  const documents = await store.generateRescissionDocuments(tenant.id, rescission.id, 'oidc-user-1');

  await assert.rejects(
    () => store.closeRescission(tenant.id, rescission.id, 'oidc-user-1'),
    /unsigned documents/,
  );

  for (const document of documents) {
    const signed = await store.signRescissionDocument(
      tenant.id,
      rescission.id,
      document.id,
      'govbr_advanced',
      'oidc-user-1',
    );
    assert.equal(signed.status, 'signed');
    assert.equal(signed.signatureMethod, 'govbr_advanced');
    assert.equal(signed.signedBy, 'oidc-user-1');
    assert.ok(signed.signedAt);
  }

  const closed = await store.closeRescission(tenant.id, rescission.id, 'oidc-user-1');
  assert.equal(closed.status, 'closed');

  await store.close();
});

test('slice relacional persists offboarding and termination esocial after effective termination', async () => {
  const store = new SliceStore();

  const tenant = await store.createTenant('Empresa Offboarding', 'empresa-offboarding');
  const company = await store.createCompany(tenant.id, 'Empresa Offboarding LTDA', 'Offboarding', '99223344000166');
  const person = await store.createPerson(tenant.id, 'Pessoa Offboarding', '22233344455');
  const employee = await store.createEmployee(tenant.id, company.id, person.id, 'OFF-001');

  const termination = await store.createTermination(
    tenant.id,
    employee.id,
    'Encerramento administrativo do vinculo',
    '2026-06-10T00:00:00.000Z',
    'oidc-user-1',
    'aviso_previo',
    'Desligamento administrativo para offboarding',
  );
  await store.approveTermination(tenant.id, termination.id, 'oidc-user-1');
  await store.effectuateTermination(tenant.id, termination.id, 'oidc-user-1');

  const offboarding = await store.createOffboarding(tenant.id, termination.id, 'oidc-user-1', 'Offboarding iniciado');
  const loadedAfterCreate = await store.getOffboarding(tenant.id, offboarding.id);
  const closedOffboarding = await store.closeOffboarding(tenant.id, offboarding.id, 'oidc-user-1');
  const listOffboardings = await store.listOffboardings(tenant.id);
  const transmissionsAfterClose = await store.listTerminationEsocialTransmissions(tenant.id, termination.id);
  const sentTransmission = await store.markTerminationEsocialTransmissionSent(
    transmissionsAfterClose[0]!.id,
    'REC-S2299-001',
    {
      receiptNumber: 'REC-S2299-001',
      protocol: 'PROTO-S2299-001',
      status: 'accepted',
    },
  );
  const transmissionsAfterSent = await store.listTerminationEsocialTransmissions(tenant.id, termination.id);
  const summary = await store.summary(tenant.id);
  const events = await store.listAuditEvents(tenant.id);

  assert.equal(offboarding.status, 'draft');
  assert.equal(loadedAfterCreate.histories.length, 1);
  assert.equal(loadedAfterCreate.histories[0]?.eventType, 'offboarding.created');
  assert.equal(closedOffboarding.status, 'closed');
  assert.equal(listOffboardings.length, 1);
  assert.equal(listOffboardings[0]?.status, 'closed');
  assert.equal(transmissionsAfterClose.length, 1);
  assert.equal(transmissionsAfterClose[0]?.eventCode, 'S-2299');
  assert.equal(transmissionsAfterClose[0]?.status, 'queued');
  assert.equal(sentTransmission.status, 'sent');
  assert.equal(transmissionsAfterSent[0]?.status, 'sent');
  assert.equal(summary.counts.auditEvents, 11);
  assert.equal(events.at(-1)?.action, 'termination.esocial.sent');

  await store.close();
});

test('slice relacional reloads from postgres after a new store instance', async () => {
  const firstStore = new SliceStore();
  const tenant = await firstStore.createTenant('Empresa Persistida', 'empresa-persistida');
  await firstStore.close();

  const secondStore = new SliceStore();
  const loaded = await secondStore.getTenant(tenant.id);
  const summary = await secondStore.summary(tenant.id);

  assert.equal(loaded.slug, 'empresa-persistida');
  assert.equal(summary.counts.auditEvents, 1);

  await secondStore.close();
});

test('slice relacional blocks duplicate tenant slugs', async () => {
  const store = new SliceStore();

  await store.createTenant('Empresa 1', 'empresa-1');
  await assert.rejects(() => store.createTenant('Empresa 2', 'empresa-1'));

  await store.close();
});
