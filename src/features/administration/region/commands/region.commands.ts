import { requirePermission } from '@/lib/authorization/authorization.service';
import { AppError } from '@/lib/errors';

import {
  findRegionById,
  findRegionByCode,
  findRegionByName,
  createRegionRecord,
  updateRegionRecord,
  deactivateRegionRecord,
} from '../repositories/region.repository';

import type { RegionFormData } from '../schemas/region.schema';

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

  const region = await findRegionById(id);

  if (!region) {
    throw new AppError('Region not found', 'NOT_FOUND');
  }

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

  const region = await findRegionById(id);

  if (!region) {
    throw new AppError('Region not found', 'NOT_FOUND');
  }

  if (!region.isActive) {
    throw new AppError('Region is already inactive', 'ALREADY_INACTIVE');
  }

  return deactivateRegionRecord(id);
}
