import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';

import type { AcquisitionFormData } from '../schemas/acquisition.schema';

export async function findAcquisitions() {
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

export async function findAcquisitionById(id: string) {
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

export async function findAcquisitionByNumber(acquisitionNumber: string) {
  return prisma.acquisition.findUnique({
    where: {
      acquisitionNumber,
    },
  });
}

export async function findAcquisitionMethodById(id: string) {
  return prisma.acquisitionMethod.findUnique({
    where: {
      id,
    },
  });
}

export async function findActiveAcquisitionMethodById(id: string) {
  return prisma.acquisitionMethod.findFirst({
    where: {
      id,
      isActive: true,
    },
  });
}

export async function createAcquisitionRecord(
  tx: Prisma.TransactionClient,
  acquisitionNumber: string,
  data: AcquisitionFormData,
) {
  return tx.acquisition.create({
    data: {
      acquisitionNumber,
      acquisitionDate: data.acquisitionDate,
      acquisitionMethodId: data.acquisitionMethodId,
      supplierName: data.supplierName,
      referenceNumber: data.referenceNumber,
      description: data.description,
      fundingSource: data.fundingSource,
      totalAmount: data.totalAmount
        ? new Prisma.Decimal(data.totalAmount)
        : undefined,
      currency: data.currency,
      notes: data.notes,
    },
  });
}

export async function updateAcquisitionRecord(
  id: string,
  data: AcquisitionFormData,
) {
  return prisma.acquisition.update({
    where: {
      id,
    },
    data: {
      // acquisitionNumber is deliberately NOT updated.
      acquisitionDate: data.acquisitionDate,
      acquisitionMethodId: data.acquisitionMethodId,
      supplierName: data.supplierName,
      referenceNumber: data.referenceNumber,
      description: data.description,
      fundingSource: data.fundingSource,
      totalAmount: data.totalAmount
        ? new Prisma.Decimal(data.totalAmount)
        : undefined,
      currency: data.currency,
      notes: data.notes,
    },
  });
}
