import { AppError } from '@/lib/errors';

import {
  findOwnerships,
  findOwnershipById,
} from '../repositories/ownership.repository';

export async function getOwnerships() {
  return findOwnerships();
}

export async function getOwnershipById(id: string) {
  const ownership = await findOwnershipById(id);

  if (!ownership) {
    throw new AppError('Ownership record not found', 'OWNERSHIP_NOT_FOUND');
  }

  return ownership;
}
