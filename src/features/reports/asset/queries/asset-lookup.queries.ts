import { prisma } from '@/lib/prisma';

export async function getAssetReportAssetTypes() {
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

export async function getAssetReportAssetCategories() {
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

export async function getAssetReportStatuses() {
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

export async function getAssetReportConditions() {
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

export async function getAssetReportOrganizationUnits() {
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

export async function getAssetReportLocations() {
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

export async function getAssetReportAcquisitionMethods() {
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
