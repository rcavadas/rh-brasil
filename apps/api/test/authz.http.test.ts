import assert from 'node:assert/strict';
import { generateKeyPairSync, sign } from 'node:crypto';
import { after, before, beforeEach, test } from 'node:test';
import { PrismaClient } from '@prisma/client';
import type { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Reflector } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AuthzGuard } from '../src/authz.guard.js';
import { AppModule } from '../src/app.module.js';
import { SliceStore } from '../src/slice.store.js';

process.env.DATABASE_URL ??= 'postgresql://rh:rh@localhost:5432/rh_app';

const prisma = new PrismaClient();

let baseUrl = '';
let app: INestApplication;

async function resetDatabase(): Promise<void> {
  await prisma.$executeRawUnsafe(`
    TRUNCATE TABLE
      "rescission_documents",
      "rescission_calculations",
      "rescission_history",
      "rescission_requests",
      "admission_documents",
      "termination_offboarding_history",
      "termination_offboardings",
      "termination_esocial_transmissions",
      "api_integration_request_histories",
      "api_integration_requests",
      "benefit_eligibility_rules",
      "employee_benefits",
      "benefit_catalogs",
      "recruitment_candidates",
      "recruitment_vacancy_requests",
      "recruitment_candidate_evaluations",
      "recruitment_interviews",
      "recruitment_proposals",
      "vacation_requests",
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
      "termination_history",
      "termination_requests",
      "tenant_access",
      "audit_events",
      "point_marks",
      "employees",
      "persons",
      "companies",
      "privacy_anonymization_jobs",
      "retention_rules",
      "security_incidents",
      "tenants"
    RESTART IDENTITY CASCADE;
  `);
}

before(async () => {
  app = await NestFactory.create(AppModule, { logger: false });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalGuards(new AuthzGuard(app.get(Reflector), app.get(SliceStore)));
  app.setGlobalPrefix('api');
  await app.listen(0, '127.0.0.1');
  baseUrl = await app.getUrl();
});

after(async () => {
  await app.close();
  await prisma.$disconnect();
});

beforeEach(async () => {
  await resetDatabase();
});

test('health endpoint stays public', async () => {
  const response = await fetch(`${baseUrl}/api/health`);
  assert.equal(response.status, 200);
});

test('protected routes require auth headers', async () => {
  const response = await fetch(`${baseUrl}/api/v1/tenants/does-not-matter/summary`);
  assert.equal(response.status, 401);
});

test('write routes require admin role', async () => {
  const response = await fetch(`${baseUrl}/api/v1/tenants`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-rh-user-id': 'user-1',
      'x-rh-role': 'rh',
    },
    body: JSON.stringify({ name: 'Empresa Teste', slug: 'empresa-teste' }),
  });

  assert.equal(response.status, 403);
});

test('authenticated admin can create and read a tenant scoped flow', async () => {
  const tenantResponse = await fetch(`${baseUrl}/api/v1/tenants`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-rh-user-id': 'user-1',
      'x-rh-role': 'admin',
    },
    body: JSON.stringify({ name: 'Empresa Teste', slug: 'empresa-teste' }),
  });

  assert.equal(tenantResponse.status, 201);
  const tenant = (await tenantResponse.json()) as { id: string };

  const commonHeaders = {
    'content-type': 'application/json',
    'x-rh-user-id': 'user-1',
    'x-rh-role': 'admin',
    'x-rh-tenant-id': tenant.id,
  } as const;

  const companyResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/companies`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      legalName: 'Empresa Teste LTDA',
      tradeName: 'Teste',
      cnpj: '12345678000190',
    }),
  });
  assert.equal(companyResponse.status, 201);
  const company = (await companyResponse.json()) as { id: string };

  const personResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/persons`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      fullName: 'Pessoa Teste',
      cpf: '12345678901',
    }),
  });
  assert.equal(personResponse.status, 201);
  const person = (await personResponse.json()) as { id: string };

  const employeeResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/employees`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      companyId: company.id,
      personId: person.id,
      code: 'E-001',
    }),
  });
  assert.equal(employeeResponse.status, 201);
  const employee = (await employeeResponse.json()) as { id: string };

  const pointResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/point-marks`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      employeeId: employee.id,
    }),
  });
  assert.equal(pointResponse.status, 201);

  const summaryResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/summary`, {
    headers: {
      'x-rh-user-id': 'user-1',
      'x-rh-role': 'auditor',
      'x-rh-tenant-id': tenant.id,
    },
  });
  assert.equal(summaryResponse.status, 200);
  const summary = (await summaryResponse.json()) as { counts: { companies: number; persons: number; employees: number; pointMarks: number; auditEvents: number } };

  assert.equal(summary.counts.companies, 1);
  assert.equal(summary.counts.persons, 1);
  assert.equal(summary.counts.employees, 1);
  assert.equal(summary.counts.pointMarks, 1);
  assert.equal(summary.counts.auditEvents, 5);
});

test('authenticated auditor can read tenant analytics overview', async () => {
  const tenantResponse = await fetch(`${baseUrl}/api/v1/tenants`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-rh-user-id': 'user-1',
      'x-rh-role': 'admin',
    },
    body: JSON.stringify({ name: 'Empresa BI', slug: 'empresa-bi' }),
  });

  assert.equal(tenantResponse.status, 201);
  const tenant = (await tenantResponse.json()) as { id: string };

  const commonHeaders = {
    'content-type': 'application/json',
    'x-rh-user-id': 'user-1',
    'x-rh-role': 'admin',
    'x-rh-tenant-id': tenant.id,
  } as const;

  const companyResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/companies`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      legalName: 'Empresa BI LTDA',
      tradeName: 'BI',
      cnpj: '77889900000144',
    }),
  });
  assert.equal(companyResponse.status, 201);
  const company = (await companyResponse.json()) as { id: string };

  const personResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/persons`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      fullName: 'Pessoa BI',
      cpf: '40404040404',
    }),
  });
  assert.equal(personResponse.status, 201);
  const person = (await personResponse.json()) as { id: string };

  const employeeResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/employees`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      companyId: company.id,
      personId: person.id,
      code: 'BI-001',
    }),
  });
  assert.equal(employeeResponse.status, 201);
  const employee = (await employeeResponse.json()) as { id: string };

  const pointResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/point-marks`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      employeeId: employee.id,
    }),
  });
  assert.equal(pointResponse.status, 201);

  const admissionResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/admissions`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      personId: person.id,
      companyId: company.id,
      employeeId: employee.id,
    }),
  });
  assert.equal(admissionResponse.status, 201);

  const analyticsResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/analytics/overview`, {
    headers: {
      'x-rh-user-id': 'user-1',
      'x-rh-role': 'auditor',
      'x-rh-tenant-id': tenant.id,
    },
  });
  assert.equal(analyticsResponse.status, 200);
  const analytics = (await analyticsResponse.json()) as {
    counts: { employees: number; pointMarks: number; admissions: number; openAdmissions: number };
    signals: { headcount: number; workflowPressure: number };
    privacy: { retentionModel: string; exportFormats: string[] };
  };

  assert.equal(analytics.counts.employees, 1);
  assert.equal(analytics.counts.pointMarks, 1);
  assert.equal(analytics.counts.admissions, 1);
  assert.equal(analytics.counts.openAdmissions, 1);
  assert.equal(analytics.signals.headcount, 1);
  assert.equal(analytics.signals.workflowPressure, 1);
  assert.equal(analytics.privacy.retentionModel, 'class-based');
  assert.ok(analytics.privacy.exportFormats.includes('json'));
});

test('authenticated admin can manage benefit catalogs and assignments', async () => {
  const tenantResponse = await fetch(`${baseUrl}/api/v1/tenants`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-rh-user-id': 'user-1',
      'x-rh-role': 'admin',
    },
    body: JSON.stringify({ name: 'Empresa Beneficios', slug: 'empresa-beneficios' }),
  });

  assert.equal(tenantResponse.status, 201);
  const tenant = (await tenantResponse.json()) as { id: string };

  const commonHeaders = {
    'content-type': 'application/json',
    'x-rh-user-id': 'user-1',
    'x-rh-role': 'admin',
    'x-rh-tenant-id': tenant.id,
  } as const;

  const companyResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/companies`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      legalName: 'Empresa Beneficios LTDA',
      tradeName: 'Beneficios',
      cnpj: '99001122000133',
    }),
  });
  assert.equal(companyResponse.status, 201);
  const company = (await companyResponse.json()) as { id: string };

  const personResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/persons`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      fullName: 'Pessoa Beneficios',
      cpf: '50505050505',
    }),
  });
  assert.equal(personResponse.status, 201);
  const person = (await personResponse.json()) as { id: string };

  const employeeResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/employees`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      companyId: company.id,
      personId: person.id,
      code: 'BEN-001',
    }),
  });
  assert.equal(employeeResponse.status, 201);
  const employee = (await employeeResponse.json()) as { id: string };

  const catalogResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/benefits/catalog`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      code: 'VT-001',
      name: 'Vale-transporte',
      benefitType: 'transport',
      description: 'Beneficio de deslocamento',
    }),
  });
  assert.equal(catalogResponse.status, 201);
  const catalog = (await catalogResponse.json()) as { id: string };

  const ruleResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/benefits/catalog/${catalog.id}/eligibility-rules`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      companyId: company.id,
      status: 'active',
      notes: 'Elegibilidade por empresa',
    }),
  });
  assert.equal(ruleResponse.status, 201);
  const rule = (await ruleResponse.json()) as { id: string; status: string };
  assert.equal(rule.status, 'active');

  const rulesResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/benefits/catalog/${catalog.id}/eligibility-rules`, {
    headers: {
      'x-rh-user-id': 'user-1',
      'x-rh-role': 'auditor',
      'x-rh-tenant-id': tenant.id,
    },
  });
  assert.equal(rulesResponse.status, 200);
  const rules = (await rulesResponse.json()) as Array<{ id: string; status: string }>;
  assert.equal(rules.length, 1);
  assert.equal(rules[0]?.status, 'active');

  const companyBResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/companies`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      legalName: 'Empresa Beneficios B LTDA',
      tradeName: 'Beneficios B',
      cnpj: '99001122000134',
    }),
  });
  assert.equal(companyBResponse.status, 201);
  const companyB = (await companyBResponse.json()) as { id: string };

  const blockedEmployeeResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/employees`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      companyId: companyB.id,
      personId: person.id,
      code: 'BEN-002',
    }),
  });
  assert.equal(blockedEmployeeResponse.status, 201);
  const blockedEmployee = (await blockedEmployeeResponse.json()) as { id: string };

  const blockedGrantResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/benefits/assignments`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      employeeId: blockedEmployee.id,
      benefitCatalogId: catalog.id,
      startsAt: '2026-06-01T00:00:00.000Z',
      notes: 'Concessao bloqueada por elegibilidade',
    }),
  });
  assert.equal(blockedGrantResponse.status, 409);

  const grantResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/benefits/assignments`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      employeeId: employee.id,
      benefitCatalogId: catalog.id,
      startsAt: '2026-06-01T00:00:00.000Z',
      notes: 'Concessao inicial',
    }),
  });
  assert.equal(grantResponse.status, 201);
  const assignment = (await grantResponse.json()) as { id: string; status: string };
  assert.equal(assignment.status, 'active');

  const listResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/benefits/assignments`, {
    headers: {
      'x-rh-user-id': 'user-1',
      'x-rh-role': 'auditor',
      'x-rh-tenant-id': tenant.id,
    },
  });
  assert.equal(listResponse.status, 200);
  const assignments = (await listResponse.json()) as Array<{ id: string; status: string }>;
  assert.equal(assignments.length, 1);
  assert.equal(assignments[0]?.status, 'active');

  const suspendResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/benefits/assignments/${assignment.id}/suspend`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({ notes: 'Pausa temporaria' }),
  });
  assert.equal(suspendResponse.status, 201);
  const suspended = (await suspendResponse.json()) as { status: string };
  assert.equal(suspended.status, 'suspended');

  const cancelResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/benefits/assignments/${assignment.id}/cancel`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({ notes: 'Encerramento definitivo' }),
  });
  assert.equal(cancelResponse.status, 201);
  const cancelled = (await cancelResponse.json()) as { status: string };
  assert.equal(cancelled.status, 'cancelled');

  const deactivateResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/benefits/catalog/${catalog.id}/eligibility-rules/${rule.id}`, {
    method: 'PATCH',
    headers: commonHeaders,
    body: JSON.stringify({
      status: 'inactive',
      notes: 'Elegibilidade desativada',
    }),
  });
  assert.equal(deactivateResponse.status, 200);
  const deactivated = (await deactivateResponse.json()) as { status: string };
  assert.equal(deactivated.status, 'inactive');

  const retryGrantResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/benefits/assignments`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      employeeId: blockedEmployee.id,
      benefitCatalogId: catalog.id,
      startsAt: '2026-06-02T00:00:00.000Z',
      notes: 'Concessao liberada apos inativacao',
    }),
  });
  assert.equal(retryGrantResponse.status, 201);
  const retryGrant = (await retryGrantResponse.json()) as { status: string };
  assert.equal(retryGrant.status, 'active');
});

