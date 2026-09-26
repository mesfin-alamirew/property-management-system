import { requirePermission } from '@/lib/authorization/authorization.service';
import { prisma } from '@/lib/prisma';

export async function getMaintenanceReportAssets(userId: string) {
  await requirePermission({
    userId,
    permissionCode: 'REPORT_MAINTENANCE:READ',
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

export async function getMaintenanceReportAssignedUsers(userId: string) {
  await requirePermission({
    userId,
    permissionCode: 'REPORT_MAINTENANCE:READ',
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
