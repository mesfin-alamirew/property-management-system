import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { AppError } from '@/lib/errors';
import { AccessDenied } from '@/components/ui/access-denied';

import { getAcquisitionSummary } from '@/features/reports/acquisition/queries/acquisition.queries';
import { AcquisitionSummaryPage } from '@/features/reports/acquisition/components/acquisition-summary-page';

export default async function AcquisitionSummaryReportRoute() {
  const user = await requireCurrentUser();

  let initialData;

  try {
    initialData = await getAcquisitionSummary(user.id);
  } catch (error) {
    if (error instanceof AppError && error.code === 'PERMISSION_DENIED') {
      return <AccessDenied />;
    }

    throw error;
  }

  return <AcquisitionSummaryPage initialData={initialData} />;
}
