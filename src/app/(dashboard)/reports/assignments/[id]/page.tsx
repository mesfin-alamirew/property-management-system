import { notFound } from 'next/navigation';

import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { AppError } from '@/lib/errors';
import { AccessDenied } from '@/components/ui/access-denied';

import {
  getAssignmentDetail,
  getAssignmentHistory,
} from '@/features/reports/assignment/queries/assignment-detail.queries';

import { AssignmentDetailPage } from '@/features/reports/assignment/components/assignment-detail-page';

type AssignmentDetailRouteProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AssignmentDetailRoute({
  params,
}: AssignmentDetailRouteProps) {
  const user = await requireCurrentUser();
  const { id } = await params;

  let detail;
  let history;

  try {
    detail = await getAssignmentDetail(user.id, id);

    if (!detail) {
      notFound();
    }

    history = await getAssignmentHistory(user.id, detail.asset.id);
  } catch (error) {
    if (error instanceof AppError && error.code === 'PERMISSION_DENIED') {
      return <AccessDenied />;
    }

    throw error;
  }

  return <AssignmentDetailPage detail={detail} history={history} />;
}
