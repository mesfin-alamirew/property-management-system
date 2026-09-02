import { prisma } from '@/lib/prisma';

import { Prisma } from '@/generated/prisma/client';

import type {
  RetirementFormData,
  RetirementWithRelations,
} from '../types/retirement.types';

const retirementInclude = {
  asset: {
    select: { id: true, assetCode: true, name: true },
  },

  condition: {
    select: { id: true, code: true, name: true },
  },

  requestedByUser: {
    select: { id: true, username: true, displayName: true },
  },

  approvedByUser: {
    select: { id: true, username: true, displayName: true },
  },

  cancelledByUser: {
    select: { id: true, username: true, displayName: true },
  },
} satisfies Prisma.RetirementInclude;
export async function findRetirements(): Promise<RetirementWithRelations[]> {
  return prisma.retirement.findMany({
    orderBy: {
      retirementDate: 'desc',
    },

    include: retirementInclude,
  });
}

export async function findRetirementById(
  id: string,
): Promise<RetirementWithRelations | null> {
  return prisma.retirement.findUnique({
    where: {
      id,
    },

    include: retirementInclude,
  });
}

export async function findRetirementByReferenceNumber(referenceNumber: string) {
  return prisma.retirement.findUnique({
    where: {
      referenceNumber,
    },
  });
}

export async function findRetirementByAssetId(
  assetId: string,
): Promise<RetirementWithRelations | null> {
  return prisma.retirement.findUnique({
    where: {
      assetId,
    },

    include: retirementInclude,
  });
}

export async function findAssetById(id: string) {
  return prisma.asset.findUnique({
    where: {
      id,
    },

    include: {
      status: {
        select: {
          id: true,
          code: true,
          name: true,
        },
      },
    },
  });
}

export async function findUserById(id: string) {
  return prisma.user.findUnique({
    where: {
      id,
    },
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
export async function findConditions() {
  return prisma.assetCondition.findMany({
    orderBy: { code: 'asc' },
    select: {
      id: true,
      code: true,
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

export async function createRetirementRecord(
  tx: Prisma.TransactionClient,
  referenceNumber: string,
  userId: string,
  data: RetirementFormData,
) {
  return tx.retirement.create({
    data: {
      referenceNumber,
      assetId: data.assetId,
      retirementDate: data.retirementDate ?? new Date(),
      reason: data.reason,
      conditionId: data.conditionId,
      status: 'DRAFT',
      requestedByUserId: userId,
      notes: data.notes,
    },

    include: retirementInclude,
  });
}

export async function updateRetirementRecord(
  tx: Prisma.TransactionClient,
  id: string,
  data: RetirementFormData,
) {
  return tx.retirement.update({
    where: {
      id,
    },

    data: {
      assetId: data.assetId,
      retirementDate: data.retirementDate ?? new Date(),
      reason: data.reason,
      conditionId: data.conditionId,
      notes: data.notes,
    },

    include: retirementInclude,
  });
}

export async function requestRetirementRecord(
  tx: Prisma.TransactionClient,
  id: string,
) {
  return tx.retirement.update({
    where: {
      id,
    },

    data: {
      status: 'REQUESTED',
    },

    include: retirementInclude,
  });
}
export async function approveRetirementRecord(
  tx: Prisma.TransactionClient,
  id: string,
  approvedByUserId: string,
) {
  return tx.retirement.update({
    where: { id },
    data: {
      status: 'APPROVED',
      approvedByUserId,
      approvedAt: new Date(),
    },
    include: retirementInclude,
  });
}
export async function cancelRetirementRecord(
  tx: Prisma.TransactionClient,
  id: string,
  cancelledByUserId: string,
  cancellationReason: string,
) {
  return tx.retirement.update({
    where: { id },
    data: {
      status: 'CANCELLED',
      cancelledByUserId,
      cancelledAt: new Date(),
      cancellationReason,
    },
    include: retirementInclude,
  });
}
