import { AccessDenied } from '@/components/ui/access-denied';
import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { AppError } from '@/lib/errors';

import { getBuildingConditions } from '../queries/building-condition.queries';

import { BuildingConditionWorkspace } from './building-condition.workspace';

export async function BuildingConditionPage() {
  const user = await requireCurrentUser();

  let buildingConditions;

  try {
    buildingConditions = await getBuildingConditions(user.id);
  } catch (error) {
    if (error instanceof AppError && error.code === 'PERMISSION_DENIED') {
      return <AccessDenied />;
    }

    throw error;
  }

  return <BuildingConditionWorkspace buildingConditions={buildingConditions} />;
}
