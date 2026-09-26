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
  let assets;
  let users;

  try {
    [rows, assets, users] = await Promise.all([
      getIncidentReport(user.id, {}),
      getIncidentReportAssets(user.id),
      getIncidentReportUsers(user.id),
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
          Incident Report
        </h1>

        <p className="mt-1 max-w-3xl text-sm leading-5 text-muted-foreground">
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
