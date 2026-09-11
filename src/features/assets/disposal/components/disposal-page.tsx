import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { AppError } from '@/lib/errors';
import { AccessDenied } from '@/components/ui/access-denied';

import {
  getDisposals,
  getAvailableAssetsForDisposal,
} from '../queries/disposal.queries';

import { DisposalWorkspace } from './disposal-workspace';

export async function DisposalPage() {
  const user = await requireCurrentUser();

  let data;

  try {
    data = await Promise.all([
      getDisposals(user.id),
      getAvailableAssetsForDisposal(),
    ]);
  } catch (error) {
    if (error instanceof AppError && error.code === 'PERMISSION_DENIED') {
      return <AccessDenied />;
    }

    throw error;
  }

  const [disposals, assets] = data;

  return <DisposalWorkspace disposals={disposals} assets={assets} />;
}
