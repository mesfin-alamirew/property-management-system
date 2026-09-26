import { AccessDenied } from '@/components/ui/access-denied';
import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { AppError } from '@/lib/errors';

import {
  getPropertyCategories,
  getPropertyCategoryParents,
} from '../queries/property-category.queries';

import { PropertyCategoryWorkspace } from './property-category-workspace';

export async function PropertyCategoryPage() {
  const user = await requireCurrentUser();

  let propertyCategories;
  let parentCategories;

  try {
    [propertyCategories, parentCategories] = await Promise.all([
      getPropertyCategories(user.id),
      getPropertyCategoryParents(user.id),
    ]);
  } catch (error) {
    if (error instanceof AppError && error.code === 'PERMISSION_DENIED') {
      return <AccessDenied />;
    }

    throw error;
  }

  return (
    <PropertyCategoryWorkspace
      propertyCategories={propertyCategories}
      parentCategories={parentCategories}
    />
  );
}
