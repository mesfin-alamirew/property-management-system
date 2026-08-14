import { getAssetConditions } from '../queries/asset-condition.queries';
import { AssetConditionWorkspace } from './asset-condition-workspace';

export async function AssetConditionPage() {
  const assetConditions = await getAssetConditions();

  return <AssetConditionWorkspace assetConditions={assetConditions} />;
}
