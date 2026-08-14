import { getAssetStatuses } from '../queries/asset-status.queries';
import { AssetStatusWorkspace } from './asset-status-workspace';

export async function AssetStatusPage() {
  const assetStatuses = await getAssetStatuses();

  return <AssetStatusWorkspace assetStatuses={assetStatuses} />;
}
