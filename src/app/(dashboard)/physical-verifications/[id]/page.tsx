import { notFound } from 'next/navigation';

import { getPhysicalVerificationById } from '@/features/assets/physical-verification/queries/physical-verification.queries';

import { findAssetLocations } from '@/features/assets/asset-location/repositories/asset-location.repository';

import { findAssetConditions } from '@/features/assets/asset-condition/repositories/asset-condition.repository';

import { PhysicalVerificationDetailWorkspace } from '@/features/assets/physical-verification/components/physical-verification-detail-workspace';

import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { AppError } from '@/lib/errors';
import { AccessDenied } from '@/components/ui/access-denied';

type PhysicalVerificationDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PhysicalVerificationDetailPage({
  params,
}: PhysicalVerificationDetailPageProps) {
  const { id } = await params;

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
