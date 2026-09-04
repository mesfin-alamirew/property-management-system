import { getIncidentReport } from '../queries/incident.queries';
import {
  getIncidentReportAssets,
  getIncidentReportUsers,
} from '../queries/incident-lookup.queries';
import { IncidentReportWorkspace } from './incident-report-workspace';

export async function IncidentReportPage() {
  const [rows, assets, users] = await Promise.all([
    getIncidentReport({}),
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
