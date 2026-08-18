import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';

import type { AcquisitionItemFormData } from '../schemas/acquisition-item.schema';

export async function findAcquisitionItems() {
  return prisma.acquisitionItem.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      acquisition: {
        select: {
          id: true,
          acquisitionNumber: true,
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

export async function findAcquisitionItemById(id: string) {
  return prisma.acquisitionItem.findUnique({
    where: {
      id,
    },
    include: {
      acquisition: {
        select: {
          id: true,
          acquisitionNumber: true,
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

export async function findAcquisitionItemByAssetId(assetId: string) {
  return prisma.acquisitionItem.findUnique({
    where: {
      assetId,
    },
  });
}

export async function findAcquisitionById(id: string) {
  return prisma.acquisition.findUnique({
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

export async function createAcquisitionItemRecord(
  tx: Prisma.TransactionClient,
  data: AcquisitionItemFormData,
) {
  return tx.acquisitionItem.create({
    data: {
      acquisitionId: data.acquisitionId,
      assetId: data.assetId,
      unitCost: data.unitCost ? new Prisma.Decimal(data.unitCost) : undefined,
      totalCost: data.totalCost
        ? new Prisma.Decimal(data.totalCost)
        : undefined,
    },
  });
}

export async function updateAcquisitionItemRecord(
  id: string,
  data: AcquisitionItemFormData,
) {
  return prisma.acquisitionItem.update({
    where: {
      id,
    },
    data: {
      // acquisitionId and assetId can be deliberately controlled
      // by the command/business layer.
      acquisitionId: data.acquisitionId,
      assetId: data.assetId,
      unitCost: data.unitCost ? new Prisma.Decimal(data.unitCost) : undefined,
      totalCost: data.totalCost
        ? new Prisma.Decimal(data.totalCost)
        : undefined,
    },
  });
}
