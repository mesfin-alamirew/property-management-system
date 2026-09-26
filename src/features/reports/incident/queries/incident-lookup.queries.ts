import { requirePermission } from '@/lib/authorization/authorization.service';
import { prisma } from '@/lib/prisma';

export async function getIncidentReportAssets(userId: string) {
  await requirePermission({
    userId,
    permissionCode: 'REPORT_INCIDENT:READ',
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

export async function getIncidentReportUsers(userId: string) {
  await requirePermission({
    userId,
    permissionCode: 'REPORT_INCIDENT:READ',
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
