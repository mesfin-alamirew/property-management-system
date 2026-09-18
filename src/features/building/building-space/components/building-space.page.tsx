import { AccessDenied } from '@/components/ui/access-denied';
import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { AppError } from '@/lib/errors';

import { getBuildings } from '@/features/building/building/queries/building.queries';
import { getBuildingSpaceTypes } from '@/features/building/building-space-type/queries/building-space-type.queries';

import { getBuildingSpaces } from '../queries/building-space.queries';

import { BuildingSpaceWorkspace } from './building-space.workspace';

export async function BuildingSpacePage() {
  const user = await requireCurrentUser();

  let data;

  try {
    data = await Promise.all([
      getBuildingSpaces(user.id),
      getBuildings(user.id),
      getBuildingSpaceTypes(user.id),
    ]);
  } catch (error) {
    if (error instanceof AppError && error.code === 'PERMISSION_DENIED') {
      return <AccessDenied />;
    }

    throw error;
  }

  const [spaces, buildings, spaceTypes] = data;

  return (
    <BuildingSpaceWorkspace
      spaces={spaces}
      buildings={buildings}
      spaceTypes={spaceTypes}
    />
  );
}