test('authenticated admin can manage ats vacancy requests and candidates', async () => {
  const tenantResponse = await fetch(`${baseUrl}/api/v1/tenants`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-rh-user-id': 'user-1',
      'x-rh-role': 'admin',
    },
    body: JSON.stringify({ name: 'Empresa ATS', slug: 'empresa-ats' }),
  });

  assert.equal(tenantResponse.status, 201);
  const tenant = (await tenantResponse.json()) as { id: string };

  const commonHeaders = {
    'content-type': 'application/json',
    'x-rh-user-id': 'user-1',
    'x-rh-role': 'admin',
    'x-rh-tenant-id': tenant.id,
  } as const;

  const companyResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/companies`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      legalName: 'Empresa ATS LTDA',
      tradeName: 'ATS',
      cnpj: '11223344000155',
    }),
  });
  assert.equal(companyResponse.status, 201);
  const company = (await companyResponse.json()) as { id: string };

  const vacancyResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/ats/vacancy-requests`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      companyId: company.id,
      code: 'VAG-001',
      title: 'Analista de RH',
      department: 'People',
      headcount: 2,
      notes: 'Vaga prioritaria',
    }),
  });
  assert.equal(vacancyResponse.status, 201);
  const vacancy = (await vacancyResponse.json()) as { id: string; status: string };
  assert.equal(vacancy.status, 'draft');

  const approveResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/ats/vacancy-requests/${vacancy.id}/approve`, {
    method: 'POST',
    headers: commonHeaders,
  });
  assert.equal(approveResponse.status, 201);
  const approved = (await approveResponse.json()) as { status: string };
  assert.equal(approved.status, 'approved');

  const publishResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/ats/vacancy-requests/${vacancy.id}/publish`, {
    method: 'POST',
    headers: commonHeaders,
  });
  assert.equal(publishResponse.status, 201);
  const published = (await publishResponse.json()) as { status: string };
  assert.equal(published.status, 'published');

  const candidateResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/ats/vacancy-requests/${vacancy.id}/candidates`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      fullName: 'Candidato ATS',
      email: 'candidato@example.com',
      source: 'portal',
      notes: 'Primeira triagem',
    }),
  });
  assert.equal(candidateResponse.status, 201);
  const candidate = (await candidateResponse.json()) as { id: string; stage: string };
  assert.equal(candidate.stage, 'applied');

  const moveResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/ats/candidates/${candidate.id}/move`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      stage: 'interview',
      notes: 'Entrevista agendada',
    }),
  });
  assert.equal(moveResponse.status, 201);
  const moved = (await moveResponse.json()) as { stage: string };
  assert.equal(moved.stage, 'interview');

  const vacancyListResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/ats/vacancy-requests`, {
    headers: commonHeaders,
  });
  assert.equal(vacancyListResponse.status, 200);
  const vacancies = (await vacancyListResponse.json()) as Array<{ id: string }>;
  assert.equal(vacancies.length, 1);

  const candidateListResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/ats/vacancy-requests/${vacancy.id}/candidates`, {
    headers: commonHeaders,
  });
  assert.equal(candidateListResponse.status, 200);
  const candidates = (await candidateListResponse.json()) as Array<{ id: string; stage: string }>;
  assert.equal(candidates.length, 1);
  assert.equal(candidates[0]?.stage, 'interview');
});

test('authenticated admin can schedule interviews and record evaluations for ats candidates', async () => {
  const tenantResponse = await fetch(`${baseUrl}/api/v1/tenants`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-rh-user-id': 'user-1',
      'x-rh-role': 'admin',
    },
    body: JSON.stringify({ name: 'Empresa ATS Entrevistas', slug: 'empresa-ats-entrevistas' }),
  });

  assert.equal(tenantResponse.status, 201);
  const tenant = (await tenantResponse.json()) as { id: string };

  const commonHeaders = {
    'content-type': 'application/json',
    'x-rh-user-id': 'user-1',
    'x-rh-role': 'admin',
    'x-rh-tenant-id': tenant.id,
  } as const;

  const companyResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/companies`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      legalName: 'Empresa ATS Entrevistas LTDA',
      tradeName: 'ATS Entrevistas',
      cnpj: '22334455000166',
    }),
  });
  assert.equal(companyResponse.status, 201);
  const company = (await companyResponse.json()) as { id: string };

  const vacancyResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/ats/vacancy-requests`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      companyId: company.id,
      code: 'VAG-ENT-001',
      title: 'Analista de Talent Acquisition',
      department: 'People',
      headcount: 1,
    }),
  });
  assert.equal(vacancyResponse.status, 201);
  const vacancy = (await vacancyResponse.json()) as { id: string };

  await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/ats/vacancy-requests/${vacancy.id}/approve`, {
    method: 'POST',
    headers: commonHeaders,
  });
  await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/ats/vacancy-requests/${vacancy.id}/publish`, {
    method: 'POST',
    headers: commonHeaders,
  });

  const candidateResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/ats/vacancy-requests/${vacancy.id}/candidates`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      fullName: 'Candidato Entrevista',
      source: 'site',
    }),
  });
  assert.equal(candidateResponse.status, 201);
  const candidate = (await candidateResponse.json()) as { id: string };

  const interviewResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/ats/vacancy-requests/${vacancy.id}/interviews`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      candidateId: candidate.id,
      scheduledAt: '2026-06-20T14:00:00.000Z',
      interviewerName: 'Gestor de RH',
      location: 'Sala 2',
      notes: 'Entrevista inicial',
    }),
  });
  assert.equal(interviewResponse.status, 201);
  const interview = (await interviewResponse.json()) as { id: string; status: string };
  assert.equal(interview.status, 'scheduled');

  const evaluationResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/ats/interviews/${interview.id}/evaluations`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      score: 88,
      recommendation: 'advance',
      evaluatorName: 'Gestor de RH',
      evaluatedAt: '2026-06-20T14:45:00.000Z',
      notes: 'Bom fit para a vaga',
    }),
  });
  assert.equal(evaluationResponse.status, 201);
  const evaluation = (await evaluationResponse.json()) as { recommendation: string; score: number };
  assert.equal(evaluation.recommendation, 'advance');
  assert.equal(evaluation.score, 88);

  const interviewsResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/ats/vacancy-requests/${vacancy.id}/interviews`, {
    headers: commonHeaders,
  });
  assert.equal(interviewsResponse.status, 200);
  const interviews = (await interviewsResponse.json()) as Array<{ id: string; status: string }>;
  assert.equal(interviews.length, 1);
  assert.equal(interviews[0]?.status, 'completed');

  const evaluationsListResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/ats/vacancy-requests/${vacancy.id}/evaluations`, {
    headers: commonHeaders,
  });
  assert.equal(evaluationsListResponse.status, 200);
  const evaluations = (await evaluationsListResponse.json()) as Array<{ id: string; recommendation: string }>;
  assert.equal(evaluations.length, 1);
  assert.equal(evaluations[0]?.recommendation, 'advance');
});

test('authenticated admin can create proposals and convert ats candidates to pre-admission', async () => {
  const tenantResponse = await fetch(`${baseUrl}/api/v1/tenants`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-rh-user-id': 'user-1',
      'x-rh-role': 'admin',
    },
    body: JSON.stringify({ name: 'Empresa ATS Proposta', slug: 'empresa-ats-proposta' }),
  });

  assert.equal(tenantResponse.status, 201);
  const tenant = (await tenantResponse.json()) as { id: string };

  const commonHeaders = {
    'content-type': 'application/json',
    'x-rh-user-id': 'user-1',
    'x-rh-role': 'admin',
    'x-rh-tenant-id': tenant.id,
  } as const;

  const companyResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/companies`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      legalName: 'Empresa ATS Proposta LTDA',
      tradeName: 'ATS Proposta',
      cnpj: '55667788000199',
    }),
  });
  assert.equal(companyResponse.status, 201);
  const company = (await companyResponse.json()) as { id: string };

  const vacancyResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/ats/vacancy-requests`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      companyId: company.id,
      code: 'VAG-PROP-001',
      title: 'Coordenador de People',
      department: 'People',
      headcount: 1,
    }),
  });
  assert.equal(vacancyResponse.status, 201);
  const vacancy = (await vacancyResponse.json()) as { id: string };

  await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/ats/vacancy-requests/${vacancy.id}/approve`, {
    method: 'POST',
    headers: commonHeaders,
  });
  await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/ats/vacancy-requests/${vacancy.id}/publish`, {
    method: 'POST',
    headers: commonHeaders,
  });

  const candidateResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/ats/vacancy-requests/${vacancy.id}/candidates`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      fullName: 'Candidato Proposta',
      source: 'referral',
    }),
  });
  assert.equal(candidateResponse.status, 201);
  const candidate = (await candidateResponse.json()) as { id: string };

  const proposalResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/ats/vacancy-requests/${vacancy.id}/candidates/${candidate.id}/proposals`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      salaryBaseCents: 1200000,
      startAt: '2026-07-01T00:00:00.000Z',
      notes: 'Proposta final',
    }),
  });
  assert.equal(proposalResponse.status, 201);
  const proposal = (await proposalResponse.json()) as { id: string; status: string };
  assert.equal(proposal.status, 'proposed');

  const convertResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/ats/proposals/${proposal.id}/convert`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      personCpf: '90909090909',
      employeeCode: 'ATS-001',
      effectiveFrom: '2026-07-01T00:00:00.000Z',
      notes: 'Conversao para pre-admissao',
    }),
  });
  assert.equal(convertResponse.status, 201);
  const converted = (await convertResponse.json()) as {
    proposal: { status: string };
    admission: { status: string; sourceProposalId?: string };
    employee: { code?: string };
  };
  assert.equal(converted.proposal.status, 'converted');
  assert.equal(converted.admission.status, 'draft');
  assert.equal(converted.admission.sourceProposalId, proposal.id);
  assert.equal(converted.employee.code, 'ATS-001');

  const proposalsResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/ats/vacancy-requests/${vacancy.id}/proposals`, {
    headers: commonHeaders,
  });
  assert.equal(proposalsResponse.status, 200);
  const proposals = (await proposalsResponse.json()) as Array<{ id: string; status: string }>;
  assert.equal(proposals.length, 1);
  assert.equal(proposals[0]?.status, 'converted');
});

test('authenticated admin can manage occupational health environments and risks', async () => {
  const tenantResponse = await fetch(`${baseUrl}/api/v1/tenants`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-rh-user-id': 'user-1',
      'x-rh-role': 'admin',
    },
    body: JSON.stringify({ name: 'Empresa SST', slug: 'empresa-sst' }),
  });

  assert.equal(tenantResponse.status, 201);
  const tenant = (await tenantResponse.json()) as { id: string };

  const commonHeaders = {
    'content-type': 'application/json',
    'x-rh-user-id': 'user-1',
    'x-rh-role': 'admin',
    'x-rh-tenant-id': tenant.id,
  } as const;

  const companyResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/companies`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      legalName: 'Empresa SST LTDA',
      tradeName: 'SST',
      cnpj: '10203040000155',
    }),
  });
  assert.equal(companyResponse.status, 201);
  const company = (await companyResponse.json()) as { id: string };

  const environmentResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/sst/environments`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      companyId: company.id,
      code: 'ENV-001',
      name: 'Linha de produção',
      sector: 'Operações',
      validFrom: '2026-01-01T00:00:00.000Z',
      notes: 'Ambiente industrial inicial',
    }),
  });
  assert.equal(environmentResponse.status, 201);
  const environment = (await environmentResponse.json()) as { id: string; code: string };
  assert.equal(environment.code, 'ENV-001');

  const riskResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/sst/environments/${environment.id}/risks`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      code: 'RISK-001',
      name: 'Ruído contínuo',
      severity: 'high',
      probability: 'medium',
      controlMeasure: 'Uso de protetor auricular',
      validFrom: '2026-01-01T00:00:00.000Z',
      notes: 'Risco mapeado no ambiente principal',
    }),
  });
  assert.equal(riskResponse.status, 201);
  const risk = (await riskResponse.json()) as { code: string; severity: string };
  assert.equal(risk.code, 'RISK-001');
  assert.equal(risk.severity, 'high');

  const risksResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/sst/environments/${environment.id}/risks`, {
    headers: commonHeaders,
  });
  assert.equal(risksResponse.status, 200);
  const risks = (await risksResponse.json()) as Array<{ id: string }>;
  assert.equal(risks.length, 1);
});

test('authenticated admin can manage occupational health programs', async () => {
  const tenantResponse = await fetch(`${baseUrl}/api/v1/tenants`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-rh-user-id': 'user-1',
      'x-rh-role': 'admin',
    },
    body: JSON.stringify({ name: 'Empresa PGR', slug: 'empresa-pgr' }),
  });

  assert.equal(tenantResponse.status, 201);
  const tenant = (await tenantResponse.json()) as { id: string };

  const commonHeaders = {
    'content-type': 'application/json',
    'x-rh-user-id': 'user-1',
    'x-rh-role': 'admin',
    'x-rh-tenant-id': tenant.id,
  } as const;

  const companyResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/companies`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      legalName: 'Empresa PGR LTDA',
      tradeName: 'PGR',
      cnpj: '22334455000166',
    }),
  });
  assert.equal(companyResponse.status, 201);
  const company = (await companyResponse.json()) as { id: string };

  const pgrResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/sst/pgrs`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      companyId: company.id,
      code: 'PGR-001',
      title: 'Programa de Gerenciamento de Riscos',
      status: 'active',
      validFrom: '2026-01-01T00:00:00.000Z',
      notes: 'Primeira versao do programa',
    }),
  });
  assert.equal(pgrResponse.status, 201);
  const pgr = (await pgrResponse.json()) as { id: string; code: string };
  assert.equal(pgr.code, 'PGR-001');

  const pcmsoResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/sst/pcmsos`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      companyId: company.id,
      code: 'PCMSO-001',
      title: 'Programa de Controle Medico de Saude Ocupacional',
      status: 'active',
      validFrom: '2026-01-01T00:00:00.000Z',
      notes: 'Primeira versao do programa medico',
    }),
  });
  assert.equal(pcmsoResponse.status, 201);
  const pcmso = (await pcmsoResponse.json()) as { id: string; code: string };
  assert.equal(pcmso.code, 'PCMSO-001');

  const pgrsResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/sst/pgrs`, {
    headers: commonHeaders,
  });
  assert.equal(pgrsResponse.status, 200);
  const pgrs = (await pgrsResponse.json()) as Array<{ id: string }>;
  assert.equal(pgrs.length, 1);

  const pcmsosResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/sst/pcmsos`, {
    headers: commonHeaders,
  });
  assert.equal(pcmsosResponse.status, 200);
  const pcmsos = (await pcmsosResponse.json()) as Array<{ id: string }>;
  assert.equal(pcmsos.length, 1);
});

