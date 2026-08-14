import { prisma } from '@/lib/prisma';

import type { RegionFormData } from '../schemas/region.schema';

export async function findRegions() {
  return prisma.region.findMany({
    where: {
      isActive: true,
    },
    include: {
      country: true,
    },
    orderBy: {
      name: 'asc',
    },
  });
}

export async function findRegionById(id: string) {
  return prisma.region.findUnique({
    where: {
      id,
    },
    include: {
      country: true,
    },
  });
}

export async function findRegionByCode(
  countryId: string,
  code: string,
  excludeId?: string,
) {
  return prisma.region.findFirst({
    where: {
      countryId,
      code,
      NOT: excludeId
        ? {
            id: excludeId,
          }
        : undefined,
    },
  });
}

export async function findRegionByName(
  countryId: string,
  name: string,
  excludeId?: string,
) {
  return prisma.region.findFirst({
    where: {
      countryId,
      name,
      NOT: excludeId
        ? {
            id: excludeId,
          }
        : undefined,
    },
  });
}

export async function createRegionRecord(data: RegionFormData) {
  return prisma.region.create({
    data: {
      countryId: data.countryId,
      code: data.code,
      name: data.name,
    },
  });
}

export async function updateRegionRecord(id: string, data: RegionFormData) {
  return prisma.region.update({
    where: {
      id,
    },
    data: {
      countryId: data.countryId,
      code: data.code,
      name: data.name,
    },
  });
}

export async function deactivateRegionRecord(id: string) {
  return prisma.region.update({
    where: {
      id,
    },
    data: {
      isActive: false,
    },
  });
}
export async function findActiveRegionsForLookup() {
  return prisma.region.findMany({
    where: {
      isActive: true,
    },
    include: {
      country: true,
    },
    orderBy: {
      name: 'asc',
    },
  });
}
