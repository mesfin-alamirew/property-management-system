import { notFound } from 'next/navigation';

import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { AppError } from '@/lib/errors';
import { AccessDenied } from '@/components/ui/access-denied';

import { getMovementDetail } from '@/features/reports/movement/queries/movement-detail.queries';
import { MovementDetailPage } from '@/features/reports/movement/components/movement-detail-page';

type MovementDetailRouteProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page({ params }: MovementDetailRouteProps) {
  const user = await requireCurrentUser();
  const { id } = await params;

  let movement;

  try {
    movement = await getMovementDetail(user.id, id);
  } catch (error) {
    if (error instanceof AppError && error.code === 'PERMISSION_DENIED') {
      return <AccessDenied />;
    }

    throw error;
  }

  if (!movement) {
    notFound();
  }

  return <MovementDetailPage movement={movement} />;
}
