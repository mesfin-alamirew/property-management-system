import { prisma } from '@/lib/prisma';

export async function getAssetStatuses() {
  return prisma.assetStatus.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      name: 'asc',
    },
  });
}
