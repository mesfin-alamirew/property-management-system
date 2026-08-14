import { prisma } from '@/lib/prisma';

import type { PropertyTenureFormData } from '../schemas/property-tenure.schema';

export async function findPropertyTenures() {
  return prisma.propertyTenure.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      name: 'asc',
    },
  });
}

export async function findPropertyTenureById(id: string) {
  return prisma.propertyTenure.findUnique({
    where: {
      id,
    },
  });
}

export async function findPropertyTenureByCode(
  code: string,
  excludeId?: string,
) {
  return prisma.propertyTenure.findFirst({
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

export async function findPropertyTenureByName(
  name: string,
  excludeId?: string,
) {
  return prisma.propertyTenure.findFirst({
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

export async function createPropertyTenureRecord(data: PropertyTenureFormData) {
  return prisma.propertyTenure.create({
    data: {
      code: data.code,
      name: data.name,
      description: data.description,
    },
  });
}

export async function updatePropertyTenureRecord(
  id: string,
  data: PropertyTenureFormData,
) {
  return prisma.propertyTenure.update({
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

export async function deactivatePropertyTenureRecord(id: string) {
  return prisma.propertyTenure.update({
    where: {
      id,
    },
    data: {
      isActive: false,
    },
  });
}
