import { getAssetCategories } from '../queries/asset-category.queries';
import { AssetCategoryWorkspace } from './asset-category-workspace';

export async function AssetCategoryPage() {
  const assetCategories = await getAssetCategories();

  return (
    <AssetCategoryWorkspace
      assetCategories={assetCategories}
      parentCategories={assetCategories}
    />
  );
}
