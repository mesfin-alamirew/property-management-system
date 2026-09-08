import { requirePermission } from '@/lib/authorization/authorization.service';
import { AppError } from '@/lib/errors';

import {
  findWoredaByCode,
  findWoredaByName,
  createWoredaRecord,
  updateWoredaRecord,
  deactivateWoredaRecord,
} from '../repositories/woreda.repository';

import { getWoredaById } from '../queries/woreda.queries';

import type { WoredaFormData } from '../schemas/woreda.schema';

export async function createWoreda(userId: string, data: WoredaFormData) {
  await requirePermission({
    userId,
    permissionCode: 'WOREDA:CREATE',
  });

  const existingCode = await findWoredaByCode(data.zoneId, data.code);

  if (existingCode) {
    throw new AppError(
      'Woreda code already exists in this zone',
      'DUPLICATE_CODE',
    );
  }

  const existingName = await findWoredaByName(data.zoneId, data.name);

  if (existingName) {
    throw new AppError(
      'Woreda name already exists in this zone',
      'DUPLICATE_NAME',
    );
  }

  return createWoredaRecord(data);
}

export async function updateWoreda(
  userId: string,
  id: string,
  data: WoredaFormData,
) {
  await requirePermission({
    userId,
    permissionCode: 'WOREDA:UPDATE',
  });

  await getWoredaById(id);

  const existingCode = await findWoredaByCode(data.zoneId, data.code, id);

  if (existingCode) {
    throw new AppError(
      'Woreda code already exists in this zone',
      'DUPLICATE_CODE',
    );
  }

  const existingName = await findWoredaByName(data.zoneId, data.name, id);

  if (existingName) {
    throw new AppError(
      'Woreda name already exists in this zone',
      'DUPLICATE_NAME',
    );
  }

  return updateWoredaRecord(id, data);
}

export async function deactivateWoreda(userId: string, id: string) {
  await requirePermission({
    userId,
    permissionCode: 'WOREDA:DEACTIVATE',
  });

  const woreda = await getWoredaById(id);

  if (!woreda.isActive) {
    throw new AppError('Woreda is already inactive', 'ALREADY_INACTIVE');
  }

  return deactivateWoredaRecord(id);
}
