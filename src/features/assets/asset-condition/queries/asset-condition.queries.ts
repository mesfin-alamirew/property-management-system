import { prisma } from '@/lib/prisma';

export async function getAssetConditions() {
  return prisma.assetCondition.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      name: 'asc',
    },
  });
}
