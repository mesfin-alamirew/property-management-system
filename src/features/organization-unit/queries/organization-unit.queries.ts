import { AppError } from '@/lib/errors';

import {
  findOrganizationUnits,
  findOrganizationUnitById,
  findOrganizationUnitParents,
} from '../repositories/organization-unit.repository';

export async function getOrganizationUnits() {
  return findOrganizationUnits();
}

export async function getOrganizationUnitById(id: string) {
  const organizationUnit = await findOrganizationUnitById(id);

  if (!organizationUnit) {
    throw new AppError('Organization Unit not found', 'NOT_FOUND');
  }

  return organizationUnit;
}

export async function getOrganizationUnitParents() {
  return findOrganizationUnitParents();
}
