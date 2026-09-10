import { requirePermission } from '@/lib/authorization/authorization.service';
import { AppError } from '@/lib/errors';

import {
  findProperties,
  findPropertyById,
} from '../repositories/property.repository';

export async function getProperties(userId: string) {
  await requirePermission({
    userId,
    permissionCode: 'PROPERTY:READ',
  });

  return findProperties();
}

export async function getPropertyById(userId: string, id: string) {
  await requirePermission({
    userId,
    permissionCode: 'PROPERTY:READ',
  });

  const property = await findPropertyById(id);

  if (!property) {
    throw new AppError('Property not found', 'NOT_FOUND');
  }

  return property;
}
