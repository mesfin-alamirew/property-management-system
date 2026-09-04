import { prisma } from '@/lib/prisma';

export async function getMaintenanceDetail(id: string) {
  const maintenance = await prisma.maintenance.findUnique({
    where: { id },
    select: {
      id: true,
      referenceNumber: true,
      type: true,
      status: true,
      title: true,
      description: true,
      requestedAt: true,
      scheduledAt: true,
      startedAt: true,
      completedAt: true,
      notes: true,
      approvedAt: true,
      createdAt: true,
      updatedAt: true,

      asset: {
        select: {
          id: true,
          assetCode: true,
          assetTag: true,
          name: true,
        },
      },

      requestedByUser: {
        select: {
          id: true,
          displayName: true,
        },
      },

      assignedToUser: {
        select: {
          id: true,
          displayName: true,
        },
      },

      approvedByUser: {
        select: {
          id: true,
          displayName: true,
        },
      },

      services: {
        orderBy: {
          serviceDate: 'desc',
        },
        select: {
          id: true,
          serviceDate: true,
          description: true,
          serviceProvider: true,
          quantity: true,
          unitCost: true,
          totalCost: true,
          notes: true,
        },
      },
    },
  });

  if (!maintenance) {
    return null;
  }

  return {
    id: maintenance.id,
    referenceNumber: maintenance.referenceNumber,
    asset: maintenance.asset,
    type: maintenance.type.toString(),
    status: maintenance.status.toString(),
    title: maintenance.title,
    description: maintenance.description,
    requestedAt: maintenance.requestedAt,
    scheduledAt: maintenance.scheduledAt,
    startedAt: maintenance.startedAt,
    completedAt: maintenance.completedAt,
    requestedByUser: maintenance.requestedByUser,
    assignedToUser: maintenance.assignedToUser,
    approvedByUser: maintenance.approvedByUser,
    approvedAt: maintenance.approvedAt,
    notes: maintenance.notes,
    services: maintenance.services.map((service) => ({
      id: service.id,
      serviceDate: service.serviceDate,
      description: service.description,
      serviceProvider: service.serviceProvider,
      quantity: service.quantity?.toString() ?? null,
      unitCost: service.unitCost?.toString() ?? null,
      totalCost: service.totalCost?.toString() ?? null,
      notes: service.notes,
    })),
    createdAt: maintenance.createdAt,
    updatedAt: maintenance.updatedAt,
  };
}
