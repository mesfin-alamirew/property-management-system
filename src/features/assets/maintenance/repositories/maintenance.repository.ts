import { prisma } from '@/lib/prisma';

import { Prisma } from '@/generated/prisma/client';

import type { MaintenanceFormData } from '../schemas/maintenance.schema';
import { createAuditLog } from '@/lib/audit/audit.repository';

import { AUDIT_ACTIONS, AUDIT_ENTITY_TYPES } from '@/lib/audit/audit.types';
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
      requestedByUserId,
      notes: data.notes,
    },
  });
}

export async function updateMaintenanceRecord(
  tx: Prisma.TransactionClient,
  id: string,
  data: MaintenanceFormData,
) {
  return tx.maintenance.update({
    where: {
      id,
    },

    data: {
      assetId: data.assetId,
      type: data.type,
      title: data.title,
      description: data.description,
      requestedAt: data.requestedAt,
      scheduledAt: data.scheduledAt,
      notes: data.notes,
    },
  });
}
export async function createMaintenanceApprovalAudit(
  tx: Prisma.TransactionClient,
  userId: string,
  maintenanceId: string,
  referenceNumber: string,
  oldApprovedByUserId: string | null,
  oldApprovedAt: Date | null,
  approvedByUserId: string,
  approvedAt: Date,
) {
  return createAuditLog(tx, {
    userId,
    action: AUDIT_ACTIONS.MAINTENANCE_APPROVED,
    entityType: AUDIT_ENTITY_TYPES.MAINTENANCE,
    entityId: maintenanceId,

    description: `Maintenance ${referenceNumber} was approved.`,

    oldValue: {
      status: 'ASSIGNED',
      approvedByUserId: oldApprovedByUserId,
      approvedAt: oldApprovedAt?.toISOString() ?? null,
    },

    newValue: {
      status: 'APPROVED',
      approvedByUserId,
      approvedAt: approvedAt.toISOString(),
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
export async function requestMaintenanceRecord(
  tx: Prisma.TransactionClient,
  id: string,
) {
  return tx.maintenance.update({
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
  tx: Prisma.TransactionClient,
  id: string,
  approvedByUserId: string,
  approvedAt: Date,
) {
  return tx.maintenance.update({
    where: {
      id,
    },

    data: {
      status: 'APPROVED',
      approvedByUserId,
      approvedAt,
    },
  });
}
export async function startMaintenanceRecord(
  tx: Prisma.TransactionClient,
  id: string,
  startedAt: Date,
) {
  return tx.maintenance.update({
    where: {
      id,
    },

    data: {
      status: 'IN_PROGRESS',
      startedAt,
    },
  });
}
export async function createMaintenanceStartAudit(
  tx: Prisma.TransactionClient,
  userId: string,
  maintenanceId: string,
  referenceNumber: string,
  oldStartedAt: Date | null,
  startedAt: Date,
) {
  return createAuditLog(tx, {
    userId,
    action: AUDIT_ACTIONS.MAINTENANCE_STARTED,
    entityType: AUDIT_ENTITY_TYPES.MAINTENANCE,
    entityId: maintenanceId,

    description: `Maintenance ${referenceNumber} was started.`,

    oldValue: {
      status: 'APPROVED',
      startedAt: oldStartedAt?.toISOString() ?? null,
    },

    newValue: {
      status: 'IN_PROGRESS',
      startedAt: startedAt.toISOString(),
    },
  });
}
export async function completeMaintenanceRecord(
  tx: Prisma.TransactionClient,
  id: string,
  completedAt: Date,
) {
  return tx.maintenance.update({
    where: {
      id,
    },

    data: {
      status: 'COMPLETED',
      completedAt,
    },
  });
}
export async function createMaintenanceCompletionAudit(
  tx: Prisma.TransactionClient,
  userId: string,
  maintenanceId: string,
  referenceNumber: string,
  oldCompletedAt: Date | null,
  completedAt: Date,
) {
  return createAuditLog(tx, {
    userId,
    action: AUDIT_ACTIONS.MAINTENANCE_COMPLETED,
    entityType: AUDIT_ENTITY_TYPES.MAINTENANCE,
    entityId: maintenanceId,

    description: `Maintenance ${referenceNumber} was completed.`,

    oldValue: {
      status: 'IN_PROGRESS',
      completedAt: oldCompletedAt?.toISOString() ?? null,
    },

    newValue: {
      status: 'COMPLETED',
      completedAt: completedAt.toISOString(),
    },
  });
}

export async function assignMaintenanceRecord(
  tx: Prisma.TransactionClient,
  id: string,
  assignedToUserId: string,
) {
  return tx.maintenance.update({
    where: {
      id,
    },

    data: {
      assignedToUserId,
      status: 'ASSIGNED',
    },
  });
}
export async function createMaintenanceAssignmentAudit(
  tx: Prisma.TransactionClient,
  userId: string,
  maintenanceId: string,
  referenceNumber: string,
  oldAssignedToUserId: string | null,
  assignedToUserId: string,
) {
  return createAuditLog(tx, {
    userId,
    action: AUDIT_ACTIONS.MAINTENANCE_ASSIGNED,
    entityType: AUDIT_ENTITY_TYPES.MAINTENANCE,
    entityId: maintenanceId,

    description: `Maintenance ${referenceNumber} was assigned to a maintenance officer.`,

    oldValue: {
      status: 'REQUESTED',
      assignedToUserId: oldAssignedToUserId,
    },

    newValue: {
      status: 'ASSIGNED',
      assignedToUserId,
    },
  });
}
export async function findMaintenancesForService() {
  return prisma.maintenance.findMany({
    where: {
      status: 'IN_PROGRESS',
    },

    orderBy: {
      referenceNumber: 'desc',
    },

    select: {
      id: true,
      referenceNumber: true,
      title: true,
    },
  });
}
