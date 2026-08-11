import { AppError } from '@/lib/errors';

import {
  findBuildingConditionByCode,
  createBuildingConditionRecord,
  updateBuildingConditionRecord,
  deactivateBuildingConditionRecord,
} from '../repositories/building-condition.repository';

import type { BuildingConditionFormData } from '../schemas/building-condition.schema';

import { getBuildingConditionById } from '../queries/building-condition.queries';

export async function createBuildingCondition(data: BuildingConditionFormData) {
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
  id: string,
  data: BuildingConditionFormData,
) {
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

export async function deactivateBuildingCondition(id: string) {
  const buildingCondition = await getBuildingConditionById(id);

  if (!buildingCondition.isActive) {
    throw new AppError(
      'Building Condition is already inactive',
      'ALREADY_INACTIVE',
    );
  }

  return deactivateBuildingConditionRecord(id);
}
