import { requirePermission } from '@/lib/authorization/authorization.service';

import {
  findPropertyStatuses,
  findPropertyStatusById,
} from '../repositories/property-status.repository';

export async function getPropertyStatuses(userId: string) {
  await requirePermission({
    userId,
    permissionCode: 'PROPERTY_STATUS:READ',
  });

  return findPropertyStatuses();
}

export async function getPropertyStatusById(userId: string, id: string) {
  await requirePermission({
    userId,
    permissionCode: 'PROPERTY_STATUS:READ',
  });

  return findPropertyStatusById(id);
}
