import { OrganizationUnitWorkspace } from './organization-unit-workspace';

import {
  getOrganizationUnits,
  getOrganizationUnitParents,
} from '../queries/organization-unit.queries';

import { getCountries } from '@/features/administration/country/queries/country.queries';

import { OrganizationUnitType } from '@/generated/prisma/client';

export async function OrganizationUnitPage() {
  const [organizationUnits, parentOrganizationUnits, countries] =
    await Promise.all([
      getOrganizationUnits(),
      getOrganizationUnitParents(),
      getCountries(),
    ]);

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
