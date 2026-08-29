import { Prisma } from '@/generated/prisma/client';

import { prisma } from '@/lib/prisma';

import type { MaintenanceServiceFormData } from '../schemas/maintenance-service.schema';
import { AUDIT_ACTIONS, AUDIT_ENTITY_TYPES } from '@/lib/audit/audit.types';

import { createAuditLog } from '@/lib/audit/audit.repository';
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
export async function createMaintenanceServiceAudit(
  tx: Prisma.TransactionClient,
  userId: string,
  maintenanceServiceId: string,
  referenceNumber: string,
  service: {
    serviceDate: Date;
    description: string;
    serviceProvider: string | null;
    quantity: Prisma.Decimal | null;
    unitCost: Prisma.Decimal | null;
    totalCost: Prisma.Decimal | null;
    notes: string | null;
  },
) {
  return createAuditLog(tx, {
    userId,
    action: AUDIT_ACTIONS.MAINTENANCE_SERVICE_CREATED,
    entityType: AUDIT_ENTITY_TYPES.MAINTENANCE,
    entityId: maintenanceServiceId,
    description: `Service for maintenance ${referenceNumber} was created.`,

    newValue: {
      serviceDate: service.serviceDate.toISOString(),
      description: service.description,
      serviceProvider: service.serviceProvider,
      quantity: service.quantity?.toString() ?? null,
      unitCost: service.unitCost?.toString() ?? null,
      totalCost: service.totalCost?.toString() ?? null,
      notes: service.notes,
    },
  });
}
export async function updateMaintenanceServiceRecord(
  tx: Prisma.TransactionClient,
  id: string,
  data: MaintenanceServiceFormData,
) {
  return tx.maintenanceService.update({
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

export async function updateMaintenanceServiceAudit(
  tx: Prisma.TransactionClient,
  userId: string,
  maintenanceServiceId: string,
  referenceNumber: string,
  oldValue: {
    serviceDate: Date;
    description: string;
    serviceProvider: string | null;
    quantity: Prisma.Decimal | null;
    unitCost: Prisma.Decimal | null;
    totalCost: Prisma.Decimal | null;
    notes: string | null;
  },
  newValue: {
    serviceDate: Date;
    description: string;
    serviceProvider: string | null;
    quantity: Prisma.Decimal | null;
    unitCost: Prisma.Decimal | null;
    totalCost: Prisma.Decimal | null;
    notes: string | null;
  },
) {
  return createAuditLog(tx, {
    userId,
    action: AUDIT_ACTIONS.MAINTENANCE_SERVICE_UPDATED,
    entityType: AUDIT_ENTITY_TYPES.MAINTENANCE,
    entityId: maintenanceServiceId,
    description: `Service for maintenance ${referenceNumber} was updated.`,

    oldValue: {
      serviceDate: oldValue.serviceDate.toISOString(),
      description: oldValue.description,
      serviceProvider: oldValue.serviceProvider,
      quantity: oldValue.quantity?.toString() ?? null,
      unitCost: oldValue.unitCost?.toString() ?? null,
      totalCost: oldValue.totalCost?.toString() ?? null,
      notes: oldValue.notes,
    },

    newValue: {
      serviceDate: newValue.serviceDate.toISOString(),
      description: newValue.description,
      serviceProvider: newValue.serviceProvider,
      quantity: newValue.quantity?.toString() ?? null,
      unitCost: newValue.unitCost?.toString() ?? null,
      totalCost: newValue.totalCost?.toString() ?? null,
      notes: newValue.notes,
    },
  });
}
export async function deleteMaintenanceServiceRecord(
  tx: Prisma.TransactionClient,
  id: string,
) {
  return tx.maintenanceService.delete({
    where: {
      id,
    },
  });
}
export async function deleteMaintenanceServiceAudit(
  tx: Prisma.TransactionClient,
  userId: string,
  maintenanceServiceId: string,
  referenceNumber: string,
  service: {
    serviceDate: Date;
    description: string;
    serviceProvider: string | null;
    quantity: Prisma.Decimal | null;
    unitCost: Prisma.Decimal | null;
    totalCost: Prisma.Decimal | null;
    notes: string | null;
  },
) {
  return createAuditLog(tx, {
    userId,
    action: AUDIT_ACTIONS.MAINTENANCE_SERVICE_DELETED,
    entityType: AUDIT_ENTITY_TYPES.MAINTENANCE,
    entityId: maintenanceServiceId,
    description: `Service for maintenance ${referenceNumber} was deleted.`,

    oldValue: {
      serviceDate: service.serviceDate.toISOString(),
      description: service.description,
      serviceProvider: service.serviceProvider,
      quantity: service.quantity?.toString() ?? null,
      unitCost: service.unitCost?.toString() ?? null,
      totalCost: service.totalCost?.toString() ?? null,
      notes: service.notes,
    },
  });
}
