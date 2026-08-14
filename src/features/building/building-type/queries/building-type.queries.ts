import { AppError } from '@/lib/errors';

import {
  findBuildingTypes,
  findBuildingTypeById,
} from '../repositories/building-type.repository';

export async function getBuildingTypes() {
  return findBuildingTypes();
}

export async function getBuildingTypeById(id: string) {
  const buildingType = await findBuildingTypeById(id);

  if (!buildingType) {
    throw new AppError('Building Type not found', 'NOT_FOUND');
  }

  return buildingType;
}
