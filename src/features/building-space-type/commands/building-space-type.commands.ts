import { AppError } from '@/lib/errors';

import {
  findBuildingSpaceTypeByCode,
  findBuildingSpaceTypeByName,
  findBuildingSpaceTypeById,
  createBuildingSpaceTypeRecord,
  updateBuildingSpaceTypeRecord,
  deactivateBuildingSpaceTypeRecord,
} from '../repositories/building-space-type.repository';

import type { BuildingSpaceTypeFormData } from '../schemas/building-space-type.schema';

export async function createBuildingSpaceType(data: BuildingSpaceTypeFormData) {
  const existingCode = await findBuildingSpaceTypeByCode(data.code);

  if (existingCode) {
    throw new AppError(
      'Building Space Type code already exists',
      'DUPLICATE_CODE',
    );
  }

  const existingName = await findBuildingSpaceTypeByName(data.name);

  if (existingName) {
    throw new AppError(
      'Building Space Type name already exists',
      'DUPLICATE_NAME',
    );
  }

  return createBuildingSpaceTypeRecord(data);
}

export async function updateBuildingSpaceType(
  id: string,
  data: BuildingSpaceTypeFormData,
) {
  const spaceType = await findBuildingSpaceTypeById(id);

  if (!spaceType) {
    throw new AppError(
      'Building Space Type not found',
      'BUILDING_SPACE_TYPE_NOT_FOUND',
    );
  }

  const existingCode = await findBuildingSpaceTypeByCode(data.code, id);

  if (existingCode) {
    throw new AppError(
      'Building Space Type code already exists',
      'DUPLICATE_CODE',
    );
  }

  const existingName = await findBuildingSpaceTypeByName(data.name, id);

  if (existingName) {
    throw new AppError(
      'Building Space Type name already exists',
      'DUPLICATE_NAME',
    );
  }

  return updateBuildingSpaceTypeRecord(id, data);
}

export async function deactivateBuildingSpaceType(id: string) {
  const spaceType = await findBuildingSpaceTypeById(id);

  if (!spaceType) {
    throw new AppError(
      'Building Space Type not found',
      'BUILDING_SPACE_TYPE_NOT_FOUND',
    );
  }

  return deactivateBuildingSpaceTypeRecord(id);
}
