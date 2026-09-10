import { getAssetCategories } from '../queries/asset-category.queries';
import { AssetCategoryWorkspace } from './asset-category-workspace';

import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { AppError } from '@/lib/errors';
import { AccessDenied } from '@/components/ui/access-denied';

export async function AssetCategoryPage() {
  const user = await requireCurrentUser();

  let assetCategories;

  try {
    assetCategories = await getAssetCategories(user.id);
  } catch (error) {
    if (error instanceof AppError && error.code === 'PERMISSION_DENIED') {
      return <AccessDenied />;
    }

    throw error;
  }

  return (
    <AssetCategoryWorkspace
      assetCategories={assetCategories}
      parentCategories={assetCategories}
    />
  );
}
