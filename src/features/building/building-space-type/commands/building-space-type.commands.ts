import { AppError } from '@/lib/errors';
import { recordAuditEvent } from '@/lib/audit/audit.service';
import { AUDIT_ACTIONS, AUDIT_ENTITY_TYPES } from '@/lib/audit/audit.types';
import { prisma } from '@/lib/prisma';
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

  return prisma.$transaction(async (tx) => {
    const buildingSpaceType = await createBuildingSpaceTypeRecord(tx, data);

    await recordAuditEvent(tx, {
      userId,
      action: AUDIT_ACTIONS.BUILDING_SPACE_TYPE_CREATED,
      entityType: AUDIT_ENTITY_TYPES.BUILDING_SPACE_TYPE,
      entityId: buildingSpaceType.id,
      description: `Building Space Type ${buildingSpaceType.code} created`,
      newValue: {
        code: buildingSpaceType.code,
        name: buildingSpaceType.name,
        description: buildingSpaceType.description ?? null,
        isActive: buildingSpaceType.isActive,
      },
    });

    return buildingSpaceType;
  });
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

  return prisma.$transaction(async (tx) => {
    const updatedSpaceType = await updateBuildingSpaceTypeRecord(tx, id, data);

    await recordAuditEvent(tx, {
      userId,
      action: AUDIT_ACTIONS.BUILDING_SPACE_TYPE_UPDATED,
      entityType: AUDIT_ENTITY_TYPES.BUILDING_SPACE_TYPE,
      entityId: updatedSpaceType.id,
      description: `Building Space Type ${updatedSpaceType.code} updated`,
      oldValue: {
        code: spaceType.code,
        name: spaceType.name,
        description: spaceType.description ?? null,
        isActive: spaceType.isActive,
      },
      newValue: {
        code: updatedSpaceType.code,
        name: updatedSpaceType.name,
        description: updatedSpaceType.description ?? null,
        isActive: updatedSpaceType.isActive,
      },
    });

    return updatedSpaceType;
  });
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

  return prisma.$transaction(async (tx) => {
    const updatedSpaceType = await deactivateBuildingSpaceTypeRecord(tx, id);

    await recordAuditEvent(tx, {
      userId,
      action: AUDIT_ACTIONS.BUILDING_SPACE_TYPE_DEACTIVATED,
      entityType: AUDIT_ENTITY_TYPES.BUILDING_SPACE_TYPE,
      entityId: updatedSpaceType.id,
      description: `Building Space Type ${updatedSpaceType.code} deactivated`,
      oldValue: {
        code: spaceType.code,
        name: spaceType.name,
        description: spaceType.description ?? null,
        isActive: spaceType.isActive,
      },
      newValue: {
        code: updatedSpaceType.code,
        name: updatedSpaceType.name,
        description: updatedSpaceType.description ?? null,
        isActive: updatedSpaceType.isActive,
      },
    });

    return updatedSpaceType;
  });
}
