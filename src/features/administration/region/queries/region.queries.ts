import { AppError } from '@/lib/errors';
import { requirePermission } from '@/lib/authorization/authorization.service';

import {
  findRegions,
  findRegionById,
  findActiveRegionsForLookup,
} from '../repositories/region.repository';

export async function getRegionsForLookup(userId: string) {
  await requirePermission({
    userId,
    permissionCode: 'REGION:READ',
  });

  return findActiveRegionsForLookup();
}

export async function getRegions(userId: string) {
  await requirePermission({
    userId,
    permissionCode: 'REGION:READ',
  });

  return findRegions();
}

export async function getRegionById(userId: string, id: string) {
  await requirePermission({
    userId,
    permissionCode: 'REGION:READ',
  });

  const region = await findRegionById(id);

  if (!region) {
    throw new AppError('Region not found', 'NOT_FOUND');
  }

  return region;
}
