import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { AppError } from '@/lib/errors';
import { AccessDenied } from '@/components/ui/access-denied';

import {
  getRetirements,
  getAssets,
  getConditions,
} from '../queries/retirement.queries';

import { RetirementWorkspace } from './retirement-workspace';

export async function RetirementPage() {
  const user = await requireCurrentUser();

  let data;

  try {
    data = await Promise.all([
      getRetirements(user.id),
      getAssets(),
      getConditions(),
    ]);
  } catch (error) {
    if (error instanceof AppError && error.code === 'PERMISSION_DENIED') {
      return <AccessDenied />;
    }

    throw error;
  }

  const [retirements, assets, conditions] = data;

  return (
    <RetirementWorkspace
      retirements={retirements}
      assets={assets}
      conditions={conditions}
    />
  );
}
