import { getWoredas } from '../queries/woreda.queries';

import { getZonesForLookup } from '@/features/zone/queries/zone.queries';

import { WoredaWorkspace } from './woreda-workspace';

export async function WoredaPage() {
  const woredas = await getWoredas();

  const zones = await getZonesForLookup();

  const zoneOptions = zones.map((zone) => ({
    value: zone.id,
    label: `${zone.name} (${zone.region.name})`,
  }));

  return <WoredaWorkspace woredas={woredas} zones={zoneOptions} />;
}
