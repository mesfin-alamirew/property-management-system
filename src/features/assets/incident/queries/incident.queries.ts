import { requirePermission } from '@/lib/authorization/authorization.service';

import {
  findIncidents,
  findIncidentById,
  findIncidentByReferenceNumber,
  findAssets,
  findActiveUsers,
} from '../repositories/incident.repository';

export async function getIncidents(userId: string) {
  await requirePermission({
    userId,
    permissionCode: 'INCIDENT:READ',
  });

  return findIncidents();
}

export async function getIncidentById(userId: string, id: string) {
  await requirePermission({
    userId,
    permissionCode: 'INCIDENT:READ',
  });

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
