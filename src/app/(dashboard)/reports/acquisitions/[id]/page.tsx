import { notFound } from 'next/navigation';

import { getAcquisitionDetail } from '@/features/reports/acquisition/queries/acquisition.queries';
import { AcquisitionDetailPage } from '@/features/reports/acquisition/components/acquisition-detail-page';

type AcquisitionDetailRouteProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AcquisitionDetailRoute({
  params,
}: AcquisitionDetailRouteProps) {
  const { id } = await params;

  const acquisition = await getAcquisitionDetail(id);

  if (!acquisition) {
    notFound();
  }

  return <AcquisitionDetailPage acquisition={acquisition} />;
}
