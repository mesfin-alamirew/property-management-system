import { prisma } from '@/lib/prisma';

import type {
  AssetAssignmentStatus,
  AssetReportFilters,
  AssetReportRow,
} from '../types/asset.types';

export async function getAssetReport(
  filters: AssetReportFilters = {},
): Promise<AssetReportRow[]> {
  const {
    search,
    assetTypeId,
    assetCategoryId,
    statusId,
    conditionId,
    organizationUnitId,
    locationId,
    assignmentStatus,
    acquisitionMethodId,
    acquisitionDateFrom,
    acquisitionDateTo,
  } = filters;

  const where = {
    ...(search
      ? {
          OR: [
            {
              assetCode: {
                contains: search,
                mode: 'insensitive' as const,
              },
            },
            {
              assetTag: {
                contains: search,
                mode: 'insensitive' as const,
              },
            },
            {
              name: {
                contains: search,
                mode: 'insensitive' as const,
              },
            },
            {
              serialNumber: {
                contains: search,
                mode: 'insensitive' as const,
              },
            },
          ],
        }
      : {}),

    ...(assetTypeId
      ? {
          assetTypeId,
        }
      : {}),

    ...(assetCategoryId
      ? {
          assetType: {
            categoryId: assetCategoryId,
          },
        }
      : {}),

    ...(statusId
      ? {
          statusId,
        }
      : {}),

    ...(conditionId
      ? {
          conditionId,
        }
      : {}),

    ...(organizationUnitId
      ? {
          location: {
            organizationUnitId,
          },
        }
      : {}),

    ...(locationId
      ? {
          locationId,
        }
      : {}),

    ...(acquisitionMethodId || acquisitionDateFrom || acquisitionDateTo
      ? {
          acquisitionItem: {
            acquisition: {
              ...(acquisitionMethodId
                ? {
                    acquisitionMethodId,
                  }
                : {}),
              ...(acquisitionDateFrom || acquisitionDateTo
                ? {
                    acquisitionDate: {
                      ...(acquisitionDateFrom
                        ? {
                            gte: new Date(`${acquisitionDateFrom}T00:00:00`),
                          }
                        : {}),
                      ...(acquisitionDateTo
                        ? {
                            lte: new Date(`${acquisitionDateTo}T23:59:59.999`),
                          }
                        : {}),
                    },
                  }
                : {}),
            },
          },
        }
      : {}),
  };

  const assets = await prisma.asset.findMany({
    where,
    select: {
      id: true,
      assetCode: true,
      assetTag: true,
      name: true,

      assetType: {
        select: {
          id: true,
          code: true,
          name: true,
          category: {
            select: {
              id: true,
              code: true,
              name: true,
            },
          },
        },
      },

      status: {
        select: {
          id: true,
          code: true,
          name: true,
        },
      },

      condition: {
        select: {
          id: true,
          code: true,
          name: true,
        },
      },

      location: {
        select: {
          id: true,
          code: true,
          name: true,
          organizationUnit: {
            select: {
              id: true,
              code: true,
              name: true,
            },
          },
        },
      },

      assetAssignments: {
        orderBy: {
          assignedAt: 'desc',
        },
        take: 1,
        select: {
          id: true,
          assignedAt: true,
          returnedAt: true,
          employee: {
            select: {
              id: true,
              employeeNumber: true,
              firstName: true,
              middleName: true,
              lastName: true,
            },
          },
        },
      },

      acquisitionItem: {
        select: {
          totalCost: true,
          acquisition: {
            select: {
              id: true,
              acquisitionNumber: true,
              referenceNumber: true,
              acquisitionDate: true,
              currency: true,
              acquisitionMethod: {
                select: {
                  id: true,
                  code: true,
                  name: true,
                },
              },
            },
          },
        },
      },
    },

    orderBy: {
      assetCode: 'asc',
    },
  });

  const rows = assets.map((asset): AssetReportRow => {
    const latestAssignment = asset.assetAssignments[0] ?? null;

    const currentAssignment =
      latestAssignment && latestAssignment.returnedAt === null
        ? {
            id: latestAssignment.id,
            assignedAt: latestAssignment.assignedAt,
            employee: latestAssignment.employee,
          }
        : null;

    const derivedAssignmentStatus: AssetAssignmentStatus =
      latestAssignment === null
        ? 'UNASSIGNED'
        : latestAssignment.returnedAt === null
          ? 'CURRENT'
          : 'RETURNED';

    const acquisition = asset.acquisitionItem?.acquisition
      ? {
          id: asset.acquisitionItem.acquisition.id,
          acquisitionNumber:
            asset.acquisitionItem.acquisition.acquisitionNumber,
          referenceNumber: asset.acquisitionItem.acquisition.referenceNumber,
          acquisitionDate: asset.acquisitionItem.acquisition.acquisitionDate,
          acquisitionMethod:
            asset.acquisitionItem.acquisition.acquisitionMethod,
          currency: asset.acquisitionItem.acquisition.currency,
          totalCost: asset.acquisitionItem.totalCost?.toString() ?? null,
        }
      : null;

    return {
      id: asset.id,
      assetCode: asset.assetCode,
      assetTag: asset.assetTag,
      name: asset.name,

      assetType: asset.assetType,

      status: asset.status,

      condition: asset.condition,

      location: asset.location,

      currentAssignment,

      assignmentStatus: derivedAssignmentStatus,

      acquisition,
    };
  });

  if (!assignmentStatus || assignmentStatus === 'ALL') {
    return rows;
  }

  return rows.filter((row) => row.assignmentStatus === assignmentStatus);
}
