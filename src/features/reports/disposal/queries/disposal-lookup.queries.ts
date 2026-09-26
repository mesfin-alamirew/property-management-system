import { requirePermission } from '@/lib/authorization/authorization.service';
import { prisma } from '@/lib/prisma';

export async function getDisposalReportAssets(userId: string) {
  await requirePermission({
    userId,
    permissionCode: 'REPORT_DISPOSAL:READ',
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

export async function getDisposalReportUsers(userId: string) {
  await requirePermission({
    userId,
    permissionCode: 'REPORT_DISPOSAL:READ',
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
