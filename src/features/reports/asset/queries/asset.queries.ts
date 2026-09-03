import { prisma } from '@/lib/prisma';

import type { AssetReportFilters } from '../types/asset.types';

export async function getAssetReport(filters?: AssetReportFilters) {
  const search = filters?.search?.trim();

  return prisma.asset.findMany({
    where: {
      ...(search
        ? {
            OR: [
              {
                assetCode: {
                  contains: search,
                  mode: 'insensitive',
                },
              },
              {
                assetTag: {
                  contains: search,
                  mode: 'insensitive',
                },
              },
              {
                name: {
                  contains: search,
                  mode: 'insensitive',
                },
              },
              {
                serialNumber: {
                  contains: search,
                  mode: 'insensitive',
                },
              },
            ],
          }
        : {}),

      ...(filters?.assetTypeId
        ? {
            assetTypeId: filters.assetTypeId,
          }
        : {}),

      ...(filters?.statusId
        ? {
            statusId: filters.statusId,
          }
        : {}),

      ...(filters?.conditionId
        ? {
            conditionId: filters.conditionId,
          }
        : {}),
    },

    orderBy: {
      name: 'asc',
    },

    select: {
      id: true,
      assetCode: true,
      assetTag: true,
      name: true,
      serialNumber: true,

      assetType: {
        select: {
          id: true,
          code: true,
          name: true,
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
    },
  });
}
