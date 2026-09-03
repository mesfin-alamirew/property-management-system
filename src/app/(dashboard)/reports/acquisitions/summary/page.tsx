import { getAcquisitionSummary } from '@/features/reports/acquisition/queries/acquisition.queries';
import { AcquisitionSummaryPage } from '@/features/reports/acquisition/components/acquisition-summary-page';

export default async function AcquisitionSummaryReportRoute() {
  const initialData = await getAcquisitionSummary();

  return <AcquisitionSummaryPage initialData={initialData} />;
}
