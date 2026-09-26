import { AppError } from '@/lib/errors';
import { recordAuditEvent } from '@/lib/audit/audit.service';
import { AUDIT_ACTIONS, AUDIT_ENTITY_TYPES } from '@/lib/audit/audit.types';
import { prisma } from '@/lib/prisma';

import {
  findBuildingByCode,
  findBuildingById,
  createBuildingRecord,
  updateBuildingRecord,
  deactivateBuildingRecord,
} from '../repositories/building.repository';

import { findPropertyById } from '@/features/properties/property/repositories/property.repository';
import { findBuildingTypeById } from '@/features/building/building-type/repositories/building-type.repository';
import { findBuildingConditionById } from '@/features/building/building-condition/repositories/building-condition.repository';

import type { BuildingFormData } from '../schemas/building.schema';
import { requirePermission } from '@/lib/authorization/authorization.service';
export async function createBuilding(userId: string, data: BuildingFormData) {
  await requirePermission({
    userId,
    permissionCode: 'BUILDING:CREATE',
  });
  const property = await findPropertyById(data.propertyId);

  if (!property) {
    throw new AppError('Property not found', 'PROPERTY_NOT_FOUND');
  }

  if (!property.isActive) {
    throw new AppError('Property is inactive', 'PROPERTY_INACTIVE');
  }

  const buildingType = await findBuildingTypeById(data.buildingTypeId);

  if (!buildingType) {
    throw new AppError('Building Type not found', 'BUILDING_TYPE_NOT_FOUND');
  }

  if (!buildingType.isActive) {
    throw new AppError('Building Type is inactive', 'BUILDING_TYPE_INACTIVE');
  }

  if (data.buildingConditionId) {
    const buildingCondition = await findBuildingConditionById(
      data.buildingConditionId,
    );

    if (!buildingCondition) {
      throw new AppError(
        'Building Condition not found',
        'BUILDING_CONDITION_NOT_FOUND',
      );
    }

    if (!buildingCondition.isActive) {
      throw new AppError(
        'Building Condition is inactive',
        'BUILDING_CONDITION_INACTIVE',
      );
    }
  }

  const existingBuilding = await findBuildingByCode(
    data.propertyId,
    data.buildingCode,
  );

  if (existingBuilding) {
    throw new AppError(
      'Building code already exists for this Property',
      'DUPLICATE_CODE',
    );
  }

  return prisma.$transaction(async (tx) => {
    const building = await createBuildingRecord(tx, data);

    await recordAuditEvent(tx, {
      userId,
      action: AUDIT_ACTIONS.BUILDING_CREATED,
      entityType: AUDIT_ENTITY_TYPES.BUILDING,
      entityId: building.id,
      description: `Building ${building.buildingCode} created`,
      newValue: {
        propertyId: building.propertyId,
        buildingCode: building.buildingCode,
        name: building.name,
        description: building.description,
        buildingTypeId: building.buildingTypeId,
        buildingConditionId: building.buildingConditionId,
        numberOfFloors: building.numberOfFloors,
        numberOfBasements: building.numberOfBasements,
        yearBuilt: building.yearBuilt,
        yearRenovated: building.yearRenovated,
        floorAreaSqm: building.floorAreaSqm?.toString() ?? null,
        usableAreaSqm: building.usableAreaSqm?.toString() ?? null,
        numberOfRooms: building.numberOfRooms,
        numberOfUnits: building.numberOfUnits,
        parkingCapacity: building.parkingCapacity,
        accessibilityFeatures: building.accessibilityFeatures,
        notes: building.notes,
        isActive: building.isActive,
      },
    });

    return building;
  });
}

