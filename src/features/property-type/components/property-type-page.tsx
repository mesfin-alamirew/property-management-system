import { PropertyTypeWorkspace } from './property-type-workspace';

import { getPropertyTypes } from '../queries/property-type.queries';

export async function PropertyTypePage() {
  const propertyTypes = await getPropertyTypes();

  return <PropertyTypeWorkspace propertyTypes={propertyTypes} />;
}
