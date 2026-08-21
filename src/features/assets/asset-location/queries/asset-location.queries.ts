import { prisma } from '@/lib/prisma';

export async function getAssetLocations() {
  return prisma.assetLocation.findMany({
    where: {
      isActive: true,
    },

    orderBy: {
      name: 'asc',
    },
  });
}

export async function getAssetLocationById(id: string) {
  return prisma.assetLocation.findUnique({
    where: {
      id,
    },
  });
}
