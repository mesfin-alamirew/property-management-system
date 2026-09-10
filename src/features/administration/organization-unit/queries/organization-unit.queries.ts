import { AppError } from '@/lib/errors';
import { requirePermission } from '@/lib/authorization/authorization.service';

import {
  findOrganizationUnits,
  findOrganizationUnitById,
  findOrganizationUnitParents,
} from '../repositories/organization-unit.repository';

export async function getOrganizationUnits(userId: string) {
  await requirePermission({
    userId,
    permissionCode: 'ORGANIZATION_UNIT:READ',
  });

  return findOrganizationUnits();
}

export async function getOrganizationUnitById(userId: string, id: string) {
  await requirePermission({
    userId,
    permissionCode: 'ORGANIZATION_UNIT:READ',
  });

  const organizationUnit = await findOrganizationUnitById(id);

  if (!organizationUnit) {
    throw new AppError('Organization Unit not found', 'NOT_FOUND');
  }

  return organizationUnit;
}

export async function getOrganizationUnitParents(userId: string) {
  await requirePermission({
    userId,
    permissionCode: 'ORGANIZATION_UNIT:READ',
  });

  return findOrganizationUnitParents();
}
