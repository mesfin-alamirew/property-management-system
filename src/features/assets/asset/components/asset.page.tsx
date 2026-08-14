import {
  getAssets,
  getActiveAssetTypes,
  getActiveAssetStatuses,
  getActiveAssetConditions,
} from '../queries/asset.queries';

import { AssetWorkspace } from './asset-workspace';

export async function AssetPage() {
  const [assets, assetTypes, assetStatuses, assetConditions] =
    await Promise.all([
      getAssets(),
      getActiveAssetTypes(),
      getActiveAssetStatuses(),
      getActiveAssetConditions(),
    ]);

  return (
    <AssetWorkspace
      assets={assets}
      assetTypes={assetTypes}
      assetStatuses={assetStatuses}
      assetConditions={assetConditions}
    />
  );
}
