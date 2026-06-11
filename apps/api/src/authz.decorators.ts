import { createParamDecorator, ExecutionContext, SetMetadata } from '@nestjs/common';
import { AUTH_META_KEY, PUBLIC_META_KEY, type AuthRole } from './authz.js';

export const Public = (): MethodDecorator & ClassDecorator => SetMetadata(PUBLIC_META_KEY, true);

export const Roles = (...roles: AuthRole[]): MethodDecorator & ClassDecorator =>
  SetMetadata(AUTH_META_KEY, roles);

export const CurrentAuth = createParamDecorator((_data: unknown, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest<{ auth?: unknown }>();
  return request.auth;
});
