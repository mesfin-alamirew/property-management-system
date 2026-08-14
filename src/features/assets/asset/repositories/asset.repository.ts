import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';

import type { AssetFormData } from '../schemas/asset.schema';

export async function findAssets() {
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

export async function findAssetById(id: string) {
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

export async function findAssetByAssetCode(assetCode: string) {
  return prisma.asset.findUnique({
    where: {
      assetCode,
    },
  });
}

export async function findAssetByAssetTag(
  assetTag: string,
  excludeId?: string,
) {
  return prisma.asset.findFirst({
    where: {
      assetTag,
      NOT: excludeId
        ? {
            id: excludeId,
          }
        : undefined,
    },
  });
}
export async function findAssetTypeById(id: string) {
  return prisma.assetType.findUnique({
    where: {
      id,
    },
  });
}

export async function findAssetStatusById(id: string) {
  return prisma.assetStatus.findUnique({
    where: {
      id,
    },
  });
}

export async function findAssetConditionById(id: string) {
  return prisma.assetCondition.findUnique({
    where: {
      id,
    },
  });
}

export async function findAssetBySerialNumber(
  serialNumber: string,
  excludeId?: string,
) {
  return prisma.asset.findFirst({
    where: {
      serialNumber,
      NOT: excludeId
        ? {
            id: excludeId,
          }
        : undefined,
    },
  });
}

export async function createAssetRecord(
  tx: Prisma.TransactionClient,
  assetCode: string,
  data: AssetFormData,
) {
  return tx.asset.create({
    data: {
      assetCode,
      assetTag: data.assetTag,
      name: data.name,
      description: data.description,
      manufacturer: data.manufacturer,
      model: data.model,
      serialNumber: data.serialNumber,
      assetTypeId: data.assetTypeId,
      statusId: data.statusId,
      conditionId: data.conditionId,
    },
  });
}

export async function updateAssetRecord(id: string, data: AssetFormData) {
  return prisma.asset.update({
    where: {
      id,
    },
    data: {
      // assetCode is deliberately NOT updated.
      assetTag: data.assetTag,
      name: data.name,
      description: data.description,
      manufacturer: data.manufacturer,
      model: data.model,
      serialNumber: data.serialNumber,
      assetTypeId: data.assetTypeId,
      statusId: data.statusId,
      conditionId: data.conditionId,
    },
  });
}
