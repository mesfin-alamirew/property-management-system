import {
  getAssets,
  getActiveAssetTypes,
  getActiveAssetStatuses,
  getActiveAssetConditions,
} from '../queries/asset.queries';

import { AssetWorkspace } from './asset-workspace';

import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { AppError } from '@/lib/errors';
import { AccessDenied } from '@/components/ui/access-denied';

export async function AssetPage() {
  const user = await requireCurrentUser();

  let data;

  try {
    data = await Promise.all([
      getAssets(user.id),
      getActiveAssetTypes(),
      getActiveAssetStatuses(),
      getActiveAssetConditions(),
    ]);
  } catch (error) {
    if (error instanceof AppError && error.code === 'PERMISSION_DENIED') {
      return <AccessDenied />;
    }

    throw error;
  }

  const [assets, assetTypes, assetStatuses, assetConditions] = data;

  return (
    <AssetWorkspace
      assets={assets}
      assetTypes={assetTypes}
      assetStatuses={assetStatuses}
      assetConditions={assetConditions}
    />
  );
}
