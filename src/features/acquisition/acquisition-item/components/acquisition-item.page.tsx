import { AccessDenied } from '@/components/ui/access-denied';
import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { AppError } from '@/lib/errors';

import { getAcquisitions } from '../../acquisition/queries/acquisition.queries';

import {
  getAcquisitionItems,
  getAvailableAssetsForAcquisition,
} from '../queries/acquisition-item.queries';

import { AcquisitionItemWorkspace } from './acquisition-item-workspace';

export async function AcquisitionItemPage() {
  const user = await requireCurrentUser();

  let acquisitionItems;
  let acquisitions;
  let assets;

  try {
    [acquisitionItems, acquisitions, assets] = await Promise.all([
      getAcquisitionItems(user.id),
      getAcquisitions(user.id),
      getAvailableAssetsForAcquisition(),
    ]);
  } catch (error) {
    if (error instanceof AppError && error.code === 'PERMISSION_DENIED') {
      return <AccessDenied />;
    }

    throw error;
  }

  return (
    <AcquisitionItemWorkspace
      acquisitionItems={acquisitionItems}
      acquisitions={acquisitions}
      assets={assets}
    />
  );
}
