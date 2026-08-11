import { AppError } from '@/lib/errors';

import {
  findProperties,
  findPropertyById,
} from '../repositories/property.repository';

export async function getProperties() {
  return findProperties();
}

export async function getPropertyById(id: string) {
  const property = await findPropertyById(id);

  if (!property) {
    throw new AppError('Property not found', 'NOT_FOUND');
  }

  return property;
}
