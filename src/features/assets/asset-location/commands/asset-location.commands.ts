import { requirePermission } from '@/lib/authorization/authorization.service';
import { AppError } from '@/lib/errors';

import {
  findAssetLocationByCode,
  findAssetLocationByName,
  findAssetLocationById,
  createAssetLocationRecord,
  updateAssetLocationRecord,
  deactivateAssetLocationRecord,
} from '../repositories/asset-location.repository';

import type { AssetLocationFormData } from '../schemas/asset-location.schema';
import { AUDIT_ACTIONS, AUDIT_ENTITY_TYPES } from '@/lib/audit/audit.types';
import { recordAuditEvent } from '@/lib/audit/audit.service';
import { prisma } from '@/lib/prisma';
export async function createAssetLocation(
  userId: string,
  data: AssetLocationFormData,
) {
  await requirePermission({
    userId,
    permissionCode: 'ASSET_LOCATION:CREATE',
  });

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

  const existingAssetLocationName = await findAssetLocationByName(data.name);

  if (existingAssetLocationName) {
    if (!existingAssetLocationName.isActive) {
      throw new AppError(
        'Asset location name already exists on an inactive Asset Location',
        'NAME_EXISTS_ON_INACTIVE_RECORD',
      );
    }

    throw new AppError('Asset location name already exists', 'DUPLICATE_NAME');
  }

  return prisma.$transaction(async (tx) => {
    const assetLocation = await createAssetLocationRecord(tx, data);

    await recordAuditEvent(tx, {
      userId,
      action: AUDIT_ACTIONS.ASSET_LOCATION_CREATED,
      entityType: AUDIT_ENTITY_TYPES.ASSET_LOCATION,
      entityId: assetLocation.id,
      description: `Asset Location ${assetLocation.code} created`,
      newValue: {
        code: assetLocation.code,
        name: assetLocation.name,
        description: assetLocation.description,
        organizationUnitId: assetLocation.organizationUnitId,
        isActive: assetLocation.isActive,
      },
    });

    return assetLocation;
  });
}

export async function updateAssetLocation(
  userId: string,
  id: string,
  data: AssetLocationFormData,
) {
  await requirePermission({
    userId,
    permissionCode: 'ASSET_LOCATION:UPDATE',
  });

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

  const existingAssetLocationName = await findAssetLocationByName(
    data.name,
    id,
  );

  if (existingAssetLocationName) {
    if (!existingAssetLocationName.isActive) {
      throw new AppError(
        'Asset location name already exists on an inactive Asset Location',
        'NAME_EXISTS_ON_INACTIVE_RECORD',
      );
    }

    throw new AppError('Asset location name already exists', 'DUPLICATE_NAME');
  }

  return prisma.$transaction(async (tx) => {
    const updatedAssetLocation = await updateAssetLocationRecord(tx, id, data);

    await recordAuditEvent(tx, {
      userId,
      action: AUDIT_ACTIONS.ASSET_LOCATION_UPDATED,
      entityType: AUDIT_ENTITY_TYPES.ASSET_LOCATION,
      entityId: updatedAssetLocation.id,
      description: `Asset Location ${updatedAssetLocation.code} updated`,
      oldValue: {
        code: assetLocation.code,
        name: assetLocation.name,
        description: assetLocation.description,
        organizationUnitId: assetLocation.organizationUnitId,
        isActive: assetLocation.isActive,
      },
      newValue: {
        code: updatedAssetLocation.code,
        name: updatedAssetLocation.name,
        description: updatedAssetLocation.description,
        organizationUnitId: updatedAssetLocation.organizationUnitId,
        isActive: updatedAssetLocation.isActive,
      },
    });

    return updatedAssetLocation;
  });
}

export async function deactivateAssetLocation(userId: string, id: string) {
  await requirePermission({
    userId,
    permissionCode: 'ASSET_LOCATION:DEACTIVATE',
  });

  const assetLocation = await findAssetLocationById(id);

  if (!assetLocation) {
    throw new AppError('Asset Location not found', 'ASSET_LOCATION_NOT_FOUND');
  }

  return prisma.$transaction(async (tx) => {
    const deactivatedAssetLocation = await deactivateAssetLocationRecord(
      tx,
      id,
    );

    await recordAuditEvent(tx, {
      userId,
      action: AUDIT_ACTIONS.ASSET_LOCATION_DEACTIVATED,
      entityType: AUDIT_ENTITY_TYPES.ASSET_LOCATION,
      entityId: deactivatedAssetLocation.id,
      description: `Asset Location ${deactivatedAssetLocation.code} deactivated`,
      oldValue: {
        code: assetLocation.code,
        name: assetLocation.name,
        description: assetLocation.description,
        organizationUnitId: assetLocation.organizationUnitId,
        isActive: assetLocation.isActive,
      },
      newValue: {
        code: deactivatedAssetLocation.code,
        name: deactivatedAssetLocation.name,
        description: deactivatedAssetLocation.description,
        organizationUnitId: deactivatedAssetLocation.organizationUnitId,
        isActive: deactivatedAssetLocation.isActive,
      },
    });

    return deactivatedAssetLocation;
  });
}
