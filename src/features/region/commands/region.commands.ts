import { AppError } from '@/lib/errors';

import {
  findRegionByCode,
  findRegionByName,
  createRegionRecord,
  updateRegionRecord,
  deactivateRegionRecord,
} from '../repositories/region.repository';

import type { RegionFormData } from '../schemas/region.schema';
import { getRegionById } from '../queries/region.queries';

export async function createRegion(data: RegionFormData) {
  const existingCode = await findRegionByCode(data.countryId, data.code);

  if (existingCode) {
    throw new AppError(
      'Region code already exists in this country',
      'DUPLICATE_CODE',
    );
  }

  const existingName = await findRegionByName(data.countryId, data.name);

  if (existingName) {
    throw new AppError(
      'Region name already exists in this country',
      'DUPLICATE_NAME',
    );
  }

  return createRegionRecord(data);
}

export async function updateRegion(id: string, data: RegionFormData) {
  await getRegionById(id);

  const existingCode = await findRegionByCode(data.countryId, data.code, id);

  if (existingCode) {
    throw new AppError(
      'Region code already exists in this country',
      'DUPLICATE_CODE',
    );
  }

  const existingName = await findRegionByName(data.countryId, data.name, id);

  if (existingName) {
    throw new AppError(
      'Region name already exists in this country',
      'DUPLICATE_NAME',
    );
  }

  return updateRegionRecord(id, data);
}

export async function deactivateRegion(id: string) {
  const region = await getRegionById(id);

  if (!region.isActive) {
    throw new AppError('Region is already inactive', 'ALREADY_INACTIVE');
  }

  return deactivateRegionRecord(id);
}
