import {
  findIncidentResolutions,
  findIncidentResolutionById,
  findIncidentResolutionByIncidentId,
} from '../repositories/incident-resolution.repository';

export async function getIncidentResolutions() {
  return findIncidentResolutions();
}

export async function getIncidentResolutionById(id: string) {
  return findIncidentResolutionById(id);
}

export async function getIncidentResolutionByIncidentId(incidentId: string) {
  return findIncidentResolutionByIncidentId(incidentId);
}
