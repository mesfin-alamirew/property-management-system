import { AccessDenied } from '@/components/ui/access-denied';
import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { AppError } from '@/lib/errors';

import { AccountabilityReportWorkspace } from '@/features/reports/accountability/components/accountability-report-workspace';
import { getAccountabilityReportLookups } from '@/features/reports/accountability/queries/accountability-lookup.queries';
import { getAccountabilityReport } from '@/features/reports/accountability/queries/accountability.queries';

export default async function AccountabilityReportPage() {
  const user = await requireCurrentUser();

  let rows;
  let lookups;

  try {
    [rows, lookups] = await Promise.all([
      getAccountabilityReport(user.id, {}),
      getAccountabilityReportLookups(user.id),
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
          Accountability Report
        </h1>

        <p className="mt-1 max-w-3xl text-sm leading-5 text-muted-foreground">
          Track asset accountability exceptions across the organization.
        </p>
      </div>

      <AccountabilityReportWorkspace initialRows={rows} lookups={lookups} />
    </div>
  );
}