test('authenticated admin can manage occupational health cats and epi', async () => {
  const tenantResponse = await fetch(`${baseUrl}/api/v1/tenants`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-rh-user-id': 'user-1',
      'x-rh-role': 'admin',
    },
    body: JSON.stringify({ name: 'Empresa CAT EPI', slug: 'empresa-cat-epi' }),
  });

  assert.equal(tenantResponse.status, 201);
  const tenant = (await tenantResponse.json()) as { id: string };

  const commonHeaders = {
    'content-type': 'application/json',
    'x-rh-user-id': 'user-1',
    'x-rh-role': 'admin',
    'x-rh-tenant-id': tenant.id,
  } as const;

  const companyResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/companies`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      legalName: 'Empresa CAT EPI LTDA',
      tradeName: 'CATEPI',
      cnpj: '33445566000177',
    }),
  });
  assert.equal(companyResponse.status, 201);
  const company = (await companyResponse.json()) as { id: string };

  const personResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/persons`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      fullName: 'Pessoa CAT EPI',
      cpf: '80808080808',
    }),
  });
  assert.equal(personResponse.status, 201);
  const person = (await personResponse.json()) as { id: string };

  const employeeResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/employees`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      companyId: company.id,
      personId: person.id,
      code: 'CAT-001',
    }),
  });
  assert.equal(employeeResponse.status, 201);
  const employee = (await employeeResponse.json()) as { id: string };

  const catResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/sst/cats`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      companyId: company.id,
      employeeId: employee.id,
      reportNumber: 'CAT-001',
      accidentType: 'work_accident',
      occurredAt: '2026-03-01T08:15:00.000Z',
      status: 'open',
      description: 'Queda no posto de trabalho',
      notifiedAt: '2026-03-01T10:00:00.000Z',
      notes: 'Registro inicial',
    }),
  });
  assert.equal(catResponse.status, 201);
  const cat = (await catResponse.json()) as { reportNumber: string };
  assert.equal(cat.reportNumber, 'CAT-001');

  const epiCatalogResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/sst/epi-catalogs`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      companyId: company.id,
      code: 'EPI-001',
      name: 'Capacete de seguranca',
      active: true,
      validFrom: '2026-01-01T00:00:00.000Z',
      notes: 'Uso obrigatorio na area operacional',
    }),
  });
  assert.equal(epiCatalogResponse.status, 201);
  const epiCatalog = (await epiCatalogResponse.json()) as { id: string; code: string };
  assert.equal(epiCatalog.code, 'EPI-001');

  const epiAssignmentResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/sst/epi-assignments`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      employeeId: employee.id,
      epiCatalogId: epiCatalog.id,
      deliveredAt: '2026-03-01T09:00:00.000Z',
      status: 'delivered',
      receivedBy: 'Colaborador',
      notes: 'Entrega com ciencia',
    }),
  });
  assert.equal(epiAssignmentResponse.status, 201);
  const epiAssignment = (await epiAssignmentResponse.json()) as { epiCatalogId: string };
  assert.equal(epiAssignment.epiCatalogId, epiCatalog.id);

  const catsResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/sst/cats`, {
    headers: commonHeaders,
  });
  assert.equal(catsResponse.status, 200);
  const cats = (await catsResponse.json()) as Array<{ id: string }>;
  assert.equal(cats.length, 1);

  const epiCatalogsResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/sst/epi-catalogs`, {
    headers: commonHeaders,
  });
  assert.equal(epiCatalogsResponse.status, 200);
  const epiCatalogs = (await epiCatalogsResponse.json()) as Array<{ id: string }>;
  assert.equal(epiCatalogs.length, 1);

  const epiAssignmentsResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/sst/epi-assignments`, {
    headers: commonHeaders,
  });
  assert.equal(epiAssignmentsResponse.status, 200);
  const epiAssignments = (await epiAssignmentsResponse.json()) as Array<{ id: string }>;
  assert.equal(epiAssignments.length, 1);
});

test('authenticated admin can manage occupational health exams and aso', async () => {
  const tenantResponse = await fetch(`${baseUrl}/api/v1/tenants`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-rh-user-id': 'user-1',
      'x-rh-role': 'admin',
    },
    body: JSON.stringify({ name: 'Empresa ASO', slug: 'empresa-aso' }),
  });

  assert.equal(tenantResponse.status, 201);
  const tenant = (await tenantResponse.json()) as { id: string };

  const commonHeaders = {
    'content-type': 'application/json',
    'x-rh-user-id': 'user-1',
    'x-rh-role': 'admin',
    'x-rh-tenant-id': tenant.id,
  } as const;

  const companyResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/companies`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      legalName: 'Empresa ASO LTDA',
      tradeName: 'ASO',
      cnpj: '55667788000199',
    }),
  });
  assert.equal(companyResponse.status, 201);
  const company = (await companyResponse.json()) as { id: string };

  const personResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/persons`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      fullName: 'Pessoa ASO',
      cpf: '70707070707',
    }),
  });
  assert.equal(personResponse.status, 201);
  const person = (await personResponse.json()) as { id: string };

  const employeeResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/employees`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      companyId: company.id,
      personId: person.id,
      code: 'ASO-001',
    }),
  });
  assert.equal(employeeResponse.status, 201);
  const employee = (await employeeResponse.json()) as { id: string };

  const environmentResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/sst/environments`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      companyId: company.id,
      code: 'ENV-010',
      name: 'Posto administrativo',
      sector: 'Administrativo',
      validFrom: '2026-01-01T00:00:00.000Z',
      notes: 'Ambiente para exames admissionais',
    }),
  });
  assert.equal(environmentResponse.status, 201);
  const environment = (await environmentResponse.json()) as { id: string };

  const examResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/sst/exams`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      employeeId: employee.id,
      environmentId: environment.id,
      examType: 'admission',
      status: 'performed',
      scheduledAt: '2026-02-01T08:00:00.000Z',
      performedAt: '2026-02-01T08:30:00.000Z',
      result: 'fit',
      expiresAt: '2026-08-01T00:00:00.000Z',
      notes: 'Exame admissional concluido',
    }),
  });
  assert.equal(examResponse.status, 201);
  const exam = (await examResponse.json()) as { id: string; examType: string };
  assert.equal(exam.examType, 'admission');

  const asoResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/sst/exams/${exam.id}/aso`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      result: 'fit',
      issuer: 'Medico do trabalho',
      issuedAt: '2026-02-01T09:00:00.000Z',
      notes: 'ASO admissional emitido',
    }),
  });
  assert.equal(asoResponse.status, 201);
  const aso = (await asoResponse.json()) as { examId: string; result: string };
  assert.equal(aso.examId, exam.id);
  assert.equal(aso.result, 'fit');

  const examsResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/sst/exams`, {
    headers: commonHeaders,
  });
  assert.equal(examsResponse.status, 200);
  const exams = (await examsResponse.json()) as Array<{ id: string; aso?: { id: string } }>;
  assert.equal(exams.length, 1);
  assert.ok(exams[0]?.aso?.id);
});

