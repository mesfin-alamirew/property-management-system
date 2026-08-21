import {
  getAssetMovements,
  getAvailableAssets,
} from '../queries/asset-movement.queries';

import { getAssetLocations } from '@/features/assets/asset-location/queries/asset-location.queries';

import { AssetMovementWorkspace } from './asset-movement-workspace';

export async function AssetMovementPage() {
  const [assetMovements, assets, locations] = await Promise.all([
    getAssetMovements(),
    getAvailableAssets(),
    getAssetLocations(),
  ]);

  return (
    <AssetMovementWorkspace
      assetMovements={assetMovements}
      assets={assets}
      locations={locations}
    />
  );
}
