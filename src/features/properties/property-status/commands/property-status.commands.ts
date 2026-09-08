import { requirePermission } from '@/lib/authorization/authorization.service';
import { AppError } from '@/lib/errors';

import {
  findPropertyStatusById,
  findPropertyStatusByCode,
  findPropertyStatusByName,
  createPropertyStatusRecord,
  updatePropertyStatusRecord,
  deactivatePropertyStatusRecord,
} from '../repositories/property-status.repository';

import { PropertyStatusFormData } from '../schemas/property-status.schema';

export async function getPropertyStatusById(id: string) {
  const propertyStatus = await findPropertyStatusById(id);

  if (!propertyStatus) {
    throw new AppError('Property Status not found', 'NOT_FOUND');
  }

  return propertyStatus;
}

export async function createPropertyStatus(
  userId: string,
  data: PropertyStatusFormData,
) {
  await requirePermission({
    userId,
    permissionCode: 'PROPERTY_STATUS:CREATE',
  });

  const existingCode = await findPropertyStatusByCode(data.code);

  if (existingCode) {
    throw new AppError('Property Status code already exists', 'DUPLICATE_CODE');
  }

  const existingName = await findPropertyStatusByName(data.name);

  if (existingName) {
    throw new AppError('Property Status name already exists', 'DUPLICATE_NAME');
  }

  return createPropertyStatusRecord(data);
}

export async function updatePropertyStatus(
  userId: string,
  id: string,
  data: PropertyStatusFormData,
) {
  await requirePermission({
    userId,
    permissionCode: 'PROPERTY_STATUS:UPDATE',
  });

  await getPropertyStatusById(id);

  const existingCode = await findPropertyStatusByCode(data.code, id);

  if (existingCode) {
    throw new AppError('Property Status code already exists', 'DUPLICATE_CODE');
  }

  const existingName = await findPropertyStatusByName(data.name, id);

  if (existingName) {
    throw new AppError('Property Status name already exists', 'DUPLICATE_NAME');
  }

  return updatePropertyStatusRecord(id, data);
}

export async function deactivatePropertyStatus(userId: string, id: string) {
  await requirePermission({
    userId,
    permissionCode: 'PROPERTY_STATUS:DEACTIVATE',
  });

  const propertyStatus = await getPropertyStatusById(id);

  if (!propertyStatus.isActive) {
    throw new AppError(
      'Property Status is already inactive',
      'ALREADY_INACTIVE',
    );
  }

  return deactivatePropertyStatusRecord(id);
}
