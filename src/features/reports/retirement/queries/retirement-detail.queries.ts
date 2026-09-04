import { prisma } from '@/lib/prisma';

export async function getRetirementDetail(id: string) {
  const retirement = await prisma.retirement.findUnique({
    where: {
      id,
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
      notes: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!retirement) {
    return null;
  }

  return {
    ...retirement,
    status: retirement.status.toString(),
  };
}
