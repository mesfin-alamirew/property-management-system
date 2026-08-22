import { prisma } from '@/lib/prisma';

export async function getAssetLocations() {
  return prisma.assetLocation.findMany({
    where: {
      isActive: true,
    },

    orderBy: {
      name: 'asc',
    },

    include: {
      organizationUnit: {
        select: {
          id: true,
          code: true,
          name: true,
        },
      },
    },
  });
}

export async function getAssetLocationById(id: string) {
  return prisma.assetLocation.findUnique({
    where: {
      id,
    },

    include: {
      organizationUnit: {
        select: {
          id: true,
          code: true,
          name: true,
        },
      },
    },
  });
}
export async function getActiveOrganizationUnits() {
  return prisma.organizationUnit.findMany({
    where: {
      isActive: true,
    },

    orderBy: {
      name: 'asc',
    },

    select: {
      id: true,
      code: true,
      name: true,
    },
  });
}
