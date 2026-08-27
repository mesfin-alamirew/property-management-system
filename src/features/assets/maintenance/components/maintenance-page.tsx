import {
  getMaintenances,
  getAssets,
  getActiveUsers,
} from '../queries/maintenance.queries';

import { MaintenanceWorkspace } from './maintenance-workspace';

export async function MaintenancePage() {
  const [maintenances, assets, users] = await Promise.all([
    getMaintenances(),
    getAssets(),
    getActiveUsers(),
  ]);

  return (
    <MaintenanceWorkspace
      maintenances={maintenances}
      assets={assets}
      users={users}
    />
  );
}
