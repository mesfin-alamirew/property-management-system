import { prisma } from '@/lib/prisma';

import { Prisma } from '@/generated/prisma/client';

import type { IncidentFormData } from '../schemas/incident.schema';

import { createAuditLog } from '@/lib/audit/audit.repository';

import { AUDIT_ACTIONS, AUDIT_ENTITY_TYPES } from '@/lib/audit/audit.types';

export async function findIncidents() {
  return prisma.incident.findMany({
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

      reportedByUser: {
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
    },
  });
}

export async function findIncidentById(id: string) {
  return prisma.incident.findUnique({
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

      reportedByUser: {
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
    },
  });
}

export async function findIncidentByReferenceNumber(referenceNumber: string) {
  return prisma.incident.findUnique({
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

export async function createIncidentRecord(
  tx: Prisma.TransactionClient,
  referenceNumber: string,
  reportedByUserId: string,
  data: IncidentFormData,
) {
  return tx.incident.create({
    data: {
      referenceNumber,
      assetId: data.assetId,
      type: data.type,
      severity: data.severity,
      title: data.title,
      description: data.description,
      incidentDate: data.incidentDate,
      reportedByUserId,
      notes: data.notes,
    },
  });
}

export async function updateIncidentRecord(
  tx: Prisma.TransactionClient,
  id: string,
  data: IncidentFormData,
) {
  return tx.incident.update({
    where: {
      id,
    },

    data: {
      assetId: data.assetId,
      type: data.type,
      severity: data.severity,
      title: data.title,
      description: data.description,
      incidentDate: data.incidentDate,
      notes: data.notes,
    },
  });
}

export async function reportIncidentRecord(
  tx: Prisma.TransactionClient,
  id: string,
  reportedAt: Date,
) {
  return tx.incident.update({
    where: {
      id,
    },

    data: {
      status: 'REPORTED',
      reportedAt,
    },
  });
}

export async function assignIncidentRecord(
  tx: Prisma.TransactionClient,
  id: string,
  assignedToUserId: string,
  assignedAt: Date,
) {
  return tx.incident.update({
    where: {
      id,
    },

    data: {
      assignedToUserId,
      assignedAt,
      status: 'ASSIGNED',
    },
  });
}
export async function startIncidentRecord(
  tx: Prisma.TransactionClient,
  id: string,
  startedAt: Date,
) {
  return tx.incident.update({
    where: {
      id,
    },

    data: {
      status: 'IN_PROGRESS',
      startedAt,
    },
  });
}

export async function resolveIncidentRecord(
  tx: Prisma.TransactionClient,
  id: string,
  resolvedAt: Date,
) {
  return tx.incident.update({
    where: {
      id,
    },

    data: {
      status: 'RESOLVED',
      resolvedAt,
    },
  });
}
export async function closeIncidentRecord(
  tx: Prisma.TransactionClient,
  id: string,
  closedAt: Date,
) {
  return tx.incident.update({
    where: {
      id,
    },

    data: {
      status: 'CLOSED',
      closedAt,
    },
  });
}
export async function cancelIncidentRecord(
  tx: Prisma.TransactionClient,
  id: string,
) {
  return tx.incident.update({
    where: {
      id,
    },

    data: {
      status: 'CANCELLED',
    },
  });
}
export async function createIncidentAssignmentAudit(
  tx: Prisma.TransactionClient,
  userId: string,
  incidentId: string,
  referenceNumber: string,
  oldAssignedToUserId: string | null,
  assignedToUserId: string,
) {
  return createAuditLog(tx, {
    userId,
    action: AUDIT_ACTIONS.INCIDENT_ASSIGNED,
    entityType: AUDIT_ENTITY_TYPES.INCIDENT,
    entityId: incidentId,

    description: `Incident ${referenceNumber} was assigned to an incident officer.`,

    oldValue: {
      status: 'REPORTED',
      assignedToUserId: oldAssignedToUserId,
    },

    newValue: {
      status: 'ASSIGNED',
      assignedToUserId,
    },
  });
}

export async function createIncidentStartAudit(
  tx: Prisma.TransactionClient,
  userId: string,
  incidentId: string,
  referenceNumber: string,
  oldStartedAt: Date | null,
  startedAt: Date,
) {
  return createAuditLog(tx, {
    userId,
    action: AUDIT_ACTIONS.INCIDENT_STARTED,
    entityType: AUDIT_ENTITY_TYPES.INCIDENT,
    entityId: incidentId,

    description: `Incident ${referenceNumber} was started.`,

    oldValue: {
      status: 'ASSIGNED',
      startedAt: oldStartedAt?.toISOString() ?? null,
    },

    newValue: {
      status: 'IN_PROGRESS',
      startedAt: startedAt.toISOString(),
    },
  });
}

export async function createIncidentResolutionAudit(
  tx: Prisma.TransactionClient,
  userId: string,
  incidentId: string,
  referenceNumber: string,
  oldResolvedAt: Date | null,
  resolvedAt: Date,
) {
  return createAuditLog(tx, {
    userId,
    action: AUDIT_ACTIONS.INCIDENT_RESOLVED,
    entityType: AUDIT_ENTITY_TYPES.INCIDENT,
    entityId: incidentId,

    description: `Incident ${referenceNumber} was resolved.`,

    oldValue: {
      status: 'IN_PROGRESS',
      resolvedAt: oldResolvedAt?.toISOString() ?? null,
    },

    newValue: {
      status: 'RESOLVED',
      resolvedAt: resolvedAt.toISOString(),
    },
  });
}

export async function createIncidentClosureAudit(
  tx: Prisma.TransactionClient,
  userId: string,
  incidentId: string,
  referenceNumber: string,
  oldClosedAt: Date | null,
  closedAt: Date,
) {
  return createAuditLog(tx, {
    userId,
    action: AUDIT_ACTIONS.INCIDENT_CLOSED,
    entityType: AUDIT_ENTITY_TYPES.INCIDENT,
    entityId: incidentId,

    description: `Incident ${referenceNumber} was closed.`,

    oldValue: {
      status: 'RESOLVED',
      closedAt: oldClosedAt?.toISOString() ?? null,
    },

    newValue: {
      status: 'CLOSED',
      closedAt: closedAt.toISOString(),
    },
  });
}
