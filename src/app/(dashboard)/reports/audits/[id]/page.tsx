import { AccessDenied } from '@/components/ui/access-denied';
import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { AppError } from '@/lib/errors';
import { getAuditDetail } from '@/features/reports/audit/queries/audit-detail.queries';
import { AuditDetailPage } from '@/features/reports/audit/components/audit-detail-page';

type AuditDetailRouteProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: AuditDetailRouteProps) {
  const { id } = await params;

  const user = await requireCurrentUser();

  let audit;

  try {
    audit = await getAuditDetail(user.id, id);
  } catch (error) {
    if (error instanceof AppError && error.code === 'PERMISSION_DENIED') {
      return <AccessDenied />;
    }

    throw error;
  }

  if (!audit) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold text-gray-900">Audit Detail</h1>

        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          Audit log not found.
        </div>
      </div>
    );
  }

  return <AuditDetailPage audit={audit} />;
}
