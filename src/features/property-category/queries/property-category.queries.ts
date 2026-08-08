import {
  findPropertyCategories,
  findPropertyCategoryById,
  findPropertyCategoryParents,
} from '../repositories/property-category.repository';

export async function getPropertyCategories() {
  return findPropertyCategories();
}

export async function getPropertyCategoryById(id: string) {
  return findPropertyCategoryById(id);
}

export async function getPropertyCategoryParents() {
  return findPropertyCategoryParents();
}
