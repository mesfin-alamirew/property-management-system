import {
  getAcquisitionReport,
  getActiveAcquisitionMethods,
} from '@/features/reports/acquisition/queries/acquisition.queries';

import { AcquisitionReportPage } from '@/features/reports/acquisition/components/acquisition-report-page';

export default async function AcquisitionsReportRoute() {
  const [initialData, acquisitionMethods] = await Promise.all([
    getAcquisitionReport(),
    getActiveAcquisitionMethods(),
  ]);

  return (
    <AcquisitionReportPage
      initialData={initialData}
      acquisitionMethods={acquisitionMethods}
    />
  );
}
