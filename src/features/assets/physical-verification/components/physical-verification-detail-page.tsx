import { notFound } from 'next/navigation';

import { getPhysicalVerificationById } from '../queries/physical-verification.queries';

import { PhysicalVerificationDetailWorkspace } from './physical-verification-detail-workspace';
import { findAssetLocations } from '../../asset-location/repositories/asset-location.repository';
import { findAssetConditions } from '../../asset-condition/repositories/asset-condition.repository';

type PhysicalVerificationDetailPageProps = {
  id: string;
};

export async function PhysicalVerificationDetailPage({
  id,
}: PhysicalVerificationDetailPageProps) {
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
