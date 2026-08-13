import { AppError } from '@/lib/errors';

import {
  findAssetCategoryByCode,
  findAssetCategoryById,
  createAssetCategoryRecord,
  updateAssetCategoryRecord,
  deactivateAssetCategoryRecord,
} from '../repositories/asset-category.repository';

import type { AssetCategoryFormData } from '../schemas/asset-category.schema';

export async function createAssetCategory(data: AssetCategoryFormData) {
  if (data.parentId) {
    const parent = await findAssetCategoryById(data.parentId);

    if (!parent) {
      throw new AppError(
        'Parent Asset Category not found',
        'PARENT_CATEGORY_NOT_FOUND',
      );
    }

    if (!parent.isActive) {
      throw new AppError(
        'Parent Asset Category is inactive',
        'PARENT_CATEGORY_INACTIVE',
      );
    }
  }

  const existingCategory = await findAssetCategoryByCode(data.code);

  if (existingCategory) {
    throw new AppError('Asset category code already exists', 'DUPLICATE_CODE');
  }

  return createAssetCategoryRecord(data);
}

export async function updateAssetCategory(
  id: string,
  data: AssetCategoryFormData,
) {
  const category = await findAssetCategoryById(id);

  if (!category) {
    throw new AppError('Asset Category not found', 'ASSET_CATEGORY_NOT_FOUND');
  }

  if (data.parentId === id) {
    throw new AppError(
      'An Asset Category cannot be its own parent',
      'INVALID_PARENT',
    );
  }

  if (data.parentId) {
    const parent = await findAssetCategoryById(data.parentId);

    if (!parent) {
      throw new AppError(
        'Parent Asset Category not found',
        'PARENT_CATEGORY_NOT_FOUND',
      );
    }

    if (!parent.isActive) {
      throw new AppError(
        'Parent Asset Category is inactive',
        'PARENT_CATEGORY_INACTIVE',
      );
    }
  }

  const existingCategory = await findAssetCategoryByCode(data.code, id);

  if (existingCategory) {
    throw new AppError('Asset category code already exists', 'DUPLICATE_CODE');
  }

  return updateAssetCategoryRecord(id, data);
}

export async function deactivateAssetCategory(id: string) {
  const category = await findAssetCategoryById(id);

  if (!category) {
    throw new AppError('Asset Category not found', 'ASSET_CATEGORY_NOT_FOUND');
  }

  return deactivateAssetCategoryRecord(id);
}
