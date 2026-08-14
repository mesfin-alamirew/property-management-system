import { AppError } from '@/lib/errors';

import {
  findAssetTypeByCode,
  findAssetTypeById,
  createAssetTypeRecord,
  updateAssetTypeRecord,
  deactivateAssetTypeRecord,
} from '../repositories/asset-type.repository';

import { findAssetCategoryById } from '@/features/assets/asset-category/repositories/asset-category.repository';

import type { AssetTypeFormData } from '../schemas/asset-type.schema';

export async function createAssetType(data: AssetTypeFormData) {
  const category = await findAssetCategoryById(data.categoryId);

  if (!category) {
    throw new AppError('Asset Category not found', 'ASSET_CATEGORY_NOT_FOUND');
  }

  if (!category.isActive) {
    throw new AppError('Asset Category is inactive', 'ASSET_CATEGORY_INACTIVE');
  }

  const existingAssetType = await findAssetTypeByCode(data.code);

  if (existingAssetType) {
    if (!existingAssetType.isActive) {
      throw new AppError(
        'Asset type code already exists on an inactive Asset Type',
        'CODE_EXISTS_ON_INACTIVE_RECORD',
      );
    }

    throw new AppError('Asset type code already exists', 'DUPLICATE_CODE');
  }

  return createAssetTypeRecord(data);
}

export async function updateAssetType(id: string, data: AssetTypeFormData) {
  const assetType = await findAssetTypeById(id);

  if (!assetType) {
    throw new AppError('Asset Type not found', 'ASSET_TYPE_NOT_FOUND');
  }

  const category = await findAssetCategoryById(data.categoryId);

  if (!category) {
    throw new AppError('Asset Category not found', 'ASSET_CATEGORY_NOT_FOUND');
  }

  if (!category.isActive) {
    throw new AppError('Asset Category is inactive', 'ASSET_CATEGORY_INACTIVE');
  }

  const existingAssetType = await findAssetTypeByCode(data.code, id);

  if (existingAssetType) {
    if (!existingAssetType.isActive) {
      throw new AppError(
        'Asset type code already exists on an inactive Asset Type',
        'CODE_EXISTS_ON_INACTIVE_RECORD',
      );
    }

    throw new AppError('Asset type code already exists', 'DUPLICATE_CODE');
  }

  return updateAssetTypeRecord(id, data);
}

export async function deactivateAssetType(id: string) {
  const assetType = await findAssetTypeById(id);

  if (!assetType) {
    throw new AppError('Asset Type not found', 'ASSET_TYPE_NOT_FOUND');
  }

  return deactivateAssetTypeRecord(id);
}
