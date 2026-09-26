import { prisma } from '@/lib/prisma';
import { Prisma } from '@/generated/prisma/client';

import type { OwnershipTypeFormData } from '../schemas/ownership-type.schema';

export async function findOwnershipTypes() {
  return prisma.ownershipType.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      name: 'asc',
    },
  });
}

export async function findOwnershipTypeById(id: string) {
  return prisma.ownershipType.findUnique({
    where: {
      id,
    },
  });
}

export async function findOwnershipTypeByCode(
  code: string,
  excludeId?: string,
) {
  return prisma.ownershipType.findFirst({
    where: {
      code,
      ...(excludeId
        ? {
            id: {
              not: excludeId,
            },
          }
        : {}),
    },
  });
}

export async function createOwnershipTypeRecord(
  tx: Prisma.TransactionClient,
  data: OwnershipTypeFormData,
) {
  return tx.ownershipType.create({
    data: {
      code: data.code,
      name: data.name,
      description: data.description || null,
    },
  });
}

export async function updateOwnershipTypeRecord(
  tx: Prisma.TransactionClient,
  id: string,
  data: OwnershipTypeFormData,
) {
  return tx.ownershipType.update({
    where: {
      id,
    },
    data: {
      code: data.code,
      name: data.name,
      description: data.description || null,
    },
  });
}

export async function deactivateOwnershipTypeRecord(
  tx: Prisma.TransactionClient,
  id: string,
) {
  return tx.ownershipType.update({
    where: {
      id,
    },
    data: {
      isActive: false,
    },
  });
}
