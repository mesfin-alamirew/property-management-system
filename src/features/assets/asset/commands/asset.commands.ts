import { AppError } from '@/lib/errors';
import { prisma } from '@/lib/prisma';

import {
  findAssetByAssetTag,
  findAssetBySerialNumber,
  findAssetTypeById,
  findAssetStatusById,
  findAssetConditionById,
  createAssetRecord,
  findAssetById,
  updateAssetRecord,
} from '../repositories/asset.repository';

import type { AssetFormData } from '../schemas/asset.schema';

import { generateNextAssetCode } from '../services/asset-code.service';

export async function createAsset(data: AssetFormData) {
  const assetType = await findAssetTypeById(data.assetTypeId);

  if (!assetType) {
    throw new AppError('Asset Type not found', 'ASSET_TYPE_NOT_FOUND');
  }

  if (!assetType.isActive) {
    throw new AppError('Asset Type is inactive', 'ASSET_TYPE_INACTIVE');
  }

  const status = await findAssetStatusById(data.statusId);

  if (!status) {
    throw new AppError('Asset Status not found', 'ASSET_STATUS_NOT_FOUND');
  }

  if (!status.isActive) {
    throw new AppError('Asset Status is inactive', 'ASSET_STATUS_INACTIVE');
  }

  const condition = await findAssetConditionById(data.conditionId);

  if (!condition) {
    throw new AppError(
      'Asset Condition not found',
      'ASSET_CONDITION_NOT_FOUND',
    );
  }

  if (!condition.isActive) {
    throw new AppError(
      'Asset Condition is inactive',
      'ASSET_CONDITION_INACTIVE',
    );
  }

  if (data.assetTag) {
    const existingAsset = await findAssetByAssetTag(data.assetTag);

    if (existingAsset) {
      if (existingAsset) {
        throw new AppError('Asset tag already exists', 'DUPLICATE_ASSET_TAG');
      }

      throw new AppError('Asset tag already exists', 'DUPLICATE_ASSET_TAG');
    }
  }

  if (data.serialNumber) {
    const existingAsset = await findAssetBySerialNumber(data.serialNumber);

    if (existingAsset) {
      throw new AppError(
        'Serial number already exists',
        'DUPLICATE_SERIAL_NUMBER',
      );
    }
  }

  return prisma.$transaction(async (tx) => {
    const assetCode = await generateNextAssetCode(tx);

    return createAssetRecord(tx, assetCode, data);
  });
}

export async function updateAsset(id: string, data: AssetFormData) {
  const asset = await findAssetById(id);

  if (!asset) {
    throw new AppError('Asset not found', 'ASSET_NOT_FOUND');
  }

  const assetType = await findAssetTypeById(data.assetTypeId);

  if (!assetType) {
    throw new AppError('Asset Type not found', 'ASSET_TYPE_NOT_FOUND');
  }

  if (!assetType.isActive) {
    throw new AppError('Asset Type is inactive', 'ASSET_TYPE_INACTIVE');
  }

  const status = await findAssetStatusById(data.statusId);

  if (!status) {
    throw new AppError('Asset Status not found', 'ASSET_STATUS_NOT_FOUND');
  }

  if (!status.isActive) {
    throw new AppError('Asset Status is inactive', 'ASSET_STATUS_INACTIVE');
  }

  const condition = await findAssetConditionById(data.conditionId);

  if (!condition) {
    throw new AppError(
      'Asset Condition not found',
      'ASSET_CONDITION_NOT_FOUND',
    );
  }

  if (!condition.isActive) {
    throw new AppError(
      'Asset Condition is inactive',
      'ASSET_CONDITION_INACTIVE',
    );
  }

  if (data.assetTag) {
    const existingAsset = await findAssetByAssetTag(data.assetTag, id);

    if (existingAsset) {
      throw new AppError('Asset tag already exists', 'DUPLICATE_ASSET_TAG');
    }
  }

  if (data.serialNumber) {
    const existingAsset = await findAssetBySerialNumber(data.serialNumber, id);

    if (existingAsset) {
      throw new AppError(
        'Serial number already exists',
        'DUPLICATE_SERIAL_NUMBER',
      );
    }
  }

  return updateAssetRecord(id, data);
}
