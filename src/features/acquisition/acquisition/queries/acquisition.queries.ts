import { prisma } from '@/lib/prisma';

export async function getAcquisitions() {
  return prisma.acquisition.findMany({
    orderBy: {
      acquisitionDate: 'desc',
    },
    include: {
      acquisitionMethod: {
        select: {
          id: true,
          code: true,
          name: true,
        },
      },
      items: {
        include: {
          asset: {
            select: {
              id: true,
              assetCode: true,
              name: true,
            },
          },
        },
      },
    },
  });
}

export async function getAcquisitionById(id: string) {
  return prisma.acquisition.findUnique({
    where: {
      id,
    },
    include: {
      acquisitionMethod: {
        select: {
          id: true,
          code: true,
          name: true,
        },
      },
      items: {
        include: {
          asset: {
            select: {
              id: true,
              assetCode: true,
              name: true,
            },
          },
        },
      },
    },
  });
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
