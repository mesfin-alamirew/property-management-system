import { requirePermission } from '@/lib/authorization/authorization.service';

import { prisma } from '@/lib/prisma';

export async function getDisposalItems(userId: string) {
  await requirePermission({
    userId,
    permissionCode: 'DISPOSAL_ITEM:READ',
  });

  return prisma.disposalItem.findMany({
    orderBy: {
      createdAt: 'desc',
    },

    include: {
      disposal: {
        select: {
          id: true,
          referenceNumber: true,
        },
      },

      asset: {
        select: {
          id: true,
          assetCode: true,
          name: true,
        },
      },
    },
  });
}

export async function getDisposalItemById(userId: string, id: string) {
  await requirePermission({
    userId,
    permissionCode: 'DISPOSAL_ITEM:READ',
  });

  return prisma.disposalItem.findUnique({
    where: {
      id,
    },

    include: {
      disposal: {
        select: {
          id: true,
          referenceNumber: true,
        },
      },

      asset: {
        select: {
          id: true,
          assetCode: true,
          name: true,
        },
      },
    },
  });
}

export async function getDisposalItemsByDisposalId(
  userId: string,
  disposalId: string,
) {
  await requirePermission({
    userId,
    permissionCode: 'DISPOSAL_ITEM:READ',
  });

  return prisma.disposalItem.findMany({
    where: {
      disposalId,
    },

    orderBy: {
      createdAt: 'desc',
    },

    include: {
      disposal: {
        select: {
          id: true,
          referenceNumber: true,
        },
      },

      asset: {
        select: {
          id: true,
          assetCode: true,
          name: true,
        },
      },
    },
  });
}

export async function getAvailableAssetsForDisposalItem() {
  return prisma.asset.findMany({
    where: {
      disposalItems: {
        none: {},
      },
    },

    orderBy: {
      name: 'asc',
    },

    select: {
      id: true,
      assetCode: true,
      name: true,
    },
  });
}
