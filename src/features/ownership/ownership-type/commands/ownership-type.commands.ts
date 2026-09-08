import { requirePermission } from '@/lib/authorization/authorization.service';
import { AppError } from '@/lib/errors';

import {
  findOwnershipTypeById,
  findOwnershipTypeByCode,
  createOwnershipTypeRecord,
  updateOwnershipTypeRecord,
  deactivateOwnershipTypeRecord,
} from '../repositories/ownership-type.repository';

import type { OwnershipTypeFormData } from '../schemas/ownership-type.schema';

export async function createOwnershipType(
  userId: string,
  data: OwnershipTypeFormData,
) {
  await requirePermission({
    userId,
    permissionCode: 'OWNERSHIP_TYPE:CREATE',
  });

  const existingOwnershipType = await findOwnershipTypeByCode(data.code);

  if (existingOwnershipType) {
    throw new AppError('Ownership Type code already exists', 'DUPLICATE_CODE');
  }

  return createOwnershipTypeRecord(data);
}

export async function updateOwnershipType(
  userId: string,
  id: string,
  data: OwnershipTypeFormData,
) {
  await requirePermission({
    userId,
    permissionCode: 'OWNERSHIP_TYPE:UPDATE',
  });

  const ownershipType = await findOwnershipTypeById(id);

  if (!ownershipType) {
    throw new AppError('Ownership Type not found', 'OWNERSHIP_TYPE_NOT_FOUND');
  }

  const existingOwnershipType = await findOwnershipTypeByCode(data.code, id);

  if (existingOwnershipType) {
    throw new AppError('Ownership Type code already exists', 'DUPLICATE_CODE');
  }

  return updateOwnershipTypeRecord(id, data);
}

export async function deactivateOwnershipType(userId: string, id: string) {
  await requirePermission({
    userId,
    permissionCode: 'OWNERSHIP_TYPE:DEACTIVATE',
  });

  const ownershipType = await findOwnershipTypeById(id);

  if (!ownershipType) {
    throw new AppError('Ownership Type not found', 'OWNERSHIP_TYPE_NOT_FOUND');
  }

  return deactivateOwnershipTypeRecord(id);
}
