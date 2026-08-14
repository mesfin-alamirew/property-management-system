import { AppError } from '@/lib/errors';

import {
  findBuildingConditions,
  findBuildingConditionById,
} from '../repositories/building-condition.repository';

export async function getBuildingConditions() {
  return findBuildingConditions();
}

export async function getBuildingConditionById(id: string) {
  const buildingCondition = await findBuildingConditionById(id);

  if (!buildingCondition) {
    throw new AppError('Building condition not found', 'NOT_FOUND');
  }

  return buildingCondition;
}
