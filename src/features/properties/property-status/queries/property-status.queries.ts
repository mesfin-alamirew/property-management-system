import {
  findPropertyStatuses,
  findPropertyStatusById,
} from '../repositories/property-status.repository';

export async function getPropertyStatuses() {
  return findPropertyStatuses();
}

export async function getPropertyStatusById(id: string) {
  return findPropertyStatusById(id);
}
