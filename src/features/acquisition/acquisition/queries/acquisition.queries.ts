import { prisma } from '@/lib/prisma';

import { requirePermission } from '@/lib/authorization/authorization.service';

import {
  findAcquisitions,
  findAcquisitionById,
} from '../repositories/acquisition.repository';

export async function getAcquisitions(userId: string) {
  await requirePermission({
    userId,
    permissionCode: 'ACQUISITION:READ',
  });

  const acquisitions = await findAcquisitions();

  return acquisitions.map((acquisition) => ({
    ...acquisition,

    totalAmount: acquisition.totalAmount?.toString() ?? null,

    items: acquisition.items.map((item) => ({
      ...item,

      unitCost: item.unitCost?.toString() ?? null,
      totalCost: item.totalCost?.toString() ?? null,
    })),
  }));
}

export async function getAcquisitionById(userId: string, id: string) {
  await requirePermission({
    userId,
    permissionCode: 'ACQUISITION:READ',
  });

  return findAcquisitionById(id);
}

export async function getActiveAcquisitionMethods() {
  return prisma.acquisitionMethod.findMany({
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
