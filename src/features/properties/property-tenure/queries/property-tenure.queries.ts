import {
  findPropertyTenures,
  findPropertyTenureById,
} from '../repositories/property-tenure.repository';

export async function getPropertyTenures() {
  return findPropertyTenures();
}

export async function getPropertyTenureById(id: string) {
  return findPropertyTenureById(id);
}
