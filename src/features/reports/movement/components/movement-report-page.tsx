import { getMovementReportAction } from '../actions/movement.actions';
import {
  getMovementReportAssets,
  getMovementReportLocations,
  getMovementReportUsers,
} from '../queries/movement-lookup.queries';
import { MovementReportWorkspace } from './movement-report-workspace';

export async function MovementReportPage() {
  const [reportResult, assets, locations, users] = await Promise.all([
    getMovementReportAction({}),
    getMovementReportAssets(),
    getMovementReportLocations(),
    getMovementReportUsers(),
  ]);

  if (!reportResult.success) {
    return (
      <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
        {reportResult.message}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Asset Movement Report
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          View asset movement history, location changes, responsible officers,
          and movement reasons.
        </p>
      </div>

      <MovementReportWorkspace
        initialRows={reportResult.data}
        assets={assets}
        locations={locations}
        users={users}
      />
    </div>
  );
}
