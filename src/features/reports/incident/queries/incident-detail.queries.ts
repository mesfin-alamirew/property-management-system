import { prisma } from '@/lib/prisma';

import type { IncidentDetail } from '../types/incident.types';

export async function getIncidentDetail(
  id: string,
): Promise<IncidentDetail | null> {
  const incident = await prisma.incident.findUnique({
    where: { id },
    select: {
      id: true,
      referenceNumber: true,
      asset: {
        select: {
          id: true,
          assetCode: true,
          assetTag: true,
          name: true,
        },
      },
      type: true,
      severity: true,
      status: true,
      title: true,
      description: true,
      incidentDate: true,
      reportedAt: true,
      assignedAt: true,
      startedAt: true,
      resolvedAt: true,
      closedAt: true,
      reportedByUser: {
        select: {
          id: true,
          displayName: true,
        },
      },
      assignedToUser: {
        select: {
          id: true,
          displayName: true,
        },
      },
      notes: true,
      resolution: {
        select: {
          id: true,
          rootCause: true,
          resolution: true,
          correctiveAction: true,
          resolvedByUser: {
            select: {
              id: true,
              displayName: true,
            },
          },
          notes: true,
          createdAt: true,
          updatedAt: true,
        },
      },
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!incident) {
    return null;
  }

  return {
    id: incident.id,
    referenceNumber: incident.referenceNumber,
    asset: incident.asset,
    type: incident.type.toString(),
    severity: incident.severity.toString(),
    status: incident.status.toString(),
    title: incident.title,
    description: incident.description,
    incidentDate: incident.incidentDate,
    reportedAt: incident.reportedAt,
    assignedAt: incident.assignedAt,
    startedAt: incident.startedAt,
    resolvedAt: incident.resolvedAt,
    closedAt: incident.closedAt,
    reportedByUser: incident.reportedByUser,
    assignedToUser: incident.assignedToUser,
    notes: incident.notes,
    resolution: incident.resolution
      ? {
          id: incident.resolution.id,
          rootCause: incident.resolution.rootCause,
          resolution: incident.resolution.resolution,
          correctiveAction: incident.resolution.correctiveAction,
          resolvedByUser: incident.resolution.resolvedByUser,
          notes: incident.resolution.notes,
          createdAt: incident.resolution.createdAt,
          updatedAt: incident.resolution.updatedAt,
        }
      : null,
    createdAt: incident.createdAt,
    updatedAt: incident.updatedAt,
  };
}
