import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';

import type { DisposalReportFilters } from '../types/disposal.types';

export async function getDisposalReport(filters: DisposalReportFilters = {}) {
  const {
    search,
    status,
    method,
    assetId,
    requestedByUserId,
    approvedByUserId,
    cancelledByUserId,
    disposalDateFrom,
    disposalDateTo,
  } = filters;

  const where: Prisma.DisposalWhereInput = {
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
              method: {
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
              items: {
                some: {
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
              },
            },
          ],
        }
      : {}),

    ...(status
      ? {
          status: status as Prisma.DisposalWhereInput['status'],
        }
      : {}),

    ...(method
      ? {
          method: {
            contains: method,
            mode: 'insensitive' as const,
          },
        }
      : {}),

    ...(assetId
      ? {
          items: {
            some: {
              assetId,
            },
          },
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

    ...(disposalDateFrom || disposalDateTo
      ? {
          disposalDate: {
            ...(disposalDateFrom
              ? {
                  gte: new Date(`${disposalDateFrom}T00:00:00`),
                }
              : {}),
            ...(disposalDateTo
              ? {
                  lte: new Date(`${disposalDateTo}T23:59:59.999`),
                }
              : {}),
          },
        }
      : {}),
  };

  const disposals = await prisma.disposal.findMany({
    where,
    orderBy: {
      disposalDate: 'desc',
    },
    select: {
      id: true,
      referenceNumber: true,
      disposalDate: true,
      method: true,
      reason: true,
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

      _count: {
        select: {
          items: true,
        },
      },

      createdAt: true,
    },
  });

  return disposals.map((disposal) => ({
    id: disposal.id,
    referenceNumber: disposal.referenceNumber,
    disposalDate: disposal.disposalDate,
    method: disposal.method,
    reason: disposal.reason,
    status: disposal.status.toString(),
    requestedByUser: disposal.requestedByUser,
    approvedByUser: disposal.approvedByUser,
    approvedAt: disposal.approvedAt,
    cancelledByUser: disposal.cancelledByUser,
    cancelledAt: disposal.cancelledAt,
    cancellationReason: disposal.cancellationReason,
    itemCount: disposal._count.items,
    createdAt: disposal.createdAt,
  }));
}
