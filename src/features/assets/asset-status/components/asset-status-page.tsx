import { getAssetStatuses } from '../queries/asset-status.queries';
import { AssetStatusWorkspace } from './asset-status-workspace';

import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { AppError } from '@/lib/errors';
import { AccessDenied } from '@/components/ui/access-denied';

export async function AssetStatusPage() {
  const user = await requireCurrentUser();

  let assetStatuses;

  try {
    assetStatuses = await getAssetStatuses(user.id);
  } catch (error) {
    if (error instanceof AppError && error.code === 'PERMISSION_DENIED') {
      return <AccessDenied />;
    }

    throw error;
  }

  return <AssetStatusWorkspace assetStatuses={assetStatuses} />;
}