test('authenticated admin can manage occupational health esocial transmissions', async () => {
  const tenantResponse = await fetch(`${baseUrl}/api/v1/tenants`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-rh-user-id': 'user-1',
      'x-rh-role': 'admin',
    },
    body: JSON.stringify({ name: 'Empresa SST Esocial', slug: 'empresa-sst-esocial' }),
  });

  assert.equal(tenantResponse.status, 201);
  const tenant = (await tenantResponse.json()) as { id: string };

  const commonHeaders = {
    'content-type': 'application/json',
    'x-rh-user-id': 'user-1',
    'x-rh-role': 'admin',
    'x-rh-tenant-id': tenant.id,
  } as const;

  const companyResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/companies`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      legalName: 'Empresa SST Esocial LTDA',
      tradeName: 'SSTE',
      cnpj: '99001122000166',
    }),
  });
  assert.equal(companyResponse.status, 201);
  const company = (await companyResponse.json()) as { id: string };

  const personResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/persons`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      fullName: 'Pessoa SST Esocial',
      cpf: '50505050505',
    }),
  });
  assert.equal(personResponse.status, 201);
  const person = (await personResponse.json()) as { id: string };

  const employeeResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/employees`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      companyId: company.id,
      personId: person.id,
      code: 'SST-001',
    }),
  });
  assert.equal(employeeResponse.status, 201);
  const employee = (await employeeResponse.json()) as { id: string };

  const environmentResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/sst/environments`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      companyId: company.id,
      code: 'ENV-ES-001',
      name: 'Ambiente eSocial',
      sector: 'Operacoes',
      validFrom: '2026-01-01T00:00:00.000Z',
      notes: 'Ambiente para S-2240',
    }),
  });
  assert.equal(environmentResponse.status, 201);
  const environment = (await environmentResponse.json()) as { id: string };

  const catResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/sst/cats`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      companyId: company.id,
      employeeId: employee.id,
      reportNumber: 'CAT-ES-001',
      accidentType: 'work_accident',
      occurredAt: '2026-03-02T08:15:00.000Z',
      status: 'open',
      description: 'Evento de teste para S-2210',
      notifiedAt: '2026-03-02T09:00:00.000Z',
      notes: 'CAT de teste',
    }),
  });
  assert.equal(catResponse.status, 201);
  const cat = (await catResponse.json()) as { id: string };

  const examResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/sst/exams`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      employeeId: employee.id,
      environmentId: environment.id,
      examType: 'periodic',
      status: 'performed',
      scheduledAt: '2026-03-03T08:00:00.000Z',
      performedAt: '2026-03-03T08:30:00.000Z',
      result: 'fit',
      expiresAt: '2026-09-03T00:00:00.000Z',
      notes: 'Exame de teste para S-2220',
    }),
  });
  assert.equal(examResponse.status, 201);
  const exam = (await examResponse.json()) as { id: string };

  const asoResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/sst/exams/${exam.id}/aso`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      result: 'fit',
      issuer: 'Medico do trabalho',
      issuedAt: '2026-03-03T09:00:00.000Z',
      notes: 'ASO de teste',
    }),
  });
  assert.equal(asoResponse.status, 201);

  const envTransmissionResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/sst/environments/${environment.id}/esocial-transmissions`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      notes: 'Envio ambiental',
    }),
  });
  assert.equal(envTransmissionResponse.status, 201);
  const envTransmission = (await envTransmissionResponse.json()) as { eventCode: string; status: string };
  assert.equal(envTransmission.eventCode, 'S-2240');
  assert.equal(envTransmission.status, 'queued');

  const catTransmissionResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/sst/cats/${cat.id}/esocial-transmissions`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      eventCode: 'S-2210',
      notes: 'Envio CAT',
    }),
  });
  assert.equal(catTransmissionResponse.status, 201);
  const catTransmission = (await catTransmissionResponse.json()) as { eventCode: string; status: string };
  assert.equal(catTransmission.eventCode, 'S-2210');
  assert.equal(catTransmission.status, 'queued');

  const examTransmissionResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/sst/exams/${exam.id}/esocial-transmissions`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      notes: 'Envio exame',
    }),
  });
  assert.equal(examTransmissionResponse.status, 201);
  const examTransmission = (await examTransmissionResponse.json()) as { eventCode: string; status: string };
  assert.equal(examTransmission.eventCode, 'S-2220');
  assert.equal(examTransmission.status, 'queued');

  const envListResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/sst/environments/${environment.id}/esocial-transmissions`, {
    headers: commonHeaders,
  });
  assert.equal(envListResponse.status, 200);
  const envList = (await envListResponse.json()) as Array<{ id: string }>;
  assert.equal(envList.length, 1);

  const catListResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/sst/cats/${cat.id}/esocial-transmissions`, {
    headers: commonHeaders,
  });
  assert.equal(catListResponse.status, 200);
  const catList = (await catListResponse.json()) as Array<{ id: string }>;
  assert.equal(catList.length, 1);

  const examListResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/sst/exams/${exam.id}/esocial-transmissions`, {
    headers: commonHeaders,
  });
  assert.equal(examListResponse.status, 200);
  const examList = (await examListResponse.json()) as Array<{ id: string }>;
  assert.equal(examList.length, 1);
});

test('authenticated admin can manage occupational health training catalogs and assignments', async () => {
  const tenantResponse = await fetch(`${baseUrl}/api/v1/tenants`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-rh-user-id': 'user-1',
      'x-rh-role': 'admin',
    },
    body: JSON.stringify({ name: 'Empresa Treinamento SST', slug: 'empresa-treinamento-sst' }),
  });

  assert.equal(tenantResponse.status, 201);
  const tenant = (await tenantResponse.json()) as { id: string };

  const commonHeaders = {
    'content-type': 'application/json',
    'x-rh-user-id': 'user-1',
    'x-rh-role': 'admin',
    'x-rh-tenant-id': tenant.id,
  } as const;

  const companyResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/companies`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      legalName: 'Empresa Treinamento SST LTDA',
      tradeName: 'TSST',
      cnpj: '55001122000166',
    }),
  });
  assert.equal(companyResponse.status, 201);
  const company = (await companyResponse.json()) as { id: string };

  const personResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/persons`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      fullName: 'Pessoa Treinamento SST',
      cpf: '40404040404',
    }),
  });
  assert.equal(personResponse.status, 201);
  const person = (await personResponse.json()) as { id: string };

  const employeeResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/employees`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      companyId: company.id,
      personId: person.id,
      code: 'TRN-001',
    }),
  });
  assert.equal(employeeResponse.status, 201);
  const employee = (await employeeResponse.json()) as { id: string };

  const catalogResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/sst/training-catalogs`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      companyId: company.id,
      code: 'TRN-001',
      title: 'Treinamento de seguranca operacional',
      description: 'Treinamento basico de SST',
      mandatory: true,
      active: true,
      validFrom: '2026-01-01T00:00:00.000Z',
      notes: 'Treinamento inicial',
    }),
  });
  assert.equal(catalogResponse.status, 201);
  const catalog = (await catalogResponse.json()) as { id: string; code: string };
  assert.equal(catalog.code, 'TRN-001');

  const assignmentResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/sst/training-assignments`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      employeeId: employee.id,
      trainingCatalogId: catalog.id,
      dueAt: '2026-03-15T00:00:00.000Z',
      expiresAt: '2026-09-15T00:00:00.000Z',
      score: 95,
      notes: 'Atribuicao inicial',
    }),
  });
  assert.equal(assignmentResponse.status, 201);
  const assignment = (await assignmentResponse.json()) as { id: string; status: string };
  assert.equal(assignment.status, 'assigned');

  const completeResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/sst/training-assignments/${assignment.id}/complete`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      completedAt: '2026-03-10T10:00:00.000Z',
      score: 97,
      notes: 'Conclusao validada',
    }),
  });
  assert.equal(completeResponse.status, 201);
  const completed = (await completeResponse.json()) as { status: string; completedBy?: string };
  assert.equal(completed.status, 'completed');
  assert.equal(completed.completedBy, undefined);

  const catalogListResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/sst/training-catalogs`, {
    headers: commonHeaders,
  });
  assert.equal(catalogListResponse.status, 200);
  const catalogList = (await catalogListResponse.json()) as Array<{ id: string }>;
  assert.equal(catalogList.length, 1);

  const assignmentListResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/sst/training-assignments`, {
    headers: commonHeaders,
  });
  assert.equal(assignmentListResponse.status, 200);
  const assignmentList = (await assignmentListResponse.json()) as Array<{ id: string; status: string }>;
  assert.equal(assignmentList.length, 1);
  assert.equal(assignmentList[0]?.status, 'completed');
});

test('authenticated admin can manage vacation balances and requests', async () => {
  const tenantResponse = await fetch(`${baseUrl}/api/v1/tenants`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-rh-user-id': 'user-1',
      'x-rh-role': 'admin',
    },
    body: JSON.stringify({ name: 'Empresa Ferias', slug: 'empresa-ferias' }),
  });

  assert.equal(tenantResponse.status, 201);
  const tenant = (await tenantResponse.json()) as { id: string };

  const commonHeaders = {
    'content-type': 'application/json',
    'x-rh-user-id': 'user-1',
    'x-rh-role': 'admin',
    'x-rh-tenant-id': tenant.id,
  } as const;

  const companyResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/companies`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      legalName: 'Empresa Ferias LTDA',
      tradeName: 'Ferias',
      cnpj: '66001122000177',
    }),
  });
  assert.equal(companyResponse.status, 201);
  const company = (await companyResponse.json()) as { id: string };

  const personResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/persons`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      fullName: 'Pessoa Ferias',
      cpf: '60606060606',
    }),
  });
  assert.equal(personResponse.status, 201);
  const person = (await personResponse.json()) as { id: string };

  const employeeResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/employees`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      companyId: company.id,
      personId: person.id,
      code: 'FER-001',
    }),
  });
  assert.equal(employeeResponse.status, 201);
  const employee = (await employeeResponse.json()) as { id: string };

  const balanceResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/vacations/balances`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      employeeId: employee.id,
      referenceStart: '2026-01-01T00:00:00.000Z',
      referenceEnd: '2026-12-31T23:59:59.000Z',
      accruedDays: 30,
      notes: 'Periodo anual',
    }),
  });
  assert.equal(balanceResponse.status, 201);
  const balance = (await balanceResponse.json()) as { id: string; availableDays: number };
  assert.equal(balance.availableDays, 30);

  const requestResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/vacations/requests`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      employeeId: employee.id,
      vacationBalanceId: balance.id,
      plannedStart: '2027-01-01T00:00:00.000Z',
      plannedEnd: '2027-01-10T00:00:00.000Z',
      notes: 'Ferias programadas',
    }),
  });
  assert.equal(requestResponse.status, 201);
  const request = (await requestResponse.json()) as { id: string; requestedDays: number; status: string };
  assert.equal(request.requestedDays, 10);
  assert.equal(request.status, 'requested');

  const approveResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/vacations/requests/${request.id}/approve`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({ notes: 'Aprovado' }),
  });
  assert.equal(approveResponse.status, 201);
  const approved = (await approveResponse.json()) as { status: string };
  assert.equal(approved.status, 'approved');

  const cancelResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/vacations/requests/${request.id}/cancel`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({ notes: 'Reprogramacao' }),
  });
  assert.equal(cancelResponse.status, 201);
  const cancelled = (await cancelResponse.json()) as { status: string };
  assert.equal(cancelled.status, 'cancelled');

  const secondRequestResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/vacations/requests`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      employeeId: employee.id,
      vacationBalanceId: balance.id,
      plannedStart: '2027-01-15T00:00:00.000Z',
      plannedEnd: '2027-01-24T00:00:00.000Z',
      notes: 'Ferias com aviso e pagamento',
    }),
  });
  assert.equal(secondRequestResponse.status, 201);
  const secondRequest = (await secondRequestResponse.json()) as { id: string };

  const noticeResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/vacations/requests/${secondRequest.id}/notice`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({ notes: 'Aviso formal' }),
  });
  assert.equal(noticeResponse.status, 201);
  const noticed = (await noticeResponse.json()) as { status: string; noticeProtocol?: string };
  assert.equal(noticed.status, 'notified');
  assert.ok(noticed.noticeProtocol);

  const paymentResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/vacations/requests/${secondRequest.id}/payment`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({ notes: 'Pagamento concluido' }),
  });
  assert.equal(paymentResponse.status, 201);
  const paid = (await paymentResponse.json()) as { status: string };
  assert.equal(paid.status, 'paid');

  const payrollResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/vacations/requests/${secondRequest.id}/send-to-payroll`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({ notes: 'Envio para folha' }),
  });
  assert.equal(payrollResponse.status, 201);
  const payrollIntegrated = (await payrollResponse.json()) as {
    payrollStatus?: string;
    payrollReceiptNumber?: string;
  };
  assert.equal(payrollIntegrated.payrollStatus, 'sent');
  assert.ok(payrollIntegrated.payrollReceiptNumber);

  const esocialResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/vacations/requests/${secondRequest.id}/esocial-transmissions`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({ eventCode: 'S-2230', notes: 'Envio para eSocial' }),
  });
  assert.equal(esocialResponse.status, 201);
  const esocialTransmission = (await esocialResponse.json()) as { eventCode: string; status: string };
  assert.equal(esocialTransmission.eventCode, 'S-2230');
  assert.equal(esocialTransmission.status, 'queued');

  const esocialListResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/vacations/requests/${secondRequest.id}/esocial-transmissions`, {
    method: 'GET',
    headers: commonHeaders,
  });
  assert.equal(esocialListResponse.status, 200);
  const esocialList = (await esocialListResponse.json()) as Array<{ id: string; status: string }>;
  assert.equal(esocialList.length, 1);
  assert.equal(esocialList[0]?.status, 'queued');

  const splitVacationResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/vacations/requests`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      employeeId: employee.id,
      vacationBalanceId: balance.id,
      plannedStart: '2027-02-01T00:00:00.000Z',
      plannedEnd: '2027-02-20T00:00:00.000Z',
      abonoDays: 10,
      salaryBaseCents: 300000,
      periods: [
        {
          plannedStart: '2027-02-01T00:00:00.000Z',
          plannedEnd: '2027-02-14T00:00:00.000Z',
        },
        {
          plannedStart: '2027-02-17T00:00:00.000Z',
          plannedEnd: '2027-02-22T00:00:00.000Z',
        },
      ],
      notes: 'Ferias fracionadas com abono',
    }),
  });
  assert.equal(splitVacationResponse.status, 201);
  const splitVacation = (await splitVacationResponse.json()) as { requestedDays: number; consumedDays: number };
  assert.equal(splitVacation.requestedDays, 20);
  assert.equal(splitVacation.consumedDays, 30);
});

test('authenticated admin can calculate and approve thirteenth salary', async () => {
  const tenantResponse = await fetch(`${baseUrl}/api/v1/tenants`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-rh-user-id': 'user-1',
      'x-rh-role': 'admin',
    },
    body: JSON.stringify({ name: 'Empresa 13 Salario', slug: 'empresa-13-salario' }),
  });

  assert.equal(tenantResponse.status, 201);
  const tenant = (await tenantResponse.json()) as { id: string };

  const commonHeaders = {
    'content-type': 'application/json',
    'x-rh-user-id': 'user-1',
    'x-rh-role': 'admin',
    'x-rh-tenant-id': tenant.id,
  } as const;

  const companyResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/companies`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      legalName: 'Empresa 13 Salario LTDA',
      tradeName: '13 Salario',
      cnpj: '33445566000888',
    }),
  });
  assert.equal(companyResponse.status, 201);
  const company = (await companyResponse.json()) as { id: string };

  const personResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/persons`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      fullName: 'Pessoa 13 Salario',
      cpf: '55566677789',
    }),
  });
  assert.equal(personResponse.status, 201);
  const person = (await personResponse.json()) as { id: string };

  const employeeResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/employees`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      companyId: company.id,
      personId: person.id,
      code: '13-001',
    }),
  });
  assert.equal(employeeResponse.status, 201);
  const employee = (await employeeResponse.json()) as { id: string };

  await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/admissions`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      personId: person.id,
      companyId: company.id,
      employeeId: employee.id,
    }),
  });

  const calculationResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/thirteenth-salary/calculate`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      employeeId: employee.id,
      referenceYear: 2026,
      salaryBaseCents: 300000,
      variableAverageAmountCents: 25000,
      employerChargesAmountCents: 15000,
      notes: 'Apuracao 13o inicial',
    }),
  });
  assert.equal(calculationResponse.status, 201);
  const calculation = (await calculationResponse.json()) as {
    id: string;
    status: string;
    totalAmountCents: number;
    firstParcelAmountCents: number;
    secondParcelAmountCents: number;
    variableAverageAmountCents: number;
    employerChargesAmountCents: number;
  };
  assert.equal(calculation.status, 'calculated');
  assert.equal(calculation.totalAmountCents, 200000);
  assert.equal(calculation.firstParcelAmountCents, 87500);
  assert.equal(calculation.secondParcelAmountCents, 112500);
  assert.equal(calculation.variableAverageAmountCents, 25000);
  assert.equal(calculation.employerChargesAmountCents, 15000);

  const approveResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/thirteenth-salary/calculations/${calculation.id}/approve`, {
    method: 'POST',
    headers: commonHeaders,
  });
  assert.equal(approveResponse.status, 201);
  const approved = (await approveResponse.json()) as { status: string };
  assert.equal(approved.status, 'approved');

  const payrollResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/thirteenth-salary/calculations/${calculation.id}/send-to-payroll`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      notes: 'Integração do 13o com folha',
    }),
  });
  assert.equal(payrollResponse.status, 201);
  const payroll = (await payrollResponse.json()) as {
    payrollStatus: string;
    payrollBatchId: string;
    payrollReceiptNumber: string;
  };
  assert.equal(payroll.payrollStatus, 'sent');
  assert.ok(payroll.payrollBatchId);
  assert.ok(payroll.payrollReceiptNumber);
});

test('authenticated admin can calculate and approve night shift allowance', async () => {
  const tenantResponse = await fetch(`${baseUrl}/api/v1/tenants`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-rh-user-id': 'user-1',
      'x-rh-role': 'admin',
    },
    body: JSON.stringify({ name: 'Empresa Noturno', slug: 'empresa-noturno' }),
  });

  assert.equal(tenantResponse.status, 201);
  const tenant = (await tenantResponse.json()) as { id: string };

  const commonHeaders = {
    'content-type': 'application/json',
    'x-rh-user-id': 'user-1',
    'x-rh-role': 'admin',
    'x-rh-tenant-id': tenant.id,
  } as const;

  const companyResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/companies`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      legalName: 'Empresa Noturno LTDA',
      tradeName: 'Noturno',
      cnpj: '33445566000177',
    }),
  });
  assert.equal(companyResponse.status, 201);
  const company = (await companyResponse.json()) as { id: string };

  const personResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/persons`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      fullName: 'Pessoa Noturno',
      cpf: '55566677788',
    }),
  });
  assert.equal(personResponse.status, 201);
  const person = (await personResponse.json()) as { id: string };

  const employeeResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/employees`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      companyId: company.id,
      personId: person.id,
      code: 'N-001',
    }),
  });
  assert.equal(employeeResponse.status, 201);
  const employee = (await employeeResponse.json()) as { id: string };

  const firstMarkResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/point-marks`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      employeeId: employee.id,
      occurredAt: '2026-06-01T21:00:00.000Z',
    }),
  });
  assert.equal(firstMarkResponse.status, 201);

  const secondMarkResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/point-marks`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      employeeId: employee.id,
      occurredAt: '2026-06-02T02:00:00.000Z',
    }),
  });
  assert.equal(secondMarkResponse.status, 201);

  const calculationResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/night-shift-allowance/calculate`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      employeeId: employee.id,
      periodStart: '2026-06-01T00:00:00.000Z',
      periodEnd: '2026-06-02T23:59:59.000Z',
      notes: 'Apuracao noturna inicial',
    }),
  });
  assert.equal(calculationResponse.status, 201);
  const calculation = (await calculationResponse.json()) as { id: string; status: string; totalMinutes: number; items: Array<{ minutes: number }> };
  assert.equal(calculation.status, 'calculated');
  assert.equal(calculation.totalMinutes, 240);
  assert.equal(calculation.items.length, 1);
  assert.equal(calculation.items[0]?.minutes, 240);

  const approveResponse = await fetch(
    `${baseUrl}/api/v1/tenants/${tenant.id}/night-shift-allowance/calculations/${calculation.id}/approve`,
    {
      method: 'POST',
      headers: commonHeaders,
    },
  );
  assert.equal(approveResponse.status, 201);
  const approved = (await approveResponse.json()) as { status: string };
  assert.equal(approved.status, 'approved');

  const getResponse = await fetch(
    `${baseUrl}/api/v1/tenants/${tenant.id}/night-shift-allowance/calculations/${calculation.id}`,
    {
      headers: commonHeaders,
    },
  );
  assert.equal(getResponse.status, 200);
  const loaded = (await getResponse.json()) as { status: string; items: Array<{ minutes: number }> };
  assert.equal(loaded.status, 'approved');
  assert.equal(loaded.items.length, 1);
});

