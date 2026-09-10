import { AppError } from '@/lib/errors';

import {
  findCountryByCode,
  findCountryByName,
  createCountryRecord,
  updateCountryRecord,
  deactivateCountryRecord,
  findCountryById,
} from '../repositories/country.repository';

import type { CountryFormData } from '../schemas/country.schema';

import { requirePermission } from '@/lib/authorization/authorization.service';

export async function createCountry(userId: string, data: CountryFormData) {
  await requirePermission({
    userId,
    permissionCode: 'COUNTRY:CREATE',
  });

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

export async function updateCountry(
  userId: string,
  id: string,
  data: CountryFormData,
) {
  await requirePermission({
    userId,
    permissionCode: 'COUNTRY:UPDATE',
  });

  const country = await findCountryById(id);

  if (!country) {
    throw new AppError('Country not found', 'NOT_FOUND');
  }

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

export async function deactivateCountry(userId: string, id: string) {
  await requirePermission({
    userId,
    permissionCode: 'COUNTRY:DEACTIVATE',
  });

  const country = await findCountryById(id);

  if (!country) {
    throw new AppError('Country not found', 'NOT_FOUND');
  }

  if (!country.isActive) {
    throw new AppError('Country is already inactive', 'ALREADY_INACTIVE');
  }

  return deactivateCountryRecord(id);
}
