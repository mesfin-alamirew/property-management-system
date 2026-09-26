import { prisma } from '@/lib/prisma';

import { requirePermission } from '@/lib/authorization/authorization.service';

export async function getMovementReportAssets(userId: string) {
  await requirePermission({
    userId,
    permissionCode: 'REPORT_MOVEMENT:READ',
  });

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

export async function getMovementReportLocations(userId: string) {
  await requirePermission({
    userId,
    permissionCode: 'REPORT_MOVEMENT:READ',
  });

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

export async function getMovementReportUsers(userId: string) {
  await requirePermission({
    userId,
    permissionCode: 'REPORT_MOVEMENT:READ',
  });

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
