import { prisma } from '@/lib/prisma';

export async function getDashboardLookups() {
  const [organizationUnits, assetTypes, assetStatuses] = await Promise.all([
    prisma.organizationUnit.findMany({
      orderBy: {
        name: 'asc',
      },
      select: {
        id: true,
        code: true,
        name: true,
      },
    }),

    prisma.assetType.findMany({
      orderBy: {
        name: 'asc',
      },
      select: {
        id: true,
        code: true,
        name: true,
      },
    }),

    prisma.assetStatus.findMany({
      orderBy: {
        name: 'asc',
      },
      select: {
        id: true,
        code: true,
        name: true,
      },
    }),
  ]);

  return {
    organizationUnits,
    assetTypes,
    assetStatuses,
  };
}
