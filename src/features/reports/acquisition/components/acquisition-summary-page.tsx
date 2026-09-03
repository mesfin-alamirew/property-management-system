import { AcquisitionSummaryWorkspace } from './acquisition-summary-workspace';
import type { AcquisitionSummary } from '../types/acquisition.types';

type AcquisitionSummaryPageProps = {
  initialData: AcquisitionSummary;
};

export function AcquisitionSummaryPage({
  initialData,
}: AcquisitionSummaryPageProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Acquisition Summary
        </h1>

        <p className="mt-1 text-sm text-gray-600">
          Analyze acquisition volume, acquired items, funding sources,
          acquisition methods, and acquisition values by currency.
        </p>
      </div>

      <AcquisitionSummaryWorkspace initialData={initialData} />
    </div>
  );
}
