import { getPhysicalVerificationReport } from '../queries/verification.queries';
import {
  getVerificationLocations,
  getVerificationOrganizationUnits,
} from '../queries/verification-lookup.queries';
import { VerificationReportWorkspace } from './verification-report-workspace';

export async function VerificationReportPage() {
  const [organizationUnits, locations, initialRows] = await Promise.all([
    getVerificationOrganizationUnits(),
    getVerificationLocations(),
    getPhysicalVerificationReport({
      scope: 'ALL',
      status: 'ALL',
    }),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Physical Verification Report
        </h1>
        <p className="mt-1 text-sm text-gray-600">
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
