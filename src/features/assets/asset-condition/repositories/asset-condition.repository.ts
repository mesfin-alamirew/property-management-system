import { prisma } from '@/lib/prisma';

import type { AssetConditionFormData } from '../schemas/asset-condition.schema';

export async function findAssetConditions() {
  return prisma.assetCondition.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      name: 'asc',
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

export async function findAssetConditionByCode(
  code: string,
  excludeId?: string,
) {
  return prisma.assetCondition.findFirst({
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

export async function createAssetConditionRecord(data: AssetConditionFormData) {
  return prisma.assetCondition.create({
    data: {
      code: data.code,
      name: data.name,
      description: data.description,
    },
  });
}

export async function updateAssetConditionRecord(
  id: string,
  data: AssetConditionFormData,
) {
  return prisma.assetCondition.update({
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

export async function deactivateAssetConditionRecord(id: string) {
  return prisma.assetCondition.update({
    where: {
      id,
    },
    data: {
      isActive: false,
    },
  });
}
