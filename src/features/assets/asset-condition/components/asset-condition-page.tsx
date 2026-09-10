import { getAssetConditions } from '../queries/asset-condition.queries';
import { AssetConditionWorkspace } from './asset-condition-workspace';

import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { AppError } from '@/lib/errors';
import { AccessDenied } from '@/components/ui/access-denied';

export async function AssetConditionPage() {
  const user = await requireCurrentUser();

  let assetConditions;

  try {
    assetConditions = await getAssetConditions(user.id);
  } catch (error) {
    if (error instanceof AppError && error.code === 'PERMISSION_DENIED') {
      return <AccessDenied />;
    }

    throw error;
  }

  return <AssetConditionWorkspace assetConditions={assetConditions} />;
}
