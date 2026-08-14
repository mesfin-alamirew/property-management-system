import { AppError } from '@/lib/errors';

import {
  findAssetConditionByCode,
  findAssetConditionById,
  createAssetConditionRecord,
  updateAssetConditionRecord,
  deactivateAssetConditionRecord,
} from '../repositories/asset-condition.repository';

import type { AssetConditionFormData } from '../schemas/asset-condition.schema';

export async function createAssetCondition(data: AssetConditionFormData) {
  const existingAssetCondition = await findAssetConditionByCode(data.code);

  if (existingAssetCondition) {
    if (!existingAssetCondition.isActive) {
      throw new AppError(
        'Asset condition code already exists on an inactive Asset Condition',
        'CODE_EXISTS_ON_INACTIVE_RECORD',
      );
    }

    throw new AppError('Asset condition code already exists', 'DUPLICATE_CODE');
  }

  return createAssetConditionRecord(data);
}

export async function updateAssetCondition(
  id: string,
  data: AssetConditionFormData,
) {
  const assetCondition = await findAssetConditionById(id);

  if (!assetCondition) {
    throw new AppError(
      'Asset Condition not found',
      'ASSET_CONDITION_NOT_FOUND',
    );
  }

  const existingAssetCondition = await findAssetConditionByCode(data.code, id);

  if (existingAssetCondition) {
    if (!existingAssetCondition.isActive) {
      throw new AppError(
        'Asset condition code already exists on an inactive Asset Condition',
        'CODE_EXISTS_ON_INACTIVE_RECORD',
      );
    }

    throw new AppError('Asset condition code already exists', 'DUPLICATE_CODE');
  }

  return updateAssetConditionRecord(id, data);
}

export async function deactivateAssetCondition(id: string) {
  const assetCondition = await findAssetConditionById(id);

  if (!assetCondition) {
    throw new AppError(
      'Asset Condition not found',
      'ASSET_CONDITION_NOT_FOUND',
    );
  }

  return deactivateAssetConditionRecord(id);
}
