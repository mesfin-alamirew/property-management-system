import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';

export async function findBuildingSpaceTypes() {
  return prisma.buildingSpaceType.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      name: 'asc',
    },
  });
}

export async function findBuildingSpaceTypeById(id: string) {
  return prisma.buildingSpaceType.findUnique({
    where: {
      id,
    },
  });
}

export async function findBuildingSpaceTypeByCode(
  code: string,
  excludeId?: string,
) {
  return prisma.buildingSpaceType.findFirst({
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

export async function findBuildingSpaceTypeByName(
  name: string,
  excludeId?: string,
) {
  return prisma.buildingSpaceType.findFirst({
    where: {
      name,
      NOT: excludeId
        ? {
            id: excludeId,
          }
        : undefined,
    },
  });
}

export async function createBuildingSpaceTypeRecord(
  tx: Prisma.TransactionClient,
  data: {
    code: string;
    name: string;
    description?: string;
  },
) {
  return tx.buildingSpaceType.create({
    data,
  });
}

export async function updateBuildingSpaceTypeRecord(
  tx: Prisma.TransactionClient,
  id: string,
  data: {
    code: string;
    name: string;
    description?: string;
  },
) {
  return tx.buildingSpaceType.update({
    where: {
      id,
    },
    data,
  });
}

export async function deactivateBuildingSpaceTypeRecord(
  tx: Prisma.TransactionClient,
  id: string,
) {
  return tx.buildingSpaceType.update({
    where: {
      id,
    },
    data: {
      isActive: false,
    },
  });
}
