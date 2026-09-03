import { notFound } from 'next/navigation';

import { getPhysicalVerificationDetailAction } from '@/features/reports/verification/actions/verification.actions';
import { VerificationDetailPage } from '@/features/reports/verification/components/verification-detail-page';

type VerificationDetailRouteProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page({ params }: VerificationDetailRouteProps) {
  const { id } = await params;

  const result = await getPhysicalVerificationDetailAction(id);

  if (!result.success) {
    notFound();
  }

  return <VerificationDetailPage {...result.data} />;
}
