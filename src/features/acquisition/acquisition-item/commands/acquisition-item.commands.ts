import { requirePermission } from '@/lib/authorization/authorization.service';
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
import { AUDIT_ACTIONS, AUDIT_ENTITY_TYPES } from '@/lib/audit/audit.types';
import { recordAuditEvent } from '@/lib/audit/audit.service';
export async function createAcquisitionItem(
  userId: string,
  data: AcquisitionItemFormData,
) {
  await requirePermission({
    userId,
    permissionCode: 'ACQUISITION_ITEM:CREATE',
  });

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
    const acquisitionItem = await createAcquisitionItemRecord(tx, data);

    await recordAuditEvent(tx, {
      userId,
      action: AUDIT_ACTIONS.ACQUISITION_ITEM_CREATED,
      entityType: AUDIT_ENTITY_TYPES.ACQUISITION_ITEM,
      entityId: acquisitionItem.id,
      description: `Acquisition Item created for asset ${acquisitionItem.assetId}`,
      newValue: {
        acquisitionId: acquisitionItem.acquisitionId,
        assetId: acquisitionItem.assetId,
        unitCost: acquisitionItem.unitCost?.toString() ?? null,
        totalCost: acquisitionItem.totalCost?.toString() ?? null,
      },
    });

    return acquisitionItem;
  });
}

export async function updateAcquisitionItem(
  userId: string,
  id: string,
  data: AcquisitionItemFormData,
) {
  await requirePermission({
    userId,
    permissionCode: 'ACQUISITION_ITEM:UPDATE',
  });

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

  return prisma.$transaction(async (tx) => {
    const updatedAcquisitionItem = await updateAcquisitionItemRecord(
      tx,
      id,
      data,
    );

    await recordAuditEvent(tx, {
      userId,
      action: AUDIT_ACTIONS.ACQUISITION_ITEM_UPDATED,
      entityType: AUDIT_ENTITY_TYPES.ACQUISITION_ITEM,
      entityId: updatedAcquisitionItem.id,
      description: `Acquisition Item updated for asset ${updatedAcquisitionItem.assetId}`,
      oldValue: {
        acquisitionId: acquisitionItem.acquisitionId,
        assetId: acquisitionItem.assetId,
        unitCost: acquisitionItem.unitCost?.toString() ?? null,
        totalCost: acquisitionItem.totalCost?.toString() ?? null,
      },
      newValue: {
        acquisitionId: updatedAcquisitionItem.acquisitionId,
        assetId: updatedAcquisitionItem.assetId,
        unitCost: updatedAcquisitionItem.unitCost?.toString() ?? null,
        totalCost: updatedAcquisitionItem.totalCost?.toString() ?? null,
      },
    });

    return updatedAcquisitionItem;
  });
}
