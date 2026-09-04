import { notFound } from 'next/navigation';

import { getRetirementDetailAction } from '@/features/reports/retirement/actions/retirement.actions';
import { RetirementDetailPage } from '@/features/reports/retirement/components/retirement-detail-page';

type RetirementDetailRouteProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page({ params }: RetirementDetailRouteProps) {
  const { id } = await params;

  const result = await getRetirementDetailAction(id);

  if (!result.success) {
    notFound();
  }

  return <RetirementDetailPage retirement={result.data} />;
}
