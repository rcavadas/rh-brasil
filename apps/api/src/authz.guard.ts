import { CanActivate, ExecutionContext, Injectable, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  AUTH_META_KEY,
  PUBLIC_META_KEY,
  canAccessRole,
  resolveAuthContext,
  type AuthContext,
  type AuthRole,
} from './authz.js';
import { SliceStore } from './slice.store.js';

@Injectable()
export class AuthzGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly store: SliceStore,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(PUBLIC_META_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const allowedRoles = this.reflector.getAllAndOverride<AuthRole[]>(AUTH_META_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context
      .switchToHttp()
      .getRequest<
        Record<string, unknown> & {
          headers: Record<string, string | string[] | undefined>;
          params?: Record<string, string | undefined>;
          auth?: unknown;
        }
      >();
    const auth = await resolveAuthContext(request.headers);

    if (!canAccessRole(auth.role, allowedRoles)) {
      throw new ForbiddenException(`role ${auth.role} cannot access this resource`);
    }

    await this.assertTenantScope(auth, request.params?.tenantId);
    request.auth = auth;
    return true;
  }

  private async assertTenantScope(auth: AuthContext, tenantId: string | undefined): Promise<void> {
    if (!tenantId) {
      return;
    }

    if (auth.tenantId) {
      if (auth.tenantId !== tenantId) {
        throw new ForbiddenException('tenant scope does not match');
      }

      return;
    }

    if (auth.source !== 'oidc' || !auth.subject) {
      throw new UnauthorizedException('x-rh-tenant-id header is required for tenant scoped routes');
    }

    const hasAccess = await this.store.hasTenantAccess(auth.subject, tenantId);
    if (!hasAccess) {
      throw new ForbiddenException('tenant scope does not match');
    }
  }
}
