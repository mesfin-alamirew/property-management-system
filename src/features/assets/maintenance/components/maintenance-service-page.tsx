import {
  getMaintenanceServices,
  getMaintenancesForService,
} from '../queries/maintenance-service.queries';

import { MaintenanceServiceWorkspace } from './maintenance-service-workspace';

export async function MaintenanceServicePage() {
  const [maintenanceServices, maintenances] = await Promise.all([
    getMaintenanceServices(),
    getMaintenancesForService(),
  ]);

  return (
    <MaintenanceServiceWorkspace
      maintenanceServices={maintenanceServices}
      maintenances={maintenances}
    />
  );
}
