import { prisma } from '@/lib/prisma';

import type { CountryFormData } from '../schemas/country.schema';

export async function findCountries() {
  return prisma.country.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      name: 'asc',
    },
  });
}

export async function findCountryById(id: string) {
  return prisma.country.findUnique({
    where: {
      id,
    },
  });
}

export async function findCountryByCode(code: string, excludeId?: string) {
  return prisma.country.findFirst({
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

export async function findCountryByName(name: string, excludeId?: string) {
  return prisma.country.findFirst({
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

export async function createCountryRecord(data: CountryFormData) {
  return prisma.country.create({
    data: {
      code: data.code,
      name: data.name,
    },
  });
}

export async function updateCountryRecord(id: string, data: CountryFormData) {
  return prisma.country.update({
    where: {
      id,
    },
    data: {
      code: data.code,
      name: data.name,
    },
  });
}

export async function deactivateCountryRecord(id: string) {
  return prisma.country.update({
    where: {
      id,
    },
    data: {
      isActive: false,
    },
  });
}
