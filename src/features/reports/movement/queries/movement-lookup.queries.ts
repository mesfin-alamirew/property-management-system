import { prisma } from '@/lib/prisma';

export async function getMovementReportAssets() {
  return prisma.asset.findMany({
    orderBy: {
      assetCode: 'asc',
    },
    select: {
      id: true,
      assetCode: true,
      assetTag: true,
      name: true,
    },
  });
}

export async function getMovementReportLocations() {
  return prisma.assetLocation.findMany({
    orderBy: {
      name: 'asc',
    },
    select: {
      id: true,
      name: true,
    },
  });
}

export async function getMovementReportUsers() {
  return prisma.user.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      displayName: 'asc',
    },
    select: {
      id: true,
      displayName: true,
    },
  });
}
