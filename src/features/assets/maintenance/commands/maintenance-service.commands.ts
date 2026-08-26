import { AppError } from '@/lib/errors';
import { prisma } from '@/lib/prisma';

import {
  findMaintenanceById,
  findMaintenanceServiceById,
  createMaintenanceServiceRecord,
  updateMaintenanceServiceRecord,
} from '../repositories/maintenance-service.repository';

import type { MaintenanceServiceFormData } from '../schemas/maintenance-service.schema';

export async function createMaintenanceService(
  data: MaintenanceServiceFormData,
) {
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

  return prisma.$transaction(async (tx) => {
    return createMaintenanceServiceRecord(tx, data);
  });
}

export async function updateMaintenanceService(
  id: string,
  data: MaintenanceServiceFormData,
) {
  const maintenanceService = await findMaintenanceServiceById(id);

  if (!maintenanceService) {
    throw new AppError(
      'Maintenance service not found',
      'MAINTENANCE_SERVICE_NOT_FOUND',
    );
  }

  const maintenance = await findMaintenanceById(data.maintenanceId);

  if (!maintenance) {
    throw new AppError('Maintenance not found', 'MAINTENANCE_NOT_FOUND');
  }

  if (maintenance.status !== 'IN_PROGRESS') {
    throw new AppError(
      'Services can only be edited while maintenance is in progress',
      'MAINTENANCE_NOT_IN_PROGRESS',
    );
  }

  return updateMaintenanceServiceRecord(id, data);
}
