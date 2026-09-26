import { AppError } from '@/lib/errors';
import { prisma } from '@/lib/prisma';
import { recordAuditEvent } from '@/lib/audit/audit.service';
import { AUDIT_ACTIONS, AUDIT_ENTITY_TYPES } from '@/lib/audit/audit.types';
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

  return prisma.$transaction(async (tx) => {
    const buildingType = await createBuildingTypeRecord(tx, data);

    await recordAuditEvent(tx, {
      userId,
      action: AUDIT_ACTIONS.BUILDING_TYPE_CREATED,
      entityType: AUDIT_ENTITY_TYPES.BUILDING_TYPE,
      entityId: buildingType.id,
      description: `Building Type ${buildingType.code} created`,
      newValue: {
        code: buildingType.code,
        name: buildingType.name,
        description: buildingType.description ?? null,
        isActive: buildingType.isActive,
      },
    });

    return buildingType;
  });
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
  const buildingType = await getBuildingTypeById(id);

  const existingCode = await findBuildingTypeByCode(data.code, id);

  if (existingCode) {
    throw new AppError('Building Type code already exists', 'DUPLICATE_CODE');
  }

  return prisma.$transaction(async (tx) => {
    const updatedBuildingType = await updateBuildingTypeRecord(tx, id, data);

    await recordAuditEvent(tx, {
      userId,
      action: AUDIT_ACTIONS.BUILDING_TYPE_UPDATED,
      entityType: AUDIT_ENTITY_TYPES.BUILDING_TYPE,
      entityId: updatedBuildingType.id,
      description: `Building Type ${updatedBuildingType.code} updated`,
      oldValue: {
        code: buildingType.code,
        name: buildingType.name,
        description: buildingType.description ?? null,
        isActive: buildingType.isActive,
      },
      newValue: {
        code: updatedBuildingType.code,
        name: updatedBuildingType.name,
        description: updatedBuildingType.description ?? null,
        isActive: updatedBuildingType.isActive,
      },
    });

    return updatedBuildingType;
  });
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

  return prisma.$transaction(async (tx) => {
    const updatedBuildingType = await deactivateBuildingTypeRecord(tx, id);

    await recordAuditEvent(tx, {
      userId,
      action: AUDIT_ACTIONS.BUILDING_TYPE_DEACTIVATED,
      entityType: AUDIT_ENTITY_TYPES.BUILDING_TYPE,
      entityId: updatedBuildingType.id,
      description: `Building Type ${updatedBuildingType.code} deactivated`,
      oldValue: {
        code: buildingType.code,
        name: buildingType.name,
        description: buildingType.description ?? null,
        isActive: buildingType.isActive,
      },
      newValue: {
        code: updatedBuildingType.code,
        name: updatedBuildingType.name,
        description: updatedBuildingType.description ?? null,
        isActive: updatedBuildingType.isActive,
      },
    });

    return updatedBuildingType;
  });
}
