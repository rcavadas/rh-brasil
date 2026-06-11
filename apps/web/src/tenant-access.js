export function isTenantAllowed(tenants, tenantId) {
  return tenants.some((tenant) => tenant.tenantId === tenantId);
}

export function reconcileActiveTenant(tenants, activeTenantId) {
  if (!activeTenantId) {
    return { activeTenantId: '', stale: false };
  }

  if (isTenantAllowed(tenants, activeTenantId)) {
    return { activeTenantId, stale: false };
  }

  return { activeTenantId: '', stale: true };
}

export function selectDefaultTenantId(tenants) {
  return tenants[0]?.tenantId ?? '';
}
