import { prisma } from '@/lib/prisma';

import { requirePermission } from '@/lib/authorization/authorization.service';

export async function getDashboardLookups(userId: string) {
  await requirePermission({
    userId,
    permissionCode: 'REPORT_DASHBOARD:READ',
  });

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
