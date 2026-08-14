import { AppError } from '@/lib/errors';

import { findRegions, findRegionById } from '../repositories/region.repository';

import { findActiveRegionsForLookup } from '../repositories/region.repository';

export async function getRegionsForLookup() {
  return findActiveRegionsForLookup();
}

export async function getRegions() {
  return findRegions();
}

export async function getRegionById(id: string) {
  const region = await findRegionById(id);

  if (!region) {
    throw new AppError('Region not found', 'NOT_FOUND');
  }

  return region;
}
