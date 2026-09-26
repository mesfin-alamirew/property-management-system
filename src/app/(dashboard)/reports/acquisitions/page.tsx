import { AccessDenied } from '@/components/ui/access-denied';
import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { AppError } from '@/lib/errors';

import { AcquisitionReportPage } from '@/features/reports/acquisition/components/acquisition-report-page';
import {
  getAcquisitionReport,
  getActiveAcquisitionMethods,
} from '@/features/reports/acquisition/queries/acquisition.queries';

export default async function AcquisitionsReportRoute() {
  const user = await requireCurrentUser();

  let initialData;
  let acquisitionMethods;

  try {
    [initialData, acquisitionMethods] = await Promise.all([
      getAcquisitionReport(user.id),
      getActiveAcquisitionMethods(user.id),
    ]);
  } catch (error) {
    if (error instanceof AppError && error.code === 'PERMISSION_DENIED') {
      return <AccessDenied />;
    }

    throw error;
  }

  return (
    <AcquisitionReportPage
      initialData={initialData}
      acquisitionMethods={acquisitionMethods}
    />
  );
}
