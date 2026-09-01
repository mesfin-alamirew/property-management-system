import { prisma } from '@/lib/prisma';

import type { IncidentResolutionFormData } from '../types/incident-resolution.types';

export async function findIncidentResolutionById(id: string) {
  return prisma.incidentResolution.findUnique({
    where: {
      id,
    },
    include: {
      incident: {
        select: {
          id: true,
          referenceNumber: true,
          title: true,
          assetId: true,
        },
      },
      resolvedByUser: {
        select: {
          id: true,
          username: true,
          displayName: true,
        },
      },
    },
  });
}

export async function findIncidentResolutionByIncidentId(incidentId: string) {
  return prisma.incidentResolution.findUnique({
    where: {
      incidentId,
    },
    include: {
      incident: {
        select: {
          id: true,
          referenceNumber: true,
          title: true,
          assetId: true,
        },
      },
      resolvedByUser: {
        select: {
          id: true,
          username: true,
          displayName: true,
        },
      },
    },
  });
}

export async function findIncidentResolutions() {
  return prisma.incidentResolution.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      incident: {
        select: {
          id: true,
          referenceNumber: true,
          title: true,
          assetId: true,
        },
      },
      resolvedByUser: {
        select: {
          id: true,
          username: true,
          displayName: true,
        },
      },
    },
  });
}

export async function createIncidentResolution(
  data: IncidentResolutionFormData & {
    resolvedByUserId: string;
  },
) {
  return prisma.incidentResolution.create({
    data: {
      incidentId: data.incidentId,
      rootCause: data.rootCause,
      resolution: data.resolution,
      correctiveAction: data.correctiveAction,
      resolvedByUserId: data.resolvedByUserId,
      notes: data.notes,
    },
  });
}
