import { prisma } from '@/lib/prisma';

import type { PropertyStatusFormData } from '../schemas/property-status.schema';

export async function findPropertyStatuses() {
  return prisma.propertyStatus.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      name: 'asc',
    },
  });
}

export async function findPropertyStatusById(id: string) {
  return prisma.propertyStatus.findUnique({
    where: {
      id,
    },
  });
}

export async function findPropertyStatusByCode(
  code: string,
  excludeId?: string,
) {
  return prisma.propertyStatus.findFirst({
    where: {
      code,
      NOT: excludeId
        ? {
            id: excludeId,
          }
        : undefined,
    },
  });
}

export async function findPropertyStatusByName(
  name: string,
  excludeId?: string,
) {
  return prisma.propertyStatus.findFirst({
    where: {
      name,
      NOT: excludeId
        ? {
            id: excludeId,
          }
        : undefined,
    },
  });
}

export async function createPropertyStatusRecord(data: PropertyStatusFormData) {
  return prisma.propertyStatus.create({
    data: {
      code: data.code,
      name: data.name,
      description: data.description,
    },
  });
}

export async function updatePropertyStatusRecord(
  id: string,
  data: PropertyStatusFormData,
) {
  return prisma.propertyStatus.update({
    where: {
      id,
    },
    data: {
      code: data.code,
      name: data.name,
      description: data.description,
    },
  });
}

export async function deactivatePropertyStatusRecord(id: string) {
  return prisma.propertyStatus.update({
    where: {
      id,
    },
    data: {
      isActive: false,
    },
  });
}
