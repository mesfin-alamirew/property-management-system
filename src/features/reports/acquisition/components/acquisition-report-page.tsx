import { AcquisitionReportWorkspace } from './acquisition-report-workspace';

import type { AcquisitionReportRow } from '../types/acquisition.types';

type AcquisitionMethodOption = {
  id: string;
  code: string;
  name: string;
};

type AcquisitionReportPageProps = {
  acquisitionMethods: AcquisitionMethodOption[];
  initialData: AcquisitionReportRow[];
};

export function AcquisitionReportPage({
  acquisitionMethods,
  initialData,
}: AcquisitionReportPageProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Acquisition Report
        </h1>

        <p className="mt-1 max-w-3xl text-sm leading-5 text-muted-foreground">
          Review acquisitions, acquisition methods, suppliers, funding sources,
          acquired items, and acquisition values.
        </p>
      </div>

      <AcquisitionReportWorkspace
        acquisitionMethods={acquisitionMethods}
        initialData={initialData}
      />
    </div>
  );
}
