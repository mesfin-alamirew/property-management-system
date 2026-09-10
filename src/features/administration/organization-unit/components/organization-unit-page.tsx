import { OrganizationUnitWorkspace } from './organization-unit-workspace';

import {
  getOrganizationUnits,
  getOrganizationUnitParents,
} from '../queries/organization-unit.queries';

import { getCountries } from '@/features/administration/country/queries/country.queries';

import { OrganizationUnitType } from '@/generated/prisma/client';
import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { AppError } from '@/lib/errors';
import { AccessDenied } from '@/components/ui/access-denied';

export async function OrganizationUnitPage() {
  const user = await requireCurrentUser();

  let organizationUnits;
  let parentOrganizationUnits;
  let countries;

  try {
    [organizationUnits, parentOrganizationUnits, countries] = await Promise.all(
      [
        getOrganizationUnits(user.id),
        getOrganizationUnitParents(user.id),
        getCountries(user.id),
      ],
    );
  } catch (error) {
    if (error instanceof AppError && error.code === 'PERMISSION_DENIED') {
      return <AccessDenied />;
    }

    throw error;
  }

  const organizationUnitTypes = Object.values(OrganizationUnitType);

  return (
    <OrganizationUnitWorkspace
      organizationUnits={organizationUnits}
      parentOrganizationUnits={parentOrganizationUnits}
      countries={countries}
      organizationUnitTypes={organizationUnitTypes}
    />
  );
}
