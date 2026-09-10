import { getAssetCategories } from '@/features/assets/asset-category/queries/asset-category.queries';

import { getAssetTypes } from '../queries/asset-type.queries';

import { AssetTypeWorkspace } from './asset-type-workspace';

import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { AppError } from '@/lib/errors';
import { AccessDenied } from '@/components/ui/access-denied';

export async function AssetTypePage() {
  const user = await requireCurrentUser();

  let data;

  try {
    data = await Promise.all([
      getAssetTypes(user.id),
      getAssetCategories(user.id),
    ]);
  } catch (error) {
    if (error instanceof AppError && error.code === 'PERMISSION_DENIED') {
      return <AccessDenied />;
    }

    throw error;
  }

  const [assetTypes, assetCategories] = data;

  return (
    <AssetTypeWorkspace
      assetTypes={assetTypes}
      assetCategories={assetCategories}
    />
  );
}
