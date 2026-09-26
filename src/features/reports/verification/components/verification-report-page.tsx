import { AccessDenied } from '@/components/ui/access-denied';
import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { AppError } from '@/lib/errors';

import { getPhysicalVerificationReport } from '../queries/verification.queries';
import {
  getVerificationLocations,
  getVerificationOrganizationUnits,
} from '../queries/verification-lookup.queries';
import { VerificationReportWorkspace } from './verification-report-workspace';

export async function VerificationReportPage() {
  const user = await requireCurrentUser();

  let organizationUnits;
  let locations;
  let initialRows;

  try {
    [organizationUnits, locations, initialRows] = await Promise.all([
      getVerificationOrganizationUnits(user.id),
      getVerificationLocations(user.id),
      getPhysicalVerificationReport(user.id, {
        scope: 'ALL',
        status: 'ALL',
      }),
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
          Physical Verification Report
        </h1>

        <p className="mt-1 max-w-3xl text-sm leading-5 text-muted-foreground">
          Review physical verification activities, verification results,
          discrepancies, and unregistered assets.
        </p>
      </div>

      <VerificationReportWorkspace
        organizationUnits={organizationUnits}
        locations={locations}
        initialRows={initialRows}
      />
    </div>
  );
}
