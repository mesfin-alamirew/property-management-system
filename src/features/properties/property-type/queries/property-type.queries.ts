import {
  findPropertyTypes,
  findPropertyTypeById,
} from '../repositories/property-type.repository';

export async function getPropertyTypes() {
  return findPropertyTypes();
}

export async function getPropertyTypeById(id: string) {
  return findPropertyTypeById(id);
}
