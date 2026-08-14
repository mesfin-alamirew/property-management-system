import { getBuildingSpaces } from '../queries/building-space.queries';
import { getBuildings } from '@/features/building/queries/building.queries';
import { getBuildingSpaceTypes } from '@/features/building-space-type/queries/building-space-type.queries';

import { BuildingSpaceWorkspace } from './building-space.workspace';

export async function BuildingSpacePage() {
  const [spaces, buildings, spaceTypes] = await Promise.all([
    getBuildingSpaces(),
    getBuildings(),
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
