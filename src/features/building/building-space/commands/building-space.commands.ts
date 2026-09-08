import { AppError } from '@/lib/errors';

import {
  findBuildingSpaceByCode,
  findBuildingSpaceById,
  createBuildingSpaceRecord,
  updateBuildingSpaceRecord,
  deactivateBuildingSpaceRecord,
} from '../repositories/building-space.repository';

import { findBuildingById } from '@/features/building/building/repositories/building.repository';
import { findBuildingSpaceTypeById } from '@/features/building/building-space-type/repositories/building-space-type.repository';

import type { BuildingSpaceFormData } from '../schemas/building-space.schema';
import { requirePermission } from '@/lib/authorization/authorization.service';

export async function createBuildingSpace(
  userId: string,
  data: BuildingSpaceFormData,
) {
  await requirePermission({
    userId,
    permissionCode: 'BUILDING_SPACE_TYPE:CREATE',
  });

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
  userId: string,
  id: string,
  data: BuildingSpaceFormData,
) {
  await requirePermission({
    userId,
    permissionCode: 'BUILDING_SPACE_TYPE:UPDATE',
  });
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

export async function deactivateBuildingSpace(userId: string, id: string) {
  await requirePermission({
    userId,
    permissionCode: 'BUILDING_SPACE_TYPE:DEACTIVATE',
  });
  const space = await findBuildingSpaceById(id);

  if (!space) {
    throw new AppError('Building Space not found', 'BUILDING_SPACE_NOT_FOUND');
  }

  return deactivateBuildingSpaceRecord(id);
}
