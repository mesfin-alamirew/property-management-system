import { notFound } from 'next/navigation';

import { getMovementDetailAction } from '@/features/reports/movement/actions/movement.actions';
import { MovementDetailPage } from '@/features/reports/movement/components/movement-detail-page';

type MovementDetailRouteProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page({ params }: MovementDetailRouteProps) {
  const { id } = await params;

  const result = await getMovementDetailAction(id);

  if (!result.success) {
    notFound();
  }

  return <MovementDetailPage movement={result.data} />;
}
