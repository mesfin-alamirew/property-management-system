import { AppError } from '@/lib/errors';

import {
  findBuildingSpaceTypes,
  findBuildingSpaceTypeById,
} from '../repositories/building-space-type.repository';

export async function getBuildingSpaceTypes() {
  return findBuildingSpaceTypes();
}

export async function getBuildingSpaceTypeById(id: string) {
  const spaceType = await findBuildingSpaceTypeById(id);

  if (!spaceType) {
    throw new AppError(
      'Building Space Type not found',
      'BUILDING_SPACE_TYPE_NOT_FOUND',
    );
  }

  return spaceType;
}
