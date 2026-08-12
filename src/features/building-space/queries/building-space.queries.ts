import { AppError } from '@/lib/errors';

import {
  findBuildingSpaces,
  findBuildingSpaceById,
} from '../repositories/building-space.repository';

export async function getBuildingSpaces() {
  return findBuildingSpaces();
}

export async function getBuildingSpaceById(id: string) {
  const space = await findBuildingSpaceById(id);

  if (!space) {
    throw new AppError('Building Space not found', 'BUILDING_SPACE_NOT_FOUND');
  }

  return space;
}
