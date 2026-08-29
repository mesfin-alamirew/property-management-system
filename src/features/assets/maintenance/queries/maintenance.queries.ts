import {
  findMaintenances,
  findMaintenanceById,
  findMaintenanceByReferenceNumber,
  findAssets,
  findActiveUsers,
} from '../repositories/maintenance.repository';

function serializeMaintenanceServices<
  T extends {
    services: Array<{
      quantity: {
        toNumber(): number;
      } | null;

      unitCost: {
        toNumber(): number;
      } | null;

      totalCost: {
        toNumber(): number;
      } | null;
    }>;
  },
>(maintenance: T) {
  return {
    ...maintenance,

    services: maintenance.services.map((service) => ({
      ...service,
      quantity: service.quantity?.toNumber() ?? null,
      unitCost: service.unitCost?.toNumber() ?? null,
      totalCost: service.totalCost?.toNumber() ?? null,
    })),
  };
}

export async function getMaintenances() {
  const maintenances = await findMaintenances();

  return maintenances.map(serializeMaintenanceServices);
}

export async function getMaintenanceById(id: string) {
  const maintenance = await findMaintenanceById(id);

  return maintenance ? serializeMaintenanceServices(maintenance) : null;
}

export async function getMaintenanceByReferenceNumber(referenceNumber: string) {
  return findMaintenanceByReferenceNumber(referenceNumber);
}

export async function getAssets() {
  return findAssets();
}

export async function getActiveUsers() {
  return findActiveUsers();
}