export async function updateBuilding(
  userId: string,
  id: string,
  data: BuildingFormData,
) {
  await requirePermission({
    userId,
    permissionCode: 'BUILDING:UPDATE',
  });
  const building = await findBuildingById(id);

  if (!building) {
    throw new AppError('Building not found', 'BUILDING_NOT_FOUND');
  }

  const property = await findPropertyById(data.propertyId);

  if (!property) {
    throw new AppError('Property not found', 'PROPERTY_NOT_FOUND');
  }

  if (!property.isActive) {
    throw new AppError('Property is inactive', 'PROPERTY_INACTIVE');
  }

  const buildingType = await findBuildingTypeById(data.buildingTypeId);

  if (!buildingType) {
    throw new AppError('Building Type not found', 'BUILDING_TYPE_NOT_FOUND');
  }

  if (!buildingType.isActive) {
    throw new AppError('Building Type is inactive', 'BUILDING_TYPE_INACTIVE');
  }

  if (data.buildingConditionId) {
    const buildingCondition = await findBuildingConditionById(
      data.buildingConditionId,
    );

    if (!buildingCondition) {
      throw new AppError(
        'Building Condition not found',
        'BUILDING_CONDITION_NOT_FOUND',
      );
    }

    if (!buildingCondition.isActive) {
      throw new AppError(
        'Building Condition is inactive',
        'BUILDING_CONDITION_INACTIVE',
      );
    }
  }

  const existingBuilding = await findBuildingByCode(
    data.propertyId,
    data.buildingCode,
    id,
  );

  if (existingBuilding) {
    throw new AppError(
      'Building code already exists for this Property',
      'DUPLICATE_CODE',
    );
  }

  return prisma.$transaction(async (tx) => {
    const updatedBuilding = await updateBuildingRecord(tx, id, data);

    await recordAuditEvent(tx, {
      userId,
      action: AUDIT_ACTIONS.BUILDING_UPDATED,
      entityType: AUDIT_ENTITY_TYPES.BUILDING,
      entityId: updatedBuilding.id,
      description: `Building ${updatedBuilding.buildingCode} updated`,
      oldValue: {
        propertyId: building.propertyId,
        buildingCode: building.buildingCode,
        name: building.name,
        description: building.description,
        buildingTypeId: building.buildingTypeId,
        buildingConditionId: building.buildingConditionId,
        numberOfFloors: building.numberOfFloors,
        numberOfBasements: building.numberOfBasements,
        yearBuilt: building.yearBuilt,
        yearRenovated: building.yearRenovated,
        floorAreaSqm: building.floorAreaSqm?.toString() ?? null,
        usableAreaSqm: building.usableAreaSqm?.toString() ?? null,
        numberOfRooms: building.numberOfRooms,
        numberOfUnits: building.numberOfUnits,
        parkingCapacity: building.parkingCapacity,
        accessibilityFeatures: building.accessibilityFeatures,
        notes: building.notes,
        isActive: building.isActive,
      },
      newValue: {
        propertyId: updatedBuilding.propertyId,
        buildingCode: updatedBuilding.buildingCode,
        name: updatedBuilding.name,
        description: updatedBuilding.description,
        buildingTypeId: updatedBuilding.buildingTypeId,
        buildingConditionId: updatedBuilding.buildingConditionId,
        numberOfFloors: updatedBuilding.numberOfFloors,
        numberOfBasements: updatedBuilding.numberOfBasements,
        yearBuilt: updatedBuilding.yearBuilt,
        yearRenovated: updatedBuilding.yearRenovated,
        floorAreaSqm: updatedBuilding.floorAreaSqm?.toString() ?? null,
        usableAreaSqm: updatedBuilding.usableAreaSqm?.toString() ?? null,
        numberOfRooms: updatedBuilding.numberOfRooms,
        numberOfUnits: updatedBuilding.numberOfUnits,
        parkingCapacity: updatedBuilding.parkingCapacity,
        accessibilityFeatures: updatedBuilding.accessibilityFeatures,
        notes: updatedBuilding.notes,
        isActive: updatedBuilding.isActive,
      },
    });

    return updatedBuilding;
  });
}

export async function deactivateBuilding(userId: string, id: string) {
  await requirePermission({
    userId,
    permissionCode: 'BUILDING:DEACTIVATE',
  });
  const building = await findBuildingById(id);

  if (!building) {
    throw new AppError('Building not found', 'BUILDING_NOT_FOUND');
  }

  return prisma.$transaction(async (tx) => {
    const updatedBuilding = await deactivateBuildingRecord(tx, id);

    await recordAuditEvent(tx, {
      userId,
      action: AUDIT_ACTIONS.BUILDING_DEACTIVATED,
      entityType: AUDIT_ENTITY_TYPES.BUILDING,
      entityId: updatedBuilding.id,
      description: `Building ${updatedBuilding.buildingCode} deactivated`,
      oldValue: {
        propertyId: building.propertyId,
        buildingCode: building.buildingCode,
        name: building.name,
        description: building.description,
        buildingTypeId: building.buildingTypeId,
        buildingConditionId: building.buildingConditionId,
        numberOfFloors: building.numberOfFloors,
        numberOfBasements: building.numberOfBasements,
        yearBuilt: building.yearBuilt,
        yearRenovated: building.yearRenovated,
        floorAreaSqm: building.floorAreaSqm?.toString() ?? null,
        usableAreaSqm: building.usableAreaSqm?.toString() ?? null,
        numberOfRooms: building.numberOfRooms,
        numberOfUnits: building.numberOfUnits,
        parkingCapacity: building.parkingCapacity,
        accessibilityFeatures: building.accessibilityFeatures,
        notes: building.notes,
        isActive: building.isActive,
      },
      newValue: {
        propertyId: updatedBuilding.propertyId,
        buildingCode: updatedBuilding.buildingCode,
        name: updatedBuilding.name,
        description: updatedBuilding.description,
        buildingTypeId: updatedBuilding.buildingTypeId,
        buildingConditionId: updatedBuilding.buildingConditionId,
        numberOfFloors: updatedBuilding.numberOfFloors,
        numberOfBasements: updatedBuilding.numberOfBasements,
        yearBuilt: updatedBuilding.yearBuilt,
        yearRenovated: updatedBuilding.yearRenovated,
        floorAreaSqm: updatedBuilding.floorAreaSqm?.toString() ?? null,
        usableAreaSqm: updatedBuilding.usableAreaSqm?.toString() ?? null,
        numberOfRooms: updatedBuilding.numberOfRooms,
        numberOfUnits: updatedBuilding.numberOfUnits,
        parkingCapacity: updatedBuilding.parkingCapacity,
        accessibilityFeatures: updatedBuilding.accessibilityFeatures,
        notes: updatedBuilding.notes,
        isActive: updatedBuilding.isActive,
      },
    });

    return updatedBuilding;
  });
}
