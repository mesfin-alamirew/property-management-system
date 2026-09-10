import { PropertyWorkspace } from './property-workspace';

import { getProperties } from '../queries/property.queries';

import { getOrganizationUnits } from '@/features/administration/organization-unit/queries/organization-unit.queries';
import { getPropertyTypes } from '@/features/properties/property-type/queries/property-type.queries';
import { getPropertyCategories } from '@/features/properties/property-category/queries/property-category.queries';
import { getPropertyTenures } from '@/features/properties/property-tenure/queries/property-tenure.queries';
import { getPropertyStatuses } from '@/features/properties/property-status/queries/property-status.queries';
import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { AppError } from '@/lib/errors';
import { AccessDenied } from '@/components/ui/access-denied';

export async function PropertyPage() {
  const user = await requireCurrentUser();

  let data;

  try {
    data = await Promise.all([
      getProperties(user.id),
      getOrganizationUnits(user.id),
      getPropertyTypes(),
      getPropertyCategories(),
      getPropertyTenures(),
      getPropertyStatuses(),
    ]);
  } catch (error) {
    if (error instanceof AppError && error.code === 'PERMISSION_DENIED') {
      return <AccessDenied />;
    }

    throw error;
  }

  const [
    properties,
    organizationUnits,
    propertyTypes,
    propertyCategories,
    propertyTenures,
    propertyStatuses,
  ] = data;

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
