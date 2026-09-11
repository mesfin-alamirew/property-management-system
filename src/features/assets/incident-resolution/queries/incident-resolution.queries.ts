import { requirePermission } from '@/lib/authorization/authorization.service';

import {
  findIncidentResolutions,
  findIncidentResolutionById,
  findIncidentResolutionByIncidentId,
} from '../repositories/incident-resolution.repository';

export async function getIncidentResolutions(userId: string) {
  await requirePermission({
    userId,
    permissionCode: 'INCIDENT:READ',
  });

  return findIncidentResolutions();
}

export async function getIncidentResolutionById(userId: string, id: string) {
  await requirePermission({
    userId,
    permissionCode: 'INCIDENT:READ',
  });

  return findIncidentResolutionById(id);
}

export async function getIncidentResolutionByIncidentId(
  userId: string,
  incidentId: string,
) {
  await requirePermission({
    userId,
    permissionCode: 'INCIDENT:READ',
  });

  return findIncidentResolutionByIncidentId(incidentId);
}
