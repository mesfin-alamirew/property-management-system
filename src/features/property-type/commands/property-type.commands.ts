import { AppError } from '@/lib/errors';

import {
  findPropertyTypes,
  findPropertyTypeById,
  findPropertyTypeByCode,
  findPropertyTypeByName,
  createPropertyTypeRecord,
  updatePropertyTypeRecord,
  deactivatePropertyTypeRecord,
} from '../repositories/property-type.repository';

import { PropertyTypeFormData } from '../schemas/property-type.schema';

export async function getPropertyTypes() {
  return findPropertyTypes();
}

export async function getPropertyTypeById(id: string) {
  const propertyType = await findPropertyTypeById(id);

  if (!propertyType) {
    throw new AppError('Property Type not found', 'NOT_FOUND');
  }

  return propertyType;
}

export async function createPropertyType(data: PropertyTypeFormData) {
  const existingCode = await findPropertyTypeByCode(data.code);

  if (existingCode) {
    throw new AppError('Property Type code already exists', 'DUPLICATE_CODE');
  }

  const existingName = await findPropertyTypeByName(data.name);

  if (existingName) {
    throw new AppError('Property Type name already exists', 'DUPLICATE_NAME');
  }

  return createPropertyTypeRecord(data);
}

export async function updatePropertyType(
  id: string,
  data: PropertyTypeFormData,
) {
  await getPropertyTypeById(id);

  const existingCode = await findPropertyTypeByCode(data.code, id);

  if (existingCode) {
    throw new AppError('Property Type code already exists', 'DUPLICATE_CODE');
  }

  const existingName = await findPropertyTypeByName(data.name, id);

  if (existingName) {
    throw new AppError('Property Type name already exists', 'DUPLICATE_NAME');
  }

  return updatePropertyTypeRecord(id, data);
}

export async function deactivatePropertyType(id: string) {
  const propertyType = await getPropertyTypeById(id);

  if (!propertyType.isActive) {
    throw new AppError('Property Type is already inactive', 'ALREADY_INACTIVE');
  }

  return deactivatePropertyTypeRecord(id);
}
