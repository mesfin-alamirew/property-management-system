import { prisma } from '@/lib/prisma';

export async function getAssets() {
  return prisma.asset.findMany({
    orderBy: {
      name: 'asc',
    },
    include: {
      assetType: {
        select: {
          id: true,
          code: true,
          name: true,
        },
      },
      status: {
        select: {
          id: true,
          code: true,
          name: true,
        },
      },
      condition: {
        select: {
          id: true,
          code: true,
          name: true,
        },
      },
    },
  });
}

export async function getAssetById(id: string) {
  return prisma.asset.findUnique({
    where: {
      id,
    },
    include: {
      assetType: {
        select: {
          id: true,
          code: true,
          name: true,
        },
      },
      status: {
        select: {
          id: true,
          code: true,
          name: true,
        },
      },
      condition: {
        select: {
          id: true,
          code: true,
          name: true,
        },
      },
    },
  });
}

export async function getActiveAssetTypes() {
  return prisma.assetType.findMany({
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

export async function getActiveAssetStatuses() {
  return prisma.assetStatus.findMany({
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

export async function getActiveAssetConditions() {
  return prisma.assetCondition.findMany({
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
