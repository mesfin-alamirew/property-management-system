import { prisma } from '@/lib/prisma';
import { requirePermission } from '@/lib/authorization/authorization.service';
export async function getAcquisitionItems(userId: string) {
  await requirePermission({
    userId,
    permissionCode: 'ACQUISITION_ITEM:READ',
  });

  const acquisitionItems = await prisma.acquisitionItem.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      acquisition: {
        select: {
          id: true,
          acquisitionNumber: true,
        },
      },
      asset: {
        select: {
          id: true,
          assetCode: true,
          name: true,
        },
      },
    },
  });

  return acquisitionItems.map((item) => ({
    ...item,
    unitCost: item.unitCost?.toString() ?? null,
    totalCost: item.totalCost?.toString() ?? null,
  }));
}

export async function getAcquisitionItemById(userId: string, id: string) {
  await requirePermission({
    userId,
    permissionCode: 'ACQUISITION_ITEM:READ',
  });

  const acquisitionItem = await prisma.acquisitionItem.findUnique({
    where: {
      id,
    },
    include: {
      acquisition: {
        select: {
          id: true,
          acquisitionNumber: true,
        },
      },
      asset: {
        select: {
          id: true,
          assetCode: true,
          name: true,
        },
      },
    },
  });

  if (!acquisitionItem) {
    return null;
  }

  return {
    ...acquisitionItem,
    unitCost: acquisitionItem.unitCost?.toString() ?? null,
    totalCost: acquisitionItem.totalCost?.toString() ?? null,
  };
}

export async function getAcquisitionItemsByAcquisitionId(
  userId: string,
  acquisitionId: string,
) {
  await requirePermission({
    userId,
    permissionCode: 'ACQUISITION_ITEM:READ',
  });

  const acquisitionItems = await prisma.acquisitionItem.findMany({
    where: {
      acquisitionId,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      acquisition: {
        select: {
          id: true,
          acquisitionNumber: true,
        },
      },
      asset: {
        select: {
          id: true,
          assetCode: true,
          name: true,
        },
      },
    },
  });

  return acquisitionItems.map((item) => ({
    ...item,
    unitCost: item.unitCost?.toString() ?? null,
    totalCost: item.totalCost?.toString() ?? null,
  }));
}

export async function getAvailableAssetsForAcquisition() {
  return prisma.asset.findMany({
    where: {
      acquisitionItem: null,
    },
    orderBy: {
      name: 'asc',
    },
    select: {
      id: true,
      assetCode: true,
      name: true,
    },
  });
}
