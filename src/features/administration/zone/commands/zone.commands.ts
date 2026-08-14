import { AppError } from '@/lib/errors';

import {
  findZoneByCode,
  findZoneByName,
  createZoneRecord,
  updateZoneRecord,
  deactivateZoneRecord,
} from '../repositories/zone.repository';

import { getZoneById } from '../queries/zone.queries';

import type { ZoneFormData } from '../schemas/zone.schema';

export async function createZone(data: ZoneFormData) {
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

export async function updateZone(id: string, data: ZoneFormData) {
  await getZoneById(id);

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

export async function deactivateZone(id: string) {
  const zone = await getZoneById(id);

  if (!zone.isActive) {
    throw new AppError('Zone is already inactive', 'ALREADY_INACTIVE');
  }

  return deactivateZoneRecord(id);
}
