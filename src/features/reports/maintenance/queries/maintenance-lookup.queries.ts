import { prisma } from '@/lib/prisma';

export async function getMaintenanceReportAssets() {
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

export async function getMaintenanceReportAssignedUsers() {
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
