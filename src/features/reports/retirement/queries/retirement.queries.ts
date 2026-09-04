import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';

import type { RetirementReportFilters } from '../types/retirement.types';

export async function getRetirementReport(
  filters: RetirementReportFilters = {},
) {
  const {
    search,
    status,
    assetId,
    conditionId,
    requestedByUserId,
    approvedByUserId,
    cancelledByUserId,
    retirementDateFrom,
    retirementDateTo,
  } = filters;

  const where: Prisma.RetirementWhereInput = {
    ...(search
      ? {
          OR: [
            {
              referenceNumber: {
                contains: search,
                mode: 'insensitive' as const,
              },
            },
            {
              reason: {
                contains: search,
                mode: 'insensitive' as const,
              },
            },
            {
              asset: {
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
                ],
              },
            },
          ],
        }
      : {}),

    ...(status
      ? {
          status: status as never,
        }
      : {}),

    ...(assetId
      ? {
          assetId,
        }
      : {}),

    ...(conditionId
      ? {
          conditionId,
        }
      : {}),

    ...(requestedByUserId
      ? {
          requestedByUserId,
        }
      : {}),

    ...(approvedByUserId
      ? {
          approvedByUserId,
        }
      : {}),

    ...(cancelledByUserId
      ? {
          cancelledByUserId,
        }
      : {}),

    ...(retirementDateFrom || retirementDateTo
      ? {
          retirementDate: {
            ...(retirementDateFrom
              ? {
                  gte: new Date(`${retirementDateFrom}T00:00:00`),
                }
              : {}),
            ...(retirementDateTo
              ? {
                  lte: new Date(`${retirementDateTo}T23:59:59.999`),
                }
              : {}),
          },
        }
      : {}),
  };

  const retirements = await prisma.retirement.findMany({
    where,
    orderBy: {
      retirementDate: 'desc',
    },
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
      retirementDate: true,
      reason: true,
      condition: {
        select: {
          id: true,
          name: true,
        },
      },
      status: true,
      requestedByUser: {
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
      approvedAt: true,
      cancelledByUser: {
        select: {
          id: true,
          displayName: true,
        },
      },
      cancelledAt: true,
      cancellationReason: true,
      createdAt: true,
    },
  });

  return retirements.map((retirement) => ({
    ...retirement,
    status: retirement.status.toString(),
  }));
}
