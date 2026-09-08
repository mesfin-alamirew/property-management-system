import { AppError } from '@/lib/errors';

import {
  findBuildingConditionByCode,
  createBuildingConditionRecord,
  updateBuildingConditionRecord,
  deactivateBuildingConditionRecord,
} from '../repositories/building-condition.repository';

import type { BuildingConditionFormData } from '../schemas/building-condition.schema';

import { getBuildingConditionById } from '../queries/building-condition.queries';
import { requirePermission } from '@/lib/authorization/authorization.service';
export async function createBuildingCondition(
  userId: string,
  data: BuildingConditionFormData,
) {
  await requirePermission({
    userId,
    permissionCode: 'BUILDING_CONDITION:CREATE',
  });

  const existingCode = await findBuildingConditionByCode(data.code);

  if (existingCode) {
    throw new AppError(
      'Building Condition code already exists',
      'DUPLICATE_CODE',
    );
  }

  return createBuildingConditionRecord(data);
}

export async function updateBuildingCondition(
  userId: string,
  id: string,
  data: BuildingConditionFormData,
) {
  await requirePermission({
    userId,
    permissionCode: 'BUILDING_CONDITION:UPDATE',
  });
  await getBuildingConditionById(id);

  const existingCode = await findBuildingConditionByCode(data.code, id);

  if (existingCode) {
    throw new AppError(
      'Building Condition code already exists',
      'DUPLICATE_CODE',
    );
  }

  return updateBuildingConditionRecord(id, data);
}

export async function deactivateBuildingCondition(userId: string, id: string) {
  await requirePermission({
    userId,
    permissionCode: 'BUILDING_CONDITION:DEACTIVATE',
  });
  const buildingCondition = await getBuildingConditionById(id);

  if (!buildingCondition.isActive) {
    throw new AppError(
      'Building Condition is already inactive',
      'ALREADY_INACTIVE',
    );
  }

  return deactivateBuildingConditionRecord(id);
}
