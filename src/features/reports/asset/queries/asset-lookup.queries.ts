import { prisma } from '@/lib/prisma';
import { requirePermission } from '@/lib/authorization/authorization.service';
export async function getAssetReportAssetTypes(userId: string) {
  await requirePermission({
    userId,
    permissionCode: 'REPORT_ASSET:READ',
  });
  return prisma.assetType.findMany({
    where: {
      isActive: true,
    },
    select: {
      id: true,
      code: true,
      name: true,
      category: {
        select: {
          id: true,
          code: true,
          name: true,
        },
      },
    },
    orderBy: {
      name: 'asc',
    },
  });
}

export async function getAssetReportAssetCategories(userId: string) {
  await requirePermission({
    userId,
    permissionCode: 'REPORT_ASSET:READ',
  });
  return prisma.assetCategory.findMany({
    where: {
      isActive: true,
    },
    select: {
      id: true,
      code: true,
      name: true,
    },
    orderBy: {
      name: 'asc',
    },
  });
}

export async function getAssetReportStatuses(userId: string) {
  await requirePermission({
    userId,
    permissionCode: 'REPORT_ASSET:READ',
  });
  return prisma.assetStatus.findMany({
    where: {
      isActive: true,
    },
    select: {
      id: true,
      code: true,
      name: true,
    },
    orderBy: {
      name: 'asc',
    },
  });
}

export async function getAssetReportConditions(userId: string) {
  await requirePermission({
    userId,
    permissionCode: 'REPORT_ASSET:READ',
  });
  return prisma.assetCondition.findMany({
    where: {
      isActive: true,
    },
    select: {
      id: true,
      code: true,
      name: true,
    },
    orderBy: {
      name: 'asc',
    },
  });
}

export async function getAssetReportOrganizationUnits(userId: string) {
  await requirePermission({
    userId,
    permissionCode: 'REPORT_ASSET:READ',
  });
  return prisma.organizationUnit.findMany({
    where: {
      isActive: true,
    },
    select: {
      id: true,
      code: true,
      name: true,
    },
    orderBy: {
      name: 'asc',
    },
  });
}

export async function getAssetReportLocations(userId: string) {
  await requirePermission({
    userId,
    permissionCode: 'REPORT_ASSET:READ',
  });
  return prisma.assetLocation.findMany({
    where: {
      isActive: true,
    },
    select: {
      id: true,
      code: true,
      name: true,
      organizationUnit: {
        select: {
          id: true,
          code: true,
          name: true,
        },
      },
    },
    orderBy: {
      name: 'asc',
    },
  });
}

export async function getAssetReportAcquisitionMethods(userId: string) {
  await requirePermission({
    userId,
    permissionCode: 'REPORT_ASSET:READ',
  });
  return prisma.acquisitionMethod.findMany({
    where: {
      isActive: true,
    },
    select: {
      id: true,
      code: true,
      name: true,
    },
    orderBy: {
      name: 'asc',
    },
  });
}
