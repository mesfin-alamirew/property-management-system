import { AccessDenied } from '@/components/ui/access-denied';
import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { AppError } from '@/lib/errors';

import { ExecutiveDashboardPage } from '@/features/reports/executive-dashboard/components/executive-dashboard-page';
import { getExecutiveDashboardData } from '@/features/reports/executive-dashboard/queries/executive-dashboard.queries';

export default async function Page() {
  let initialData;

  try {
    const user = await requireCurrentUser();
    initialData = await getExecutiveDashboardData(user.id);
  } catch (error) {
    if (error instanceof AppError && error.code === 'PERMISSION_DENIED') {
      return <AccessDenied />;
    }

    throw error;
  }

  return <ExecutiveDashboardPage initialData={initialData} />;
}
