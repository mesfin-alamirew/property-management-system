import { getMaintenanceReport } from '../queries/maintenance.queries';
import {
  getMaintenanceReportAssets,
  getMaintenanceReportAssignedUsers,
} from '../queries/maintenance-lookup.queries';
import { MaintenanceReportWorkspace } from './maintenance-report-workspace';

export async function MaintenanceReportPage() {
  const [initialRows, assets, assignedUsers] = await Promise.all([
    getMaintenanceReport({}),
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
