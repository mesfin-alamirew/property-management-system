import { getAuditReportAction } from '../actions/audit.actions';
import {
  getAuditReportActions,
  getAuditReportEntityTypes,
  getAuditReportUsers,
} from '../queries/audit-lookup.queries';
import { AuditReportWorkspace } from './audit-report-workspace';

export async function AuditReportPage() {
  const [reportResult, users, actions, entityTypes] = await Promise.all([
    getAuditReportAction(),
    getAuditReportUsers(),
    getAuditReportActions(),
    getAuditReportEntityTypes(),
  ]);

  if (!reportResult.success) {
    return (
      <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
        {reportResult.message}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Audit Report</h1>
        <p className="mt-1 text-sm text-gray-600">
          Review who changed what, when, and the recorded audit information.
        </p>
      </div>

      <AuditReportWorkspace
        initialRows={reportResult.data}
        users={users}
        actions={actions}
        entityTypes={entityTypes}
      />
    </div>
  );
}
