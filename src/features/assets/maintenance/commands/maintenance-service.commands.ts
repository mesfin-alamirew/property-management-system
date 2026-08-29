import { AppError } from '@/lib/errors';
import { prisma } from '@/lib/prisma';

import {
  findMaintenanceById,
  findMaintenanceServiceById,
  createMaintenanceServiceRecord,
  updateMaintenanceServiceRecord,
  createMaintenanceServiceAudit,
  updateMaintenanceServiceAudit,
  deleteMaintenanceServiceRecord,
  deleteMaintenanceServiceAudit,
} from '../repositories/maintenance-service.repository';
import type { MaintenanceServiceFormData } from '../schemas/maintenance-service.schema';
import { findUserById } from '../repositories/maintenance.repository';

export async function createMaintenanceService(
  userId: string,
  data: MaintenanceServiceFormData,
) {
  const user = await findUserById(userId);

  if (!user) {
    throw new AppError('User not found', 'USER_NOT_FOUND');
  }

  if (!user.isActive) {
    throw new AppError('User is inactive', 'USER_INACTIVE');
  }
  const maintenance = await findMaintenanceById(data.maintenanceId);

  if (!maintenance) {
    throw new AppError('Maintenance not found', 'MAINTENANCE_NOT_FOUND');
  }

  if (maintenance.status !== 'IN_PROGRESS') {
    throw new AppError(
      'Services can only be recorded for maintenance that is in progress',
      'MAINTENANCE_NOT_IN_PROGRESS',
    );
  }

  const totalCost =
    data.quantity && data.unitCost
      ? (Number(data.quantity) * Number(data.unitCost)).toFixed(2)
      : undefined;

  const serviceData: MaintenanceServiceFormData = {
    ...data,
    totalCost,
  };

  return prisma.$transaction(async (tx) => {
    const service = await createMaintenanceServiceRecord(tx, serviceData);

    await createMaintenanceServiceAudit(
      tx,
      userId,
      service.id,
      maintenance.referenceNumber,
      service,
    );

    return service;
  });
}

export async function updateMaintenanceService(
  userId: string,
  id: string,
  data: MaintenanceServiceFormData,
) {
  const user = await findUserById(userId);

  if (!user) {
    throw new AppError('User not found', 'USER_NOT_FOUND');
  }

  if (!user.isActive) {
    throw new AppError('User is inactive', 'USER_INACTIVE');
  }
  const maintenanceService = await findMaintenanceServiceById(id);

  if (!maintenanceService) {
    throw new AppError(
      'Maintenance service not found',
      'MAINTENANCE_SERVICE_NOT_FOUND',
    );
  }

  const maintenance = await findMaintenanceById(
    maintenanceService.maintenanceId,
  );

  if (!maintenance) {
    throw new AppError('Maintenance not found', 'MAINTENANCE_NOT_FOUND');
  }

  if (maintenance.status !== 'IN_PROGRESS') {
    throw new AppError(
      'Services can only be edited while maintenance is in progress',
      'MAINTENANCE_NOT_IN_PROGRESS',
    );
  }

  const totalCost =
    data.quantity && data.unitCost
      ? (Number(data.quantity) * Number(data.unitCost)).toFixed(2)
      : undefined;

  const serviceData: MaintenanceServiceFormData = {
    ...data,

    // The existing relationship is authoritative.
    maintenanceId: maintenanceService.maintenanceId,

    totalCost,
  };

  return prisma.$transaction(async (tx) => {
    const updatedService = await updateMaintenanceServiceRecord(
      tx,
      id,
      serviceData,
    );

    await updateMaintenanceServiceAudit(
      tx,
      userId,
      maintenanceService.id,
      maintenance.referenceNumber,
      maintenanceService,
      updatedService,
    );

    return updatedService;
  });
}
export async function deleteMaintenanceService(userId: string, id: string) {
  const user = await findUserById(userId);

  if (!user) {
    throw new AppError('User not found', 'USER_NOT_FOUND');
  }

  if (!user.isActive) {
    throw new AppError('User is inactive', 'USER_INACTIVE');
  }

  const maintenanceService = await findMaintenanceServiceById(id);

  if (!maintenanceService) {
    throw new AppError(
      'Maintenance service not found',
      'MAINTENANCE_SERVICE_NOT_FOUND',
    );
  }

  const maintenance = await findMaintenanceById(
    maintenanceService.maintenanceId,
  );

  if (!maintenance) {
    throw new AppError('Maintenance not found', 'MAINTENANCE_NOT_FOUND');
  }

  if (maintenance.status !== 'IN_PROGRESS') {
    throw new AppError(
      'Services can only be deleted while maintenance is in progress',
      'MAINTENANCE_NOT_IN_PROGRESS',
    );
  }

  return prisma.$transaction(async (tx) => {
    await deleteMaintenanceServiceAudit(
      tx,
      userId,
      maintenanceService.id,
      maintenance.referenceNumber,
      maintenanceService,
    );

    const deletedService = await deleteMaintenanceServiceRecord(tx, id);

    return deletedService;
  });
}
