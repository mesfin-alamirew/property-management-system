import { getAccountabilityReport } from '@/features/reports/accountability/queries/accountability.queries';
import { getAccountabilityReportLookups } from '@/features/reports/accountability/queries/accountability-lookup.queries';
import { AccountabilityReportWorkspace } from '@/features/reports/accountability/components/accountability-report-workspace';

export default async function AccountabilityReportPage() {
  const [rows, lookups] = await Promise.all([
    getAccountabilityReport({}),
    getAccountabilityReportLookups(),
  ]);

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
