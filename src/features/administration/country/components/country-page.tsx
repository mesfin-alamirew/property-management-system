import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { getCountries } from '@/features/administration/country/queries/country.queries';

import { CountryWorkspace } from './country-workspace';

export async function CountryPage() {
  const user = await requireCurrentUser();

  const countries = await getCountries(user.id);

  return <CountryWorkspace countries={countries} />;
}
