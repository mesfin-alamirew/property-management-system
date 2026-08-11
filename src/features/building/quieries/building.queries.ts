import { prisma } from '@/lib/prisma';

export async function getBuildings() {
  const buildings = await prisma.building.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      name: 'asc',
    },
    include: {
      property: {
        select: {
          id: true,
          propertyCode: true,
          name: true,
        },
      },
      buildingType: {
        select: {
          id: true,
          code: true,
          name: true,
        },
      },
      buildingCondition: {
        select: {
          id: true,
          code: true,
          name: true,
        },
      },
    },
  });

  return buildings.map((building) => ({
    ...building,
    floorAreaSqm: building.floorAreaSqm?.toString() ?? null,
    usableAreaSqm: building.usableAreaSqm?.toString() ?? null,
  }));
}
