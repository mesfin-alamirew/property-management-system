import {
  getMaintenances,
  getAssets,
  getActiveUsers,
} from '../queries/maintenance.queries';

import { MaintenanceWorkspace } from './maintenance-workspace';

import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { AppError } from '@/lib/errors';
import { AccessDenied } from '@/components/ui/access-denied';

export async function MaintenancePage() {
  const user = await requireCurrentUser();

  let data;

  try {
    data = await Promise.all([
      getMaintenances(user.id),
      getAssets(),
      getActiveUsers(),
    ]);
  } catch (error) {
    if (error instanceof AppError && error.code === 'PERMISSION_DENIED') {
      return <AccessDenied />;
    }

    throw error;
  }

  const [maintenances, assets, users] = data;

  return (
    <MaintenanceWorkspace
      maintenances={maintenances}
      assets={assets}
      users={users}
    />
  );
}
