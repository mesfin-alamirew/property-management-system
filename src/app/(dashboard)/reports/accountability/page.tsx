import { AccessDenied } from '@/components/ui/access-denied';
import { getAccountabilityReport } from '@/features/reports/accountability/queries/accountability.queries';
import { getAccountabilityReportLookups } from '@/features/reports/accountability/queries/accountability-lookup.queries';
import { AccountabilityReportWorkspace } from '@/features/reports/accountability/components/accountability-report-workspace';
import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { AppError } from '@/lib/errors';

export default async function Page() {
  const user = await requireCurrentUser();

  let rows;

  try {
    rows = await getAccountabilityReport(user.id, {});
  } catch (error) {
    if (error instanceof AppError && error.code === 'PERMISSION_DENIED') {
      return <AccessDenied />;
    }

    throw error;
  }

  const lookups = await getAccountabilityReportLookups();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Asset Accountability Exceptions
        </h1>

        <p className="mt-1 text-sm text-gray-600">
          Identify assets whose current assignment, location, verification,
          operational, or lifecycle state requires review or action.
        </p>
      </div>

      <AccountabilityReportWorkspace initialRows={rows} lookups={lookups} />
    </div>
  );
}
