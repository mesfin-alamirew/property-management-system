import { getBuildingSpaces } from '../queries/building-space.queries';
import { getBuildings } from '@/features/building/building/queries/building.queries';
import { getBuildingSpaceTypes } from '@/features/building/building-space-type/queries/building-space-type.queries';

import { BuildingSpaceWorkspace } from './building-space.workspace';
import { requireCurrentUser } from '@/lib/auth/require-current-user';

export async function BuildingSpacePage() {
  const user = await requireCurrentUser();

  const [spaces, buildings, spaceTypes] = await Promise.all([
    getBuildingSpaces(),
    getBuildings(user.id),
    getBuildingSpaceTypes(),
  ]);

  return (
    <BuildingSpaceWorkspace
      spaces={spaces}
      buildings={buildings}
      spaceTypes={spaceTypes}
    />
  );
}
