import { prisma } from '@/lib/prisma';

import { Prisma } from '@/generated/prisma/client';

import type { MaintenanceFormData } from '../schemas/maintenance.schema';

export async function findMaintenances() {
  return prisma.maintenance.findMany({
    orderBy: {
      createdAt: 'desc',
    },

    include: {
      asset: {
        select: {
          id: true,
          assetCode: true,
          name: true,
        },
      },

      requestedByUser: {
        select: {
          id: true,
          username: true,
          displayName: true,
        },
      },

      assignedToUser: {
        select: {
          id: true,
          username: true,
          displayName: true,
        },
      },

      approvedByUser: {
        select: {
          id: true,
          username: true,
          displayName: true,
        },
      },

      services: {
        orderBy: {
          serviceDate: 'desc',
        },
      },
    },
  });
}

export async function findMaintenanceById(id: string) {
  return prisma.maintenance.findUnique({
    where: {
      id,
    },

    include: {
      asset: {
        select: {
          id: true,
          assetCode: true,
          name: true,
        },
      },

      requestedByUser: {
        select: {
          id: true,
          username: true,
          displayName: true,
        },
      },

      assignedToUser: {
        select: {
          id: true,
          username: true,
          displayName: true,
        },
      },

      approvedByUser: {
        select: {
          id: true,
          username: true,
          displayName: true,
        },
      },

      services: {
        orderBy: {
          serviceDate: 'desc',
        },
      },
    },
  });
}

export async function findMaintenanceByReferenceNumber(
  referenceNumber: string,
) {
  return prisma.maintenance.findUnique({
    where: {
      referenceNumber,
    },
  });
}

export async function findAssetById(id: string) {
  return prisma.asset.findUnique({
    where: {
      id,
    },
  });
}

export async function findUserById(id: string) {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
}

export async function createMaintenanceRecord(
  tx: Prisma.TransactionClient,
  referenceNumber: string,
  requestedByUserId: string,
  data: MaintenanceFormData,
) {
  return tx.maintenance.create({
    data: {
      referenceNumber,
      assetId: data.assetId,
      type: data.type,
      title: data.title,
      description: data.description,
      requestedAt: data.requestedAt,
      scheduledAt: data.scheduledAt,
      assignedToUserId: data.assignedToUserId || undefined,
      requestedByUserId,
      notes: data.notes,
    },
  });
}

export async function updateMaintenanceRecord(
  id: string,
  data: MaintenanceFormData,
) {
  return prisma.maintenance.update({
    where: {
      id,
    },

    data: {
      // referenceNumber, status, requestedByUserId,
      // approval information and completion information
      // are deliberately NOT updated here.

      assetId: data.assetId,
      type: data.type,
      title: data.title,
      description: data.description,
      requestedAt: data.requestedAt,
      scheduledAt: data.scheduledAt,
      assignedToUserId: data.assignedToUserId || undefined,
      notes: data.notes,
    },
  });
}
