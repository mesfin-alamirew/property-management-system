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
import { requirePermission } from '@/lib/authorization/authorization.service';

export async function createBuildingSpaceType(
  userId: string,
  data: BuildingSpaceTypeFormData,
) {
  await requirePermission({
    userId,
    permissionCode: 'BUILDING_SPACE_TYPE:CREATE',
  });
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
  userId: string,
  id: string,
  data: BuildingSpaceTypeFormData,
) {
  await requirePermission({
    userId,
    permissionCode: 'BUILDING_SPACE_TYPE:UPDATE',
  });
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

export async function deactivateBuildingSpaceType(userId: string, id: string) {
  await requirePermission({
    userId,
    permissionCode: 'BUILDING_SPACE_TYPE:DEACTIVATE',
  });
  const spaceType = await findBuildingSpaceTypeById(id);

  if (!spaceType) {
    throw new AppError(
      'Building Space Type not found',
      'BUILDING_SPACE_TYPE_NOT_FOUND',
    );
  }

  return deactivateBuildingSpaceTypeRecord(id);
}
