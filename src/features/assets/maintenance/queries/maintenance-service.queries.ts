import {
  findMaintenanceServices,
  findMaintenanceServiceById,
  findMaintenanceServicesByMaintenanceId,
} from '../repositories/maintenance-service.repository';

export async function getMaintenanceServices() {
  return findMaintenanceServices();
}

export async function getMaintenanceServiceById(id: string) {
  return findMaintenanceServiceById(id);
}

export async function getMaintenanceServicesByMaintenanceId(
  maintenanceId: string,
) {
  return findMaintenanceServicesByMaintenanceId(maintenanceId);
}
