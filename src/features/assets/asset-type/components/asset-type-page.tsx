import { getAssetCategories } from '@/features/assets/asset-category/queries/asset-category.queries';

import { getAssetTypes } from '../queries/asset-type.queries';

import { AssetTypeWorkspace } from './asset-type-workspace';

export async function AssetTypePage() {
  const [assetTypes, assetCategories] = await Promise.all([
    getAssetTypes(),
    getAssetCategories(),
  ]);

  return (
    <AssetTypeWorkspace
      assetTypes={assetTypes}
      assetCategories={assetCategories}
    />
  );
}
