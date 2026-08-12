import { AppError } from '@/lib/errors';

import {
  findOwnershipTypes,
  findOwnershipTypeById,
} from '../repositories/ownership-type.repository';

export async function getOwnershipTypes() {
  return findOwnershipTypes();
}

export async function getOwnershipTypeById(id: string) {
  const ownershipType = await findOwnershipTypeById(id);

  if (!ownershipType) {
    throw new AppError('Ownership Type not found', 'OWNERSHIP_TYPE_NOT_FOUND');
  }

  return ownershipType;
}
