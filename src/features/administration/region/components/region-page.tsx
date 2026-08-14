import { getCountries } from '@/features/country/queries/country.queries';
import { getRegions } from '../queries/region.queries';

import { RegionWorkspace } from './region-workspace';

export async function RegionPage() {
  const regions = await getRegions();

  const countries = await getCountries();

  const countryOptions = countries.map((country) => ({
    value: country.id,
    label: country.name,
  }));

  return <RegionWorkspace regions={regions} countries={countryOptions} />;
}
