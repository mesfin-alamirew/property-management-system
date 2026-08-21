import { getAssetLocations } from '../queries/asset-location.queries';

import { AssetLocationWorkspace } from './asset-location-workspace';

export async function AssetLocationPage() {
  const assetLocations = await getAssetLocations();

  return <AssetLocationWorkspace assetLocations={assetLocations} />;
}
