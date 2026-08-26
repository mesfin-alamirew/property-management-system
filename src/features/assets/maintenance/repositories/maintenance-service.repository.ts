import { Prisma } from '@/generated/prisma/client';

import { prisma } from '@/lib/prisma';

import type { MaintenanceServiceFormData } from '../schemas/maintenance-service.schema';

export async function findMaintenanceServices() {
  return prisma.maintenanceService.findMany({
    orderBy: {
      serviceDate: 'desc',
    },

    include: {
      maintenance: {
        select: {
          id: true,
          referenceNumber: true,
          title: true,
        },
      },
    },
  });
}

export async function findMaintenanceServiceById(id: string) {
  return prisma.maintenanceService.findUnique({
    where: {
      id,
    },

    include: {
      maintenance: {
        select: {
          id: true,
          referenceNumber: true,
          title: true,
        },
      },
    },
  });
}

export async function findMaintenanceServicesByMaintenanceId(
  maintenanceId: string,
) {
  return prisma.maintenanceService.findMany({
    where: {
      maintenanceId,
    },

    orderBy: {
      serviceDate: 'desc',
    },
  });
}

export async function findMaintenanceById(id: string) {
  return prisma.maintenance.findUnique({
    where: {
      id,
    },
  });
}

export async function createMaintenanceServiceRecord(
  tx: Prisma.TransactionClient,
  data: MaintenanceServiceFormData,
) {
  return tx.maintenanceService.create({
    data: {
      maintenanceId: data.maintenanceId,
      serviceDate: data.serviceDate,
      description: data.description,
      serviceProvider: data.serviceProvider,

      quantity: data.quantity ? new Prisma.Decimal(data.quantity) : undefined,

      unitCost: data.unitCost ? new Prisma.Decimal(data.unitCost) : undefined,

      totalCost: data.totalCost
        ? new Prisma.Decimal(data.totalCost)
        : undefined,

      notes: data.notes,
    },
  });
}

export async function updateMaintenanceServiceRecord(
  id: string,
  data: MaintenanceServiceFormData,
) {
  return prisma.maintenanceService.update({
    where: {
      id,
    },

    data: {
      // maintenanceId remains deliberately controlled by
      // the command/business layer.

      maintenanceId: data.maintenanceId,
      serviceDate: data.serviceDate,
      description: data.description,
      serviceProvider: data.serviceProvider,

      quantity: data.quantity ? new Prisma.Decimal(data.quantity) : undefined,

      unitCost: data.unitCost ? new Prisma.Decimal(data.unitCost) : undefined,

      totalCost: data.totalCost
        ? new Prisma.Decimal(data.totalCost)
        : undefined,

      notes: data.notes,
    },
  });
}
