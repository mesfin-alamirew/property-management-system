import { prisma } from '@/lib/prisma';

import type { AssetCategoryFormData } from '../schemas/asset-category.schema';

export async function findAssetCategories() {
  return prisma.assetCategory.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      name: 'asc',
    },
    include: {
      parent: true,
    },
  });
}

export async function findAssetCategoryById(id: string) {
  return prisma.assetCategory.findUnique({
    where: {
      id,
    },
    include: {
      parent: true,
    },
  });
}

export async function findAssetCategoryByCode(
  code: string,
  excludeId?: string,
) {
  return prisma.assetCategory.findFirst({
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

export async function createAssetCategoryRecord(data: AssetCategoryFormData) {
  return prisma.assetCategory.create({
    data: {
      code: data.code,
      name: data.name,
      description: data.description,
      parentId: data.parentId,
    },
  });
}

export async function updateAssetCategoryRecord(
  id: string,
  data: AssetCategoryFormData,
) {
  return prisma.assetCategory.update({
    where: {
      id,
    },
    data: {
      code: data.code,
      name: data.name,
      description: data.description,
      parentId: data.parentId,
    },
  });
}

export async function deactivateAssetCategoryRecord(id: string) {
  return prisma.assetCategory.update({
    where: {
      id,
    },
    data: {
      isActive: false,
    },
  });
}
