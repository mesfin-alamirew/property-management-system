import { AccessDenied } from '@/components/ui/access-denied';
import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { AppError } from '@/lib/errors';

import { getIncidentReport } from '../queries/incident.queries';
import {
  getIncidentReportAssets,
  getIncidentReportUsers,
} from '../queries/incident-lookup.queries';
import { IncidentReportWorkspace } from './incident-report-workspace';

export async function IncidentReportPage() {
  const user = await requireCurrentUser();

  let rows;

  try {
    rows = await getIncidentReport(user.id, {});
  } catch (error) {
    if (error instanceof AppError && error.code === 'PERMISSION_DENIED') {
      return <AccessDenied />;
    }

    throw error;
  }

  const [assets, users] = await Promise.all([
    getIncidentReportAssets(),
    getIncidentReportUsers(),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Incident Report
        </h1>

        <p className="mt-1 text-sm text-gray-600">
          Review incidents, affected assets, responsible officers, and
          resolution status.
        </p>
      </div>

      <IncidentReportWorkspace
        initialRows={rows}
        assets={assets}
        users={users}
      />
    </div>
  );
}
