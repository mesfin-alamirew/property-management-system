import { prisma } from '@/lib/prisma';
import { Prisma } from '@/generated/prisma/client';

import type { BuildingFormData } from '../schemas/building.schema';

function toDecimal(value?: string) {
  if (!value || value.trim() === '') {
    return undefined;
  }

  return new Prisma.Decimal(value);
}

export async function findBuildings() {
  return prisma.building.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      name: 'asc',
    },
    include: {
      property: true,
      buildingType: true,
      buildingCondition: true,
    },
  });
}

export async function findBuildingById(id: string) {
  return prisma.building.findUnique({
    where: {
      id,
    },
    include: {
      property: true,
      buildingType: true,
      buildingCondition: true,
    },
  });
}

export async function findBuildingByCode(
  propertyId: string,
  buildingCode: string,
  excludeId?: string,
) {
  return prisma.building.findFirst({
    where: {
      propertyId,
      buildingCode,
      NOT: excludeId
        ? {
            id: excludeId,
          }
        : undefined,
    },
  });
}

export async function createBuildingRecord(data: BuildingFormData) {
  return prisma.building.create({
    data: {
      propertyId: data.propertyId,
      buildingCode: data.buildingCode,
      name: data.name,
      description: data.description,

      buildingTypeId: data.buildingTypeId,
      buildingConditionId: data.buildingConditionId,

      numberOfFloors:
        data.numberOfFloors !== undefined
          ? Number(data.numberOfFloors)
          : undefined,

      numberOfBasements:
        data.numberOfBasements !== undefined
          ? Number(data.numberOfBasements)
          : undefined,

      yearRenovated:
        data.yearRenovated !== undefined
          ? Number(data.yearRenovated)
          : undefined,

      floorAreaSqm: toDecimal(data.floorAreaSqm),
      usableAreaSqm: toDecimal(data.usableAreaSqm),

      numberOfRooms:
        data.numberOfRooms !== undefined
          ? Number(data.numberOfRooms)
          : undefined,

      numberOfUnits:
        data.numberOfUnits !== undefined
          ? Number(data.numberOfUnits)
          : undefined,

      parkingCapacity:
        data.parkingCapacity !== undefined
          ? Number(data.parkingCapacity)
          : undefined,

      notes: data.notes,
    },
  });
}

export async function updateBuildingRecord(id: string, data: BuildingFormData) {
  return prisma.building.update({
    where: {
      id,
    },
    data: {
      propertyId: data.propertyId,
      buildingCode: data.buildingCode,
      name: data.name,
      description: data.description,

      buildingTypeId: data.buildingTypeId,
      buildingConditionId: data.buildingConditionId,

      numberOfFloors:
        data.numberOfFloors !== undefined
          ? Number(data.numberOfFloors)
          : undefined,

      numberOfBasements:
        data.numberOfBasements !== undefined
          ? Number(data.numberOfBasements)
          : undefined,

      yearRenovated:
        data.yearRenovated !== undefined
          ? Number(data.yearRenovated)
          : undefined,

      floorAreaSqm: toDecimal(data.floorAreaSqm),
      usableAreaSqm: toDecimal(data.usableAreaSqm),

      numberOfRooms:
        data.numberOfRooms !== undefined
          ? Number(data.numberOfRooms)
          : undefined,

      numberOfUnits:
        data.numberOfUnits !== undefined
          ? Number(data.numberOfUnits)
          : undefined,

      parkingCapacity:
        data.parkingCapacity !== undefined
          ? Number(data.parkingCapacity)
          : undefined,

      notes: data.notes,
    },
  });
}

export async function deactivateBuildingRecord(id: string) {
  return prisma.building.update({
    where: {
      id,
    },
    data: {
      isActive: false,
    },
  });
}
