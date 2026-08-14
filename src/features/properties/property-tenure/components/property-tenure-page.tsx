import { PropertyTenureWorkspace } from './property-tenure-workspace';

import { getPropertyTenures } from '../queries/property-tenure.queries';

export async function PropertyTenurePage() {
  const propertyTenures = await getPropertyTenures();

  return <PropertyTenureWorkspace propertyTenures={propertyTenures} />;
}
