import { prisma } from '@/lib/prisma';
import { PropertyTypeFormData } from '../schemas/property-type.schema';

export async function findPropertyTypes() {
  return prisma.propertyType.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      name: 'asc',
    },
  });
}

export async function findPropertyTypeById(id: string) {
  return prisma.propertyType.findUnique({
    where: {
      id,
    },
  });
}

export async function findPropertyTypeByCode(code: string, excludeId?: string) {
  return prisma.propertyType.findFirst({
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

export async function findPropertyTypeByName(name: string, excludeId?: string) {
  return prisma.propertyType.findFirst({
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

export async function createPropertyTypeRecord(data: PropertyTypeFormData) {
  return prisma.propertyType.create({
    data: {
      code: data.code,
      name: data.name,
      description: data.description,
    },
  });
}

export async function updatePropertyTypeRecord(
  id: string,
  data: PropertyTypeFormData,
) {
  return prisma.propertyType.update({
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

export async function deactivatePropertyTypeRecord(id: string) {
  return prisma.propertyType.update({
    where: {
      id,
    },
    data: {
      isActive: false,
    },
  });
}
