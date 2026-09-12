import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { AppError } from '@/lib/errors';
import { AccessDenied } from '@/components/ui/access-denied';

import { getMovementReport } from '../queries/movement.queries';
import {
  getMovementReportAssets,
  getMovementReportLocations,
  getMovementReportUsers,
} from '../queries/movement-lookup.queries';
import { MovementReportWorkspace } from './movement-report-workspace';

export async function MovementReportPage() {
  const user = await requireCurrentUser();

  let reportResult;

  try {
    reportResult = await getMovementReport(user.id, {});
  } catch (error) {
    if (error instanceof AppError && error.code === 'PERMISSION_DENIED') {
      return <AccessDenied />;
    }

    throw error;
  }

  const [assets, locations, users] = await Promise.all([
    getMovementReportAssets(),
    getMovementReportLocations(),
    getMovementReportUsers(),
  ]);

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
        initialRows={reportResult}
        assets={assets}
        locations={locations}
        users={users}
      />
    </div>
  );
}
