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

export async function createBuildingSpaceTypeRecord(data: {
  code: string;
  name: string;
  description?: string;
}) {
  return prisma.buildingSpaceType.create({
    data,
  });
}

export async function updateBuildingSpaceTypeRecord(
  id: string,
  data: {
    code: string;
    name: string;
    description?: string;
  },
) {
  return prisma.buildingSpaceType.update({
    where: {
      id,
    },
    data,
  });
}

export async function deactivateBuildingSpaceTypeRecord(id: string) {
  return prisma.buildingSpaceType.update({
    where: {
      id,
    },
    data: {
      isActive: false,
    },
  });
}
