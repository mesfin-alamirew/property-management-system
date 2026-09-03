import { prisma } from '@/lib/prisma';

import type {
  AcquisitionReportFilters,
  AcquisitionSummaryFilters,
} from '../types/acquisition.types';
export async function getAcquisitionReport(filters?: AcquisitionReportFilters) {
  const search = filters?.search?.trim();
  const supplierName = filters?.supplierName?.trim();
  const fundingSource = filters?.fundingSource?.trim();

  const acquisitions = await prisma.acquisition.findMany({
    where: {
      ...(search
        ? {
            OR: [
              {
                acquisitionNumber: {
                  contains: search,
                  mode: 'insensitive',
                },
              },
              {
                supplierName: {
                  contains: search,
                  mode: 'insensitive',
                },
              },
              {
                referenceNumber: {
                  contains: search,
                  mode: 'insensitive',
                },
              },
              {
                fundingSource: {
                  contains: search,
                  mode: 'insensitive',
                },
              },
            ],
          }
        : {}),

      ...(filters?.dateFrom || filters?.dateTo
        ? {
            acquisitionDate: {
              ...(filters.dateFrom
                ? {
                    gte: new Date(`${filters.dateFrom}T00:00:00`),
                  }
                : {}),

              ...(filters.dateTo
                ? {
                    lt: new Date(
                      new Date(`${filters.dateTo}T00:00:00`).getTime() +
                        24 * 60 * 60 * 1000,
                    ),
                  }
                : {}),
            },
          }
        : {}),

      ...(filters?.acquisitionMethodId
        ? {
            acquisitionMethodId: filters.acquisitionMethodId,
          }
        : {}),

      ...(supplierName
        ? {
            supplierName: {
              contains: supplierName,
              mode: 'insensitive',
            },
          }
        : {}),

      ...(fundingSource
        ? {
            fundingSource: {
              contains: fundingSource,
              mode: 'insensitive',
            },
          }
        : {}),

      ...(filters?.currency
        ? {
            currency: {
              equals: filters.currency,
              mode: 'insensitive',
            },
          }
        : {}),
    },

    orderBy: {
      acquisitionDate: 'desc',
    },

    select: {
      id: true,
      acquisitionNumber: true,
      acquisitionDate: true,

      acquisitionMethod: {
        select: {
          id: true,
          code: true,
          name: true,
        },
      },

      supplierName: true,
      referenceNumber: true,
      fundingSource: true,
      totalAmount: true,
      currency: true,

      _count: {
        select: {
          items: true,
        },
      },
    },
  });

  return acquisitions.map((acquisition) => ({
    id: acquisition.id,
    acquisitionNumber: acquisition.acquisitionNumber,
    acquisitionDate: acquisition.acquisitionDate,

    acquisitionMethod: acquisition.acquisitionMethod,

    supplierName: acquisition.supplierName,
    referenceNumber: acquisition.referenceNumber,
    fundingSource: acquisition.fundingSource,

    totalAmount: acquisition.totalAmount?.toString() ?? null,
    currency: acquisition.currency,

    itemCount: acquisition._count.items,
  }));
}
export async function getActiveAcquisitionMethods() {
  return prisma.acquisitionMethod.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      name: 'asc',
    },
    select: {
      id: true,
      code: true,
      name: true,
    },
  });
}
export async function getAcquisitionDetail(id: string) {
  const acquisition = await prisma.acquisition.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      acquisitionNumber: true,
      acquisitionDate: true,

      acquisitionMethod: {
        select: {
          id: true,
          code: true,
          name: true,
        },
      },

      supplierName: true,
      referenceNumber: true,
      description: true,
      fundingSource: true,
      totalAmount: true,
      currency: true,
      notes: true,

      items: {
        orderBy: {
          createdAt: 'asc',
        },
        select: {
          id: true,
          assetId: true,
          unitCost: true,
          totalCost: true,

          asset: {
            select: {
              assetCode: true,
              name: true,
            },
          },
        },
      },
    },
  });

  if (!acquisition) {
    return null;
  }

  return {
    id: acquisition.id,
    acquisitionNumber: acquisition.acquisitionNumber,
    acquisitionDate: acquisition.acquisitionDate,

    acquisitionMethod: acquisition.acquisitionMethod,

    supplierName: acquisition.supplierName,
    referenceNumber: acquisition.referenceNumber,
    description: acquisition.description,

    fundingSource: acquisition.fundingSource,
    totalAmount: acquisition.totalAmount?.toString() ?? null,
    currency: acquisition.currency,
    notes: acquisition.notes,

    items: acquisition.items.map((item) => ({
      id: item.id,
      assetId: item.assetId,
      assetCode: item.asset.assetCode,
      assetName: item.asset.name,
      unitCost: item.unitCost?.toString() ?? null,
      totalCost: item.totalCost?.toString() ?? null,
    })),
  };
}

