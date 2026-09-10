import {
  getAssetMovements,
  getAvailableAssets,
} from '../queries/asset-movement.queries';

import { getAssetLocations } from '@/features/assets/asset-location/queries/asset-location.queries';

import { AssetMovementWorkspace } from './asset-movement-workspace';

import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { AppError } from '@/lib/errors';
import { AccessDenied } from '@/components/ui/access-denied';

export async function AssetMovementPage() {
  const user = await requireCurrentUser();

  let data;

  try {
    data = await Promise.all([
      getAssetMovements(user.id),
      getAvailableAssets(),
      getAssetLocations(user.id),
    ]);
  } catch (error) {
    if (error instanceof AppError && error.code === 'PERMISSION_DENIED') {
      return <AccessDenied />;
    }

    throw error;
  }

  const [assetMovements, assets, locations] = data;

  return (
    <AssetMovementWorkspace
      assetMovements={assetMovements}
      assets={assets}
      locations={locations}
    />
  );
}
