import { requirePermission } from '@/lib/authorization/authorization.service';
import { AppError } from '@/lib/errors';

import {
  findOwnershipTypes,
  findOwnershipTypeById,
} from '../repositories/ownership-type.repository';

export async function getOwnershipTypes(userId: string) {
  await requirePermission({
    userId,
    permissionCode: 'OWNERSHIP_TYPE:READ',
  });

  return findOwnershipTypes();
}

export async function getOwnershipTypeById(userId: string, id: string) {
  await requirePermission({
    userId,
    permissionCode: 'OWNERSHIP_TYPE:READ',
  });

  const ownershipType = await findOwnershipTypeById(id);

  if (!ownershipType) {
    throw new AppError('Ownership Type not found', 'OWNERSHIP_TYPE_NOT_FOUND');
  }

  return ownershipType;
}
