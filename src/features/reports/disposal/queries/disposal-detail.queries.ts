import { prisma } from '@/lib/prisma';

export async function getDisposalDetail(id: string) {
  const disposal = await prisma.disposal.findUnique({
    where: {
      id,
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
      notes: true,

      items: {
        orderBy: {
          createdAt: 'asc',
        },
        select: {
          asset: {
            select: {
              id: true,
              assetCode: true,
              assetTag: true,
              name: true,
              assetType: {
                select: {
                  id: true,
                  name: true,
                },
              },
              status: {
                select: {
                  id: true,
                  name: true,
                },
              },
              condition: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      },

      createdAt: true,
      updatedAt: true,
    },
  });

  if (!disposal) {
    return null;
  }

  return {
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

    notes: disposal.notes,

    items: disposal.items.map((item) => ({
      id: item.asset.id,
      assetCode: item.asset.assetCode,
      assetTag: item.asset.assetTag,
      name: item.asset.name,
      assetType: item.asset.assetType,
      status: item.asset.status,
      condition: item.asset.condition,
    })),

    createdAt: disposal.createdAt,
    updatedAt: disposal.updatedAt,
  };
}