test('authenticated admin can calculate and approve weekly rest allowance', async () => {
  const tenantResponse = await fetch(`${baseUrl}/api/v1/tenants`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-rh-user-id': 'user-1',
      'x-rh-role': 'admin',
    },
    body: JSON.stringify({ name: 'Empresa DSR', slug: 'empresa-dsr' }),
  });

  assert.equal(tenantResponse.status, 201);
  const tenant = (await tenantResponse.json()) as { id: string };

  const commonHeaders = {
    'content-type': 'application/json',
    'x-rh-user-id': 'user-1',
    'x-rh-role': 'admin',
    'x-rh-tenant-id': tenant.id,
  } as const;

  const companyResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/companies`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      legalName: 'Empresa DSR LTDA',
      tradeName: 'DSR',
      cnpj: '44556677000155',
    }),
  });
  assert.equal(companyResponse.status, 201);
  const company = (await companyResponse.json()) as { id: string };

  const personResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/persons`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      fullName: 'Pessoa DSR',
      cpf: '66677788899',
    }),
  });
  assert.equal(personResponse.status, 201);
  const person = (await personResponse.json()) as { id: string };

  const employeeResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/employees`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      companyId: company.id,
      personId: person.id,
      code: 'D-001',
    }),
  });
  assert.equal(employeeResponse.status, 201);
  const employee = (await employeeResponse.json()) as { id: string };

  const firstMarkResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/point-marks`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      employeeId: employee.id,
      occurredAt: '2026-06-07T21:00:00.000Z',
    }),
  });
  assert.equal(firstMarkResponse.status, 201);

  const secondMarkResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/point-marks`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      employeeId: employee.id,
      occurredAt: '2026-06-07T23:00:00.000Z',
    }),
  });
  assert.equal(secondMarkResponse.status, 201);

  const calculationResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/weekly-rest-allowance/calculate`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      employeeId: employee.id,
      periodStart: '2026-06-07T00:00:00.000Z',
      periodEnd: '2026-06-14T23:59:59.000Z',
      notes: 'Apuracao DSR inicial',
    }),
  });
  assert.equal(calculationResponse.status, 201);
  const calculation = (await calculationResponse.json()) as { id: string; status: string; totalMinutes: number; items: Array<{ dayType: string }> };
  assert.equal(calculation.status, 'calculated');
  assert.equal(calculation.totalMinutes, 120);
  assert.equal(calculation.items.length, 2);

  const approveResponse = await fetch(
    `${baseUrl}/api/v1/tenants/${tenant.id}/weekly-rest-allowance/calculations/${calculation.id}/approve`,
    {
      method: 'POST',
      headers: commonHeaders,
    },
  );
  assert.equal(approveResponse.status, 201);
  const approved = (await approveResponse.json()) as { status: string };
  assert.equal(approved.status, 'approved');

  const getResponse = await fetch(
    `${baseUrl}/api/v1/tenants/${tenant.id}/weekly-rest-allowance/calculations/${calculation.id}`,
    {
      headers: commonHeaders,
    },
  );
  assert.equal(getResponse.status, 200);
  const loaded = (await getResponse.json()) as { status: string; items: Array<{ dayType: string }> };
  assert.equal(loaded.status, 'approved');
  assert.equal(loaded.items.length, 2);
});

test('authenticated admin can consolidate and approve point events for payroll', async () => {
  const tenantResponse = await fetch(`${baseUrl}/api/v1/tenants`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-rh-user-id': 'user-1',
      'x-rh-role': 'admin',
    },
    body: JSON.stringify({ name: 'Empresa Folha', slug: 'empresa-folha' }),
  });

  assert.equal(tenantResponse.status, 201);
  const tenant = (await tenantResponse.json()) as { id: string };

  const commonHeaders = {
    'content-type': 'application/json',
    'x-rh-user-id': 'user-1',
    'x-rh-role': 'admin',
    'x-rh-tenant-id': tenant.id,
  } as const;

  const companyResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/companies`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      legalName: 'Empresa Folha LTDA',
      tradeName: 'Folha',
      cnpj: '55664433000111',
    }),
  });
  assert.equal(companyResponse.status, 201);
  const company = (await companyResponse.json()) as { id: string };

  const personResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/persons`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      fullName: 'Pessoa Folha',
      cpf: '77788899900',
    }),
  });
  assert.equal(personResponse.status, 201);
  const person = (await personResponse.json()) as { id: string };

  const employeeResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/employees`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      companyId: company.id,
      personId: person.id,
      code: 'F-001',
    }),
  });
  assert.equal(employeeResponse.status, 201);
  const employee = (await employeeResponse.json()) as { id: string };

  const markBodies = [
    { employeeId: employee.id, occurredAt: '2026-06-01T21:00:00.000Z' },
    { employeeId: employee.id, occurredAt: '2026-06-02T02:00:00.000Z' },
    { employeeId: employee.id, occurredAt: '2026-06-07T21:00:00.000Z' },
    { employeeId: employee.id, occurredAt: '2026-06-07T23:00:00.000Z' },
  ];
  for (const body of markBodies) {
    const response = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/point-marks`, {
      method: 'POST',
      headers: commonHeaders,
      body: JSON.stringify(body),
    });
    assert.equal(response.status, 201);
  }

  const nightResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/night-shift-allowance/calculate`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      employeeId: employee.id,
      periodStart: '2026-06-01T00:00:00.000Z',
      periodEnd: '2026-06-02T23:59:59.000Z',
      notes: 'Apuracao noturna',
    }),
  });
  assert.equal(nightResponse.status, 201);
  const night = (await nightResponse.json()) as { id: string };
  const nightApproveResponse = await fetch(
    `${baseUrl}/api/v1/tenants/${tenant.id}/night-shift-allowance/calculations/${night.id}/approve`,
    {
      method: 'POST',
      headers: commonHeaders,
    },
  );
  assert.equal(nightApproveResponse.status, 201);

  const weeklyResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/weekly-rest-allowance/calculate`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      employeeId: employee.id,
      periodStart: '2026-06-07T00:00:00.000Z',
      periodEnd: '2026-06-14T23:59:59.000Z',
      notes: 'Apuracao DSR',
    }),
  });
  assert.equal(weeklyResponse.status, 201);
  const weekly = (await weeklyResponse.json()) as { id: string };
  const weeklyApproveResponse = await fetch(
    `${baseUrl}/api/v1/tenants/${tenant.id}/weekly-rest-allowance/calculations/${weekly.id}/approve`,
    {
      method: 'POST',
      headers: commonHeaders,
    },
  );
  assert.equal(weeklyApproveResponse.status, 201);

  const batchResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/time-sheet/payroll-events/consolidate`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      employeeId: employee.id,
      sourcePeriodStart: '2026-06-01T00:00:00.000Z',
      sourcePeriodEnd: '2026-06-14T23:59:59.000Z',
      payrollPeriod: '2026-06',
      notes: 'Consolidacao inicial para folha',
    }),
  });
  assert.equal(batchResponse.status, 201);
  const batch = (await batchResponse.json()) as { id: string; status: string; items: Array<{ payrollRubricCode: string }> };
  assert.equal(batch.status, 'consolidated');
  assert.equal(batch.items.length, 2);
  assert.equal(batch.items[0]?.payrollRubricCode, 'ADIC_NOTURNO');
  assert.equal(batch.items[1]?.payrollRubricCode, 'DSR');

  const approveResponse = await fetch(
    `${baseUrl}/api/v1/tenants/${tenant.id}/time-sheet/payroll-events/batches/${batch.id}/approve`,
    {
      method: 'POST',
      headers: commonHeaders,
    },
  );
  assert.equal(approveResponse.status, 201);
  const approved = (await approveResponse.json()) as { status: string };
  assert.equal(approved.status, 'approved');

  const sendResponse = await fetch(
    `${baseUrl}/api/v1/tenants/${tenant.id}/time-sheet/payroll-events/batches/${batch.id}/send-to-payroll`,
    {
      method: 'POST',
      headers: commonHeaders,
    },
  );
  assert.equal(sendResponse.status, 201);
  const sent = (await sendResponse.json()) as { status: string; payrollReceiptNumber?: string };
  assert.equal(sent.status, 'sent');
  assert.ok(sent.payrollReceiptNumber);

  const erpResponse = await fetch(
    `${baseUrl}/api/v1/tenants/${tenant.id}/time-sheet/payroll-events/batches/${batch.id}/send-to-erp`,
    {
      method: 'POST',
      headers: commonHeaders,
    },
  );
  assert.equal(erpResponse.status, 201);
  const erpSynced = (await erpResponse.json()) as { status: string; erpStatus?: string; erpReceiptNumber?: string };
  assert.equal(erpSynced.status, 'sent');
  assert.equal(erpSynced.erpStatus, 'sent');
  assert.ok(erpSynced.erpReceiptNumber);

  const bankResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/integrations/bank/sync`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      tenantId: tenant.id,
      batchId: batch.id,
    }),
  });
  assert.equal(bankResponse.status, 201);
  const bankSynced = (await bankResponse.json()) as {
    status: string;
    bankStatus?: string;
    bankReceiptNumber?: string;
  };
  assert.equal(bankSynced.status, 'sent');
  assert.equal(bankSynced.bankStatus, 'sent');
  assert.ok(bankSynced.bankReceiptNumber);

  const benefitsResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/integrations/benefits/sync`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      tenantId: tenant.id,
      employeeId: employee.id,
      benefitCode: 'PLANO_SAUDE',
      movementType: 'include',
      notes: 'Inclusao automatica do plano',
    }),
  });
  assert.equal(benefitsResponse.status, 201);
  const benefitsSynced = (await benefitsResponse.json()) as {
    status: string;
    integrationType?: string;
    id: string;
  };
  assert.equal(benefitsSynced.status, 'completed');
  assert.equal(benefitsSynced.integrationType, 'benefits');

  const failBenefitsResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/integrations/${benefitsSynced.id}/fail`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      tenantId: tenant.id,
      reason: 'Operadora indisponivel',
    }),
  });
  assert.equal(failBenefitsResponse.status, 201);
  const benefitsFailed = (await failBenefitsResponse.json()) as { status: string };
  assert.equal(benefitsFailed.status, 'failed');

  const retryBenefitsResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/integrations/${benefitsSynced.id}/retry`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      tenantId: tenant.id,
      notes: 'Nova tentativa apos indisponibilidade',
    }),
  });
  assert.equal(retryBenefitsResponse.status, 201);
  const benefitsRetried = (await retryBenefitsResponse.json()) as { status: string };
  assert.equal(benefitsRetried.status, 'requested');

  const dlqBenefitsResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/integrations/${benefitsSynced.id}/dlq`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      tenantId: tenant.id,
      reason: 'Falha permanente na operadora',
    }),
  });
  assert.equal(dlqBenefitsResponse.status, 201);
  const benefitsDlq = (await dlqBenefitsResponse.json()) as { status: string; dlqReason?: string };
  assert.equal(benefitsDlq.status, 'dlq');
  assert.ok(benefitsDlq.dlqReason);

  const identityResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/integrations/identity/sync`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      tenantId: tenant.id,
      subject: 'user-1',
      action: 'sync',
      notes: 'Sincronizacao de atributos',
    }),
  });
  assert.equal(identityResponse.status, 201);
  const identitySynced = (await identityResponse.json()) as {
    status: string;
    integrationType?: string;
  };
  assert.equal(identitySynced.status, 'completed');
  assert.equal(identitySynced.integrationType, 'identity');

  const monitoringResponse = await fetch(
    `${baseUrl}/api/v1/tenants/${tenant.id}/integrations/monitoring`,
    {
      headers: commonHeaders,
    },
  );
  assert.equal(monitoringResponse.status, 200);
  const monitoring = (await monitoringResponse.json()) as {
    counts: { total: number; completed: number; failed: number; dlq: number; attempts: number };
  };
  assert.equal(monitoring.counts.total, 2);
  assert.equal(monitoring.counts.completed, 1);
  assert.equal(monitoring.counts.failed, 0);
  assert.equal(monitoring.counts.dlq, 1);
  assert.equal(monitoring.counts.attempts, 5);

  const getResponse = await fetch(
    `${baseUrl}/api/v1/tenants/${tenant.id}/time-sheet/payroll-events/batches/${batch.id}`,
    {
      headers: commonHeaders,
    },
  );
  assert.equal(getResponse.status, 200);
  const loaded = (await getResponse.json()) as {
    status: string;
    erpStatus?: string;
    bankStatus?: string;
    items: Array<{ payrollRubricCode: string }>;
  };
  assert.equal(loaded.status, 'sent');
  assert.equal(loaded.erpStatus, 'sent');
  assert.equal(loaded.bankStatus, 'sent');
  assert.equal(loaded.items.length, 2);
});

test('authenticated admin can create, read and cancel an admission draft', async () => {
  const tenantResponse = await fetch(`${baseUrl}/api/v1/tenants`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-rh-user-id': 'user-1',
      'x-rh-role': 'admin',
    },
    body: JSON.stringify({ name: 'Empresa Admissao', slug: 'empresa-admissao' }),
  });

  assert.equal(tenantResponse.status, 201);
  const tenant = (await tenantResponse.json()) as { id: string };

  const commonHeaders = {
    'content-type': 'application/json',
    'x-rh-user-id': 'user-1',
    'x-rh-role': 'admin',
    'x-rh-tenant-id': tenant.id,
  } as const;

  const companyResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/companies`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      legalName: 'Empresa Admissao LTDA',
      tradeName: 'Admissao',
      cnpj: '22334455000166',
    }),
  });
  assert.equal(companyResponse.status, 201);
  const company = (await companyResponse.json()) as { id: string };

  const personResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/persons`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      fullName: 'Pessoa Admissao',
      cpf: '44455566677',
    }),
  });
  assert.equal(personResponse.status, 201);
  const person = (await personResponse.json()) as { id: string };

  const employeeResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/employees`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      companyId: company.id,
      personId: person.id,
      code: 'ADM-001',
    }),
  });
  assert.equal(employeeResponse.status, 201);
  const employee = (await employeeResponse.json()) as { id: string };

  const admissionResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/admissions`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      personId: person.id,
      companyId: company.id,
      employeeId: employee.id,
    }),
  });
  assert.equal(admissionResponse.status, 201);
  const admission = (await admissionResponse.json()) as { id: string; status: string };
  assert.equal(admission.status, 'draft');

  const getAdmissionResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/admissions/${admission.id}`, {
    headers: {
      'x-rh-user-id': 'user-1',
      'x-rh-role': 'auditor',
      'x-rh-tenant-id': tenant.id,
    },
  });
  assert.equal(getAdmissionResponse.status, 200);
  const loaded = (await getAdmissionResponse.json()) as { history: Array<{ eventType: string }> };
  assert.equal(loaded.history.length, 1);
  assert.equal(loaded.history[0]?.eventType, 'admission.created');

  const cancelResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/admissions/${admission.id}/cancel`, {
    method: 'POST',
    headers: commonHeaders,
  });
  assert.equal(cancelResponse.status, 201);
  const cancelled = (await cancelResponse.json()) as { status: string };
  assert.equal(cancelled.status, 'cancelled');

  const listAdmissionsResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/admissions`, {
    headers: {
      'x-rh-user-id': 'user-1',
      'x-rh-role': 'auditor',
      'x-rh-tenant-id': tenant.id,
    },
  });
  assert.equal(listAdmissionsResponse.status, 200);
  const admissions = (await listAdmissionsResponse.json()) as Array<{ id: string; status: string }>;
  assert.equal(admissions.length, 1);
  assert.equal(admissions[0]?.status, 'cancelled');
});

