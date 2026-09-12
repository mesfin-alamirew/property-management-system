import { getAccountabilityReport } from '@/features/reports/accountability/queries/accountability.queries';
import { getAccountabilityReportLookups } from '@/features/reports/accountability/queries/accountability-lookup.queries';
import { AccountabilityReportWorkspace } from '@/features/reports/accountability/components/accountability-report-workspace';
import { AccessDenied } from '@/components/ui/access-denied';
import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { AppError } from '@/lib/errors';

export default async function AccountabilityReportPage() {
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
        <h1 className="text-xl font-semibold text-gray-900">
          Accountability Report
        </h1>
        <p className="text-sm text-gray-600">
          Track asset accountability exceptions across the organization.
        </p>
      </div>

      <AccountabilityReportWorkspace initialRows={rows} lookups={lookups} />
    </div>
  );
}
