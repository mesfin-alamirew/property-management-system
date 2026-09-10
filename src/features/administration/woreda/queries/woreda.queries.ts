import { AppError } from '@/lib/errors';
import { requirePermission } from '@/lib/authorization/authorization.service';

import { findWoredas, findWoredaById } from '../repositories/woreda.repository';

export async function getWoredas(userId: string) {
  await requirePermission({
    userId,
    permissionCode: 'WOREDA:READ',
  });

  return findWoredas();
}

export async function getWoredaById(userId: string, id: string) {
  await requirePermission({
    userId,
    permissionCode: 'WOREDA:READ',
  });

  const woreda = await findWoredaById(id);

  if (!woreda) {
    throw new AppError('Woreda not found', 'NOT_FOUND');
  }

  return woreda;
}
