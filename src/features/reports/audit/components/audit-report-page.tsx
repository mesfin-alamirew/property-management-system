import { AccessDenied } from '@/components/ui/access-denied';
import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { AppError } from '@/lib/errors';

import {
  getAuditReportActions,
  getAuditReportEntityTypes,
  getAuditReportUsers,
} from '../queries/audit-lookup.queries';
import { getAuditReport } from '../queries/audit.queries';
import { AuditReportWorkspace } from './audit-report-workspace';

export async function AuditReportPage() {
  const user = await requireCurrentUser();

  let rows;

  try {
    rows = await getAuditReport(user.id, {});
  } catch (error) {
    if (error instanceof AppError && error.code === 'PERMISSION_DENIED') {
      return <AccessDenied />;
    }

    throw error;
  }

  const [users, actions, entityTypes] = await Promise.all([
    getAuditReportUsers(),
    getAuditReportActions(),
    getAuditReportEntityTypes(),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Audit Report
        </h1>

        <p className="mt-1 max-w-3xl text-sm leading-5 text-muted-foreground">
          Review who changed what, when, and the recorded audit information.
        </p>
      </div>

      <AuditReportWorkspace
        initialRows={rows}
        users={users}
        actions={actions}
        entityTypes={entityTypes}
      />
    </div>
  );
}
