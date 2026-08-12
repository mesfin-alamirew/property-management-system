import { getProperties } from '@/features/property/queries/property.queries';
import { getBuildingTypes } from '@/features/building-type/queries/building-type.queries';
import { getBuildingConditions } from '@/features/building-condition/queries/building-condition.queries';
import { getBuildings } from '../queries/building.queries';
import { BuildingWorkspace } from './PropertyWorkspace';

export async function BuildingPage() {
  const [buildings, properties, buildingTypes, buildingConditions] =
    await Promise.all([
      getBuildings(),
      getProperties(),
      getBuildingTypes(),
      getBuildingConditions(),
    ]);

  return (
    <BuildingWorkspace
      buildings={buildings}
      properties={properties}
      buildingTypes={buildingTypes}
      buildingConditions={buildingConditions}
    />
  );
}
