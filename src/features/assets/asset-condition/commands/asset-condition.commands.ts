import { requirePermission } from '@/lib/authorization/authorization.service';
import { AppError } from '@/lib/errors';

import {
  findAssetConditionByCode,
  findAssetConditionById,
  createAssetConditionRecord,
  updateAssetConditionRecord,
  deactivateAssetConditionRecord,
} from '../repositories/asset-condition.repository';

import type { AssetConditionFormData } from '../schemas/asset-condition.schema';

export async function createAssetCondition(
  userId: string,
  data: AssetConditionFormData,
) {
  await requirePermission({
    userId,
    permissionCode: 'ASSET_CONDITION:CREATE',
  });

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
  userId: string,
  id: string,
  data: AssetConditionFormData,
) {
  await requirePermission({
    userId,
    permissionCode: 'ASSET_CONDITION:UPDATE',
  });

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

export async function deactivateAssetCondition(userId: string, id: string) {
  await requirePermission({
    userId,
    permissionCode: 'ASSET_CONDITION:DEACTIVATE',
  });

  const assetCondition = await findAssetConditionById(id);

  if (!assetCondition) {
    throw new AppError(
      'Asset Condition not found',
      'ASSET_CONDITION_NOT_FOUND',
    );
  }

  return deactivateAssetConditionRecord(id);
}
