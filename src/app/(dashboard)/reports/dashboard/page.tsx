import { AccessDenied } from '@/components/ui/access-denied';
import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { AppError } from '@/lib/errors';
import { getDashboardData } from '@/features/reports/dashboard/queries/dashboard.queries';
import { getDashboardLookups } from '@/features/reports/dashboard/queries/dashboard-lookup.queries';
import { DashboardPage } from '@/features/reports/dashboard/components/dashboard-page';

export default async function Page() {
  let initialData;
  let lookups;

  try {
    const user = await requireCurrentUser();

    [initialData, lookups] = await Promise.all([
      getDashboardData(user.id),
      getDashboardLookups(),
    ]);
  } catch (error) {
    if (error instanceof AppError && error.code === 'PERMISSION_DENIED') {
      return <AccessDenied />;
    }

    throw error;
  }

  return (
    <DashboardPage
      initialData={initialData}
      organizationUnits={lookups.organizationUnits}
      assetTypes={lookups.assetTypes}
      assetStatuses={lookups.assetStatuses}
    />
  );
}
