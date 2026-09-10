import {
  getAssetLocations,
  getActiveOrganizationUnits,
} from '../queries/asset-location.queries';

import { AssetLocationWorkspace } from './asset-location-workspace';

import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { AppError } from '@/lib/errors';
import { AccessDenied } from '@/components/ui/access-denied';

export async function AssetLocationPage() {
  const user = await requireCurrentUser();

  let data;

  try {
    data = await Promise.all([
      getAssetLocations(user.id),
      getActiveOrganizationUnits(),
    ]);
  } catch (error) {
    if (error instanceof AppError && error.code === 'PERMISSION_DENIED') {
      return <AccessDenied />;
    }

    throw error;
  }

  const [assetLocations, organizationUnits] = data;

  return (
    <AssetLocationWorkspace
      assetLocations={assetLocations}
      organizationUnits={organizationUnits}
    />
  );
}
