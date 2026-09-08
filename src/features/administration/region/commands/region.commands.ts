import { requirePermission } from '@/lib/authorization/authorization.service';
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

export async function createRegion(userId: string, data: RegionFormData) {
  await requirePermission({
    userId,
    permissionCode: 'REGION:CREATE',
  });

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

export async function updateRegion(
  userId: string,
  id: string,
  data: RegionFormData,
) {
  await requirePermission({
    userId,
    permissionCode: 'REGION:UPDATE',
  });

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

export async function deactivateRegion(userId: string, id: string) {
  await requirePermission({
    userId,
    permissionCode: 'REGION:DEACTIVATE',
  });

  const region = await getRegionById(id);

  if (!region.isActive) {
    throw new AppError('Region is already inactive', 'ALREADY_INACTIVE');
  }

  return deactivateRegionRecord(id);
}