test('authenticated admin can manage the admission checklist minimum', async () => {
  const tenantResponse = await fetch(`${baseUrl}/api/v1/tenants`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-rh-user-id': 'user-1',
      'x-rh-role': 'admin',
    },
    body: JSON.stringify({ name: 'Empresa Checklist', slug: 'empresa-checklist' }),
  });

  assert.equal(tenantResponse.status, 201);
  const tenant = (await tenantResponse.json()) as { id: string };

  const commonHeaders = {
    'content-type': 'application/json',
    'x-rh-user-id': 'user-1',
    'x-rh-role': 'admin',
    'x-rh-tenant-id': tenant.id,
  } as const;

  const companyResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/companies`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      legalName: 'Empresa Checklist LTDA',
      tradeName: 'Checklist',
      cnpj: '33445566000177',
    }),
  });
  assert.equal(companyResponse.status, 201);
  const company = (await companyResponse.json()) as { id: string };

  const personResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/persons`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      fullName: 'Pessoa Checklist',
      cpf: '55566677788',
    }),
  });
  assert.equal(personResponse.status, 201);
  const person = (await personResponse.json()) as { id: string };

  const employeeResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/employees`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      companyId: company.id,
      personId: person.id,
      code: 'CHK-001',
    }),
  });
  assert.equal(employeeResponse.status, 201);
  const employee = (await employeeResponse.json()) as { id: string };

  const admissionResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/admissions`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      personId: person.id,
      companyId: company.id,
      employeeId: employee.id,
    }),
  });
  assert.equal(admissionResponse.status, 201);
  const admission = (await admissionResponse.json()) as { id: string; status: string };
  assert.equal(admission.status, 'draft');

  const checklistResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/admissions/${admission.id}/checklist`, {
    headers: {
      'x-rh-user-id': 'user-1',
      'x-rh-role': 'auditor',
      'x-rh-tenant-id': tenant.id,
    },
  });
  assert.equal(checklistResponse.status, 200);
  const checklist = (await checklistResponse.json()) as Array<{ id: string; status: string; code: string }>;
  assert.equal(checklist.length, 3);
  assert.equal(checklist[0]?.status, 'pending');

  for (const item of checklist) {
    const receiveResponse = await fetch(
      `${baseUrl}/api/v1/tenants/${tenant.id}/admissions/${admission.id}/checklist/${item.id}/receive`,
      {
        method: 'POST',
        headers: commonHeaders,
      },
    );
    assert.equal(receiveResponse.status, 201);
  }

  const loadedAdmissionResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/admissions/${admission.id}`, {
    headers: {
      'x-rh-user-id': 'user-1',
      'x-rh-role': 'auditor',
      'x-rh-tenant-id': tenant.id,
    },
  });
  assert.equal(loadedAdmissionResponse.status, 200);
  const loadedAdmission = (await loadedAdmissionResponse.json()) as { status: string; history: Array<{ eventType: string }> };
  assert.equal(loadedAdmission.status, 'under_review');
  assert.equal(loadedAdmission.history.at(-1)?.eventType, 'admission.ready_for_contract');
});

test('authenticated admin can formalize the admission contract snapshot', async () => {
  const adminHeaders = {
    'content-type': 'application/json',
    'x-rh-user-id': 'user-1',
    'x-rh-role': 'admin',
  } as const;

  const tenantResponse = await fetch(`${baseUrl}/api/v1/tenants`, {
    method: 'POST',
    headers: adminHeaders,
    body: JSON.stringify({
      name: 'Empresa Contrato HTTP',
      slug: `empresa-contrato-http-${Date.now()}`,
    }),
  });

  assert.equal(tenantResponse.status, 201);
  const tenant = (await tenantResponse.json()) as { id: string };

  const commonHeaders = {
    'content-type': 'application/json',
    'x-rh-user-id': 'user-1',
    'x-rh-role': 'admin',
    'x-rh-tenant-id': tenant.id,
  } as const;

  const companyResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/companies`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      legalName: 'Empresa Contrato HTTP LTDA',
      tradeName: 'Contrato HTTP',
      cnpj: '99887766000155',
    }),
  });
  assert.equal(companyResponse.status, 201);
  const company = (await companyResponse.json()) as { id: string };

  const personResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/persons`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      fullName: 'Pessoa Contrato HTTP',
      cpf: '78787878787',
    }),
  });
  assert.equal(personResponse.status, 201);
  const person = (await personResponse.json()) as { id: string };

  const employeeResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/employees`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      companyId: company.id,
      personId: person.id,
      code: 'CON-HTTP-001',
    }),
  });
  assert.equal(employeeResponse.status, 201);
  const employee = (await employeeResponse.json()) as { id: string };

  const admissionResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/admissions`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      personId: person.id,
      companyId: company.id,
      employeeId: employee.id,
    }),
  });
  assert.equal(admissionResponse.status, 201);
  const admission = (await admissionResponse.json()) as { id: string };

  const checklistResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/admissions/${admission.id}/checklist`, {
    headers: commonHeaders,
  });
  assert.equal(checklistResponse.status, 200);
  const checklist = (await checklistResponse.json()) as Array<{ id: string }>;

  for (const item of checklist) {
    const receiveResponse = await fetch(
        `${baseUrl}/api/v1/tenants/${tenant.id}/admissions/${admission.id}/checklist/${item.id}/receive`,
      {
        method: 'POST',
        headers: commonHeaders,
      },
    );
    assert.equal(receiveResponse.status, 201);
  }

  const contractResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/admissions/${admission.id}/contract`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      contractType: 'indeterminate',
      effectiveFrom: '2026-06-04T00:00:00.000Z',
      notes: 'Contrato formalizado via HTTP',
    }),
  });
  assert.equal(contractResponse.status, 201);
  const contract = (await contractResponse.json()) as { id: string; status: string; contractType: string };
  assert.equal(contract.status, 'formalized');
  assert.equal(contract.contractType, 'indeterminate');

  const getContractResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/admissions/${admission.id}/contract`, {
    headers: commonHeaders,
  });
  assert.equal(getContractResponse.status, 200);
  const loadedContract = (await getContractResponse.json()) as { id: string; status: string; contractType: string };
  assert.equal(loadedContract.id, contract.id);
  assert.equal(loadedContract.status, 'formalized');
  assert.equal(loadedContract.contractType, 'indeterminate');

  const getAdmissionResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/admissions/${admission.id}`, {
    headers: commonHeaders,
  });
  assert.equal(getAdmissionResponse.status, 200);
  const loadedAdmission = (await getAdmissionResponse.json()) as {
    status: string;
    contract?: { id: string; contractType: string };
    documents?: Array<{ id: string; documentType: string; status: string }>;
  };
  assert.equal(loadedAdmission.status, 'completed');
  assert.equal(loadedAdmission.contract?.id, contract.id);
  assert.equal(loadedAdmission.contract?.contractType, 'indeterminate');
  assert.equal(loadedAdmission.documents?.length, 1);
  assert.equal(loadedAdmission.documents?.[0]?.documentType, 'admission_contract_snapshot');
  assert.equal(loadedAdmission.documents?.[0]?.status, 'generated');

  const documentsResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/admissions/${admission.id}/documents`, {
    headers: commonHeaders,
  });
  assert.equal(documentsResponse.status, 200);
  const documents = (await documentsResponse.json()) as Array<{ id: string; documentType: string; status: string }>;
  assert.equal(documents.length, 1);
  assert.equal(documents[0]?.documentType, 'admission_contract_snapshot');

  const signResponse = await fetch(
    `${baseUrl}/api/v1/tenants/${tenant.id}/admissions/${admission.id}/documents/${documents[0]!.id}/sign`,
    {
      method: 'POST',
      headers: commonHeaders,
      body: JSON.stringify({
        signatureMethod: 'govbr_advanced',
      }),
    },
  );
  assert.equal(signResponse.status, 201);
  const signedDocument = (await signResponse.json()) as { status: string; signatureMethod: string };
  assert.equal(signedDocument.status, 'signed');
  assert.equal(signedDocument.signatureMethod, 'govbr_advanced');

  const createDocumentResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/admissions/${admission.id}/documents`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      documentType: 'onboarding_checklist_ack',
      title: 'Termo de ciencia de onboarding',
      content: {
        scope: 'onboarding',
        acknowledgements: ['documentos', 'acessos'],
      },
    }),
  });
  assert.equal(createDocumentResponse.status, 201);
  const createdDocument = (await createDocumentResponse.json()) as { status: string; documentType: string };
  assert.equal(createdDocument.status, 'generated');
  assert.equal(createdDocument.documentType, 'onboarding_checklist_ack');
});

test('authenticated admin can queue preliminary eSocial transmission', async () => {
  const adminHeaders = {
    'content-type': 'application/json',
    'x-rh-user-id': 'user-1',
    'x-rh-role': 'admin',
  } as const;

  const tenantResponse = await fetch(`${baseUrl}/api/v1/tenants`, {
    method: 'POST',
    headers: adminHeaders,
    body: JSON.stringify({
      name: 'Empresa S2190 HTTP',
      slug: `empresa-s2190-http-${Date.now()}`,
    }),
  });
  assert.equal(tenantResponse.status, 201);
  const tenant = (await tenantResponse.json()) as { id: string };

  const commonHeaders = {
    'content-type': 'application/json',
    'x-rh-user-id': 'user-1',
    'x-rh-role': 'admin',
    'x-rh-tenant-id': tenant.id,
  } as const;

  const companyResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/companies`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      legalName: 'Empresa S2190 HTTP LTDA',
      tradeName: 'S2190 HTTP',
      cnpj: '88776655000144',
    }),
  });
  assert.equal(companyResponse.status, 201);
  const company = (await companyResponse.json()) as { id: string };

  const personResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/persons`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      fullName: 'Pessoa S2190 HTTP',
      cpf: '67676767676',
    }),
  });
  assert.equal(personResponse.status, 201);
  const person = (await personResponse.json()) as { id: string };

  const employeeResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/employees`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      companyId: company.id,
      personId: person.id,
      code: 'S2190-001',
    }),
  });
  assert.equal(employeeResponse.status, 201);
  const employee = (await employeeResponse.json()) as { id: string };

  const admissionResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/admissions`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      personId: person.id,
      companyId: company.id,
      employeeId: employee.id,
    }),
  });
  assert.equal(admissionResponse.status, 201);
  const admission = (await admissionResponse.json()) as { id: string };

  const esocialResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/admissions/${admission.id}/esocial-transmissions`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      notes: 'Transmissao preliminar S-2190',
    }),
  });
  assert.equal(esocialResponse.status, 201);
  const transmission = (await esocialResponse.json()) as { id: string; eventCode: string; status: string };
  assert.equal(transmission.eventCode, 'S-2190');
  assert.equal(transmission.status, 'queued');

  const listResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/admissions/${admission.id}/esocial-transmissions`, {
    headers: commonHeaders,
  });
  assert.equal(listResponse.status, 200);
  const list = (await listResponse.json()) as Array<{ id: string; eventCode: string; status: string }>;
  assert.equal(list.length, 1);
  assert.equal(list[0]?.id, transmission.id);
  assert.equal(list[0]?.eventCode, 'S-2190');
  assert.equal(list[0]?.status, 'queued');
});

test('authenticated admin can manage a termination and block point marks after effective status', async () => {
  const tenantResponse = await fetch(`${baseUrl}/api/v1/tenants`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-rh-user-id': 'user-1',
      'x-rh-role': 'admin',
    },
    body: JSON.stringify({ name: 'Empresa Desligamento', slug: 'empresa-desligamento' }),
  });

  assert.equal(tenantResponse.status, 201);
  const tenant = (await tenantResponse.json()) as { id: string };

  const commonHeaders = {
    'content-type': 'application/json',
    'x-rh-user-id': 'user-1',
    'x-rh-role': 'admin',
    'x-rh-tenant-id': tenant.id,
  } as const;

  const companyResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/companies`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      legalName: 'Empresa Desligamento LTDA',
      tradeName: 'Desligamento',
      cnpj: '22334455000999',
    }),
  });
  assert.equal(companyResponse.status, 201);
  const company = (await companyResponse.json()) as { id: string };

  const personResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/persons`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      fullName: 'Pessoa Desligamento',
      cpf: '77788899900',
    }),
  });
  assert.equal(personResponse.status, 201);
  const person = (await personResponse.json()) as { id: string };

  const employeeResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/employees`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      companyId: company.id,
      personId: person.id,
      code: 'DES-001',
    }),
  });
  assert.equal(employeeResponse.status, 201);
  const employee = (await employeeResponse.json()) as { id: string };

  const terminationResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/terminations`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      employeeId: employee.id,
      reason: 'Encerramento administrativo do vinculo',
      effectiveAt: '2026-06-10T00:00:00.000Z',
      noticeType: 'aviso_previo',
      notes: 'Fluxo administrativo inicial',
    }),
  });
  assert.equal(terminationResponse.status, 201);
  const termination = (await terminationResponse.json()) as { id: string; status: string };
  assert.equal(termination.status, 'draft');

  const approveResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/terminations/${termination.id}/approve`, {
    method: 'POST',
    headers: commonHeaders,
  });
  assert.equal(approveResponse.status, 201);
  const approved = (await approveResponse.json()) as { status: string };
  assert.equal(approved.status, 'approved');

  const effectiveResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/terminations/${termination.id}/effective`, {
    method: 'POST',
    headers: commonHeaders,
  });
  assert.equal(effectiveResponse.status, 201);
  const effective = (await effectiveResponse.json()) as { status: string };
  assert.equal(effective.status, 'effective');

  const listResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/terminations`, {
    headers: {
      'x-rh-user-id': 'user-1',
      'x-rh-role': 'auditor',
      'x-rh-tenant-id': tenant.id,
    },
  });
  assert.equal(listResponse.status, 200);
  const terminations = (await listResponse.json()) as Array<{ id: string; status: string }>;
  assert.equal(terminations.length, 1);
  assert.equal(terminations[0]?.status, 'effective');

  const pointResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/point-marks`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      employeeId: employee.id,
    }),
  });
  assert.equal(pointResponse.status, 409);
});

