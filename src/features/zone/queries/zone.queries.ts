import { AppError } from '@/lib/errors';

import {
  findZones,
  findZoneById,
  findActiveZonesForLookup,
} from '../repositories/zone.repository';

import type { ZoneWithRegion } from '../types/zone.types';

export async function getZonesForLookup() {
  return findActiveZonesForLookup();
}

export async function getZones() {
  return findZones();
}

export async function getZoneById(id: string): Promise<ZoneWithRegion> {
  const zone = await findZoneById(id);

  if (!zone) {
    throw new AppError('Zone not found', 'NOT_FOUND');
  }

  return zone;
}
