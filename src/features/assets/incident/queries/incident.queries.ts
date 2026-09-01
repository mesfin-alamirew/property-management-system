import {
  findIncidents,
  findIncidentById,
  findIncidentByReferenceNumber,
  findAssets,
  findActiveUsers,
} from '../repositories/incident.repository';

export async function getIncidents() {
  return findIncidents();
}

export async function getIncidentById(id: string) {
  return findIncidentById(id);
}

export async function getIncidentByReferenceNumber(referenceNumber: string) {
  return findIncidentByReferenceNumber(referenceNumber);
}

export async function getAssets() {
  return findAssets();
}

export async function getActiveUsers() {
  return findActiveUsers();
}
