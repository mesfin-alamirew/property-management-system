import { requirePermission } from '@/lib/authorization/authorization.service';
import { AppError } from '@/lib/errors';

import {
  findOwnershipByPropertyId,
  findOwnershipById,
  createOwnershipRecord,
  updateOwnershipRecord,
  deactivateOwnershipRecord,
} from '../repositories/ownership.repository';

import type { OwnershipFormData } from '../schemas/ownership.schema';

export async function createOwnership(userId: string, data: OwnershipFormData) {
  await requirePermission({
    userId,
    permissionCode: 'OWNERSHIP:CREATE',
  });

  const existingOwnership = await findOwnershipByPropertyId(data.propertyId);

  if (existingOwnership) {
    throw new AppError(
      'An active ownership record already exists for this property',
      'OWNERSHIP_ALREADY_EXISTS',
    );
  }

  return createOwnershipRecord(data);
}

export async function updateOwnership(
  userId: string,
  id: string,
  data: OwnershipFormData,
) {
  await requirePermission({
    userId,
    permissionCode: 'OWNERSHIP:UPDATE',
  });

  const ownership = await findOwnershipById(id);

  if (!ownership) {
    throw new AppError('Ownership record not found', 'OWNERSHIP_NOT_FOUND');
  }

  const existingOwnership = await findOwnershipByPropertyId(data.propertyId);

  if (existingOwnership && existingOwnership.id !== id) {
    throw new AppError(
      'An active ownership record already exists for this property',
      'OWNERSHIP_ALREADY_EXISTS',
    );
  }

  return updateOwnershipRecord(id, data);
}

export async function deactivateOwnership(userId: string, id: string) {
  await requirePermission({
    userId,
    permissionCode: 'OWNERSHIP:DEACTIVATE',
  });

  const ownership = await findOwnershipById(id);

  if (!ownership) {
    throw new AppError('Ownership record not found', 'OWNERSHIP_NOT_FOUND');
  }

  return deactivateOwnershipRecord(id);
}
