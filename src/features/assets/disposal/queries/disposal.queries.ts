import { prisma } from '@/lib/prisma';

const disposalUserSelect = {
  id: true,
  username: true,
  displayName: true,
};

const disposalRelations = {
  requestedByUser: {
    select: disposalUserSelect,
  },

  approvedByUser: {
    select: disposalUserSelect,
  },

  cancelledByUser: {
    select: disposalUserSelect,
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
};

export async function getDisposals() {
  return prisma.disposal.findMany({
    orderBy: {
      disposalDate: 'desc',
    },

    include: disposalRelations,
  });
}

export async function getDisposalById(id: string) {
  return prisma.disposal.findUnique({
    where: {
      id,
    },

    include: disposalRelations,
  });
}

export async function getDisposalByReferenceNumber(referenceNumber: string) {
  return prisma.disposal.findUnique({
    where: {
      referenceNumber,
    },

    include: disposalRelations,
  });
}

export async function getAvailableAssetsForDisposal() {
  return prisma.asset.findMany({
    where: {
      disposalItems: {
        none: {},
      },
    },

    orderBy: {
      name: 'asc',
    },

    select: {
      id: true,
      assetCode: true,
      name: true,
    },
  });
}

export async function getActiveUsersForDisposal() {
  return prisma.user.findMany({
    where: {
      isActive: true,
    },

    orderBy: {
      displayName: 'asc',
    },

    select: {
      id: true,
      username: true,
      displayName: true,
    },
  });
}
