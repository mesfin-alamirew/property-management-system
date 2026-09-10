import { requirePermission } from '@/lib/authorization/authorization.service';
import { prisma } from '@/lib/prisma';

export async function getAssetLocations(userId: string) {
  await requirePermission({
    userId,
    permissionCode: 'ASSET_LOCATION:READ',
  });

  return prisma.assetLocation.findMany({
    where: {
      isActive: true,
    },

    orderBy: {
      name: 'asc',
    },

    include: {
      organizationUnit: {
        select: {
          id: true,
          code: true,
          name: true,
        },
      },
    },
  });
}

export async function getAssetLocationById(userId: string, id: string) {
  await requirePermission({
    userId,
    permissionCode: 'ASSET_LOCATION:READ',
  });

  return prisma.assetLocation.findUnique({
    where: {
      id,
    },

    include: {
      organizationUnit: {
        select: {
          id: true,
          code: true,
          name: true,
        },
      },
    },
  });
}

export async function getActiveOrganizationUnits() {
  return prisma.organizationUnit.findMany({
    where: {
      isActive: true,
    },

    orderBy: {
      name: 'asc',
    },

    select: {
      id: true,
      code: true,
      name: true,
    },
  });
}
