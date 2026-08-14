import { prisma } from '@/lib/prisma';

import type { BuildingConditionFormData } from '../schemas/building-condition.schema';

export async function findBuildingConditions() {
  return prisma.buildingCondition.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      name: 'asc',
    },
  });
}

export async function findBuildingConditionById(id: string) {
  return prisma.buildingCondition.findUnique({
    where: {
      id,
    },
  });
}

export async function findBuildingConditionByCode(
  code: string,
  excludeId?: string,
) {
  return prisma.buildingCondition.findFirst({
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

export async function createBuildingConditionRecord(
  data: BuildingConditionFormData,
) {
  return prisma.buildingCondition.create({
    data: {
      code: data.code,
      name: data.name,
      description: data.description,
    },
  });
}

export async function updateBuildingConditionRecord(
  id: string,
  data: BuildingConditionFormData,
) {
  return prisma.buildingCondition.update({
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

export async function deactivateBuildingConditionRecord(id: string) {
  return prisma.buildingCondition.update({
    where: {
      id,
    },
    data: {
      isActive: false,
    },
  });
}