test('authenticated admin can create and close a rescission after effective termination', async () => {
  const tenantResponse = await fetch(`${baseUrl}/api/v1/tenants`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-rh-user-id': 'user-1',
      'x-rh-role': 'admin',
    },
    body: JSON.stringify({ name: 'Empresa Rescisao', slug: 'empresa-rescisao' }),
  });

  assert.equal(tenantResponse.status, 201);
  const tenant = (await tenantResponse.json()) as { id: string };

  const commonHeaders = {
    'content-type': 'application/json',
    'x-rh-user-id': 'user-1',
    'x-rh-role': 'admin',
    'x-rh-tenant-id': tenant.id,
  } as const;

  const companyResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/companies`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      legalName: 'Empresa Rescisao LTDA',
      tradeName: 'Rescisao',
      cnpj: '22334455000888',
    }),
  });
  assert.equal(companyResponse.status, 201);
  const company = (await companyResponse.json()) as { id: string };

  const personResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/persons`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      fullName: 'Pessoa Rescisao',
      cpf: '88899900011',
    }),
  });
  assert.equal(personResponse.status, 201);
  const person = (await personResponse.json()) as { id: string };

  const employeeResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/employees`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      companyId: company.id,
      personId: person.id,
      code: 'RES-001',
    }),
  });
  assert.equal(employeeResponse.status, 201);
  const employee = (await employeeResponse.json()) as { id: string };

  const terminationResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/terminations`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      employeeId: employee.id,
      reason: 'Encerramento administrativo do vinculo',
      effectiveAt: '2026-06-10T00:00:00.000Z',
      noticeType: 'aviso_previo',
      notes: 'Rescisao inicial',
    }),
  });
  assert.equal(terminationResponse.status, 201);
  const termination = (await terminationResponse.json()) as { id: string };

  await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/terminations/${termination.id}/approve`, {
    method: 'POST',
    headers: commonHeaders,
  });
  await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/terminations/${termination.id}/effective`, {
    method: 'POST',
    headers: commonHeaders,
  });

  const rescissionResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/terminations/${termination.id}/rescissions`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      notes: 'Rescisao iniciada',
    }),
  });
  assert.equal(rescissionResponse.status, 201);
  const rescission = (await rescissionResponse.json()) as { id: string; status: string };
  assert.equal(rescission.status, 'draft');

  const calculationResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/rescissions/${rescission.id}/calculation`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      referenceSalaryCents: 300000,
      noticeAmountCents: 30000,
      salaryBalanceAmountCents: 15000,
      vacationAmountCents: 25000,
      thirteenthAmountCents: 12000,
      fgtsAmountCents: 20000,
      fgtsPenaltyAmountCents: 4000,
      deductionsAmountCents: 5000,
      notes: 'Memoria de calculo rescisoria',
    }),
  });
  assert.equal(calculationResponse.status, 201);
  const calculation = (await calculationResponse.json()) as { grossAmountCents: number; netAmountCents: number };
  assert.equal(calculation.grossAmountCents, 106000);
  assert.equal(calculation.netAmountCents, 101000);

  const documentsResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/rescissions/${rescission.id}/documents`, {
    method: 'POST',
    headers: commonHeaders,
  });
  assert.equal(documentsResponse.status, 201);
  const documents = (await documentsResponse.json()) as Array<{ id: string; documentType: string }>;
  assert.equal(documents.length, 3);

  const listDocumentsResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/rescissions/${rescission.id}/documents`, {
    headers: commonHeaders,
  });
  assert.equal(listDocumentsResponse.status, 200);
  const listedDocuments = (await listDocumentsResponse.json()) as Array<{ documentType: string }>;
  assert.equal(listedDocuments.length, 3);

  for (const document of documents) {
    const signResponse = await fetch(
      `${baseUrl}/api/v1/tenants/${tenant.id}/rescissions/${rescission.id}/documents/${document.id}/sign`,
      {
        method: 'POST',
        headers: commonHeaders,
        body: JSON.stringify({
          signatureMethod: 'govbr_advanced',
        }),
      },
    );
    assert.equal(signResponse.status, 201);
  }

  const closeResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/rescissions/${rescission.id}/close`, {
    method: 'POST',
    headers: commonHeaders,
  });
  assert.equal(closeResponse.status, 201);
  const closed = (await closeResponse.json()) as { status: string };
  assert.equal(closed.status, 'closed');

  const listResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/rescissions`, {
    headers: {
      'x-rh-user-id': 'user-1',
      'x-rh-role': 'auditor',
      'x-rh-tenant-id': tenant.id,
    },
  });
  assert.equal(listResponse.status, 200);
  const rescissions = (await listResponse.json()) as Array<{ id: string; status: string }>;
  assert.equal(rescissions.length, 1);
  assert.equal(rescissions[0]?.status, 'closed');
});

test('authenticated admin can manage offboarding and queue termination eSocial after effective termination', async () => {
  const tenantResponse = await fetch(`${baseUrl}/api/v1/tenants`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-rh-user-id': 'user-1',
      'x-rh-role': 'admin',
    },
    body: JSON.stringify({ name: 'Empresa Offboarding', slug: 'empresa-offboarding' }),
  });

  assert.equal(tenantResponse.status, 201);
  const tenant = (await tenantResponse.json()) as { id: string };

  const commonHeaders = {
    'content-type': 'application/json',
    'x-rh-user-id': 'user-1',
    'x-rh-role': 'admin',
    'x-rh-tenant-id': tenant.id,
  } as const;

  const companyResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/companies`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      legalName: 'Empresa Offboarding LTDA',
      tradeName: 'Offboarding',
      cnpj: '22334455000777',
    }),
  });
  assert.equal(companyResponse.status, 201);
  const company = (await companyResponse.json()) as { id: string };

  const personResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/persons`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      fullName: 'Pessoa Offboarding',
      cpf: '99900011122',
    }),
  });
  assert.equal(personResponse.status, 201);
  const person = (await personResponse.json()) as { id: string };

  const employeeResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/employees`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      companyId: company.id,
      personId: person.id,
      code: 'OFF-001',
    }),
  });
  assert.equal(employeeResponse.status, 201);
  const employee = (await employeeResponse.json()) as { id: string };

  const terminationResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/terminations`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      employeeId: employee.id,
      reason: 'Encerramento administrativo do vinculo',
      effectiveAt: '2026-06-10T00:00:00.000Z',
      noticeType: 'aviso_previo',
      notes: 'Offboarding inicial',
    }),
  });
  assert.equal(terminationResponse.status, 201);
  const termination = (await terminationResponse.json()) as { id: string };

  await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/terminations/${termination.id}/approve`, {
    method: 'POST',
    headers: commonHeaders,
  });
  await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/terminations/${termination.id}/effective`, {
    method: 'POST',
    headers: commonHeaders,
  });

  const offboardingResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/terminations/${termination.id}/offboardings`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      notes: 'Offboarding em andamento',
    }),
  });
  assert.equal(offboardingResponse.status, 201);
  const offboarding = (await offboardingResponse.json()) as { id: string; status: string };
  assert.equal(offboarding.status, 'draft');

  const closeResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/offboardings/${offboarding.id}/close`, {
    method: 'POST',
    headers: commonHeaders,
  });
  assert.equal(closeResponse.status, 201);
  const closed = (await closeResponse.json()) as { status: string };
  assert.equal(closed.status, 'closed');

  const offboardingsResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/offboardings`, {
    headers: {
      'x-rh-user-id': 'user-1',
      'x-rh-role': 'auditor',
      'x-rh-tenant-id': tenant.id,
    },
  });
  assert.equal(offboardingsResponse.status, 200);
  const offboardings = (await offboardingsResponse.json()) as Array<{ id: string; status: string }>;
  assert.equal(offboardings.length, 1);
  assert.equal(offboardings[0]?.status, 'closed');

  const transmissionsResponse = await fetch(
    `${baseUrl}/api/v1/tenants/${tenant.id}/terminations/${termination.id}/esocial-transmissions`,
    {
      headers: {
        'x-rh-user-id': 'user-1',
        'x-rh-role': 'auditor',
        'x-rh-tenant-id': tenant.id,
      },
    },
  );
  assert.equal(transmissionsResponse.status, 200);
  const transmissions = (await transmissionsResponse.json()) as Array<{ id: string; eventCode: string; status: string }>;
  assert.equal(transmissions.length, 1);
  assert.equal(transmissions[0]?.eventCode, 'S-2299');
  assert.equal(transmissions[0]?.status, 'queued');
});

test('authenticated admin can read platform telemetry', async () => {
  const tenantResponse = await fetch(`${baseUrl}/api/v1/tenants`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-rh-user-id': 'user-telemetry',
      'x-rh-role': 'admin',
    },
    body: JSON.stringify({ name: 'Empresa Telemetria', slug: `empresa-telemetria-${Date.now()}` }),
  });
  assert.equal(tenantResponse.status, 201);

  const telemetryResponse = await fetch(`${baseUrl}/api/v1/platform/telemetry`, {
    headers: {
      'x-rh-user-id': 'user-telemetry',
      'x-rh-role': 'admin',
    },
  });

  const telemetryBody = await telemetryResponse.text();
  assert.equal(telemetryResponse.status, 200, telemetryBody);
  const telemetry = JSON.parse(telemetryBody) as {
    service: string;
    counts: { tenants: number };
  };
  assert.equal(telemetry.service, 'rh-api');
  assert.ok(telemetry.counts.tenants >= 1);
});

test('authenticated admin can manage api integrations', async () => {
  const tenantResponse = await fetch(`${baseUrl}/api/v1/tenants`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-rh-user-id': 'user-integrations',
      'x-rh-role': 'admin',
    },
    body: JSON.stringify({ name: 'Empresa Integracoes', slug: `empresa-integracoes-${Date.now()}` }),
  });
  assert.equal(tenantResponse.status, 201);
  const tenant = (await tenantResponse.json()) as { id: string };

  const commonHeaders = {
    'content-type': 'application/json',
    'x-rh-user-id': 'user-integrations',
    'x-rh-role': 'admin',
    'x-rh-tenant-id': tenant.id,
  } as const;

  const companyResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/companies`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      legalName: 'Empresa Integracoes LTDA',
      tradeName: 'Integracoes',
      cnpj: '44556677000188',
    }),
  });
  assert.equal(companyResponse.status, 201);
  const company = (await companyResponse.json()) as { id: string };

  const personResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/persons`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      fullName: 'Pessoa Integracoes',
      cpf: '44455566677',
    }),
  });
  assert.equal(personResponse.status, 201);
  const person = (await personResponse.json()) as { id: string };

  const employeeResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/employees`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      companyId: company.id,
      personId: person.id,
      code: 'INT-001',
    }),
  });
  assert.equal(employeeResponse.status, 201);
  const employee = (await employeeResponse.json()) as { id: string };

  const benefitsSyncResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/integrations/benefits/sync`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      employeeId: employee.id,
      benefitCode: 'VT-001',
      movementType: 'include',
      notes: 'Sincronizacao de beneficios',
    }),
  });
  assert.equal(benefitsSyncResponse.status, 201);
  const benefitsSync = (await benefitsSyncResponse.json()) as { id: string; integrationType: string; status: string };
  assert.equal(benefitsSync.integrationType, 'benefits');
  assert.equal(benefitsSync.status, 'completed');

  const identitySyncResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/integrations/identity/sync`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      subject: 'oidc-user-integracoes',
      action: 'provision',
      notes: 'Provisionamento de identidade',
    }),
  });
  assert.equal(identitySyncResponse.status, 201);
  const identitySync = (await identitySyncResponse.json()) as { id: string; integrationType: string; status: string };
  assert.equal(identitySync.integrationType, 'identity');
  assert.equal(identitySync.status, 'completed');

  const failedResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/integrations/${benefitsSync.id}/fail`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      reason: 'Falha de retorno do provedor',
    }),
  });
  assert.equal(failedResponse.status, 201);
  const failed = (await failedResponse.json()) as { status: string };
  assert.equal(failed.status, 'failed');

  const retriedResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/integrations/${benefitsSync.id}/retry`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      notes: 'Nova tentativa depois do incidente',
    }),
  });
  assert.equal(retriedResponse.status, 201);
  const retried = (await retriedResponse.json()) as { status: string };
  assert.equal(retried.status, 'requested');

  const failedAgainResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/integrations/${benefitsSync.id}/fail`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      reason: 'Falha persistente do provedor',
    }),
  });
  assert.equal(failedAgainResponse.status, 201);
  const failedAgain = (await failedAgainResponse.json()) as { status: string };
  assert.equal(failedAgain.status, 'failed');

  const dlqResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/integrations/${benefitsSync.id}/dlq`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      reason: 'Encaminhado para tratamento manual',
    }),
  });
  assert.equal(dlqResponse.status, 201);
  const dlq = (await dlqResponse.json()) as { status: string };
  assert.equal(dlq.status, 'dlq');

  const monitoringResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/integrations/monitoring`, {
    headers: commonHeaders,
  });
  assert.equal(monitoringResponse.status, 200);
  const monitoring = (await monitoringResponse.json()) as {
    counts: { total: number; completed: number; failed: number; dlq: number; benefits: number; identity: number };
    lastRequestedAt: string | null;
    alerts: Array<{ severity: string }>;
  };
  assert.equal(monitoring.counts.total, 2);
  assert.equal(monitoring.counts.completed, 1);
  assert.equal(monitoring.counts.failed, 0);
  assert.equal(monitoring.counts.dlq, 1);
  assert.equal(monitoring.counts.benefits, 1);
  assert.equal(monitoring.counts.identity, 1);
  assert.ok(monitoring.lastRequestedAt);

  const filteredMonitoringResponse = await fetch(
    `${baseUrl}/api/v1/tenants/${tenant.id}/integrations/monitoring?integrationType=benefits&status=dlq`,
    {
      headers: commonHeaders,
    },
  );
  assert.equal(filteredMonitoringResponse.status, 200);
  const filteredMonitoring = (await filteredMonitoringResponse.json()) as {
    counts: { total: number; completed: number; failed: number; dlq: number; benefits: number; identity: number };
    alerts: Array<{ severity: string; message: string }>;
  };
  assert.equal(filteredMonitoring.counts.total, 1);
  assert.equal(filteredMonitoring.counts.completed, 0);
  assert.equal(filteredMonitoring.counts.failed, 0);
  assert.equal(filteredMonitoring.counts.dlq, 1);
  assert.equal(filteredMonitoring.counts.benefits, 1);
  assert.equal(filteredMonitoring.counts.identity, 0);
  assert.equal(filteredMonitoring.alerts[0]?.severity, 'critical');
});

test('oidc bearer can create and use a tenant without tenant header in the happy path', async () => {
  const previousEnv = {
    AUTH_MODE: process.env.AUTH_MODE,
    OIDC_ISSUER_URL: process.env.OIDC_ISSUER_URL,
    OIDC_AUDIENCE: process.env.OIDC_AUDIENCE,
    OIDC_ROLE_CLAIM: process.env.OIDC_ROLE_CLAIM,
    OIDC_TENANT_CLAIM: process.env.OIDC_TENANT_CLAIM,
    OIDC_USER_ID_CLAIM: process.env.OIDC_USER_ID_CLAIM,
  };

  const { publicKey, privateKey } = generateKeyPairSync('rsa', { modulusLength: 2048 });
  const issuerUrl = 'https://issuer-http.example';
  const jwk = publicKey.export({ format: 'jwk' }) as Record<string, unknown> & {
    kid?: string;
    use?: string;
    alg?: string;
  };
  jwk.kid = 'kid-http';
  jwk.use = 'sig';
  jwk.alg = 'RS256';

  const discovery = {
    issuer: issuerUrl,
    jwks_uri: `${issuerUrl}/protocol/openid-connect/certs`,
  };
  const realFetch = globalThis.fetch;
  globalThis.fetch = (async (input, init) => {
    const url = typeof input === 'string' ? input : input.toString();
    if (url === `${issuerUrl}/.well-known/openid-configuration`) {
      return new Response(JSON.stringify(discovery), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      });
    }

    if (url === discovery.jwks_uri) {
      return new Response(JSON.stringify({ keys: [jwk] }), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      });
    }

    return realFetch(input, init);
  }) as typeof fetch;

  process.env.AUTH_MODE = 'mixed';
  process.env.OIDC_ISSUER_URL = issuerUrl;
  process.env.OIDC_AUDIENCE = '';
  process.env.OIDC_ROLE_CLAIM = 'rh_roles';
  process.env.OIDC_TENANT_CLAIM = 'tenant_id';
  process.env.OIDC_USER_ID_CLAIM = 'sub';

  try {
    const tokenPayload = {
      iss: issuerUrl,
      sub: 'oidc-user-1',
      rh_roles: ['admin'],
      exp: Math.floor(Date.now() / 1000) + 60,
      nbf: Math.floor(Date.now() / 1000) - 10,
    };
    const tokenHeader = { alg: 'RS256', kid: jwk.kid, typ: 'JWT' };
    const signingInput = `${Buffer.from(JSON.stringify(tokenHeader)).toString('base64url')}.${Buffer.from(JSON.stringify(tokenPayload)).toString('base64url')}`;
    const token = `${signingInput}.${sign('RSA-SHA256', Buffer.from(signingInput), privateKey).toString('base64url')}`;

    const tenantResponse = await fetch(`${baseUrl}/api/v1/tenants`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({ name: 'Tenant OIDC Flow', slug: `tenant-oidc-flow-${Date.now()}` }),
    });
    assert.equal(tenantResponse.status, 201);
    const tenant = (await tenantResponse.json()) as { id: string };

    const commonHeaders = {
      authorization: `Bearer ${token}`,
      'content-type': 'application/json',
    } as const;

    const companyResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/companies`, {
      method: 'POST',
      headers: commonHeaders,
      body: JSON.stringify({
        legalName: 'Empresa OIDC LTDA',
        tradeName: 'OIDC Flow',
        cnpj: '99887766000155',
      }),
    });
    assert.equal(companyResponse.status, 201);
    const company = (await companyResponse.json()) as { id: string };

    const personResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/persons`, {
      method: 'POST',
      headers: commonHeaders,
      body: JSON.stringify({
        fullName: 'Pessoa OIDC',
        cpf: '11122233344',
      }),
    });
    assert.equal(personResponse.status, 201);
    const person = (await personResponse.json()) as { id: string };

    const employeeResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/employees`, {
      method: 'POST',
      headers: commonHeaders,
      body: JSON.stringify({
        companyId: company.id,
        personId: person.id,
        code: 'E-OIDC-001',
      }),
    });
    assert.equal(employeeResponse.status, 201);
    const employee = (await employeeResponse.json()) as { id: string };

    const pointResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/point-marks`, {
      method: 'POST',
      headers: commonHeaders,
      body: JSON.stringify({
        employeeId: employee.id,
      }),
    });
    assert.equal(pointResponse.status, 201);

    const summaryResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/summary`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    assert.equal(summaryResponse.status, 200);
    const summary = (await summaryResponse.json()) as { counts: { companies: number; persons: number; employees: number; pointMarks: number; auditEvents: number } };
    assert.equal(summary.counts.companies, 1);
    assert.equal(summary.counts.persons, 1);
    assert.equal(summary.counts.employees, 1);
    assert.equal(summary.counts.pointMarks, 1);
    assert.equal(summary.counts.auditEvents, 5);
  } finally {
    globalThis.fetch = realFetch;
    process.env.AUTH_MODE = previousEnv.AUTH_MODE;
    process.env.OIDC_ISSUER_URL = previousEnv.OIDC_ISSUER_URL;
    process.env.OIDC_AUDIENCE = previousEnv.OIDC_AUDIENCE;
    process.env.OIDC_ROLE_CLAIM = previousEnv.OIDC_ROLE_CLAIM;
    process.env.OIDC_TENANT_CLAIM = previousEnv.OIDC_TENANT_CLAIM;
    process.env.OIDC_USER_ID_CLAIM = previousEnv.OIDC_USER_ID_CLAIM;
  }
});

