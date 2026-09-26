import { requirePermission } from '@/lib/authorization/authorization.service';

import {
  findPropertyCategories,
  findPropertyCategoryById,
  findPropertyCategoryParents,
} from '../repositories/property-category.repository';

export async function getPropertyCategories(userId: string) {
  await requirePermission({
    userId,
    permissionCode: 'PROPERTY_CATEGORY:READ',
  });

  return findPropertyCategories();
}

export async function getPropertyCategoryById(userId: string, id: string) {
  await requirePermission({
    userId,
    permissionCode: 'PROPERTY_CATEGORY:READ',
  });

  return findPropertyCategoryById(id);
}

export async function getPropertyCategoryParents(userId: string) {
  await requirePermission({
    userId,
    permissionCode: 'PROPERTY_CATEGORY:READ',
  });

  return findPropertyCategoryParents();
}
