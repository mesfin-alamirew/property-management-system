import { AppError } from '@/lib/errors';

import {
  findBuildingSpaceByCode,
  findBuildingSpaceById,
  createBuildingSpaceRecord,
  updateBuildingSpaceRecord,
  deactivateBuildingSpaceRecord,
} from '../repositories/building-space.repository';

import { findBuildingById } from '@/features/building/repositories/building.repository';
import { findBuildingSpaceTypeById } from '@/features/building-space-type/repositories/building-space-type.repository';

import type { BuildingSpaceFormData } from '../schemas/building-space.schema';

export async function createBuildingSpace(data: BuildingSpaceFormData) {
  const building = await findBuildingById(data.buildingId);

  if (!building) {
    throw new AppError('Building not found', 'BUILDING_NOT_FOUND');
  }

  if (!building.isActive) {
    throw new AppError('Building is inactive', 'BUILDING_INACTIVE');
  }

  const spaceType = await findBuildingSpaceTypeById(data.spaceTypeId);

  if (!spaceType) {
    throw new AppError(
      'Building Space Type not found',
      'BUILDING_SPACE_TYPE_NOT_FOUND',
    );
  }

  if (!spaceType.isActive) {
    throw new AppError(
      'Building Space Type is inactive',
      'BUILDING_SPACE_TYPE_INACTIVE',
    );
  }

  const existingSpace = await findBuildingSpaceByCode(
    data.buildingId,
    data.code,
  );

  if (existingSpace) {
    throw new AppError(
      'Building Space code already exists for this Building',
      'DUPLICATE_CODE',
    );
  }

  return createBuildingSpaceRecord(data);
}

export async function updateBuildingSpace(
  id: string,
  data: BuildingSpaceFormData,
) {
  const space = await findBuildingSpaceById(id);

  if (!space) {
    throw new AppError('Building Space not found', 'BUILDING_SPACE_NOT_FOUND');
  }

  const building = await findBuildingById(data.buildingId);

  if (!building) {
    throw new AppError('Building not found', 'BUILDING_NOT_FOUND');
  }

  if (!building.isActive) {
    throw new AppError('Building is inactive', 'BUILDING_INACTIVE');
  }

  const spaceType = await findBuildingSpaceTypeById(data.spaceTypeId);

  if (!spaceType) {
    throw new AppError(
      'Building Space Type not found',
      'BUILDING_SPACE_TYPE_NOT_FOUND',
    );
  }

  if (!spaceType.isActive) {
    throw new AppError(
      'Building Space Type is inactive',
      'BUILDING_SPACE_TYPE_INACTIVE',
    );
  }

  const existingSpace = await findBuildingSpaceByCode(
    data.buildingId,
    data.code,
    id,
  );

  if (existingSpace) {
    throw new AppError(
      'Building Space code already exists for this Building',
      'DUPLICATE_CODE',
    );
  }

  return updateBuildingSpaceRecord(id, data);
}

export async function deactivateBuildingSpace(id: string) {
  const space = await findBuildingSpaceById(id);

  if (!space) {
    throw new AppError('Building Space not found', 'BUILDING_SPACE_NOT_FOUND');
  }

  return deactivateBuildingSpaceRecord(id);
}
