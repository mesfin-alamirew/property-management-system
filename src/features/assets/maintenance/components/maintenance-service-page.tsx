import {
  getMaintenanceServices,
  getMaintenancesForService,
} from '../queries/maintenance-service.queries';

import { MaintenanceServiceWorkspace } from './maintenance-service-workspace';

import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { AppError } from '@/lib/errors';
import { AccessDenied } from '@/components/ui/access-denied';

export async function MaintenanceServicePage() {
  const user = await requireCurrentUser();

  let data;

  try {
    data = await Promise.all([
      getMaintenanceServices(user.id),
      getMaintenancesForService(),
    ]);
  } catch (error) {
    if (error instanceof AppError && error.code === 'PERMISSION_DENIED') {
      return <AccessDenied />;
    }

    throw error;
  }

  const [maintenanceServices, maintenances] = data;

  return (
    <MaintenanceServiceWorkspace
      maintenanceServices={maintenanceServices}
      maintenances={maintenances}
    />
  );
}
