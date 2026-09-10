import { AppError } from '@/lib/errors';
import { requirePermission } from '@/lib/authorization/authorization.service';

import {
  findZones,
  findZoneById,
  findActiveZonesForLookup,
} from '../repositories/zone.repository';

import type { ZoneWithRegion } from '../types/zone.types';

export async function getZonesForLookup(userId: string) {
  await requirePermission({
    userId,
    permissionCode: 'ZONE:READ',
  });

  return findActiveZonesForLookup();
}

export async function getZones(userId: string) {
  await requirePermission({
    userId,
    permissionCode: 'ZONE:READ',
  });

  return findZones();
}

export async function getZoneById(
  userId: string,
  id: string,
): Promise<ZoneWithRegion> {
  await requirePermission({
    userId,
    permissionCode: 'ZONE:READ',
  });

  const zone = await findZoneById(id);

  if (!zone) {
    throw new AppError('Zone not found', 'NOT_FOUND');
  }

  return zone;
}
