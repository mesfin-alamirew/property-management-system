import { AppError } from '@/lib/errors';
import { requirePermission } from '@/lib/authorization/authorization.service';

import {
  findCountries,
  findCountryById,
} from '../repositories/country.repository';

export async function getCountries(userId: string) {
  await requirePermission({
    userId,
    permissionCode: 'COUNTRY:READ',
  });

  return findCountries();
}

export async function getCountryById(userId: string, id: string) {
  await requirePermission({
    userId,
    permissionCode: 'COUNTRY:READ',
  });

  const country = await findCountryById(id);

  if (!country) {
    throw new AppError('Country not found', 'NOT_FOUND');
  }

  return country;
}
