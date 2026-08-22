import { notFound } from 'next/navigation';

import { getPhysicalVerificationById } from '@/features/assets/physical-verification/queries/physical-verification.queries';

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

  const verification = await getPhysicalVerificationById(id);

  if (!verification) {
    notFound();
  }

  return <PhysicalVerificationDetailWorkspace verification={verification} />;
}
