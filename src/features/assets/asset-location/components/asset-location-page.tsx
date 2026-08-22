import {
  getAssetLocations,
  getActiveOrganizationUnits,
} from '../queries/asset-location.queries';

import { AssetLocationWorkspace } from './asset-location-workspace';

export async function AssetLocationPage() {
  const [assetLocations, organizationUnits] = await Promise.all([
    getAssetLocations(),
    getActiveOrganizationUnits(),
  ]);

  return (
    <AssetLocationWorkspace
      assetLocations={assetLocations}
      organizationUnits={organizationUnits}
    />
  );
}
