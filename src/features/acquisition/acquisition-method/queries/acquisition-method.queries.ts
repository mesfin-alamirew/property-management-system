import { requirePermission } from '@/lib/authorization/authorization.service';

import {
  findActiveAcquisitionMethods,
  findAllAcquisitionMethods,
  findAcquisitionMethodById,
} from '../repositories/acquisition-method.repository';

export async function getActiveAcquisitionMethods(userId: string) {
  await requirePermission({
    userId,
    permissionCode: 'ACQUISITION_METHOD:READ',
  });

  return findActiveAcquisitionMethods();
}

export async function getAcquisitionMethods(userId: string) {
  await requirePermission({
    userId,
    permissionCode: 'ACQUISITION_METHOD:READ',
  });

  return findAllAcquisitionMethods();
}

export async function getAcquisitionMethodById(userId: string, id: string) {
  await requirePermission({
    userId,
    permissionCode: 'ACQUISITION_METHOD:READ',
  });

  return findAcquisitionMethodById(id);
}
