import { AccessDenied } from '@/components/ui/access-denied';
import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { AppError } from '@/lib/errors';

import { getDisposalReport } from '../queries/disposal.queries';
import {
  getDisposalReportAssets,
  getDisposalReportUsers,
} from '../queries/disposal-lookup.queries';
import { DisposalReportWorkspace } from './disposal-report-workspace';

export async function DisposalReportPage() {
  const user = await requireCurrentUser();

  let rows;
  let assets;
  let users;

  try {
    [rows, assets, users] = await Promise.all([
      getDisposalReport(user.id, {}),
      getDisposalReportAssets(user.id),
      getDisposalReportUsers(user.id),
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
          Disposal Report
        </h1>

        <p className="mt-1 max-w-3xl text-sm leading-5 text-muted-foreground">
          View asset disposal records, disposal methods, affected assets, and
          approval accountability.
        </p>
      </div>

      <DisposalReportWorkspace
        initialRows={rows}
        assets={assets}
        users={users}
      />
    </div>
  );
}
