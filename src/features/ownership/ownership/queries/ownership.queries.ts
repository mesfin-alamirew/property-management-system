import { requirePermission } from '@/lib/authorization/authorization.service';
import { AppError } from '@/lib/errors';

import {
  findOwnerships,
  findOwnershipById,
} from '../repositories/ownership.repository';

export async function getOwnerships(userId: string) {
  await requirePermission({
    userId,
    permissionCode: 'OWNERSHIP:READ',
  });

  return findOwnerships();
}

export async function getOwnershipById(userId: string, id: string) {
  await requirePermission({
    userId,
    permissionCode: 'OWNERSHIP:READ',
  });

  const ownership = await findOwnershipById(id);

  if (!ownership) {
    throw new AppError('Ownership record not found', 'OWNERSHIP_NOT_FOUND');
  }

  return ownership;
}
