import { notFound } from 'next/navigation';

import { getDisposalDetailAction } from '@/features/reports/disposal/actions/disposal.actions';
import { DisposalDetailPage } from '@/features/reports/disposal/components/disposal-detail-page';

type DisposalDetailRouteProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page({ params }: DisposalDetailRouteProps) {
  const { id } = await params;

  const result = await getDisposalDetailAction(id);

  if (!result.success) {
    notFound();
  }

  return <DisposalDetailPage disposal={result.data} />;
}
