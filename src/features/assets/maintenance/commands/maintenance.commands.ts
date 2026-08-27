import { AppError } from '@/lib/errors';
import { prisma } from '@/lib/prisma';

import {
  findMaintenanceById,
  findAssetById,
  findUserById,
  createMaintenanceRecord,
  updateMaintenanceRecord,
  requestMaintenanceRecord,
  approveMaintenanceRecord,
  startMaintenanceRecord,
  completeMaintenanceRecord,
} from '../repositories/maintenance.repository';

import type { MaintenanceFormData } from '../schemas/maintenance.schema';

import { generateNextMaintenanceReferenceNumber } from '../services/maintenance-reference-number.service';

export async function createMaintenance(
  userId: string,
  data: MaintenanceFormData,
) {
  const user = await findUserById(userId);

  if (!user) {
    throw new AppError('User not found', 'USER_NOT_FOUND');
  }

  if (!user.isActive) {
    throw new AppError('User is inactive', 'USER_INACTIVE');
  }

  const asset = await findAssetById(data.assetId);

  if (!asset) {
    throw new AppError('Asset not found', 'ASSET_NOT_FOUND');
  }

  if (data.assignedToUserId) {
    const assignedUser = await findUserById(data.assignedToUserId);

    if (!assignedUser) {
      throw new AppError('Assigned user not found', 'ASSIGNED_USER_NOT_FOUND');
    }

    if (!assignedUser.isActive) {
      throw new AppError('Assigned user is inactive', 'ASSIGNED_USER_INACTIVE');
    }
  }

  return prisma.$transaction(async (tx) => {
    const referenceNumber = await generateNextMaintenanceReferenceNumber(tx);

    return createMaintenanceRecord(tx, referenceNumber, userId, data);
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
    const assignedUser = await findUserById(data.assignedToUserId);

    if (!assignedUser) {
      throw new AppError('Assigned user not found', 'ASSIGNED_USER_NOT_FOUND');
    }

    if (!assignedUser.isActive) {
      throw new AppError('Assigned user is inactive', 'ASSIGNED_USER_INACTIVE');
    }
  }

  return updateMaintenanceRecord(id, data);
}

export async function requestMaintenance(
  userId: string,
  maintenanceId: string,
) {
  const maintenance = await findMaintenanceById(maintenanceId);

  if (!maintenance) {
    throw new AppError('Maintenance not found', 'MAINTENANCE_NOT_FOUND');
  }

  if (maintenance.status !== 'DRAFT') {
    throw new AppError(
      'Only draft maintenance records can be requested',
      'MAINTENANCE_INVALID_STATUS',
    );
  }

  const user = await findUserById(userId);

  if (!user) {
    throw new AppError('Requesting user not found', 'USER_NOT_FOUND');
  }

  if (!user.isActive) {
    throw new AppError('Requesting user is inactive', 'USER_INACTIVE');
  }

  return requestMaintenanceRecord(maintenanceId);
}
export async function approveMaintenance(
  userId: string,
  maintenanceId: string,
) {
  const maintenance = await findMaintenanceById(maintenanceId);

  if (!maintenance) {
    throw new AppError('Maintenance not found', 'MAINTENANCE_NOT_FOUND');
  }

  if (maintenance.status !== 'REQUESTED') {
    throw new AppError(
      'Only requested maintenance records can be approved',
      'MAINTENANCE_INVALID_STATUS',
    );
  }

  const user = await findUserById(userId);

  if (!user) {
    throw new AppError('Approving user not found', 'USER_NOT_FOUND');
  }

  if (!user.isActive) {
    throw new AppError('Approving user is inactive', 'USER_INACTIVE');
  }

  return approveMaintenanceRecord(maintenanceId, userId);
}
export async function startMaintenance(userId: string, maintenanceId: string) {
  const maintenance = await findMaintenanceById(maintenanceId);

  if (!maintenance) {
    throw new AppError('Maintenance not found', 'MAINTENANCE_NOT_FOUND');
  }

  if (maintenance.status !== 'APPROVED') {
    throw new AppError(
      'Only approved maintenance records can be started',
      'MAINTENANCE_INVALID_STATUS',
    );
  }

  const user = await findUserById(userId);

  if (!user) {
    throw new AppError('Starting user not found', 'USER_NOT_FOUND');
  }

  if (!user.isActive) {
    throw new AppError('Starting user is inactive', 'USER_INACTIVE');
  }

  return startMaintenanceRecord(maintenanceId);
}
export async function completeMaintenance(
  userId: string,
  maintenanceId: string,
) {
  const maintenance = await findMaintenanceById(maintenanceId);

  if (!maintenance) {
    throw new AppError('Maintenance not found', 'MAINTENANCE_NOT_FOUND');
  }

  if (maintenance.status !== 'IN_PROGRESS') {
    throw new AppError(
      'Only in-progress maintenance records can be completed',
      'MAINTENANCE_INVALID_STATUS',
    );
  }

  const user = await findUserById(userId);

  if (!user) {
    throw new AppError('Completing user not found', 'USER_NOT_FOUND');
  }

  if (!user.isActive) {
    throw new AppError('Completing user is inactive', 'USER_INACTIVE');
  }

  return completeMaintenanceRecord(maintenanceId);
}
