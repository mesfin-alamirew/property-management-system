import { getDashboardData } from '@/features/reports/dashboard/queries/dashboard.queries';
import { getDashboardLookups } from '@/features/reports/dashboard/queries/dashboard-lookup.queries';
import { DashboardPage } from '@/features/reports/dashboard/components/dashboard-page';

export default async function Page() {
  const [initialData, lookups] = await Promise.all([
    getDashboardData(),
    getDashboardLookups(),
  ]);

  return (
    <DashboardPage
      initialData={initialData}
      organizationUnits={lookups.organizationUnits}
      assetTypes={lookups.assetTypes}
      assetStatuses={lookups.assetStatuses}
    />
  );
}
