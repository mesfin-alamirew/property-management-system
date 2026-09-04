import { notFound } from 'next/navigation';

import { getIncidentDetailAction } from '@/features/reports/incident/actions/incident.actions';
import { IncidentDetailPage } from '@/features/reports/incident/components/incident-detail-page';

type IncidentDetailRouteProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page({ params }: IncidentDetailRouteProps) {
  const { id } = await params;

  const result = await getIncidentDetailAction(id);

  if (!result.success) {
    notFound();
  }

  return <IncidentDetailPage incident={result.data} />;
}
