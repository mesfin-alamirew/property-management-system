import { AppError } from '@/lib/errors';

import {
  findBuildingTypeByCode,
  createBuildingTypeRecord,
  updateBuildingTypeRecord,
  deactivateBuildingTypeRecord,
} from '../repositories/building-type.repository';

import type { BuildingTypeFormData } from '../schemas/building-type.schema';

import { getBuildingTypeById } from '../queries/building-type.queries';
import { requirePermission } from '@/lib/authorization/authorization.service';

export async function createBuildingType(
  userId: string,
  data: BuildingTypeFormData,
) {
  await requirePermission({
    userId,
    permissionCode: 'BUILDING_TYPE:CREATE',
  });
  const existingCode = await findBuildingTypeByCode(data.code);

  if (existingCode) {
    throw new AppError('Building Type code already exists', 'DUPLICATE_CODE');
  }

  return createBuildingTypeRecord(data);
}

export async function updateBuildingType(
  userId: string,
  id: string,
  data: BuildingTypeFormData,
) {
  await requirePermission({
    userId,
    permissionCode: 'BUILDING_TYPE:UPDATE',
  });
  await getBuildingTypeById(id);

  const existingCode = await findBuildingTypeByCode(data.code, id);

  if (existingCode) {
    throw new AppError('Building Type code already exists', 'DUPLICATE_CODE');
  }

  return updateBuildingTypeRecord(id, data);
}

export async function deactivateBuildingType(userId: string, id: string) {
  await requirePermission({
    userId,
    permissionCode: 'BUILDING_TYPE:DEACTIVATE',
  });
  const buildingType = await getBuildingTypeById(id);

  if (!buildingType.isActive) {
    throw new AppError('Building Type is already inactive', 'ALREADY_INACTIVE');
  }

  return deactivateBuildingTypeRecord(id);
}
