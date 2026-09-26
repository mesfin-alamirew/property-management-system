import { AccessDenied } from '@/components/ui/access-denied';
import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { AppError } from '@/lib/errors';

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
  let assets;
  let locations;
  let users;

  try {
    [reportResult, assets, locations, users] = await Promise.all([
      getMovementReport(user.id, {}),
      getMovementReportAssets(user.id),
      getMovementReportLocations(user.id),
      getMovementReportUsers(user.id),
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
          Asset Movement Report
        </h1>

        <p className="mt-1 max-w-3xl text-sm leading-5 text-muted-foreground">
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
