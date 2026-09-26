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
import { requirePermission } from '@/lib/authorization/authorization.service';
import { recordAuditEvent } from '@/lib/audit/audit.service';
export async function createDisposalItem(
  userId: string,
  data: DisposalItemFormData,
) {
  await requirePermission({
    userId,
    permissionCode: 'DISPOSAL_ITEM:CREATE',
  });

  const disposal = await findDisposalById(data.disposalId);

  if (!disposal) {
    throw new AppError('Disposal not found', 'DISPOSAL_NOT_FOUND');
  }

  if (disposal.status !== 'DRAFT') {
    throw new AppError(
      'Items can only be added to draft disposals',
      'INVALID_DISPOSAL_STATUS',
    );
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
    const disposalItem = await createDisposalItemRecord(tx, data);

    await recordAuditEvent(tx, {
      userId,
      action: 'DISPOSAL_ITEM_CREATED',
      entityType: 'DISPOSAL_ITEM',
      entityId: disposalItem.id,
      description: `Disposal item created for asset ${data.assetId}`,
      newValue: {
        disposalId: data.disposalId,
        assetId: data.assetId,
      },
    });

    return disposalItem;
  });
}

export async function updateDisposalItem(
  userId: string,
  id: string,
  data: DisposalItemFormData,
) {
  await requirePermission({
    userId,
    permissionCode: 'DISPOSAL_ITEM:UPDATE',
  });

  const disposalItem = await findDisposalItemById(id);

  if (!disposalItem) {
    throw new AppError('Disposal item not found', 'DISPOSAL_ITEM_NOT_FOUND');
  }

  const disposal = await findDisposalById(disposalItem.disposalId);

  if (!disposal) {
    throw new AppError('Disposal not found', 'DISPOSAL_NOT_FOUND');
  }

  if (disposal.status !== 'DRAFT') {
    throw new AppError(
      'Items can only be updated in draft disposals',
      'INVALID_DISPOSAL_STATUS',
    );
  }

  if (data.disposalId !== disposalItem.disposalId) {
    const targetDisposal = await findDisposalById(data.disposalId);

    if (!targetDisposal) {
      throw new AppError('Disposal not found', 'DISPOSAL_NOT_FOUND');
    }

    if (targetDisposal.status !== 'DRAFT') {
      throw new AppError(
        'Items can only be moved to draft disposals',
        'INVALID_DISPOSAL_STATUS',
      );
    }
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

  return prisma.$transaction(async (tx) => {
    const updatedDisposalItem = await updateDisposalItemRecord(tx, id, data);

    await recordAuditEvent(tx, {
      userId,
      action: 'DISPOSAL_ITEM_UPDATED',
      entityType: 'DISPOSAL_ITEM',
      entityId: updatedDisposalItem.id,
      description: `Disposal item updated for asset ${data.assetId}`,
      oldValue: {
        disposalId: disposalItem.disposalId,
        assetId: disposalItem.assetId,
      },
      newValue: {
        disposalId: data.disposalId,
        assetId: data.assetId,
      },
    });

    return updatedDisposalItem;
  });
}
