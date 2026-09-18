import { AccessDenied } from '@/components/ui/access-denied';
import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { AppError } from '@/lib/errors';

import { getBuildingTypes } from '../queries/building-type.queries';

import { BuildingTypeWorkspace } from './building-type.workspace';

export async function BuildingTypePage() {
  const user = await requireCurrentUser();

  let buildingTypes;

  try {
    buildingTypes = await getBuildingTypes(user.id);
  } catch (error) {
    if (error instanceof AppError && error.code === 'PERMISSION_DENIED') {
      return <AccessDenied />;
    }

    throw error;
  }

  return <BuildingTypeWorkspace buildingTypes={buildingTypes} />;
}
