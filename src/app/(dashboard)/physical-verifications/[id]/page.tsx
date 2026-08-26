import { notFound } from 'next/navigation';

import { getPhysicalVerificationById } from '@/features/assets/physical-verification/queries/physical-verification.queries';

import { findAssetLocations } from '@/features/assets/asset-location/repositories/asset-location.repository';

import { findAssetConditions } from '@/features/assets/asset-condition/repositories/asset-condition.repository';

import { PhysicalVerificationDetailWorkspace } from '@/features/assets/physical-verification/components/physical-verification-detail-workspace';

type PhysicalVerificationDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PhysicalVerificationDetailPage({
  params,
}: PhysicalVerificationDetailPageProps) {
  const { id } = await params;

  const [verification, assetLocations, assetConditions] = await Promise.all([
    getPhysicalVerificationById(id),
    findAssetLocations(),
    findAssetConditions(),
  ]);

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
