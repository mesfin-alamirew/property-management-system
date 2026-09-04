import { MaintenanceDetailPage } from '@/features/reports/maintenance/components/maintenance-detail-page';

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  return <MaintenanceDetailPage maintenanceId={id} />;
}
