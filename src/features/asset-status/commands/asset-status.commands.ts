import { AppError } from '@/lib/errors';

import {
  findAssetStatusByCode,
  findAssetStatusById,
  createAssetStatusRecord,
  updateAssetStatusRecord,
  deactivateAssetStatusRecord,
} from '../repositories/asset-status.repository';

import type { AssetStatusFormData } from '../schemas/asset-status.schema';

export async function createAssetStatus(data: AssetStatusFormData) {
  const existingAssetStatus = await findAssetStatusByCode(data.code);

  if (existingAssetStatus) {
    if (!existingAssetStatus.isActive) {
      throw new AppError(
        'Asset status code already exists on an inactive Asset Status',
        'CODE_EXISTS_ON_INACTIVE_RECORD',
      );
    }

    throw new AppError('Asset status code already exists', 'DUPLICATE_CODE');
  }

  return createAssetStatusRecord(data);
}

export async function updateAssetStatus(id: string, data: AssetStatusFormData) {
  const assetStatus = await findAssetStatusById(id);

  if (!assetStatus) {
    throw new AppError('Asset Status not found', 'ASSET_STATUS_NOT_FOUND');
  }

  const existingAssetStatus = await findAssetStatusByCode(data.code, id);

  if (existingAssetStatus) {
    if (!existingAssetStatus.isActive) {
      throw new AppError(
        'Asset status code already exists on an inactive Asset Status',
        'CODE_EXISTS_ON_INACTIVE_RECORD',
      );
    }

    throw new AppError('Asset status code already exists', 'DUPLICATE_CODE');
  }

  return updateAssetStatusRecord(id, data);
}

export async function deactivateAssetStatus(id: string) {
  const assetStatus = await findAssetStatusById(id);

  if (!assetStatus) {
    throw new AppError('Asset Status not found', 'ASSET_STATUS_NOT_FOUND');
  }

  return deactivateAssetStatusRecord(id);
}
