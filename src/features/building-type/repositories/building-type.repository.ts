import { prisma } from '@/lib/prisma';

import type { BuildingTypeFormData } from '../schemas/building-type.schema';

export async function findBuildingTypes() {
  return prisma.buildingType.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      name: 'asc',
    },
  });
}

export async function findBuildingTypeById(id: string) {
  return prisma.buildingType.findUnique({
    where: {
      id,
    },
  });
}

export async function findBuildingTypeByCode(code: string, excludeId?: string) {
  return prisma.buildingType.findFirst({
    where: {
      code,
      NOT: excludeId
        ? {
            id: excludeId,
          }
        : undefined,
    },
  });
}

export async function createBuildingTypeRecord(data: BuildingTypeFormData) {
  return prisma.buildingType.create({
    data: {
      code: data.code,
      name: data.name,
      description: data.description,
    },
  });
}

export async function updateBuildingTypeRecord(
  id: string,
  data: BuildingTypeFormData,
) {
  return prisma.buildingType.update({
    where: {
      id,
    },
    data: {
      code: data.code,
      name: data.name,
      description: data.description,
    },
  });
}

export async function deactivateBuildingTypeRecord(id: string) {
  return prisma.buildingType.update({
    where: {
      id,
    },
    data: {
      isActive: false,
    },
  });
}
