import {
  findMaintenanceServices,
  findMaintenanceServiceById,
  findMaintenanceServicesByMaintenanceId,
} from '../repositories/maintenance-service.repository';

import { findMaintenancesForService } from '../repositories/maintenance.repository';

function serializeMaintenanceService<
  T extends {
    quantity: { toNumber(): number } | null;
    unitCost: { toNumber(): number } | null;
    totalCost: { toNumber(): number } | null;
  },
>(service: T) {
  const { quantity, unitCost, totalCost, ...rest } = service;

  return {
    ...rest,
    quantity: quantity?.toNumber() ?? null,
    unitCost: unitCost?.toNumber() ?? null,
    totalCost: totalCost?.toNumber() ?? null,
  };
}

export async function getMaintenanceServices() {
  const services = await findMaintenanceServices();

  return services.map((service) => serializeMaintenanceService(service));
}

export async function getMaintenanceServiceById(id: string) {
  const service = await findMaintenanceServiceById(id);

  return service ? serializeMaintenanceService(service) : null;
}

export async function getMaintenanceServicesByMaintenanceId(
  maintenanceId: string,
) {
  const services = await findMaintenanceServicesByMaintenanceId(maintenanceId);

  return services.map((service) => serializeMaintenanceService(service));
}

export async function getMaintenancesForService() {
  return findMaintenancesForService();
}
