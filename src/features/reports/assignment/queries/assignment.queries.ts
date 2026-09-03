import { prisma } from '@/lib/prisma';

import type {
  AssignmentReportFilters,
  AssignmentStatus,
} from '../types/assignment.types';
export async function getAssignmentReport(filters?: AssignmentReportFilters) {
  const search = filters?.search?.trim();

  const status = filters?.status ?? 'CURRENT';

  const assignments = await prisma.assetAssignment.findMany({
    where: {
      ...(status === 'CURRENT'
        ? { returnedAt: null }
        : status === 'RETURNED'
          ? { returnedAt: { not: null } }
          : {}),

      ...(filters?.employeeId ? { employeeId: filters.employeeId } : {}),

      ...(filters?.organizationUnitId
        ? {
            employee: {
              organizationUnitId: filters.organizationUnitId,
            },
          }
        : {}),

      ...(filters?.assetTypeId
        ? {
            asset: {
              assetTypeId: filters.assetTypeId,
            },
          }
        : {}),

      ...(search
        ? {
            OR: [
              {
                asset: {
                  assetCode: {
                    contains: search,
                    mode: 'insensitive',
                  },
                },
              },
              {
                asset: {
                  assetTag: {
                    contains: search,
                    mode: 'insensitive',
                  },
                },
              },
              {
                asset: {
                  name: {
                    contains: search,
                    mode: 'insensitive',
                  },
                },
              },
              {
                employee: {
                  employeeNumber: {
                    contains: search,
                    mode: 'insensitive',
                  },
                },
              },
              {
                employee: {
                  firstName: {
                    contains: search,
                    mode: 'insensitive',
                  },
                },
              },
              {
                employee: {
                  middleName: {
                    contains: search,
                    mode: 'insensitive',
                  },
                },
              },
              {
                employee: {
                  lastName: {
                    contains: search,
                    mode: 'insensitive',
                  },
                },
              },
            ],
          }
        : {}),

      ...(filters?.assignedDateFrom || filters?.assignedDateTo
        ? {
            assignedAt: {
              ...(filters.assignedDateFrom
                ? {
                    gte: new Date(`${filters.assignedDateFrom}T00:00:00`),
                  }
                : {}),
              ...(filters.assignedDateTo
                ? {
                    lt: new Date(
                      new Date(`${filters.assignedDateTo}T00:00:00`).getTime() +
                        24 * 60 * 60 * 1000,
                    ),
                  }
                : {}),
            },
          }
        : {}),
    },

    orderBy: {
      assignedAt: 'desc',
    },

    select: {
      id: true,
      assignedAt: true,
      returnedAt: true,

      asset: {
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
        },
      },

      employee: {
        select: {
          id: true,
          employeeNumber: true,
          firstName: true,
          middleName: true,
          lastName: true,

          organizationUnit: {
            select: {
              id: true,
              code: true,
              name: true,
            },
          },
        },
      },
    },
  });

  return assignments.map((assignment) => {
    const status: AssignmentStatus = assignment.returnedAt
      ? 'RETURNED'
      : 'CURRENT';

    return {
      id: assignment.id,
      asset: assignment.asset,
      employee: assignment.employee,
      assetLocation: assignment.asset.location,
      assignedAt: assignment.assignedAt,
      returnedAt: assignment.returnedAt,
      status,
    };
  });
}
