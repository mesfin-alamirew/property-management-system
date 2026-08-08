import { PropertyCategoryWorkspace } from './property-category-workspace';

import {
  getPropertyCategories,
  getPropertyCategoryParents,
} from '../queries/property-category.queries';

export async function PropertyCategoryPage() {
  const [propertyCategories, parentCategories] = await Promise.all([
    getPropertyCategories(),
    getPropertyCategoryParents(),
  ]);

  return (
    <PropertyCategoryWorkspace
      propertyCategories={propertyCategories}
      parentCategories={parentCategories}
    />
  );
}
