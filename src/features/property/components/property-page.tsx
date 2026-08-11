import { PropertyWorkspace } from './property-workspace';

import { getProperties } from '../queries/property.queries';

import { getOrganizationUnits } from '@/features/organization-unit/queries/organization-unit.queries';
import { getPropertyTypes } from '@/features/property-type/queries/property-type.queries';
import { getPropertyCategories } from '@/features/property-category/queries/property-category.queries';
import { getPropertyTenures } from '@/features/property-tenure/queries/property-tenure.queries';
import { getPropertyStatuses } from '@/features/property-status/queries/property-status.queries';

export async function PropertyPage() {
  const [
    properties,
    organizationUnits,
    propertyTypes,
    propertyCategories,
    propertyTenures,
    propertyStatuses,
  ] = await Promise.all([
    getProperties(),
    getOrganizationUnits(),
    getPropertyTypes(),
    getPropertyCategories(),
    getPropertyTenures(),
    getPropertyStatuses(),
  ]);

  return (
    <PropertyWorkspace
      properties={properties}
      organizationUnits={organizationUnits}
      propertyTypes={propertyTypes}
      propertyCategories={propertyCategories}
      propertyTenures={propertyTenures}
      propertyStatuses={propertyStatuses}
    />
  );
}
