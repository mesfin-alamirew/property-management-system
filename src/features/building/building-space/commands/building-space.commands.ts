import { AppError } from '@/lib/errors';
import { recordAuditEvent } from '@/lib/audit/audit.service';
import { AUDIT_ACTIONS, AUDIT_ENTITY_TYPES } from '@/lib/audit/audit.types';
import { prisma } from '@/lib/prisma';

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
    permissionCode: 'BUILDING_SPACE:CREATE',
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

  return prisma.$transaction(async (tx) => {
    const buildingSpace = await createBuildingSpaceRecord(tx, data);

    await recordAuditEvent(tx, {
      userId,
      action: AUDIT_ACTIONS.BUILDING_SPACE_CREATED,
      entityType: AUDIT_ENTITY_TYPES.BUILDING_SPACE,
      entityId: buildingSpace.id,
      description: `Building Space ${buildingSpace.code} created`,
      newValue: {
        buildingId: buildingSpace.buildingId,
        spaceTypeId: buildingSpace.spaceTypeId,
        code: buildingSpace.code,
        name: buildingSpace.name,
        floorNumber: buildingSpace.floorNumber,
        areaSqm: buildingSpace.areaSqm?.toString() ?? null,
        capacity: buildingSpace.capacity,
        notes: buildingSpace.notes,
        isActive: buildingSpace.isActive,
      },
    });

    return buildingSpace;
  });
}

export async function updateBuildingSpace(
  userId: string,
  id: string,
  data: BuildingSpaceFormData,
) {
  await requirePermission({
    userId,
    permissionCode: 'BUILDING_SPACE:UPDATE',
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

  return prisma.$transaction(async (tx) => {
    const updatedBuildingSpace = await updateBuildingSpaceRecord(tx, id, data);

    await recordAuditEvent(tx, {
      userId,
      action: AUDIT_ACTIONS.BUILDING_SPACE_UPDATED,
      entityType: AUDIT_ENTITY_TYPES.BUILDING_SPACE,
      entityId: updatedBuildingSpace.id,
      description: `Building Space ${updatedBuildingSpace.code} updated`,
      oldValue: {
        buildingId: space.buildingId,
        spaceTypeId: space.spaceTypeId,
        code: space.code,
        name: space.name,
        floorNumber: space.floorNumber,
        areaSqm: space.areaSqm?.toString() ?? null,
        capacity: space.capacity,
        notes: space.notes,
        isActive: space.isActive,
      },
      newValue: {
        buildingId: updatedBuildingSpace.buildingId,
        spaceTypeId: updatedBuildingSpace.spaceTypeId,
        code: updatedBuildingSpace.code,
        name: updatedBuildingSpace.name,
        floorNumber: updatedBuildingSpace.floorNumber,
        areaSqm: updatedBuildingSpace.areaSqm?.toString() ?? null,
        capacity: updatedBuildingSpace.capacity,
        notes: updatedBuildingSpace.notes,
        isActive: updatedBuildingSpace.isActive,
      },
    });

    return updatedBuildingSpace;
  });
}

export async function deactivateBuildingSpace(userId: string, id: string) {
  await requirePermission({
    userId,
    permissionCode: 'BUILDING_SPACE:DEACTIVATE',
  });
  const space = await findBuildingSpaceById(id);

  if (!space) {
    throw new AppError('Building Space not found', 'BUILDING_SPACE_NOT_FOUND');
  }

  return prisma.$transaction(async (tx) => {
    const updatedBuildingSpace = await deactivateBuildingSpaceRecord(tx, id);

    await recordAuditEvent(tx, {
      userId,
      action: AUDIT_ACTIONS.BUILDING_SPACE_DEACTIVATED,
      entityType: AUDIT_ENTITY_TYPES.BUILDING_SPACE,
      entityId: updatedBuildingSpace.id,
      description: `Building Space ${updatedBuildingSpace.code} deactivated`,
      oldValue: {
        buildingId: space.buildingId,
        spaceTypeId: space.spaceTypeId,
        code: space.code,
        name: space.name,
        floorNumber: space.floorNumber,
        areaSqm: space.areaSqm?.toString() ?? null,
        capacity: space.capacity,
        notes: space.notes,
        isActive: space.isActive,
      },
      newValue: {
        buildingId: updatedBuildingSpace.buildingId,
        spaceTypeId: updatedBuildingSpace.spaceTypeId,
        code: updatedBuildingSpace.code,
        name: updatedBuildingSpace.name,
        floorNumber: updatedBuildingSpace.floorNumber,
        areaSqm: updatedBuildingSpace.areaSqm?.toString() ?? null,
        capacity: updatedBuildingSpace.capacity,
        notes: updatedBuildingSpace.notes,
        isActive: updatedBuildingSpace.isActive,
      },
    });

    return updatedBuildingSpace;
  });
}
