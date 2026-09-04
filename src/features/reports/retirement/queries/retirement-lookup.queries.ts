import { prisma } from '@/lib/prisma';

export async function getRetirementReportAssets() {
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

export async function getRetirementReportConditions() {
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

export async function getRetirementReportUsers() {
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
