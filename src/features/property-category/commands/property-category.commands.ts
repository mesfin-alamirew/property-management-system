import { AppError } from '@/lib/errors';

import {
  findPropertyCategoryById,
  findPropertyCategoryByCode,
  findPropertyCategoryByName,
  createPropertyCategoryRecord,
  updatePropertyCategoryRecord,
  deactivatePropertyCategoryRecord,
  findPropertyCategoryDescendants,
} from '../repositories/property-category.repository';

import type { PropertyCategoryFormData } from '../schemas/property-category.schema';

export async function getPropertyCategoryById(id: string) {
  const propertyCategory = await findPropertyCategoryById(id);

  if (!propertyCategory) {
    throw new AppError('Property Category not found', 'NOT_FOUND');
  }

  return propertyCategory;
}
export async function createPropertyCategory(data: PropertyCategoryFormData) {
  const existingCode = await findPropertyCategoryByCode(data.code);

  if (existingCode) {
    throw new AppError(
      'Property Category code already exists',
      'DUPLICATE_CODE',
    );
  }

  const existingName = await findPropertyCategoryByName(data.name);

  if (existingName) {
    throw new AppError(
      'Property Category name already exists',
      'DUPLICATE_NAME',
    );
  }

  await validateParentCategory(data.parentId);

  return createPropertyCategoryRecord(data);
}

export async function updatePropertyCategory(
  id: string,
  data: PropertyCategoryFormData,
) {
  await getPropertyCategoryById(id);

  const existingCode = await findPropertyCategoryByCode(data.code, id);

  if (existingCode) {
    throw new AppError(
      'Property Category code already exists',
      'DUPLICATE_CODE',
    );
  }

  const existingName = await findPropertyCategoryByName(data.name, id);

  if (existingName) {
    throw new AppError(
      'Property Category name already exists',
      'DUPLICATE_NAME',
    );
  }

  await validateParentCategoryForUpdate(id, data.parentId);

  return updatePropertyCategoryRecord(id, data);
}

/* Helper function */

async function validateParentCategory(parentId?: string) {
  if (!parentId) {
    return;
  }

  const parent = await findPropertyCategoryById(parentId);

  if (!parent) {
    throw new AppError(
      'Parent Property Category not found',
      'PARENT_NOT_FOUND',
    );
  }

  if (!parent.isActive) {
    throw new AppError(
      'Parent Property Category is inactive',
      'PARENT_INACTIVE',
    );
  }
}

async function validateParentCategoryForUpdate(id: string, parentId?: string) {
  if (!parentId) {
    return;
  }

  if (parentId === id) {
    throw new AppError(
      'Property Category cannot be its own parent',
      'INVALID_PARENT',
    );
  }

  await validateParentCategory(parentId);

  const descendants = await findPropertyCategoryDescendants(id);

  if (descendants.includes(parentId)) {
    throw new AppError(
      'Property Category cannot have one of its descendants as its parent',
      'INVALID_PARENT',
    );
  }
}

export async function deactivatePropertyCategory(id: string) {
  const propertyCategory = await getPropertyCategoryById(id);

  if (!propertyCategory.isActive) {
    throw new AppError(
      'Property Category is already inactive',
      'ALREADY_INACTIVE',
    );
  }

  return deactivatePropertyCategoryRecord(id);
}
