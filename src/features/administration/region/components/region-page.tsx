import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { getCountries } from '@/features/administration/country/queries/country.queries';
import { getRegions } from '@/features/administration/region/queries/region.queries';

import { RegionWorkspace } from './region-workspace';

export async function RegionPage() {
  const user = await requireCurrentUser();

  const [countries, regions] = await Promise.all([
    getCountries(user.id),
    getRegions(user.id),
  ]);

  const countryOptions = countries.map((country) => ({
    value: country.id,
    label: country.name,
  }));

  return <RegionWorkspace countries={countryOptions} regions={regions} />;
}
