import { prisma } from '@/lib/prisma';

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

export async function createOwnershipTypeRecord(data: OwnershipTypeFormData) {
  return prisma.ownershipType.create({
    data: {
      code: data.code,
      name: data.name,
      description: data.description || null,
    },
  });
}

export async function updateOwnershipTypeRecord(
  id: string,
  data: OwnershipTypeFormData,
) {
  return prisma.ownershipType.update({
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

export async function deactivateOwnershipTypeRecord(id: string) {
  return prisma.ownershipType.update({
    where: {
      id,
    },
    data: {
      isActive: false,
    },
  });
}
