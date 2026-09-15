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
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Acquisition Summary
        </h1>

        <p className="mt-1 max-w-3xl text-sm leading-5 text-muted-foreground">
          Analyze acquisition volume, acquired items, funding sources,
          acquisition methods, and acquisition values by currency.
        </p>
      </div>

      <AcquisitionSummaryWorkspace initialData={initialData} />
    </div>
  );
}
