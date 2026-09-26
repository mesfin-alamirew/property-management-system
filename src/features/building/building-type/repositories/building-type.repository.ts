import { Prisma } from '@/generated/prisma/client';
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

export async function createBuildingTypeRecord(
  tx: Prisma.TransactionClient,
  data: BuildingTypeFormData,
) {
  return tx.buildingType.create({
    data: {
      code: data.code,
      name: data.name,
      description: data.description,
    },
  });
}

export async function updateBuildingTypeRecord(
  tx: Prisma.TransactionClient,
  id: string,
  data: BuildingTypeFormData,
) {
  return tx.buildingType.update({
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

export async function deactivateBuildingTypeRecord(
  tx: Prisma.TransactionClient,
  id: string,
) {
  return tx.buildingType.update({
    where: {
      id,
    },
    data: {
      isActive: false,
    },
  });
}
