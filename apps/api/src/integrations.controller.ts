import { Body, Controller, Get, Inject, Param, Post, Query } from '@nestjs/common';
import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CurrentAuth, Roles } from './authz.decorators.js';
import type { AuthContext } from './authz.js';
import { SliceStore } from './slice.store.js';

class SyncBankIntegrationDto {
  @IsString()
  @IsNotEmpty()
  tenantId!: string;

  @IsString()
  @IsNotEmpty()
  batchId!: string;
}

class SyncBenefitsIntegrationDto {
  @IsString()
  @IsNotEmpty()
  tenantId!: string;

  @IsString()
  @IsNotEmpty()
  employeeId!: string;

  @IsString()
  @IsNotEmpty()
  benefitCode!: string;

  @IsString()
  @IsIn(['include', 'exclude', 'update', 'reconcile'])
  movementType!: 'include' | 'exclude' | 'update' | 'reconcile';

  @IsOptional()
  @IsString()
  notes?: string;
}

class SyncIdentityIntegrationDto {
  @IsString()
  @IsNotEmpty()
  tenantId!: string;

  @IsString()
  @IsNotEmpty()
  subject!: string;

  @IsString()
  @IsIn(['provision', 'deprovision', 'sync'])
  action!: 'provision' | 'deprovision' | 'sync';

  @IsOptional()
  @IsString()
  notes?: string;
}

class IntegrationRequestActionDto {
  @IsString()
  @IsNotEmpty()
  tenantId!: string;

  @IsOptional()
  @IsString()
  reason?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

@Controller('v1/tenants')
export class IntegrationsController {
  constructor(@Inject(SliceStore) private readonly store: SliceStore) {}

  @Roles('admin', 'rh')
  @Post(':tenantId/integrations/bank/sync')
  syncBankIntegration(
    @Param('tenantId') tenantId: string,
    @Body() body: SyncBankIntegrationDto,
    @CurrentAuth() auth: AuthContext | undefined,
  ) {
    return this.store.syncTimeSheetPayrollEventBatchWithBank(
      tenantId,
      body.batchId,
      auth?.source === 'oidc' ? auth.subject : undefined,
    );
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/integrations/benefits/sync')
  syncBenefitsIntegration(
    @Param('tenantId') tenantId: string,
    @Body() body: SyncBenefitsIntegrationDto,
    @CurrentAuth() auth: AuthContext | undefined,
  ) {
    return this.store.syncBenefitsIntegration(
      tenantId,
      body.employeeId,
      body.benefitCode,
      body.movementType,
      auth?.source === 'oidc' ? auth.subject : undefined,
      body.notes,
    );
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/integrations/identity/sync')
  syncIdentityIntegration(
    @Param('tenantId') tenantId: string,
    @Body() body: SyncIdentityIntegrationDto,
    @CurrentAuth() auth: AuthContext | undefined,
  ) {
    return this.store.syncIdentityIntegration(
      tenantId,
      body.subject,
      body.action,
      auth?.source === 'oidc' ? auth.subject : undefined,
      body.notes,
    );
  }

  @Roles('admin', 'rh', 'auditor')
  @Get(':tenantId/integrations/monitoring')
  monitorIntegrations(
    @Param('tenantId') tenantId: string,
    @Query('integrationType') integrationType?: string,
    @Query('status') status?: string,
  ) {
    return this.store.monitorIntegrations(tenantId, integrationType, status);
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/integrations/:requestId/fail')
  failIntegrationRequest(
    @Param('tenantId') tenantId: string,
    @Param('requestId') requestId: string,
    @Body() body: IntegrationRequestActionDto,
    @CurrentAuth() auth: AuthContext | undefined,
  ) {
    return this.store.failIntegrationRequest(tenantId, requestId, body.reason ?? 'integration failure reported', auth?.source === 'oidc' ? auth.subject : undefined);
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/integrations/:requestId/retry')
  retryIntegrationRequest(
    @Param('tenantId') tenantId: string,
    @Param('requestId') requestId: string,
    @Body() body: IntegrationRequestActionDto,
    @CurrentAuth() auth: AuthContext | undefined,
  ) {
    return this.store.retryIntegrationRequest(tenantId, requestId, auth?.source === 'oidc' ? auth.subject : undefined, body.notes);
  }

  @Roles('admin', 'rh')
  @Post(':tenantId/integrations/:requestId/dlq')
  deadLetterIntegrationRequest(
    @Param('tenantId') tenantId: string,
    @Param('requestId') requestId: string,
    @Body() body: IntegrationRequestActionDto,
    @CurrentAuth() auth: AuthContext | undefined,
  ) {
    return this.store.deadLetterIntegrationRequest(tenantId, requestId, body.reason ?? 'integration permanently failed', auth?.source === 'oidc' ? auth.subject : undefined);
  }
}
