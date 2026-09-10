import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { AppError } from '@/lib/errors';

import { getRegionsForLookup } from '@/features/administration/region/queries/region.queries';
import { getZones } from '../queries/zone.queries';
import { AccessDenied } from '@/components/ui/access-denied';
import { ZoneWorkspace } from './zone-workspace';

export async function ZonePage() {
  const user = await requireCurrentUser();

  let regions;
  let zones;

  try {
    [regions, zones] = await Promise.all([
      getRegionsForLookup(user.id),
      getZones(user.id),
    ]);
  } catch (error) {
    if (error instanceof AppError && error.code === 'PERMISSION_DENIED') {
      return <AccessDenied />;
    }

    throw error;
  }

  const regionOptions = regions.map((region) => ({
    value: region.id,
    label: `${region.name} (${region.country.name})`,
  }));

  return <ZoneWorkspace zones={zones} regions={regionOptions} />;
}
