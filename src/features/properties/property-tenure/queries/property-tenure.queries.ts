import { requirePermission } from '@/lib/authorization/authorization.service';

import {
  findPropertyTenures,
  findPropertyTenureById,
} from '../repositories/property-tenure.repository';

export async function getPropertyTenures(userId: string) {
  await requirePermission({
    userId,
    permissionCode: 'PROPERTY_TENURE:READ',
  });

  return findPropertyTenures();
}

export async function getPropertyTenureById(userId: string, id: string) {
  await requirePermission({
    userId,
    permissionCode: 'PROPERTY_TENURE:READ',
  });

  return findPropertyTenureById(id);
}
