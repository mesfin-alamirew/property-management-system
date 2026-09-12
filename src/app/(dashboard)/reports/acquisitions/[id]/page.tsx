import { notFound } from 'next/navigation';

import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { AppError } from '@/lib/errors';
import { AccessDenied } from '@/components/ui/access-denied';

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
  const user = await requireCurrentUser();
  const { id } = await params;

  let acquisition;

  try {
    acquisition = await getAcquisitionDetail(user.id, id);
  } catch (error) {
    if (error instanceof AppError && error.code === 'PERMISSION_DENIED') {
      return <AccessDenied />;
    }

    throw error;
  }

  if (!acquisition) {
    notFound();
  }

  return <AcquisitionDetailPage acquisition={acquisition} />;
}
