import { prisma } from '@/lib/prisma';

import type { WoredaFormData } from '../schemas/woreda.schema';

export async function findWoredas() {
  return prisma.woreda.findMany({
    where: {
      isActive: true,
    },
    include: {
      zone: true,
    },
    orderBy: {
      name: 'asc',
    },
  });
}

export async function findWoredaById(id: string) {
  return prisma.woreda.findUnique({
    where: {
      id,
    },
    include: {
      zone: true,
    },
  });
}

export async function findWoredaByCode(
  zoneId: string,
  code: string,
  excludeId?: string,
) {
  return prisma.woreda.findFirst({
    where: {
      zoneId,
      code,
      NOT: excludeId
        ? {
            id: excludeId,
          }
        : undefined,
    },
  });
}

export async function findWoredaByName(
  zoneId: string,
  name: string,
  excludeId?: string,
) {
  return prisma.woreda.findFirst({
    where: {
      zoneId,
      name,
      NOT: excludeId
        ? {
            id: excludeId,
          }
        : undefined,
    },
  });
}

export async function createWoredaRecord(data: WoredaFormData) {
  return prisma.woreda.create({
    data: {
      zoneId: data.zoneId,
      code: data.code,
      name: data.name,
    },
  });
}

export async function updateWoredaRecord(id: string, data: WoredaFormData) {
  return prisma.woreda.update({
    where: {
      id,
    },
    data: {
      zoneId: data.zoneId,
      code: data.code,
      name: data.name,
    },
  });
}

export async function deactivateWoredaRecord(id: string) {
  return prisma.woreda.update({
    where: {
      id,
    },
    data: {
      isActive: false,
    },
  });
}
