import { AppError } from '@/lib/errors';

import {
  findOrganizationUnitById,
  findOrganizationUnitByCode,
  findOrganizationUnitByName,
  createOrganizationUnitRecord,
  updateOrganizationUnitRecord,
  findOrganizationUnitDescendants,
  findActiveOrganizationUnitChildren,
  findActiveOrganizationUnitProperties,
  deactivateOrganizationUnitRecord,
} from '../repositories/organization-unit.repository';

import type { OrganizationUnitFormData } from '../schemas/organization-unit.schema';
import { getOrganizationUnitById } from '../queries/organization-unit.queries';

export async function createOrganizationUnit(data: OrganizationUnitFormData) {
  const existingCode = await findOrganizationUnitByCode(data.code);

  if (existingCode) {
    throw new AppError(
      'Organization Unit code already exists',
      'DUPLICATE_CODE',
    );
  }

  const existingName = await findOrganizationUnitByName(data.name);

  if (existingName) {
    throw new AppError(
      'Organization Unit name already exists',
      'DUPLICATE_NAME',
    );
  }

  await validateParentOrganizationUnit(data.parentId);

  return createOrganizationUnitRecord(data);
}

async function validateParentOrganizationUnit(parentId?: string) {
  if (!parentId) {
    return;
  }

  const parent = await findOrganizationUnitById(parentId);

  if (!parent) {
    throw new AppError(
      'Parent Organization Unit not found',
      'PARENT_NOT_FOUND',
    );
  }

  if (!parent.isActive) {
    throw new AppError(
      'Parent Organization Unit is inactive',
      'PARENT_INACTIVE',
    );
  }
}

export async function updateOrganizationUnit(
  id: string,
  data: OrganizationUnitFormData,
) {
  await getOrganizationUnitById(id);

  const existingCode = await findOrganizationUnitByCode(data.code, id);

  if (existingCode) {
    throw new AppError(
      'Organization Unit code already exists',
      'DUPLICATE_CODE',
    );
  }

  const existingName = await findOrganizationUnitByName(data.name, id);

  if (existingName) {
    throw new AppError(
      'Organization Unit name already exists',
      'DUPLICATE_NAME',
    );
  }

  await validateParentOrganizationUnitForUpdate(id, data.parentId);

  return updateOrganizationUnitRecord(id, data);
}

async function validateParentOrganizationUnitForUpdate(
  id: string,
  parentId?: string,
) {
  if (!parentId) {
    return;
  }

  if (parentId === id) {
    throw new AppError(
      'Organization Unit cannot be its own parent',
      'INVALID_PARENT',
    );
  }

  await validateParentOrganizationUnit(parentId);

  const descendants = await findOrganizationUnitDescendants(id);

  if (descendants.includes(parentId)) {
    throw new AppError(
      'Organization Unit cannot have one of its descendants as its parent',
      'INVALID_PARENT',
    );
  }
}
export async function deactivateOrganizationUnit(id: string) {
  await getOrganizationUnitById(id);

  const children = await findActiveOrganizationUnitChildren(id);

  if (children.length > 0) {
    throw new AppError(
      'Organization Unit cannot be deactivated while it has active child Organization Units',
      'HAS_ACTIVE_CHILDREN',
    );
  }

  const properties = await findActiveOrganizationUnitProperties(id);

  if (properties.length > 0) {
    throw new AppError(
      'Organization Unit cannot be deactivated while it has active Properties',
      'HAS_ACTIVE_PROPERTIES',
    );
  }

  return deactivateOrganizationUnitRecord(id);
}
