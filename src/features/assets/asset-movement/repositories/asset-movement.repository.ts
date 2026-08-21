import { Prisma } from '@/generated/prisma/client';

import { prisma } from '@/lib/prisma';

import type { AssetMovementFormData } from '../schemas/asset-movement.schema';

export async function findAssetMovements() {
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

export async function findAssetMovementById(id: string) {
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

export async function findAssetMovementsByAssetId(assetId: string) {
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

export async function createAssetMovementRecord(
  tx: Prisma.TransactionClient,
  userId: string,
  fromLocationId: string | null,
  data: AssetMovementFormData,
) {
  return tx.assetMovement.create({
    data: {
      assetId: data.assetId,
      fromLocationId,
      toLocationId: data.toLocationId,
      movedByUserId: userId,
      reason: data.reason,
      notes: data.notes,
    },
  });
}

export async function getActiveEmployees() {
  return prisma.employee.findMany({
    where: {
      isActive: true,
    },

    orderBy: [
      {
        firstName: 'asc',
      },
      {
        lastName: 'asc',
      },
    ],

    select: {
      id: true,
      employeeNumber: true,
      firstName: true,
      middleName: true,
      lastName: true,
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
