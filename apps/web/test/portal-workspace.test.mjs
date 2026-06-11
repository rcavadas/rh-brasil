import assert from 'node:assert/strict';
import { test } from 'node:test';
import { buildPortalWorkspaceModel } from '../src/portal-workspace.js';

test('portal workspace model derives collaborator, manager and workflow surfaces', () => {
  const model = buildPortalWorkspaceModel({
    session: {
      authenticated: true,
      profile: { subject: 'sub-1', displayName: 'Gestora', roles: ['manager'], role: 'manager' },
      expiresAt: Date.now() + 60_000,
      activeTenantId: 'tenant-1',
      tenants: [],
    },
    activeTenant: {
      id: 'access-1',
      tenantId: 'tenant-1',
      subject: 'sub-1',
      role: 'manager',
      createdAt: '2026-06-05T10:00:00.000Z',
      tenant: {
        id: 'tenant-1',
        name: 'Empresa Pilar',
        slug: 'empresa-pilar',
        createdAt: '2026-06-05T10:00:00.000Z',
        updatedAt: '2026-06-05T10:00:00.000Z',
      },
    },
    summary: {
      tenant: {
        id: 'tenant-1',
        name: 'Empresa Pilar',
        slug: 'empresa-pilar',
        createdAt: '2026-06-05T10:00:00.000Z',
        updatedAt: '2026-06-05T10:00:00.000Z',
      },
      counts: {
        companies: 1,
        persons: 1,
        employees: 1,
        pointMarks: 1,
        auditEvents: 4,
      },
      lastAuditEventAt: '2026-06-05T10:20:00.000Z',
    },
    admissions: [
      {
        id: 'adm-1',
        tenantId: 'tenant-1',
        personId: 'person-1',
        companyId: 'company-1',
        employeeId: 'employee-1',
        status: 'under_review',
        requestedAt: '2026-06-05T09:00:00.000Z',
        createdAt: '2026-06-05T09:00:00.000Z',
        updatedAt: '2026-06-05T09:10:00.000Z',
      },
    ],
    terminations: [
      {
        id: 'term-1',
        tenantId: 'tenant-1',
        employeeId: 'employee-1',
        status: 'approved',
        reason: 'Fim de contrato',
        effectiveAt: '2026-06-20T00:00:00.000Z',
        requestedAt: '2026-06-05T08:00:00.000Z',
        createdAt: '2026-06-05T08:00:00.000Z',
        updatedAt: '2026-06-05T08:30:00.000Z',
      },
    ],
    offboardings: [
      {
        id: 'off-1',
        tenantId: 'tenant-1',
        terminationRequestId: 'term-1',
        employeeId: 'employee-1',
        status: 'draft',
        requestedAt: '2026-06-05T08:40:00.000Z',
        createdAt: '2026-06-05T08:40:00.000Z',
        updatedAt: '2026-06-05T08:45:00.000Z',
      },
    ],
    rescissions: [
      {
        id: 'res-1',
        tenantId: 'tenant-1',
        terminationRequestId: 'term-1',
        employeeId: 'employee-1',
        status: 'calculated',
        paymentDueAt: '2026-06-25T00:00:00.000Z',
        requestedAt: '2026-06-05T09:30:00.000Z',
        createdAt: '2026-06-05T09:30:00.000Z',
        updatedAt: '2026-06-05T09:40:00.000Z',
      },
    ],
    monitoring: {
      tenantId: 'tenant-1',
      counts: {
        total: 3,
        requested: 1,
        completed: 1,
        failed: 1,
        dlq: 1,
        benefits: 0,
        identity: 0,
        attempts: 4,
      },
      alerts: [
        {
          integrationType: 'benefits',
          severity: 'warning',
          message: 'Falha persistida',
        },
      ],
    },
    analytics: {
      tenantId: 'tenant-1',
      generatedAt: '2026-06-05T10:35:00.000Z',
      counts: {
        employees: 1,
        pointMarks: 1,
        auditEvents: 4,
        admissions: 1,
        terminations: 1,
        offboardings: 1,
        rescissions: 1,
        openAdmissions: 1,
        openTerminations: 1,
        openOffboardings: 1,
        openRescissions: 1,
        integrationRequests: 3,
        failedIntegrations: 1,
        dlqIntegrations: 1,
        attempts: 4,
      },
      signals: {
        headcount: 1,
        workflowPressure: 4,
        lastAuditEventAt: '2026-06-05T10:20:00.000Z',
        lastRequestedAt: '2026-06-05T10:15:00.000Z',
      },
      privacy: {
        retentionModel: 'class-based',
        exportFormats: ['json', 'csv', 'pdf', 'zip'],
        maskingLevels: ['strict', 'controlled', 'aggregate'],
      },
      alerts: [
        {
          code: 'workflow-open-items',
          severity: 'info',
          message: 'open workflow items require operational follow-up',
        },
      ],
    },
    latestAdmissionContract: {
      id: 'contract-1',
      tenantId: 'tenant-1',
      admissionRequestId: 'adm-1',
      contractType: 'CLT',
      effectiveFrom: '2026-06-10T00:00:00.000Z',
      status: 'active',
      createdAt: '2026-06-05T09:15:00.000Z',
      updatedAt: '2026-06-05T09:15:00.000Z',
    },
    latestPointReceipt: {
      receiptNumber: 'PM-123',
      generatedAt: '2026-06-05T10:30:00.000Z',
      pointMark: {
        id: 'mark-1',
        tenantId: 'tenant-1',
        employeeId: 'employee-1',
        occurredAt: '2026-06-05T10:25:00.000Z',
        createdAt: '2026-06-05T10:25:00.000Z',
      },
      employee: {
        id: 'employee-1',
        tenantId: 'tenant-1',
        companyId: 'company-1',
        personId: 'person-1',
        code: 'E-001',
        createdAt: '2026-06-05T07:00:00.000Z',
        updatedAt: '2026-06-05T07:00:00.000Z',
      },
      title: 'Comprovante de marcação',
      content: {},
    },
    latestRescission: {
      id: 'res-1',
      tenantId: 'tenant-1',
      terminationRequestId: 'term-1',
      employeeId: 'employee-1',
      status: 'calculated',
      paymentDueAt: '2026-06-25T00:00:00.000Z',
      requestedAt: '2026-06-05T09:30:00.000Z',
      createdAt: '2026-06-05T09:30:00.000Z',
      updatedAt: '2026-06-05T09:40:00.000Z',
      documents: [
        {
          id: 'doc-1',
          tenantId: 'tenant-1',
          rescissionRequestId: 'res-1',
          documentType: 'termination_receipt',
          title: 'Recibo rescisório',
          status: 'signed',
          signedAt: '2026-06-05T09:50:00.000Z',
          signatureMethod: 'govbr_advanced',
          content: {},
          generatedAt: '2026-06-05T09:45:00.000Z',
          createdAt: '2026-06-05T09:45:00.000Z',
          updatedAt: '2026-06-05T09:50:00.000Z',
        },
      ],
    },
  });

  assert.equal(model.collaboratorCards.length, 3);
  assert.equal(model.managerCards[0].title, '1');
  assert.equal(model.exceptionCards[0].title, '1');
  assert.ok(model.documentCards.some((card) => card.label === 'Pacote rescisório'));
  assert.equal(model.workflowTimeline[0].title, 'Última auditoria');
  assert.equal(model.analyticsCards.cards.length, 5);
  assert.equal(model.complementaryRoadmap.length, 9);
});
