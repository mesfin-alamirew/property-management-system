import { AppError } from '@/lib/errors';
import { prisma } from '@/lib/prisma';

import {
  findAcquisitionById,
  findAssetById,
  findAcquisitionItemByAssetId,
  findAcquisitionItemById,
  createAcquisitionItemRecord,
  updateAcquisitionItemRecord,
} from '../repositories/acquisition-item.repository';

import type { AcquisitionItemFormData } from '../schemas/acquisition-item.schema';

export async function createAcquisitionItem(data: AcquisitionItemFormData) {
  const acquisition = await findAcquisitionById(data.acquisitionId);

  if (!acquisition) {
    throw new AppError('Acquisition not found', 'ACQUISITION_NOT_FOUND');
  }

  const asset = await findAssetById(data.assetId);

  if (!asset) {
    throw new AppError('Asset not found', 'ASSET_NOT_FOUND');
  }

  const existingItem = await findAcquisitionItemByAssetId(data.assetId);

  if (existingItem) {
    throw new AppError(
      'Asset has already been included in an acquisition',
      'ASSET_ALREADY_ACQUIRED',
    );
  }

  return prisma.$transaction(async (tx) => {
    return createAcquisitionItemRecord(tx, data);
  });
}

export async function updateAcquisitionItem(
  id: string,
  data: AcquisitionItemFormData,
) {
  const acquisitionItem = await findAcquisitionItemById(id);

  if (!acquisitionItem) {
    throw new AppError(
      'Acquisition item not found',
      'ACQUISITION_ITEM_NOT_FOUND',
    );
  }

  const acquisition = await findAcquisitionById(data.acquisitionId);

  if (!acquisition) {
    throw new AppError('Acquisition not found', 'ACQUISITION_NOT_FOUND');
  }

  const asset = await findAssetById(data.assetId);

  if (!asset) {
    throw new AppError('Asset not found', 'ASSET_NOT_FOUND');
  }

  const existingItem = await findAcquisitionItemByAssetId(data.assetId);

  if (existingItem && existingItem.id !== id) {
    throw new AppError(
      'Asset has already been included in an acquisition',
      'ASSET_ALREADY_ACQUIRED',
    );
  }

  return updateAcquisitionItemRecord(id, data);
}
