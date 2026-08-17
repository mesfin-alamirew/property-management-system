import { AppError } from '@/lib/errors';

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

export async function createBuilding(data: BuildingFormData) {
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

  return createBuildingRecord(data);
}

export async function updateBuilding(id: string, data: BuildingFormData) {
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

  return updateBuildingRecord(id, data);
}

export async function deactivateBuilding(id: string) {
  const building = await findBuildingById(id);

  if (!building) {
    throw new AppError('Building not found', 'BUILDING_NOT_FOUND');
  }

  return deactivateBuildingRecord(id);
}
