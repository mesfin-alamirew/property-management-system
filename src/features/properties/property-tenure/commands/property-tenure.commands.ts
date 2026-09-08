import { requirePermission } from '@/lib/authorization/authorization.service';
import { AppError } from '@/lib/errors';

import {
  findPropertyTenureById,
  findPropertyTenureByCode,
  findPropertyTenureByName,
  createPropertyTenureRecord,
  updatePropertyTenureRecord,
  deactivatePropertyTenureRecord,
} from '../repositories/property-tenure.repository';

import type { PropertyTenureFormData } from '../schemas/property-tenure.schema';

export async function getPropertyTenureById(id: string) {
  const propertyTenure = await findPropertyTenureById(id);

  if (!propertyTenure) {
    throw new AppError('Property Tenure not found', 'NOT_FOUND');
  }

  return propertyTenure;
}

export async function createPropertyTenure(
  userId: string,
  data: PropertyTenureFormData,
) {
  await requirePermission({
    userId,
    permissionCode: 'PROPERTY_TENURE:CREATE',
  });

  const existingCode = await findPropertyTenureByCode(data.code);

  if (existingCode) {
    throw new AppError('Property Tenure code already exists', 'DUPLICATE_CODE');
  }

  const existingName = await findPropertyTenureByName(data.name);

  if (existingName) {
    throw new AppError('Property Tenure name already exists', 'DUPLICATE_NAME');
  }

  return createPropertyTenureRecord(data);
}

export async function updatePropertyTenure(
  userId: string,
  id: string,
  data: PropertyTenureFormData,
) {
  await requirePermission({
    userId,
    permissionCode: 'PROPERTY_TENURE:UPDATE',
  });

  await getPropertyTenureById(id);

  const existingCode = await findPropertyTenureByCode(data.code, id);

  if (existingCode) {
    throw new AppError('Property Tenure code already exists', 'DUPLICATE_CODE');
  }

  const existingName = await findPropertyTenureByName(data.name, id);

  if (existingName) {
    throw new AppError('Property Tenure name already exists', 'DUPLICATE_NAME');
  }

  return updatePropertyTenureRecord(id, data);
}

export async function deactivatePropertyTenure(userId: string, id: string) {
  await requirePermission({
    userId,
    permissionCode: 'PROPERTY_TENURE:DEACTIVATE',
  });

  const propertyTenure = await getPropertyTenureById(id);

  if (!propertyTenure.isActive) {
    throw new AppError(
      'Property Tenure is already inactive',
      'ALREADY_INACTIVE',
    );
  }

  return deactivatePropertyTenureRecord(id);
}
