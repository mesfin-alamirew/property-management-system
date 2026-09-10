import { notFound } from 'next/navigation';

import { getPhysicalVerificationById } from '../queries/physical-verification.queries';

import { PhysicalVerificationDetailWorkspace } from './physical-verification-detail-workspace';
import { findAssetLocations } from '../../asset-location/repositories/asset-location.repository';
import { findAssetConditions } from '../../asset-condition/repositories/asset-condition.repository';

import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { AppError } from '@/lib/errors';
import { AccessDenied } from '@/components/ui/access-denied';

type PhysicalVerificationDetailPageProps = {
  id: string;
};

export async function PhysicalVerificationDetailPage({
  id,
}: PhysicalVerificationDetailPageProps) {
  const user = await requireCurrentUser();

  let data;

  try {
    data = await Promise.all([
      getPhysicalVerificationById(user.id, id),
      findAssetLocations(),
      findAssetConditions(),
    ]);
  } catch (error) {
    if (error instanceof AppError && error.code === 'PERMISSION_DENIED') {
      return <AccessDenied />;
    }

    throw error;
  }

  const [verification, assetLocations, assetConditions] = data;

  if (!verification) {
    notFound();
  }

  return (
    <PhysicalVerificationDetailWorkspace
      verification={verification}
      assetLocations={assetLocations}
      assetConditions={assetConditions}
    />
  );
}
