import { getZones } from '../queries/zone.queries';

import { getRegionsForLookup } from '@/features/administration/region/queries/region.queries';

import { ZoneWorkspace } from './zone-workspace';

export async function ZonePage() {
  const zones = await getZones();

  const regions = await getRegionsForLookup();

  const regionOptions = regions.map((region) => ({
    value: region.id,

    label: `${region.name} (${region.country.name})`,
  }));

  return <ZoneWorkspace zones={zones} regions={regionOptions} />;
}
