import { getRetirementReportAction } from '../actions/retirement.actions';
import {
  getRetirementReportAssets,
  getRetirementReportConditions,
  getRetirementReportUsers,
} from '../queries/retirement-lookup.queries';
import { RetirementReportWorkspace } from './retirement-report-workspace';

export async function RetirementReportPage() {
  const [reportResult, assets, conditions, users] = await Promise.all([
    getRetirementReportAction({}),
    getRetirementReportAssets(),
    getRetirementReportConditions(),
    getRetirementReportUsers(),
  ]);

  if (!reportResult.success) {
    return (
      <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
        {reportResult.message}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Retirement Report
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          View asset retirement records, decisions, responsible officers, and
          cancellation details.
        </p>
      </div>

      <RetirementReportWorkspace
        initialRows={reportResult.data}
        assets={assets}
        conditions={conditions}
        users={users}
      />
    </div>
  );
}
