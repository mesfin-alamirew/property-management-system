import { notFound } from 'next/navigation';

import { getPhysicalVerificationById } from '../queries/physical-verification.queries';

import { PhysicalVerificationDetailWorkspace } from './physical-verification-detail-workspace';

type PhysicalVerificationDetailPageProps = {
  id: string;
};

export async function PhysicalVerificationDetailPage({
  id,
}: PhysicalVerificationDetailPageProps) {
  const verification = await getPhysicalVerificationById(id);

  if (!verification) {
    notFound();
  }

  return <PhysicalVerificationDetailWorkspace verification={verification} />;
}
