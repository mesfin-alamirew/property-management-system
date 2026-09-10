import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { AppError } from '@/lib/errors';

import { getZonesForLookup } from '@/features/administration/zone/queries/zone.queries';
import { getWoredas } from '../queries/woreda.queries';

import { AccessDenied } from '@/components/ui/access-denied';
import { WoredaWorkspace } from './woreda-workspace';

export async function WoredaPage() {
  const user = await requireCurrentUser();

  let zones;
  let woredas;

  try {
    [zones, woredas] = await Promise.all([
      getZonesForLookup(user.id),
      getWoredas(user.id),
    ]);
  } catch (error) {
    if (error instanceof AppError && error.code === 'PERMISSION_DENIED') {
      return <AccessDenied />;
    }

    throw error;
  }

  const zoneOptions = zones.map((zone) => ({
    value: zone.id,
    label: `${zone.name} (${zone.region.name})`,
  }));

  return <WoredaWorkspace zones={zoneOptions} woredas={woredas} />;
}
