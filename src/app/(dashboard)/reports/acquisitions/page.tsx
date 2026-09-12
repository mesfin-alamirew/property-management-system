import { requireCurrentUser } from '@/lib/auth/require-current-user';

import {
  getAcquisitionReport,
  getActiveAcquisitionMethods,
} from '@/features/reports/acquisition/queries/acquisition.queries';

import { AcquisitionReportPage } from '@/features/reports/acquisition/components/acquisition-report-page';

export default async function AcquisitionsReportRoute() {
  const user = await requireCurrentUser();

  const [initialData, acquisitionMethods] = await Promise.all([
    getAcquisitionReport(user.id),
    getActiveAcquisitionMethods(),
  ]);

  return (
    <AcquisitionReportPage
      initialData={initialData}
      acquisitionMethods={acquisitionMethods}
    />
  );
}
