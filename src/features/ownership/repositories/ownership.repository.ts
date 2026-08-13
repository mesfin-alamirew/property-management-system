import { prisma } from '@/lib/prisma';

import type { OwnershipFormData } from '../schemas/ownership.schema';

export async function findOwnerships() {
  const ownerships = await prisma.ownership.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      startDate: 'desc',
    },
    include: {
      property: {
        select: {
          id: true,
          propertyCode: true,
          name: true,
        },
      },
      ownershipType: {
        select: {
          id: true,
          code: true,
          name: true,
        },
      },
    },
  });

  return ownerships.map((ownership) => ({
    ...ownership,
    acquisitionPrice: ownership.acquisitionPrice?.toString() ?? null,
  }));
}

export async function findOwnershipById(id: string) {
  return prisma.ownership.findUnique({
    where: {
      id,
    },
    include: {
      property: {
        select: {
          id: true,
          propertyCode: true,
          name: true,
        },
      },
      ownershipType: {
        select: {
          id: true,
          code: true,
          name: true,
        },
      },
    },
  });
}

export async function findOwnershipByPropertyId(propertyId: string) {
  return prisma.ownership.findFirst({
    where: {
      propertyId,
      isActive: true,
    },
    orderBy: {
      startDate: 'desc',
    },
  });
}

export async function createOwnershipRecord(data: OwnershipFormData) {
  return prisma.ownership.create({
    data: {
      propertyId: data.propertyId,
      ownershipTypeId: data.ownershipTypeId,
      startDate: new Date(data.startDate),
      endDate: data.endDate ? new Date(data.endDate) : null,
      acquisitionDate: data.acquisitionDate
        ? new Date(data.acquisitionDate)
        : null,
      acquisitionPrice: data.acquisitionPrice
        ? Number(data.acquisitionPrice)
        : null,
      acquisitionCurrency: data.acquisitionCurrency || null,
      deedNumber: data.deedNumber || null,
      legalReference: data.legalReference || null,
      registrationAuthority: data.registrationAuthority || null,
      notes: data.notes || null,
    },
  });
}

export async function updateOwnershipRecord(
  id: string,
  data: OwnershipFormData,
) {
  return prisma.ownership.update({
    where: {
      id,
    },
    data: {
      propertyId: data.propertyId,
      ownershipTypeId: data.ownershipTypeId,
      startDate: new Date(data.startDate),
      endDate: data.endDate ? new Date(data.endDate) : null,
      acquisitionDate: data.acquisitionDate
        ? new Date(data.acquisitionDate)
        : null,
      acquisitionPrice: data.acquisitionPrice
        ? Number(data.acquisitionPrice)
        : null,
      acquisitionCurrency: data.acquisitionCurrency || null,
      deedNumber: data.deedNumber || null,
      legalReference: data.legalReference || null,
      registrationAuthority: data.registrationAuthority || null,
      notes: data.notes || null,
    },
  });
}

export async function deactivateOwnershipRecord(id: string) {
  return prisma.ownership.update({
    where: {
      id,
    },
    data: {
      isActive: false,
    },
  });
}
