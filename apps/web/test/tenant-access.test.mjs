import test from 'node:test';
import assert from 'node:assert/strict';
import { isTenantAllowed, reconcileActiveTenant, selectDefaultTenantId } from '../src/tenant-access.js';

test('tenant access helper recognizes allowed tenant ids', () => {
  const tenants = [{ tenantId: 'tenant-a' }, { tenantId: 'tenant-b' }];
  assert.equal(isTenantAllowed(tenants, 'tenant-a'), true);
  assert.equal(isTenantAllowed(tenants, 'tenant-x'), false);
});

test('tenant access helper clears stale active tenant ids', () => {
  const tenants = [{ tenantId: 'tenant-a' }];
  const active = reconcileActiveTenant(tenants, 'tenant-a');
  const stale = reconcileActiveTenant(tenants, 'tenant-x');

  assert.equal(active.activeTenantId, 'tenant-a');
  assert.equal(active.stale, false);
  assert.equal(stale.activeTenantId, '');
  assert.equal(stale.stale, true);
});

test('tenant access helper selects the first tenant by default', () => {
  assert.equal(selectDefaultTenantId([{ tenantId: 'tenant-a' }, { tenantId: 'tenant-b' }]), 'tenant-a');
  assert.equal(selectDefaultTenantId([]), '');
});
