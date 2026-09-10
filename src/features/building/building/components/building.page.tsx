import { getProperties } from '@/features/properties/property/queries/property.queries';
import { getBuildingTypes } from '@/features/building/building-type/queries/building-type.queries';
import { getBuildingConditions } from '@/features/building/building-condition/queries/building-condition.queries';
import { getBuildings } from '../queries/building.queries';
import { BuildingWorkspace } from './building.Workspace';
import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { AppError } from '@/lib/errors';
import { AccessDenied } from '@/components/ui/access-denied';

export async function BuildingPage() {
  const user = await requireCurrentUser();

  let data;

  try {
    data = await Promise.all([
      getBuildings(user.id),
      getProperties(user.id),
      getBuildingTypes(),
      getBuildingConditions(),
    ]);
  } catch (error) {
    if (error instanceof AppError && error.code === 'PERMISSION_DENIED') {
      return <AccessDenied />;
    }

    throw error;
  }

  const [buildings, properties, buildingTypes, buildingConditions] = data;

  return (
    <BuildingWorkspace
      buildings={buildings}
      properties={properties}
      buildingTypes={buildingTypes}
      buildingConditions={buildingConditions}
    />
  );
}
