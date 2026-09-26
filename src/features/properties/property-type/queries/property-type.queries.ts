import { requirePermission } from '@/lib/authorization/authorization.service';

import {
  findPropertyTypes,
  findPropertyTypeById,
} from '../repositories/property-type.repository';

export async function getPropertyTypes(userId: string) {
  await requirePermission({
    userId,
    permissionCode: 'PROPERTY_TYPE:READ',
  });

  return findPropertyTypes();
}

export async function getPropertyTypeById(userId: string, id: string) {
  await requirePermission({
    userId,
    permissionCode: 'PROPERTY_TYPE:READ',
  });

  return findPropertyTypeById(id);
}
