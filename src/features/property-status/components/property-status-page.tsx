import { PropertyStatusWorkspace } from './property-status-workspace';

import { getPropertyStatuses } from '../queries/property-status.queries';

export async function PropertyStatusPage() {
  const propertyStatuses = await getPropertyStatuses();

  return <PropertyStatusWorkspace propertyStatuses={propertyStatuses} />;
}
