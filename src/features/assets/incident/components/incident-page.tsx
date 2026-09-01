import {
  getIncidents,
  getAssets,
  getActiveUsers,
} from '../queries/incident.queries';

import { IncidentWorkspace } from './incident-workspace';

export async function IncidentPage() {
  const [incidents, assets, users] = await Promise.all([
    getIncidents(),
    getAssets(),
    getActiveUsers(),
  ]);

  return (
    <IncidentWorkspace incidents={incidents} assets={assets} users={users} />
  );
}
