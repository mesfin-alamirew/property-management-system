import { AccessDenied } from '@/components/ui/access-denied';
import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { AppError } from '@/lib/errors';

import { getOrganizationUnits } from '@/features/administration/organization-unit/queries/organization-unit.queries';
import { getPropertyCategories } from '@/features/properties/property-category/queries/property-category.queries';
import { getPropertyStatuses } from '@/features/properties/property-status/queries/property-status.queries';
import { getPropertyTenures } from '@/features/properties/property-tenure/queries/property-tenure.queries';
import { getPropertyTypes } from '@/features/properties/property-type/queries/property-type.queries';

import { getProperties } from '../queries/property.queries';
import { PropertyWorkspace } from './property-workspace';

export async function PropertyPage() {
  const user = await requireCurrentUser();

  let properties;
  let organizationUnits;
  let propertyTypes;
  let propertyCategories;
  let propertyTenures;
  let propertyStatuses;

  try {
    [
      properties,
      organizationUnits,
      propertyTypes,
      propertyCategories,
      propertyTenures,
      propertyStatuses,
    ] = await Promise.all([
      getProperties(user.id),
      getOrganizationUnits(user.id),
      getPropertyTypes(user.id),
      getPropertyCategories(user.id),
      getPropertyTenures(user.id),
      getPropertyStatuses(user.id),
    ]);
  } catch (error) {
    if (error instanceof AppError && error.code === 'PERMISSION_DENIED') {
      return <AccessDenied />;
    }

    throw error;
  }

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