test('oidc bearer can list all tenants it owns', async () => {
  const previousEnv = {
    AUTH_MODE: process.env.AUTH_MODE,
    OIDC_ISSUER_URL: process.env.OIDC_ISSUER_URL,
    OIDC_AUDIENCE: process.env.OIDC_AUDIENCE,
    OIDC_ROLE_CLAIM: process.env.OIDC_ROLE_CLAIM,
    OIDC_TENANT_CLAIM: process.env.OIDC_TENANT_CLAIM,
    OIDC_USER_ID_CLAIM: process.env.OIDC_USER_ID_CLAIM,
  };

  const { publicKey, privateKey } = generateKeyPairSync('rsa', { modulusLength: 2048 });
  const issuerUrl = 'https://issuer-list.example';
  const jwk = publicKey.export({ format: 'jwk' }) as Record<string, unknown> & {
    kid?: string;
    use?: string;
    alg?: string;
  };
  jwk.kid = 'kid-list';
  jwk.use = 'sig';
  jwk.alg = 'RS256';

  const discovery = {
    issuer: issuerUrl,
    jwks_uri: `${issuerUrl}/protocol/openid-connect/certs`,
  };
  const realFetch = globalThis.fetch;
  globalThis.fetch = (async (input, init) => {
    const url = typeof input === 'string' ? input : input.toString();
    if (url === `${issuerUrl}/.well-known/openid-configuration`) {
      return new Response(JSON.stringify(discovery), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      });
    }

    if (url === discovery.jwks_uri) {
      return new Response(JSON.stringify({ keys: [jwk] }), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      });
    }

    return realFetch(input, init);
  }) as typeof fetch;

  process.env.AUTH_MODE = 'mixed';
  process.env.OIDC_ISSUER_URL = issuerUrl;
  process.env.OIDC_AUDIENCE = '';
  process.env.OIDC_ROLE_CLAIM = 'rh_roles';
  process.env.OIDC_TENANT_CLAIM = 'tenant_id';
  process.env.OIDC_USER_ID_CLAIM = 'sub';

  try {
    const tokenPayload = {
      iss: issuerUrl,
      sub: 'oidc-user-list',
      rh_roles: ['admin'],
      exp: Math.floor(Date.now() / 1000) + 60,
      nbf: Math.floor(Date.now() / 1000) - 10,
    };
    const tokenHeader = { alg: 'RS256', kid: jwk.kid, typ: 'JWT' };
    const signingInput = `${Buffer.from(JSON.stringify(tokenHeader)).toString('base64url')}.${Buffer.from(JSON.stringify(tokenPayload)).toString('base64url')}`;
    const token = `${signingInput}.${sign('RSA-SHA256', Buffer.from(signingInput), privateKey).toString('base64url')}`;

    const firstTenant = await fetch(`${baseUrl}/api/v1/tenants`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({ name: 'Tenant List 1', slug: `tenant-list-1-${Date.now()}` }),
    });
    assert.equal(firstTenant.status, 201);

    const secondTenant = await fetch(`${baseUrl}/api/v1/tenants`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({ name: 'Tenant List 2', slug: `tenant-list-2-${Date.now()}` }),
    });
    assert.equal(secondTenant.status, 201);

    const listResponse = await fetch(`${baseUrl}/api/v1/tenants/me/access`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    assert.equal(listResponse.status, 200);
    const grants = (await listResponse.json()) as Array<{ tenant: { slug: string } }>;

    assert.equal(grants.length, 2);
    assert.ok(grants.some((grant) => grant.tenant.slug.startsWith('tenant-list-1-')));
    assert.ok(grants.some((grant) => grant.tenant.slug.startsWith('tenant-list-2-')));
  } finally {
    globalThis.fetch = realFetch;
    process.env.AUTH_MODE = previousEnv.AUTH_MODE;
    process.env.OIDC_ISSUER_URL = previousEnv.OIDC_ISSUER_URL;
    process.env.OIDC_AUDIENCE = previousEnv.OIDC_AUDIENCE;
    process.env.OIDC_ROLE_CLAIM = previousEnv.OIDC_ROLE_CLAIM;
    process.env.OIDC_TENANT_CLAIM = previousEnv.OIDC_TENANT_CLAIM;
    process.env.OIDC_USER_ID_CLAIM = previousEnv.OIDC_USER_ID_CLAIM;
  }
});

test('oidc bearer can access a tenant granted by another subject', async () => {
  const previousEnv = {
    AUTH_MODE: process.env.AUTH_MODE,
    OIDC_ISSUER_URL: process.env.OIDC_ISSUER_URL,
    OIDC_AUDIENCE: process.env.OIDC_AUDIENCE,
    OIDC_ROLE_CLAIM: process.env.OIDC_ROLE_CLAIM,
    OIDC_TENANT_CLAIM: process.env.OIDC_TENANT_CLAIM,
    OIDC_USER_ID_CLAIM: process.env.OIDC_USER_ID_CLAIM,
  };

  const { publicKey, privateKey } = generateKeyPairSync('rsa', { modulusLength: 2048 });
  const issuerUrl = 'https://issuer-grant.example';
  const jwk = publicKey.export({ format: 'jwk' }) as Record<string, unknown> & {
    kid?: string;
    use?: string;
    alg?: string;
  };
  jwk.kid = 'kid-grant';
  jwk.use = 'sig';
  jwk.alg = 'RS256';

  const discovery = {
    issuer: issuerUrl,
    jwks_uri: `${issuerUrl}/protocol/openid-connect/certs`,
  };
  const realFetch = globalThis.fetch;
  globalThis.fetch = (async (input, init) => {
    const url = typeof input === 'string' ? input : input.toString();
    if (url === `${issuerUrl}/.well-known/openid-configuration`) {
      return new Response(JSON.stringify(discovery), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      });
    }

    if (url === discovery.jwks_uri) {
      return new Response(JSON.stringify({ keys: [jwk] }), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      });
    }

    return realFetch(input, init);
  }) as typeof fetch;

  process.env.AUTH_MODE = 'mixed';
  process.env.OIDC_ISSUER_URL = issuerUrl;
  process.env.OIDC_AUDIENCE = '';
  process.env.OIDC_ROLE_CLAIM = 'rh_roles';
  process.env.OIDC_TENANT_CLAIM = 'tenant_id';
  process.env.OIDC_USER_ID_CLAIM = 'sub';

  try {
    const tokenPayload = {
      iss: issuerUrl,
      sub: 'oidc-user-granted',
      rh_roles: ['admin'],
      exp: Math.floor(Date.now() / 1000) + 60,
      nbf: Math.floor(Date.now() / 1000) - 10,
    };
    const tokenHeader = { alg: 'RS256', kid: jwk.kid, typ: 'JWT' };
    const signingInput = `${Buffer.from(JSON.stringify(tokenHeader)).toString('base64url')}.${Buffer.from(JSON.stringify(tokenPayload)).toString('base64url')}`;
    const token = `${signingInput}.${sign('RSA-SHA256', Buffer.from(signingInput), privateKey).toString('base64url')}`;

    const createResponse = await fetch(`${baseUrl}/api/v1/tenants`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-rh-user-id': 'admin-user',
        'x-rh-role': 'admin',
      },
      body: JSON.stringify({
        name: 'Tenant Grant Flow',
        slug: `tenant-grant-flow-${Date.now()}`,
      }),
    });
    assert.equal(createResponse.status, 201);
    const tenant = (await createResponse.json()) as { id: string };

    const grantResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/access-grants`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-rh-user-id': 'admin-user',
        'x-rh-role': 'admin',
        'x-rh-tenant-id': tenant.id,
      },
      body: JSON.stringify({
        subject: 'oidc-user-granted',
        role: 'auditor',
      }),
    });
    assert.equal(grantResponse.status, 201);

    const listResponse = await fetch(`${baseUrl}/api/v1/tenants/me/access`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    assert.equal(listResponse.status, 200);
    const grants = (await listResponse.json()) as Array<{ tenantId: string; role: string; tenant: { id: string; slug: string } }>;
    assert.equal(grants.length, 1);
    assert.equal(grants[0]?.tenantId, tenant.id);
    assert.equal(grants[0]?.role, 'auditor');
    assert.equal(grants[0]?.tenant.id, tenant.id);

    const summaryResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/summary`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    assert.equal(summaryResponse.status, 200);
  } finally {
    globalThis.fetch = realFetch;
    process.env.AUTH_MODE = previousEnv.AUTH_MODE;
    process.env.OIDC_ISSUER_URL = previousEnv.OIDC_ISSUER_URL;
    process.env.OIDC_AUDIENCE = previousEnv.OIDC_AUDIENCE;
    process.env.OIDC_ROLE_CLAIM = previousEnv.OIDC_ROLE_CLAIM;
    process.env.OIDC_TENANT_CLAIM = previousEnv.OIDC_TENANT_CLAIM;
    process.env.OIDC_USER_ID_CLAIM = previousEnv.OIDC_USER_ID_CLAIM;
  }
});

test('tenant scope must match the path tenant', async () => {
  const createResponse = await fetch(`${baseUrl}/api/v1/tenants`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-rh-user-id': 'user-1',
      'x-rh-role': 'admin',
    },
    body: JSON.stringify({ name: 'Empresa Teste 2', slug: 'empresa-teste-2' }),
  });
  const tenant = (await createResponse.json()) as { id: string };

  const mismatchResponse = await fetch(`${baseUrl}/api/v1/tenants/${tenant.id}/summary`, {
    headers: {
      'x-rh-user-id': 'user-1',
      'x-rh-role': 'auditor',
      'x-rh-tenant-id': 'other-tenant',
    },
  });

  assert.equal(mismatchResponse.status, 403);
});
