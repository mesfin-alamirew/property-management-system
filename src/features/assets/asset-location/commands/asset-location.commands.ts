import { AppError } from '@/lib/errors';

import {
  findAssetLocationByCode,
  findAssetLocationById,
  createAssetLocationRecord,
  updateAssetLocationRecord,
  deactivateAssetLocationRecord,
} from '../repositories/asset-location.repository';

import type { AssetLocationFormData } from '../schemas/asset-location.schema';

export async function createAssetLocation(data: AssetLocationFormData) {
  const existingAssetLocation = await findAssetLocationByCode(data.code);

  if (existingAssetLocation) {
    if (!existingAssetLocation.isActive) {
      throw new AppError(
        'Asset location code already exists on an inactive Asset Location',
        'CODE_EXISTS_ON_INACTIVE_RECORD',
      );
    }

    throw new AppError('Asset location code already exists', 'DUPLICATE_CODE');
  }

  return createAssetLocationRecord(data);
}

export async function updateAssetLocation(
  id: string,
  data: AssetLocationFormData,
) {
  const assetLocation = await findAssetLocationById(id);

  if (!assetLocation) {
    throw new AppError('Asset Location not found', 'ASSET_LOCATION_NOT_FOUND');
  }

  const existingAssetLocation = await findAssetLocationByCode(data.code, id);

  if (existingAssetLocation) {
    if (!existingAssetLocation.isActive) {
      throw new AppError(
        'Asset location code already exists on an inactive Asset Location',
        'CODE_EXISTS_ON_INACTIVE_RECORD',
      );
    }

    throw new AppError('Asset location code already exists', 'DUPLICATE_CODE');
  }

  return updateAssetLocationRecord(id, data);
}

export async function deactivateAssetLocation(id: string) {
  const assetLocation = await findAssetLocationById(id);

  if (!assetLocation) {
    throw new AppError('Asset Location not found', 'ASSET_LOCATION_NOT_FOUND');
  }

  return deactivateAssetLocationRecord(id);
}
