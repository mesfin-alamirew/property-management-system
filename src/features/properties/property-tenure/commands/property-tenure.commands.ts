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

export async function createPropertyTenure(data: PropertyTenureFormData) {
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
  id: string,
  data: PropertyTenureFormData,
) {
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

export async function deactivatePropertyTenure(id: string) {
  const propertyTenure = await getPropertyTenureById(id);

  if (!propertyTenure.isActive) {
    throw new AppError(
      'Property Tenure is already inactive',
      'ALREADY_INACTIVE',
    );
  }

  return deactivatePropertyTenureRecord(id);
}
