import { prisma } from '@/lib/prisma';

import type { AssetLocationFormData } from '../schemas/asset-location.schema';

export async function findAssetLocations() {
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

export async function findAssetLocationById(id: string) {
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

export async function findAssetLocationByCode(
  code: string,
  excludeId?: string,
) {
  return prisma.assetLocation.findFirst({
    where: {
      code,

      NOT: excludeId
        ? {
            id: excludeId,
          }
        : undefined,
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
export async function findAssetLocationByName(
  name: string,
  excludeId?: string,
) {
  return prisma.assetLocation.findFirst({
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
export async function createAssetLocationRecord(data: AssetLocationFormData) {
  return prisma.assetLocation.create({
    data: {
      code: data.code,
      name: data.name,
      description: data.description,

      organizationUnit: {
        connect: {
          id: data.organizationUnitId,
        },
      },
    },
  });
}

export async function updateAssetLocationRecord(
  id: string,
  data: AssetLocationFormData,
) {
  return prisma.assetLocation.update({
    where: {
      id,
    },

    data: {
      code: data.code,
      name: data.name,
      description: data.description,

      organizationUnit: {
        connect: {
          id: data.organizationUnitId,
        },
      },
    },
  });
}

export async function deactivateAssetLocationRecord(id: string) {
  return prisma.assetLocation.update({
    where: {
      id,
    },

    data: {
      isActive: false,
    },
  });
}
