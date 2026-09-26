import { Prisma } from '@/generated/prisma/client';

import { prisma } from '@/lib/prisma';

import type { DisposalFormData } from '../schemas/disposal.schema';

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

export async function findDisposals() {
  return prisma.disposal.findMany({
    orderBy: {
      disposalDate: 'desc',
    },

    include: disposalRelations,
  });
}

export async function findDisposalById(id: string) {
  return prisma.disposal.findUnique({
    where: {
      id,
    },

    include: disposalRelations,
  });
}

export async function findDisposalByReferenceNumber(referenceNumber: string) {
  return prisma.disposal.findUnique({
    where: {
      referenceNumber,
    },

    include: disposalRelations,
  });
}

export async function findAssets() {
  return prisma.asset.findMany({
    orderBy: {
      assetCode: 'asc',
    },

    select: {
      id: true,
      assetCode: true,
      name: true,
    },
  });
}

export async function findActiveUsers() {
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

export async function createDisposalRecord(
  tx: Prisma.TransactionClient,
  referenceNumber: string,
  userId: string,
  data: DisposalFormData,
) {
  return tx.disposal.create({
    data: {
      referenceNumber,
      disposalDate: data.disposalDate,
      method: data.method,
      reason: data.reason,
      status: 'DRAFT',
      requestedByUserId: userId,
      notes: data.notes,
    },
  });
}

// export async function updateDisposalRecord(id: string, data: DisposalFormData) {
//   return prisma.disposal.update({
//     where: {
//       id,
//     },

//     data: {
//       // referenceNumber is deliberately NOT updated.

//       disposalDate: data.disposalDate,
//       method: data.method,
//       reason: data.reason,
//       notes: data.notes,
//     },
//   });
// }

export async function findUserById(id: string) {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
}

export async function requestDisposalRecord(
  tx: Prisma.TransactionClient,
  disposalId: string,
) {
  const result = await tx.disposal.updateMany({
    where: {
      id: disposalId,
      status: 'DRAFT',
    },

    data: {
      status: 'REQUESTED',
    },
  });

  if (result.count !== 1) {
    throw new Error('Disposal status changed before request');
  }

  return tx.disposal.findUniqueOrThrow({
    where: {
      id: disposalId,
    },
  });
}

export async function approveDisposalRecord(
  tx: Prisma.TransactionClient,
  disposalId: string,
  userId: string,
) {
  const result = await tx.disposal.updateMany({
    where: {
      id: disposalId,
      status: 'REQUESTED',
    },

    data: {
      status: 'APPROVED',
      approvedByUserId: userId,
      approvedAt: new Date(),
    },
  });

  if (result.count !== 1) {
    throw new Error('Disposal status changed before approval');
  }

  return tx.disposal.findUniqueOrThrow({
    where: {
      id: disposalId,
    },
  });
}

export async function cancelDisposalRecord(
  tx: Prisma.TransactionClient,
  disposalId: string,
  userId: string,
  reason: string,
) {
  const result = await tx.disposal.updateMany({
    where: {
      id: disposalId,
      status: {
        in: ['DRAFT', 'REQUESTED'],
      },
    },

    data: {
      status: 'CANCELLED',
      cancelledByUserId: userId,
      cancelledAt: new Date(),
      cancellationReason: reason,
    },
  });

  if (result.count !== 1) {
    throw new Error('Disposal status changed before cancellation');
  }

  return tx.disposal.findUniqueOrThrow({
    where: {
      id: disposalId,
    },
  });
}
