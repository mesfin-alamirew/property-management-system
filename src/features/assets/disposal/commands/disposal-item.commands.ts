import { AppError } from '@/lib/errors';
import { prisma } from '@/lib/prisma';

import {
  findDisposalById,
  findAssetById,
  findDisposalItemByAssetId,
  findDisposalItemById,
  createDisposalItemRecord,
  updateDisposalItemRecord,
} from '../repositories/disposal-item.repository';

import type { DisposalItemFormData } from '../schemas/disposal-item.schema';

export async function createDisposalItem(data: DisposalItemFormData) {
  const disposal = await findDisposalById(data.disposalId);

  if (!disposal) {
    throw new AppError('Disposal not found', 'DISPOSAL_NOT_FOUND');
  }

  const asset = await findAssetById(data.assetId);

  if (!asset) {
    throw new AppError('Asset not found', 'ASSET_NOT_FOUND');
  }

  const existingItem = await findDisposalItemByAssetId(data.assetId);

  if (existingItem) {
    throw new AppError(
      'Asset has already been included in a disposal',
      'ASSET_ALREADY_DISPOSED',
    );
  }

  return prisma.$transaction(async (tx) => {
    return createDisposalItemRecord(tx, data);
  });
}

export async function updateDisposalItem(
  id: string,
  data: DisposalItemFormData,
) {
  const disposalItem = await findDisposalItemById(id);

  if (!disposalItem) {
    throw new AppError('Disposal item not found', 'DISPOSAL_ITEM_NOT_FOUND');
  }

  const disposal = await findDisposalById(data.disposalId);

  if (!disposal) {
    throw new AppError('Disposal not found', 'DISPOSAL_NOT_FOUND');
  }

  const asset = await findAssetById(data.assetId);

  if (!asset) {
    throw new AppError('Asset not found', 'ASSET_NOT_FOUND');
  }

  const existingItem = await findDisposalItemByAssetId(data.assetId);

  if (existingItem && existingItem.id !== id) {
    throw new AppError(
      'Asset has already been included in a disposal',
      'ASSET_ALREADY_DISPOSED',
    );
  }

  return updateDisposalItemRecord(id, data);
}
