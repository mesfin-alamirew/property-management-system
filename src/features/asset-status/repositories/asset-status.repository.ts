import { prisma } from '@/lib/prisma';

import type { AssetStatusFormData } from '../schemas/asset-status.schema';

export async function findAssetStatuses() {
  return prisma.assetStatus.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      name: 'asc',
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

export async function findAssetStatusByCode(code: string, excludeId?: string) {
  return prisma.assetStatus.findFirst({
    where: {
      code,
      NOT: excludeId
        ? {
            id: excludeId,
          }
        : undefined,
    },
  });
}

export async function createAssetStatusRecord(data: AssetStatusFormData) {
  return prisma.assetStatus.create({
    data: {
      code: data.code,
      name: data.name,
      description: data.description,
    },
  });
}

export async function updateAssetStatusRecord(
  id: string,
  data: AssetStatusFormData,
) {
  return prisma.assetStatus.update({
    where: {
      id,
    },
    data: {
      code: data.code,
      name: data.name,
      description: data.description,
    },
  });
}

export async function deactivateAssetStatusRecord(id: string) {
  return prisma.assetStatus.update({
    where: {
      id,
    },
    data: {
      isActive: false,
    },
  });
}
