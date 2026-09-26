import { prisma } from '@/lib/prisma';
import { requirePermission } from '@/lib/authorization/authorization.service';
import { StringDecoder } from 'string_decoder';
export async function getRetirementReportAssets(userId: string) {
  await requirePermission({
    userId,
    permissionCode: 'REPORT_RETIREMENT:READ',
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

export async function getRetirementReportConditions(userId: string) {
  await requirePermission({
    userId,
    permissionCode: 'REPORT_RETIREMENT:READ',
  });
  return prisma.assetCondition.findMany({
    orderBy: {
      name: 'asc',
    },
    select: {
      id: true,
      name: true,
    },
  });
}

export async function getRetirementReportUsers(userId: string) {
  await requirePermission({
    userId,
    permissionCode: 'REPORT_RETIREMENT:READ',
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
