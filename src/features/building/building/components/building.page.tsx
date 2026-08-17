import { getProperties } from '@/features/properties/property/queries/property.queries';
import { getBuildingTypes } from '@/features/building/building-type/queries/building-type.queries';
import { getBuildingConditions } from '@/features/building/building-condition/queries/building-condition.queries';
import { getBuildings } from '../queries/building.queries';
import { BuildingWorkspace } from './building.Workspace';

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
