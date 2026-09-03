import { notFound } from 'next/navigation';

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
  const { id } = await params;

  const detail = await getAssignmentDetail(id);

  if (!detail) {
    notFound();
  }

  const history = await getAssignmentHistory(detail.asset.id);

  return <AssignmentDetailPage detail={detail} history={history} />;
}
