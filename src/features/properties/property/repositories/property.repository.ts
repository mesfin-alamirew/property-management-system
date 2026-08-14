import { prisma } from '@/lib/prisma';
import { Prisma } from '@/generated/prisma/client';

import type { PropertyFormData } from '../schemas/property.schema';

function toDecimal(value?: string) {
  if (!value || value.trim() === '') {
    return undefined;
  }

  return new Prisma.Decimal(value);
}

export async function findProperties() {
  return prisma.property.findMany({
    where: {
      isActive: true,
    },
    include: {
      organizationUnit: {
        select: {
          id: true,
          code: true,
          name: true,
        },
      },
      propertyType: {
        select: {
          id: true,
          code: true,
          name: true,
        },
      },
      propertyCategory: {
        select: {
          id: true,
          code: true,
          name: true,
        },
      },
      propertyTenure: {
        select: {
          id: true,
          code: true,
          name: true,
        },
      },
      propertyStatus: {
        select: {
          id: true,
          code: true,
          name: true,
        },
      },
    },
    orderBy: {
      name: 'asc',
    },
  });
}

export async function findPropertyById(id: string) {
  return prisma.property.findUnique({
    where: {
      id,
    },
  });
}

export async function findPropertyByCode(
  propertyCode: string,
  excludeId?: string,
) {
  return prisma.property.findFirst({
    where: {
      propertyCode,
      NOT: excludeId
        ? {
            id: excludeId,
          }
        : undefined,
    },
  });
}

export async function createPropertyRecord(data: PropertyFormData) {
  return prisma.property.create({
    data: {
      propertyCode: data.propertyCode,
      name: data.name,
      displayName: data.displayName,
      description: data.description,
      address: data.address,
      city: data.city,
      stateProvince: data.stateProvince,
      postalCode: data.postalCode,

      latitude: toDecimal(data.latitude),
      longitude: toDecimal(data.longitude),

      constructionDate: data.constructionDate
        ? new Date(data.constructionDate)
        : undefined,

      grossAreaSqm: toDecimal(data.grossAreaSqm),

      organizationUnitId: data.organizationUnitId,
      propertyTypeId: data.propertyTypeId,
      propertyCategoryId: data.propertyCategoryId,
      propertyTenureId: data.propertyTenureId,
      propertyStatusId: data.propertyStatusId,
    },
  });
}

export async function updatePropertyRecord(id: string, data: PropertyFormData) {
  return prisma.property.update({
    where: {
      id,
    },
    data: {
      propertyCode: data.propertyCode,
      name: data.name,
      displayName: data.displayName,
      description: data.description,
      address: data.address,
      city: data.city,
      stateProvince: data.stateProvince,
      postalCode: data.postalCode,

      latitude: toDecimal(data.latitude),
      longitude: toDecimal(data.longitude),

      constructionDate: data.constructionDate
        ? new Date(data.constructionDate)
        : undefined,

      grossAreaSqm: toDecimal(data.grossAreaSqm),

      organizationUnitId: data.organizationUnitId,
      propertyTypeId: data.propertyTypeId,
      propertyCategoryId: data.propertyCategoryId,
      propertyTenureId: data.propertyTenureId,
      propertyStatusId: data.propertyStatusId,
    },
  });
}

export async function deactivatePropertyRecord(id: string) {
  return prisma.property.update({
    where: {
      id,
    },
    data: {
      isActive: false,
    },
  });
}
