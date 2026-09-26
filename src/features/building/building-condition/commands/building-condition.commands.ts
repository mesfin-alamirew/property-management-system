import { AppError } from '@/lib/errors';
import { recordAuditEvent } from '@/lib/audit/audit.service';
import { AUDIT_ACTIONS, AUDIT_ENTITY_TYPES } from '@/lib/audit/audit.types';
import { prisma } from '@/lib/prisma';

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

  return prisma.$transaction(async (tx) => {
    const buildingCondition = await createBuildingConditionRecord(tx, data);

    await recordAuditEvent(tx, {
      userId,
      action: AUDIT_ACTIONS.BUILDING_CONDITION_CREATED,
      entityType: AUDIT_ENTITY_TYPES.BUILDING_CONDITION,
      entityId: buildingCondition.id,
      description: `Building Condition ${buildingCondition.code} created`,
      newValue: {
        code: buildingCondition.code,
        name: buildingCondition.name,
        description: buildingCondition.description ?? null,
        isActive: buildingCondition.isActive,
      },
    });

    return buildingCondition;
  });
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
  const buildingCondition = await getBuildingConditionById(id);

  const existingCode = await findBuildingConditionByCode(data.code, id);

  if (existingCode) {
    throw new AppError(
      'Building Condition code already exists',
      'DUPLICATE_CODE',
    );
  }

  return prisma.$transaction(async (tx) => {
    const updatedBuildingCondition = await updateBuildingConditionRecord(
      tx,
      id,
      data,
    );

    await recordAuditEvent(tx, {
      userId,
      action: AUDIT_ACTIONS.BUILDING_CONDITION_UPDATED,
      entityType: AUDIT_ENTITY_TYPES.BUILDING_CONDITION,
      entityId: updatedBuildingCondition.id,
      description: `Building Condition ${updatedBuildingCondition.code} updated`,
      oldValue: {
        code: buildingCondition.code,
        name: buildingCondition.name,
        description: buildingCondition.description ?? null,
        isActive: buildingCondition.isActive,
      },
      newValue: {
        code: updatedBuildingCondition.code,
        name: updatedBuildingCondition.name,
        description: updatedBuildingCondition.description ?? null,
        isActive: updatedBuildingCondition.isActive,
      },
    });

    return updatedBuildingCondition;
  });
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

  return prisma.$transaction(async (tx) => {
    const updatedBuildingCondition = await deactivateBuildingConditionRecord(
      tx,
      id,
    );

    await recordAuditEvent(tx, {
      userId,
      action: AUDIT_ACTIONS.BUILDING_CONDITION_DEACTIVATED,
      entityType: AUDIT_ENTITY_TYPES.BUILDING_CONDITION,
      entityId: updatedBuildingCondition.id,
      description: `Building Condition ${updatedBuildingCondition.code} deactivated`,
      oldValue: {
        code: buildingCondition.code,
        name: buildingCondition.name,
        description: buildingCondition.description ?? null,
        isActive: buildingCondition.isActive,
      },
      newValue: {
        code: updatedBuildingCondition.code,
        name: updatedBuildingCondition.name,
        description: updatedBuildingCondition.description ?? null,
        isActive: updatedBuildingCondition.isActive,
      },
    });

    return updatedBuildingCondition;
  });
}
