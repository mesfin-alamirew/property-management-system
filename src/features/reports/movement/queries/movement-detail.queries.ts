import { prisma } from '@/lib/prisma';

export async function getMovementDetail(id: string) {
  const movement = await prisma.assetMovement.findUnique({
    where: {
      id,
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
      updatedAt: true,
    },
  });

  if (!movement) {
    return null;
  }

  return movement;
}
