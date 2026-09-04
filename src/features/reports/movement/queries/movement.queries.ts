import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';

import type { MovementReportFilters } from '../types/movement.types';

export async function getMovementReport(filters: MovementReportFilters = {}) {
  const {
    search,
    assetId,
    fromLocationId,
    toLocationId,
    movedByUserId,
    movedDateFrom,
    movedDateTo,
  } = filters;

  const where: Prisma.AssetMovementWhereInput = {
    ...(search
      ? {
          OR: [
            {
              reason: {
                contains: search,
                mode: 'insensitive' as const,
              },
            },
            {
              notes: {
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

    ...(assetId
      ? {
          assetId,
        }
      : {}),

    ...(fromLocationId
      ? {
          fromLocationId,
        }
      : {}),

    ...(toLocationId
      ? {
          toLocationId,
        }
      : {}),

    ...(movedByUserId
      ? {
          movedByUserId,
        }
      : {}),

    ...(movedDateFrom || movedDateTo
      ? {
          movedAt: {
            ...(movedDateFrom
              ? {
                  gte: new Date(`${movedDateFrom}T00:00:00`),
                }
              : {}),
            ...(movedDateTo
              ? {
                  lte: new Date(`${movedDateTo}T23:59:59.999`),
                }
              : {}),
          },
        }
      : {}),
  };

  const movements = await prisma.assetMovement.findMany({
    where,
    orderBy: {
      movedAt: 'desc',
    },
    select: {
      id: true,
      asset: {
        select: {
          id: true,
          assetCode: true,
          assetTag: true,
          name: true,
        },
      },
      fromLocation: {
        select: {
          id: true,
          name: true,
        },
      },
      toLocation: {
        select: {
          id: true,
          name: true,
        },
      },
      movedAt: true,
      movedByUser: {
        select: {
          id: true,
          displayName: true,
        },
      },
      reason: true,
      notes: true,
      createdAt: true,
    },
  });

  return movements;
}
