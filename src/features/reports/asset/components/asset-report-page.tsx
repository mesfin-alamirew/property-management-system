import { getAssetReport } from '../queries/asset.queries';

import {
  getActiveAssetTypes,
  getActiveAssetStatuses,
  getActiveAssetConditions,
} from '@/features/assets/asset/queries/asset.queries';

import { AssetReportWorkspace } from './asset-report-workspace';

export async function AssetReportPage() {
  const [assets, assetTypes, assetStatuses, assetConditions] =
    await Promise.all([
      getAssetReport(),
      getActiveAssetTypes(),
      getActiveAssetStatuses(),
      getActiveAssetConditions(),
    ]);

  return (
    <AssetReportWorkspace
      assets={assets}
      assetTypes={assetTypes}
      assetStatuses={assetStatuses}
      assetConditions={assetConditions}
    />
  );
}
