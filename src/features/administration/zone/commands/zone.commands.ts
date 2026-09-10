import { requirePermission } from '@/lib/authorization/authorization.service';
import { AppError } from '@/lib/errors';

import {
  findZoneById,
  findZoneByCode,
  findZoneByName,
  createZoneRecord,
  updateZoneRecord,
  deactivateZoneRecord,
} from '../repositories/zone.repository';

import type { ZoneFormData } from '../schemas/zone.schema';

export async function createZone(userId: string, data: ZoneFormData) {
  await requirePermission({
    userId,
    permissionCode: 'ZONE:CREATE',
  });

  const existingCode = await findZoneByCode(data.regionId, data.code);

  if (existingCode) {
    throw new AppError(
      'Zone code already exists in this region',
      'DUPLICATE_CODE',
    );
  }

  const existingName = await findZoneByName(data.regionId, data.name);

  if (existingName) {
    throw new AppError(
      'Zone name already exists in this region',
      'DUPLICATE_NAME',
    );
  }

  return createZoneRecord(data);
}

export async function updateZone(
  userId: string,
  id: string,
  data: ZoneFormData,
) {
  await requirePermission({
    userId,
    permissionCode: 'ZONE:UPDATE',
  });

  const zone = await findZoneById(id);

  if (!zone) {
    throw new AppError('Zone not found', 'NOT_FOUND');
  }

  const existingCode = await findZoneByCode(data.regionId, data.code, id);

  if (existingCode) {
    throw new AppError(
      'Zone code already exists in this region',
      'DUPLICATE_CODE',
    );
  }

  const existingName = await findZoneByName(data.regionId, data.name, id);

  if (existingName) {
    throw new AppError(
      'Zone name already exists in this region',
      'DUPLICATE_NAME',
    );
  }

  return updateZoneRecord(id, data);
}

export async function deactivateZone(userId: string, id: string) {
  await requirePermission({
    userId,
    permissionCode: 'ZONE:DEACTIVATE',
  });

  const zone = await findZoneById(id);

  if (!zone) {
    throw new AppError('Zone not found', 'NOT_FOUND');
  }

  if (!zone.isActive) {
    throw new AppError('Zone is already inactive', 'ALREADY_INACTIVE');
  }

  return deactivateZoneRecord(id);
}
