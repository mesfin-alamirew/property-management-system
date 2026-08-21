import { Prisma } from '@/generated/prisma/client';

import { prisma } from '@/lib/prisma';

import type {
  CreateAssetAssignmentFormData,
  ReturnAssetAssignmentFormData,
} from '../schemas/asset-assignment.schema';

const assetAssignmentInclude = {
  asset: {
    select: {
      id: true,
      assetCode: true,
      assetTag: true,
      name: true,
    },
  },

  employee: {
    select: {
      id: true,
      employeeNumber: true,
      firstName: true,
      middleName: true,
      lastName: true,
    },
  },

  assignedByUser: {
    select: {
      id: true,
      username: true,
      displayName: true,
    },
  },

  returnedByUser: {
    select: {
      id: true,
      username: true,
      displayName: true,
    },
  },
} satisfies Prisma.AssetAssignmentInclude;

export async function findAssetAssignments() {
  return prisma.assetAssignment.findMany({
    orderBy: {
      assignedAt: 'desc',
    },

    include: assetAssignmentInclude,
  });
}

export async function findAssetAssignmentById(id: string) {
  return prisma.assetAssignment.findUnique({
    where: {
      id,
    },

    include: assetAssignmentInclude,
  });
}

export async function findCurrentAssetAssignment(assetId: string) {
  return prisma.assetAssignment.findFirst({
    where: {
      assetId,
      returnedAt: null,
    },

    orderBy: {
      assignedAt: 'desc',
    },

    include: assetAssignmentInclude,
  });
}

export async function findCurrentEmployeeAssignment(employeeId: string) {
  return prisma.assetAssignment.findFirst({
    where: {
      employeeId,
      returnedAt: null,
    },

    orderBy: {
      assignedAt: 'desc',
    },

    include: assetAssignmentInclude,
  });
}
export async function findAssetById(id: string) {
  return prisma.asset.findUnique({
    where: {
      id,
    },
  });
}

export async function findEmployeeById(id: string) {
  return prisma.employee.findUnique({
    where: {
      id,
    },
  });
}
export async function createAssetAssignmentRecord(
  tx: Prisma.TransactionClient,
  userId: string,
  data: CreateAssetAssignmentFormData,
) {
  return tx.assetAssignment.create({
    data: {
      assetId: data.assetId,
      employeeId: data.employeeId,

      assignedAt: data.assignedAt ? new Date(data.assignedAt) : new Date(),

      assignedByUserId: userId,

      notes: data.notes,
    },

    include: assetAssignmentInclude,
  });
}

export async function returnAssetAssignmentRecord(
  id: string,
  userId: string,
  data: ReturnAssetAssignmentFormData,
) {
  return prisma.assetAssignment.update({
    where: {
      id,
    },

    data: {
      returnedAt: data.returnedAt ? new Date(data.returnedAt) : new Date(),

      returnedByUserId: userId,

      notes: data.notes,
    },

    include: assetAssignmentInclude,
  });
}
