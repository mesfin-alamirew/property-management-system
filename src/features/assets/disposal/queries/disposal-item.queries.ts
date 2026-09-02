import { prisma } from '@/lib/prisma';

export async function getDisposalItems() {
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

export async function getDisposalItemById(id: string) {
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

export async function getDisposalItemsByDisposalId(disposalId: string) {
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
