import { Prisma } from '@/generated/prisma/client';

import { prisma } from '@/lib/prisma';

import type { DisposalItemFormData } from '../types/disposal-item.types';

export async function findDisposalItems() {
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

export async function findDisposalItemById(id: string) {
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

export async function findDisposalItemByAssetId(assetId: string) {
  return prisma.disposalItem.findFirst({
    where: {
      assetId,
    },

    include: {
      disposal: {
        select: {
          id: true,
          referenceNumber: true,
        },
      },
    },
  });
}

export async function findDisposalById(id: string) {
  return prisma.disposal.findUnique({
    where: {
      id,
    },
  });
}

export async function findAssetById(id: string) {
  return prisma.asset.findUnique({
    where: {
      id,
    },
  });
}

export async function createDisposalItemRecord(
  tx: Prisma.TransactionClient,
  data: DisposalItemFormData,
) {
  return tx.disposalItem.create({
    data: {
      disposalId: data.disposalId,
      assetId: data.assetId,
    },
  });
}

export async function updateDisposalItemRecord(
  id: string,
  data: DisposalItemFormData,
) {
  return prisma.disposalItem.update({
    where: {
      id,
    },

    data: {
      // disposalId and assetId can be deliberately controlled
      // by the command/business layer.
      disposalId: data.disposalId,
      assetId: data.assetId,
    },
  });
}
