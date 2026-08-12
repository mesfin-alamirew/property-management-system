import { getBuildingSpaceTypes } from '../queries/building-space-type.queries';

import { BuildingSpaceTypeWorkspace } from './building-space-type-workspace';

export async function BuildingSpaceTypePage() {
  const spaceTypes = await getBuildingSpaceTypes();

  return <BuildingSpaceTypeWorkspace spaceTypes={spaceTypes} />;
}
