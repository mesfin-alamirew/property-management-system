import { requirePermission } from '@/lib/authorization/authorization.service';
import { AppError } from '@/lib/errors';

import {
  findBuildingConditions,
  findBuildingConditionById,
} from '../repositories/building-condition.repository';

export async function getBuildingConditions(userId: string) {
  await requirePermission({
    userId,
    permissionCode: 'BUILDING_CONDITION:READ',
  });

  return findBuildingConditions();
}

export async function getBuildingConditionById(id: string) {
  const buildingCondition = await findBuildingConditionById(id);

  if (!buildingCondition) {
    throw new AppError('Building condition not found', 'NOT_FOUND');
  }

  return buildingCondition;
}
