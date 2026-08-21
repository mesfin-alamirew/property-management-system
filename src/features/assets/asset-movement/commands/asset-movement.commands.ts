import { AppError } from '@/lib/errors';
import { prisma } from '@/lib/prisma';

import { createAssetMovementRecord } from '../repositories/asset-movement.repository';

import { findAssetById } from '@/features/assets/asset/repositories/asset.repository';

import { findAssetLocationById } from '@/features/assets/asset-location/repositories/asset-location.repository';

import type { AssetMovementFormData } from '../schemas/asset-movement.schema';

export async function createAssetMovement(
  userId: string,
  data: AssetMovementFormData,
) {
  const asset = await findAssetById(data.assetId);

  if (!asset) {
    throw new AppError('Asset not found', 'ASSET_NOT_FOUND');
  }

  const toLocation = await findAssetLocationById(data.toLocationId);

  if (!toLocation) {
    throw new AppError(
      'Destination Asset Location not found',
      'ASSET_LOCATION_NOT_FOUND',
    );
  }

  if (!toLocation.isActive) {
    throw new AppError(
      'Destination Asset Location is inactive',
      'ASSET_LOCATION_INACTIVE',
    );
  }

  if (asset.locationId === data.toLocationId) {
    throw new AppError(
      'Asset is already at the selected location',
      'SAME_ASSET_LOCATION',
    );
  }

  return prisma.$transaction(async (tx) => {
    const movement = await createAssetMovementRecord(
      tx,
      userId,
      asset.locationId,
      data,
    );

    await tx.asset.update({
      where: {
        id: asset.id,
      },

      data: {
        locationId: data.toLocationId,
      },
    });

    return movement;
  });
}
