import { prisma } from '@/lib/prisma';

import type { AssetTypeFormData } from '../schemas/asset-type.schema';

export async function findAssetTypes() {
  return prisma.assetType.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      name: 'asc',
    },
    include: {
      category: true,
    },
  });
}

export async function findAssetTypeById(id: string) {
  return prisma.assetType.findUnique({
    where: {
      id,
    },
    include: {
      category: true,
    },
  });
}

export async function findAssetTypeByCode(code: string, excludeId?: string) {
  return prisma.assetType.findFirst({
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

export async function createAssetTypeRecord(data: AssetTypeFormData) {
  return prisma.assetType.create({
    data: {
      code: data.code,
      name: data.name,
      description: data.description,
      categoryId: data.categoryId,
    },
  });
}

export async function updateAssetTypeRecord(
  id: string,
  data: AssetTypeFormData,
) {
  return prisma.assetType.update({
    where: {
      id,
    },
    data: {
      code: data.code,
      name: data.name,
      description: data.description,
      categoryId: data.categoryId,
    },
  });
}

export async function deactivateAssetTypeRecord(id: string) {
  return prisma.assetType.update({
    where: {
      id,
    },
    data: {
      isActive: false,
    },
  });
}
