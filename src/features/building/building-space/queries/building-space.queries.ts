import { requirePermission } from '@/lib/authorization/authorization.service';
import { AppError } from '@/lib/errors';

import {
  findBuildingSpaces,
  findBuildingSpaceById,
} from '../repositories/building-space.repository';

export async function getBuildingSpaces(userId: string) {
  await requirePermission({
    userId,
    permissionCode: 'BUILDING_SPACE:READ',
  });

  return findBuildingSpaces();
}

export async function getBuildingSpaceById(id: string) {
  const space = await findBuildingSpaceById(id);

  if (!space) {
    throw new AppError('Building Space not found', 'BUILDING_SPACE_NOT_FOUND');
  }

  return space;
}
