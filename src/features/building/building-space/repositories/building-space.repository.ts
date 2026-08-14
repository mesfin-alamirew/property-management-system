import { prisma } from '@/lib/prisma';

import type { BuildingSpaceFormData } from '../schemas/building-space.schema';

export async function findBuildingSpaces() {
  const spaces = await prisma.buildingSpace.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      name: 'asc',
    },
    include: {
      building: {
        select: {
          id: true,
          buildingCode: true,
          name: true,
          property: {
            select: {
              id: true,
              propertyCode: true,
              name: true,
            },
          },
        },
      },
      spaceType: {
        select: {
          id: true,
          code: true,
          name: true,
        },
      },
    },
  });

  return spaces.map((space) => ({
    ...space,
    areaSqm: space.areaSqm?.toString() ?? null,
  }));
}
export async function findBuildingSpaceById(id: string) {
  return prisma.buildingSpace.findUnique({
    where: {
      id,
    },
  });
}

export async function findBuildingSpaceByCode(
  buildingId: string,
  code: string,
  excludeId?: string,
) {
  return prisma.buildingSpace.findFirst({
    where: {
      buildingId,
      code,
      ...(excludeId
        ? {
            id: {
              not: excludeId,
            },
          }
        : {}),
    },
  });
}

export async function createBuildingSpaceRecord(data: BuildingSpaceFormData) {
  return prisma.buildingSpace.create({
    data: {
      buildingId: data.buildingId,
      spaceTypeId: data.spaceTypeId,
      code: data.code,
      name: data.name,
      floorNumber: data.floorNumber ? Number(data.floorNumber) : null,
      areaSqm: data.areaSqm ? Number(data.areaSqm) : null,
      capacity: data.capacity ? Number(data.capacity) : null,
      notes: data.notes || null,
    },
  });
}

export async function updateBuildingSpaceRecord(
  id: string,
  data: BuildingSpaceFormData,
) {
  return prisma.buildingSpace.update({
    where: {
      id,
    },
    data: {
      buildingId: data.buildingId,
      spaceTypeId: data.spaceTypeId,
      code: data.code,
      name: data.name,
      floorNumber: data.floorNumber ? Number(data.floorNumber) : null,
      areaSqm: data.areaSqm ? Number(data.areaSqm) : null,
      capacity: data.capacity ? Number(data.capacity) : null,
      notes: data.notes || null,
    },
  });
}

export async function deactivateBuildingSpaceRecord(id: string) {
  return prisma.buildingSpace.update({
    where: {
      id,
    },
    data: {
      isActive: false,
    },
  });
}
