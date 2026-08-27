import {
  findMaintenances,
  findMaintenanceById,
  findMaintenanceByReferenceNumber,
  findAssets,
  findActiveUsers,
} from '../repositories/maintenance.repository';

export async function getMaintenances() {
  return findMaintenances();
}

export async function getMaintenanceById(id: string) {
  return findMaintenanceById(id);
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
