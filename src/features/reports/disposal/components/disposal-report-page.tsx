import { getDisposalReportAction } from '../actions/disposal.actions';
import {
  getDisposalReportAssets,
  getDisposalReportUsers,
} from '../queries/disposal-lookup.queries';
import { DisposalReportWorkspace } from './disposal-report-workspace';

export async function DisposalReportPage() {
  const [reportResult, assets, users] = await Promise.all([
    getDisposalReportAction({}),
    getDisposalReportAssets(),
    getDisposalReportUsers(),
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
          Disposal Report
        </h1>

        <p className="mt-1 text-sm text-gray-600">
          View asset disposal records, disposal methods, affected assets, and
          approval accountability.
        </p>
      </div>

      <DisposalReportWorkspace
        initialRows={reportResult.data}
        assets={assets}
        users={users}
      />
    </div>
  );
}
