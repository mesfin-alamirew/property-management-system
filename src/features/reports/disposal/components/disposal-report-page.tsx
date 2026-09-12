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

  try {
    rows = await getDisposalReport(user.id, {});
  } catch (error) {
    if (error instanceof AppError && error.code === 'PERMISSION_DENIED') {
      return <AccessDenied />;
    }

    throw error;
  }

  const [assets, users] = await Promise.all([
    getDisposalReportAssets(),
    getDisposalReportUsers(),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Disposal Report
        </h1>

        <p className="mt-1 text-sm text-gray-600">
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
