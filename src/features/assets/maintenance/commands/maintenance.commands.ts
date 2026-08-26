import { AppError } from '@/lib/errors';
import { prisma } from '@/lib/prisma';

import {
  findMaintenanceById,
  findAssetById,
  findUserById,
  createMaintenanceRecord,
  updateMaintenanceRecord,
} from '../repositories/maintenance.repository';

import type { MaintenanceFormData } from '../schemas/maintenance.schema';

import { generateNextMaintenanceReferenceNumber } from '../services/maintenance-reference-number.service';

export async function createMaintenance(
  requestedByUserId: string,
  data: MaintenanceFormData,
) {
  const asset = await findAssetById(data.assetId);

  if (!asset) {
    throw new AppError('Asset not found', 'ASSET_NOT_FOUND');
  }

  const requestedByUser = await findUserById(requestedByUserId);

  if (!requestedByUser) {
    throw new AppError('Requesting user not found', 'USER_NOT_FOUND');
  }

  if (!requestedByUser.isActive) {
    throw new AppError('Requesting user is inactive', 'USER_INACTIVE');
  }

  if (data.assignedToUserId) {
    const assignedToUser = await findUserById(data.assignedToUserId);

    if (!assignedToUser) {
      throw new AppError('Assigned user not found', 'ASSIGNED_USER_NOT_FOUND');
    }

    if (!assignedToUser.isActive) {
      throw new AppError('Assigned user is inactive', 'ASSIGNED_USER_INACTIVE');
    }
  }

  return prisma.$transaction(async (tx) => {
    const referenceNumber = await generateNextMaintenanceReferenceNumber(tx);

    return createMaintenanceRecord(
      tx,
      referenceNumber,
      requestedByUserId,
      data,
    );
  });
}

export async function updateMaintenance(id: string, data: MaintenanceFormData) {
  const maintenance = await findMaintenanceById(id);

  if (!maintenance) {
    throw new AppError('Maintenance not found', 'MAINTENANCE_NOT_FOUND');
  }

  if (maintenance.status !== 'DRAFT') {
    throw new AppError(
      'Only draft maintenance records can be edited',
      'MAINTENANCE_NOT_EDITABLE',
    );
  }

  const asset = await findAssetById(data.assetId);

  if (!asset) {
    throw new AppError('Asset not found', 'ASSET_NOT_FOUND');
  }

  if (data.assignedToUserId) {
    const assignedToUser = await findUserById(data.assignedToUserId);

    if (!assignedToUser) {
      throw new AppError('Assigned user not found', 'ASSIGNED_USER_NOT_FOUND');
    }

    if (!assignedToUser.isActive) {
      throw new AppError('Assigned user is inactive', 'ASSIGNED_USER_INACTIVE');
    }
  }

  return updateMaintenanceRecord(id, data);
}
