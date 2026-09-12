import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { AccessDenied } from '@/components/ui/access-denied';
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

  try {
    initialRows = await getMaintenanceReport(user.id, {});
  } catch (error) {
    if (error instanceof AppError && error.code === 'PERMISSION_DENIED') {
      return <AccessDenied />;
    }

    throw error;
  }

  const [assets, assignedUsers] = await Promise.all([
    getMaintenanceReportAssets(),
    getMaintenanceReportAssignedUsers(),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Maintenance Report
        </h1>

        <p className="mt-1 text-sm text-gray-600">
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
