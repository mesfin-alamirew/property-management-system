import { prisma } from '@/lib/prisma';

import type {
  PhysicalVerificationReportFilters,
  PhysicalVerificationReportRow,
  PhysicalVerificationResult,
  PhysicalVerificationScope,
  PhysicalVerificationStatus,
} from '../types/verification.types';

const discrepancyResults: PhysicalVerificationResult[] = [
  'NOT_FOUND',
  'LOCATION_MISMATCH',
  'CUSTODIAN_MISMATCH',
  'CONDITION_MISMATCH',
  'IDENTIFICATION_MISMATCH',
  'MULTIPLE_DISCREPANCIES',
];

export async function getPhysicalVerificationReport(
  filters?: PhysicalVerificationReportFilters,
): Promise<PhysicalVerificationReportRow[]> {
  const search = filters?.search?.trim();

  const scope = filters?.scope;
  const status = filters?.status;

  const verifications = await prisma.physicalVerification.findMany({
    where: {
      ...(search
        ? {
            OR: [
              {
                referenceNumber: {
                  contains: search,
                  mode: 'insensitive',
                },
              },
              {
                title: {
                  contains: search,
                  mode: 'insensitive',
                },
              },
            ],
          }
        : {}),

      ...(filters?.organizationUnitId
        ? {
            organizationUnitId: filters.organizationUnitId,
          }
        : {}),

      ...(filters?.locationId
        ? {
            locationId: filters.locationId,
          }
        : {}),

      ...(scope && scope !== 'ALL'
        ? {
            scope: scope as PhysicalVerificationScope,
          }
        : {}),

      ...(status && status !== 'ALL'
        ? {
            status: status as PhysicalVerificationStatus,
          }
        : {}),

      ...(filters?.scheduledDateFrom || filters?.scheduledDateTo
        ? {
            scheduledAt: {
              ...(filters.scheduledDateFrom
                ? {
                    gte: new Date(`${filters.scheduledDateFrom}T00:00:00`),
                  }
                : {}),
              ...(filters.scheduledDateTo
                ? {
                    lt: new Date(
                      new Date(
                        `${filters.scheduledDateTo}T00:00:00`,
                      ).getTime() +
                        24 * 60 * 60 * 1000,
                    ),
                  }
                : {}),
            },
          }
        : {}),

      ...(filters?.completedDateFrom || filters?.completedDateTo
        ? {
            completedAt: {
              ...(filters.completedDateFrom
                ? {
                    gte: new Date(`${filters.completedDateFrom}T00:00:00`),
                  }
                : {}),
              ...(filters.completedDateTo
                ? {
                    lt: new Date(
                      new Date(
                        `${filters.completedDateTo}T00:00:00`,
                      ).getTime() +
                        24 * 60 * 60 * 1000,
                    ),
                  }
                : {}),
            },
          }
        : {}),
    },

    orderBy: {
      createdAt: 'desc',
    },

    select: {
      id: true,
      referenceNumber: true,
      title: true,
      scope: true,
      status: true,
      scheduledAt: true,
      startedAt: true,
      completedAt: true,

      organizationUnit: {
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
        },
      },

      createdByUser: {
        select: {
          id: true,
          displayName: true,
        },
      },

      _count: {
        select: {
          items: true,
          unregisteredObservations: true,
        },
      },

      items: {
        select: {
          result: true,
        },
      },
    },
  });

  return verifications.map((verification) => {
    let verifiedCount = 0;
    let pendingCount = 0;
    let discrepancyCount = 0;

    for (const item of verification.items) {
      if (item.result === 'VERIFIED') {
        verifiedCount += 1;
      }

      if (item.result === 'PENDING') {
        pendingCount += 1;
      }

      if (discrepancyResults.includes(item.result)) {
        discrepancyCount += 1;
      }
    }

    return {
      id: verification.id,
      referenceNumber: verification.referenceNumber,
      title: verification.title,
      scope: verification.scope,
      organizationUnit: verification.organizationUnit,
      location: verification.location,
      status: verification.status,
      scheduledAt: verification.scheduledAt,
      startedAt: verification.startedAt,
      completedAt: verification.completedAt,
      createdByUser: verification.createdByUser,
      itemCount: verification._count.items,
      verifiedCount,
      pendingCount,
      discrepancyCount,
      unregisteredObservationCount:
        verification._count.unregisteredObservations,
    };
  });
}
