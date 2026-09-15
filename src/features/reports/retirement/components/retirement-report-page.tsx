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
      <div className="rounded-lg border border-danger-surface bg-danger-surface px-4 py-3 text-sm text-danger">
        {reportResult.message}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Retirement Report
        </h1>
        <p className="mt-1 max-w-3xl text-sm leading-5 text-muted-foreground">
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
