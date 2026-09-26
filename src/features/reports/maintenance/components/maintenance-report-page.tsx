import { AccessDenied } from '@/components/ui/access-denied';
import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { AppError } from '@/lib/errors';

import { getMaintenanceReport } from '../queries/maintenance.queries';
import {
  getMaintenanceReportAssets,
  getMaintenanceReportAssignedUsers,
} from '../queries/maintenance-lookup.queries';
import { MaintenanceReportWorkspace } from './maintenance-report-workspace';

export async function MaintenanceReportPage() {
  const user = await requireCurrentUser();

  let initialRows;
  let assets;
  let assignedUsers;

  try {
    [initialRows, assets, assignedUsers] = await Promise.all([
      getMaintenanceReport(user.id, {}),
      getMaintenanceReportAssets(user.id),
      getMaintenanceReportAssignedUsers(user.id),
    ]);
  } catch (error) {
    if (error instanceof AppError && error.code === 'PERMISSION_DENIED') {
      return <AccessDenied />;
    }

    throw error;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Maintenance Report
        </h1>

        <p className="mt-1 max-w-3xl text-sm leading-5 text-muted-foreground">
          View maintenance activities, schedules, assigned officers, and service
          costs across assets.
        </p>
      </div>

      <MaintenanceReportWorkspace
        initialRows={initialRows}
        assets={assets}
        assignedUsers={assignedUsers}
      />
    </div>
  );
}
