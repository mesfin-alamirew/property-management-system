import { getCountries } from '../queries/country.queries';

import { CountryWorkspace } from './country-workspace';

export async function CountryPage() {
  const countries = await getCountries();

  return <CountryWorkspace countries={countries} />;
}