export async function getAcquisitionSummary(
  filters?: AcquisitionSummaryFilters,
) {
  const acquisitions = await prisma.acquisition.findMany({
    where: {
      ...(filters?.dateFrom || filters?.dateTo
        ? {
            acquisitionDate: {
              ...(filters.dateFrom
                ? {
                    gte: new Date(`${filters.dateFrom}T00:00:00`),
                  }
                : {}),

              ...(filters.dateTo
                ? {
                    lt: new Date(
                      new Date(`${filters.dateTo}T00:00:00`).getTime() +
                        24 * 60 * 60 * 1000,
                    ),
                  }
                : {}),
            },
          }
        : {}),
    },

    select: {
      id: true,
      totalAmount: true,
      currency: true,
      fundingSource: true,

      acquisitionMethod: {
        select: {
          id: true,
          code: true,
          name: true,
        },
      },

      _count: {
        select: {
          items: true,
        },
      },
    },
  });

  const acquisitionCount = acquisitions.length;

  const itemCount = acquisitions.reduce(
    (total, acquisition) => total + acquisition._count.items,
    0,
  );

  const methodMap = new Map<
    string,
    {
      acquisitionMethodId: string;
      code: string;
      name: string;
      acquisitionCount: number;
      itemCount: number;
    }
  >();

  const fundingSourceMap = new Map<
    string,
    {
      fundingSource: string;
      acquisitionCount: number;
      itemCount: number;
    }
  >();

  const currencyMap = new Map<
    string,
    {
      currency: string;
      acquisitionCount: number;
      itemCount: number;
      totalAmount: number;
    }
  >();

  for (const acquisition of acquisitions) {
    const methodKey = acquisition.acquisitionMethod.id;

    const existingMethod = methodMap.get(methodKey);

    if (existingMethod) {
      existingMethod.acquisitionCount += 1;
      existingMethod.itemCount += acquisition._count.items;
    } else {
      methodMap.set(methodKey, {
        acquisitionMethodId: acquisition.acquisitionMethod.id,
        code: acquisition.acquisitionMethod.code,
        name: acquisition.acquisitionMethod.name,
        acquisitionCount: 1,
        itemCount: acquisition._count.items,
      });
    }

    const fundingSource = acquisition.fundingSource?.trim() || 'Unspecified';

    const existingFundingSource = fundingSourceMap.get(fundingSource);

    if (existingFundingSource) {
      existingFundingSource.acquisitionCount += 1;
      existingFundingSource.itemCount += acquisition._count.items;
    } else {
      fundingSourceMap.set(fundingSource, {
        fundingSource,
        acquisitionCount: 1,
        itemCount: acquisition._count.items,
      });
    }

    if (acquisition.currency) {
      const currency = acquisition.currency.trim().toUpperCase();

      const existingCurrency = currencyMap.get(currency);

      if (existingCurrency) {
        existingCurrency.acquisitionCount += 1;
        existingCurrency.itemCount += acquisition._count.items;

        if (acquisition.totalAmount) {
          existingCurrency.totalAmount += Number(acquisition.totalAmount);
        }
      } else {
        currencyMap.set(currency, {
          currency,
          acquisitionCount: 1,
          itemCount: acquisition._count.items,
          totalAmount: acquisition.totalAmount
            ? Number(acquisition.totalAmount)
            : 0,
        });
      }
    }
  }

  return {
    totals: {
      acquisitionCount,
      itemCount,
    },

    byMethod: Array.from(methodMap.values()).sort(
      (a, b) => b.acquisitionCount - a.acquisitionCount,
    ),

    byFundingSource: Array.from(fundingSourceMap.values()).sort(
      (a, b) => b.acquisitionCount - a.acquisitionCount,
    ),

    byCurrency: Array.from(currencyMap.values())
      .sort((a, b) => b.totalAmount - a.totalAmount)
      .map((item) => ({
        ...item,
        totalAmount: item.totalAmount.toString(),
      })),
  };
}
