import { prisma } from '@/lib/prisma';

import type { ZoneFormData } from '../schemas/zone.schema';

export async function findZones() {
  return prisma.zone.findMany({
    where: {
      isActive: true,
    },
    include: {
      region: true,
    },
    orderBy: {
      name: 'asc',
    },
  });
}

export async function findZoneById(id: string) {
  return prisma.zone.findUnique({
    where: {
      id,
    },
    include: {
      region: true,
    },
  });
}

export async function findZoneByCode(
  regionId: string,
  code: string,
  excludeId?: string,
) {
  return prisma.zone.findFirst({
    where: {
      regionId,
      code,
      NOT: excludeId
        ? {
            id: excludeId,
          }
        : undefined,
    },
  });
}

export async function findZoneByName(
  regionId: string,
  name: string,
  excludeId?: string,
) {
  return prisma.zone.findFirst({
    where: {
      regionId,
      name,
      NOT: excludeId
        ? {
            id: excludeId,
          }
        : undefined,
    },
  });
}

export async function createZoneRecord(data: ZoneFormData) {
  return prisma.zone.create({
    data: {
      regionId: data.regionId,
      code: data.code,
      name: data.name,
    },
  });
}

export async function updateZoneRecord(id: string, data: ZoneFormData) {
  return prisma.zone.update({
    where: {
      id,
    },
    data: {
      regionId: data.regionId,
      code: data.code,
      name: data.name,
    },
  });
}

export async function deactivateZoneRecord(id: string) {
  return prisma.zone.update({
    where: {
      id,
    },
    data: {
      isActive: false,
    },
  });
}

export async function findActiveZonesForLookup() {
  return prisma.zone.findMany({
    where: {
      isActive: true,
    },
    include: {
      region: true,
    },
    orderBy: {
      name: 'asc',
    },
  });
}
