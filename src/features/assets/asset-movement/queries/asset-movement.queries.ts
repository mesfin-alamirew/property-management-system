import { prisma } from '@/lib/prisma';

export async function getAssetMovements() {
  return prisma.assetMovement.findMany({
    orderBy: {
      movedAt: 'desc',
    },

    include: {
      asset: {
        select: {
          id: true,
          assetCode: true,
          assetTag: true,
          name: true,
        },
      },

      fromLocation: {
        select: {
          id: true,
          code: true,
          name: true,
        },
      },

      toLocation: {
        select: {
          id: true,
          code: true,
          name: true,
        },
      },

      movedByUser: {
        select: {
          id: true,
          username: true,
          displayName: true,
        },
      },
    },
  });
}

export async function getAssetMovementById(id: string) {
  return prisma.assetMovement.findUnique({
    where: {
      id,
    },

    include: {
      asset: {
        select: {
          id: true,
          assetCode: true,
          assetTag: true,
          name: true,
        },
      },

      fromLocation: {
        select: {
          id: true,
          code: true,
          name: true,
        },
      },

      toLocation: {
        select: {
          id: true,
          code: true,
          name: true,
        },
      },

      movedByUser: {
        select: {
          id: true,
          username: true,
          displayName: true,
        },
      },
    },
  });
}

export async function getAssetMovementsByAssetId(assetId: string) {
  return prisma.assetMovement.findMany({
    where: {
      assetId,
    },

    orderBy: {
      movedAt: 'desc',
    },

    include: {
      asset: {
        select: {
          id: true,
          assetCode: true,
          assetTag: true,
          name: true,
        },
      },

      fromLocation: {
        select: {
          id: true,
          code: true,
          name: true,
        },
      },

      toLocation: {
        select: {
          id: true,
          code: true,
          name: true,
        },
      },

      movedByUser: {
        select: {
          id: true,
          username: true,
          displayName: true,
        },
      },
    },
  });
}

export async function getActiveAssetLocations() {
  return prisma.assetLocation.findMany({
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

export async function getAvailableAssets() {
  return prisma.asset.findMany({
    where: {
      assetAssignments: {
        none: {
          returnedAt: null,
        },
      },
    },

    orderBy: {
      name: 'asc',
    },

    select: {
      id: true,
      assetCode: true,
      assetTag: true,
      name: true,
    },
  });
}
