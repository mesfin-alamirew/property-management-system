import { prisma } from '@/lib/prisma';

import type {
  MaintenanceReportFilters,
  MaintenanceReportRow,
} from '../types/maintenance.types';

export async function getMaintenanceReport(
  filters: MaintenanceReportFilters = {},
): Promise<MaintenanceReportRow[]> {
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
                assetCode: {
                  contains: filters.search,
                  mode: 'insensitive' as const,
                },
              },
            },
            {
              asset: {
                assetTag: {
                  contains: filters.search,
                  mode: 'insensitive' as const,
                },
              },
            },
            {
              asset: {
                name: {
                  contains: filters.search,
                  mode: 'insensitive' as const,
                },
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
    ...(filters.assignedToUserId
      ? {
          assignedToUserId: filters.assignedToUserId,
        }
      : {}),
    ...(filters.requestedDateFrom || filters.requestedDateTo
      ? {
          requestedAt: {
            ...(filters.requestedDateFrom
              ? {
                  gte: new Date(`${filters.requestedDateFrom}T00:00:00`),
                }
              : {}),
            ...(filters.requestedDateTo
              ? {
                  lte: new Date(`${filters.requestedDateTo}T23:59:59.999`),
                }
              : {}),
          },
        }
      : {}),
    ...(filters.scheduledDateFrom || filters.scheduledDateTo
      ? {
          scheduledAt: {
            ...(filters.scheduledDateFrom
              ? {
                  gte: new Date(`${filters.scheduledDateFrom}T00:00:00`),
                }
              : {}),
            ...(filters.scheduledDateTo
              ? {
                  lte: new Date(`${filters.scheduledDateTo}T23:59:59.999`),
                }
              : {}),
          },
        }
      : {}),
  };

  const rows = await prisma.maintenance.findMany({
    where,
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
      referenceNumber: true,
      type: true,
      status: true,
      title: true,
      description: true,
      requestedAt: true,
      scheduledAt: true,
      startedAt: true,
      completedAt: true,
      approvedAt: true,
      createdAt: true,

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
          displayName: true,
        },
      },

      assignedToUser: {
        select: {
          id: true,
          displayName: true,
        },
      },

      approvedByUser: {
        select: {
          id: true,
          displayName: true,
        },
      },

      services: {
        select: {
          totalCost: true,
        },
      },
    },
  });

  return rows.map((row) => {
    const serviceCosts = row.services
      .map((service) => service.totalCost)
      .filter((cost): cost is NonNullable<typeof cost> => cost !== null);

    const totalServiceCost =
      serviceCosts.length > 0
        ? serviceCosts
            .slice(1)
            .reduce((total, cost) => total.plus(cost), serviceCosts[0])
            .toString()
        : null;

    return {
      id: row.id,
      referenceNumber: row.referenceNumber,

      asset: row.asset,

      type: row.type.toString(),
      status: row.status.toString(),
      title: row.title,
      description: row.description,

      requestedAt: row.requestedAt,
      scheduledAt: row.scheduledAt,
      startedAt: row.startedAt,
      completedAt: row.completedAt,

      requestedByUser: row.requestedByUser,
      assignedToUser: row.assignedToUser,
      approvedByUser: row.approvedByUser,
      approvedAt: row.approvedAt,

      serviceCount: row.services.length,
      totalServiceCost,

      createdAt: row.createdAt,
    };
  });
}
