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
          assetTag: true,
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
          assetTag: true,
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
export async function findAssets() {
  return prisma.asset.findMany({
    orderBy: {
      assetCode: 'asc',
    },

    select: {
      id: true,
      assetCode: true,
      name: true,
    },
  });
}

export async function findActiveUsers() {
  return prisma.user.findMany({
    where: {
      isActive: true,
    },

    orderBy: {
      displayName: 'asc',
    },

    select: {
      id: true,
      username: true,
      displayName: true,
    },
  });
}
export async function requestMaintenanceRecord(id: string) {
  return prisma.maintenance.update({
    where: {
      id,
    },

    data: {
      status: 'REQUESTED',
      requestedAt: new Date(),
    },
  });
}
export async function approveMaintenanceRecord(
  id: string,
  approvedByUserId: string,
) {
  return prisma.maintenance.update({
    where: {
      id,
    },

    data: {
      status: 'APPROVED',
      approvedByUserId,
      approvedAt: new Date(),
    },
  });
}
export async function startMaintenanceRecord(id: string) {
  return prisma.maintenance.update({
    where: {
      id,
    },

    data: {
      status: 'IN_PROGRESS',
      startedAt: new Date(),
    },
  });
}
export async function completeMaintenanceRecord(id: string) {
  return prisma.maintenance.update({
    where: {
      id,
    },

    data: {
      status: 'COMPLETED',
      completedAt: new Date(),
    },
  });
}
