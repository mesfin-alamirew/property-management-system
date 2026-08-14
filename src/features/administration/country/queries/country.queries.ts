import { prisma } from '@/lib/prisma';
import type { Country } from '@/generated/prisma/client';
import { findCountryById } from '../repositories/country.repository';
import { AppError } from '@/lib/errors';

export async function getCountries() {
  return prisma.country.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      name: 'asc',
    },
  });
}

export async function getCountryById(id: string): Promise<Country> {
  const country = await findCountryById(id);

  if (!country) {
    throw new AppError('Country not found', 'NOT_FOUND');
  }

  return country;
}
