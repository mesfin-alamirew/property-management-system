import { AppError } from '@/lib/errors';

import {
  findCountryByCode,
  findCountryByName,
  createCountryRecord,
  updateCountryRecord,
  deactivateCountryRecord,
} from '../repositories/country.repository';

import type { CountryFormData } from '../schemas/country.schema';
import { getCountryById } from '../queries/country.queries';

export async function createCountry(data: CountryFormData) {
  const existingCode = await findCountryByCode(data.code);

  if (existingCode) {
    throw new AppError('Country code already exists', 'DUPLICATE_CODE');
  }

  const existingName = await findCountryByName(data.name);

  if (existingName) {
    throw new AppError('Country name already exists', 'DUPLICATE_NAME');
  }

  return createCountryRecord(data);
}

export async function updateCountry(id: string, data: CountryFormData) {
  await getCountryById(id);

  const existingCode = await findCountryByCode(data.code, id);

  if (existingCode) {
    throw new AppError('Country code already exists', 'DUPLICATE_CODE');
  }

  const existingName = await findCountryByName(data.name, id);

  if (existingName) {
    throw new AppError('Country name already exists', 'DUPLICATE_NAME');
  }

  return updateCountryRecord(id, data);
}

export async function deactivateCountry(id: string) {
  const country = await getCountryById(id);

  if (!country.isActive) {
    throw new AppError('Country is already inactive', 'ALREADY_INACTIVE');
  }

  return deactivateCountryRecord(id);
}
