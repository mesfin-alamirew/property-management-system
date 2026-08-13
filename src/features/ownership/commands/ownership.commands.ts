import { AppError } from '@/lib/errors';

import {
  findOwnershipByPropertyId,
  findOwnershipById,
  createOwnershipRecord,
  updateOwnershipRecord,
  deactivateOwnershipRecord,
} from '../repositories/ownership.repository';

import type { OwnershipFormData } from '../schemas/ownership.schema';

export async function createOwnership(data: OwnershipFormData) {
  const existingOwnership = await findOwnershipByPropertyId(data.propertyId);

  if (existingOwnership) {
    throw new AppError(
      'An active ownership record already exists for this property',
      'OWNERSHIP_ALREADY_EXISTS',
    );
  }

  return createOwnershipRecord(data);
}

export async function updateOwnership(id: string, data: OwnershipFormData) {
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

export async function deactivateOwnership(id: string) {
  const ownership = await findOwnershipById(id);

  if (!ownership) {
    throw new AppError('Ownership record not found', 'OWNERSHIP_NOT_FOUND');
  }

  return deactivateOwnershipRecord(id);
}
