import { prisma } from '@/lib/prisma';

import type { IncidentReportFilters } from '../types/incident.types';

export async function getIncidentReport(filters: IncidentReportFilters = {}) {
  const where = {
    ...(filters.search
      ? {
          OR: [
            {
              referenceNumber: {
                contains: filters.search,
                mode: 'insensitive' as const,
              },
            },
            {
              title: {
                contains: filters.search,
                mode: 'insensitive' as const,
              },
            },
            {
              description: {
                contains: filters.search,
                mode: 'insensitive' as const,
              },
            },
            {
              asset: {
                OR: [
                  {
                    assetCode: {
                      contains: filters.search,
                      mode: 'insensitive' as const,
                    },
                  },
                  {
                    assetTag: {
                      contains: filters.search,
                      mode: 'insensitive' as const,
                    },
                  },
                  {
                    name: {
                      contains: filters.search,
                      mode: 'insensitive' as const,
                    },
                  },
                ],
              },
            },
          ],
        }
      : {}),

    ...(filters.type
      ? {
          type: filters.type as never,
        }
      : {}),

    ...(filters.severity
      ? {
          severity: filters.severity as never,
        }
      : {}),

    ...(filters.status
      ? {
          status: filters.status as never,
        }
      : {}),

    ...(filters.assetId
      ? {
          assetId: filters.assetId,
        }
      : {}),

    ...(filters.reportedByUserId
      ? {
          reportedByUserId: filters.reportedByUserId,
        }
      : {}),

    ...(filters.assignedToUserId
      ? {
          assignedToUserId: filters.assignedToUserId,
        }
      : {}),

    ...(filters.incidentDateFrom || filters.incidentDateTo
      ? {
          incidentDate: {
            ...(filters.incidentDateFrom
              ? {
                  gte: new Date(`${filters.incidentDateFrom}T00:00:00`),
                }
              : {}),
            ...(filters.incidentDateTo
              ? {
                  lte: new Date(`${filters.incidentDateTo}T23:59:59.999`),
                }
              : {}),
          },
        }
      : {}),

    ...(filters.reportedDateFrom || filters.reportedDateTo
      ? {
          reportedAt: {
            ...(filters.reportedDateFrom
              ? {
                  gte: new Date(`${filters.reportedDateFrom}T00:00:00`),
                }
              : {}),
            ...(filters.reportedDateTo
              ? {
                  lte: new Date(`${filters.reportedDateTo}T23:59:59.999`),
                }
              : {}),
          },
        }
      : {}),
  };

  const incidents = await prisma.incident.findMany({
    where,
    orderBy: {
      incidentDate: 'desc',
    },
    select: {
      id: true,
      referenceNumber: true,
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
      createdAt: true,

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
          displayName: true,
        },
      },

      assignedToUser: {
        select: {
          id: true,
          displayName: true,
        },
      },

      resolution: {
        select: {
          id: true,
        },
      },
    },
  });

  return incidents.map((incident) => ({
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
    hasResolution: incident.resolution !== null,
    createdAt: incident.createdAt,
  }));
}
