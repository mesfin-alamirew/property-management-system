import { notFound } from 'next/navigation';

import { getAuditDetailAction } from '@/features/reports/audit/actions/audit.actions';
import { AuditDetailPage } from '@/features/reports/audit/components/audit-detail-page';

type AuditDetailRouteProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: AuditDetailRouteProps) {
  const { id } = await params;

  const result = await getAuditDetailAction(id);

  if (!result.success) {
    notFound();
  }

  return <AuditDetailPage audit={result.data} />;
}
