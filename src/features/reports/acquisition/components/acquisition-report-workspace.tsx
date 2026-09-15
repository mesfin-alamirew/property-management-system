'use client';

import { useState } from 'react';

import { getAcquisitionReportAction } from '../actions/acquisition.actions';
import { AcquisitionReportFilters } from './acquisition-report-filters';
import { AcquisitionReportTable } from './acquisition-report-table';

import type {
  AcquisitionReportFilters as AcquisitionReportFiltersType,
  AcquisitionReportRow,
} from '../types/acquisition.types';

type AcquisitionMethodOption = {
  id: string;
  code: string;
  name: string;
};

type AcquisitionReportWorkspaceProps = {
  acquisitionMethods: AcquisitionMethodOption[];
  initialData: AcquisitionReportRow[];
};

export function AcquisitionReportWorkspace({
  acquisitionMethods,
  initialData,
}: AcquisitionReportWorkspaceProps) {
  const [acquisitions, setAcquisitions] =
    useState<AcquisitionReportRow[]>(initialData);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFilter(filters: AcquisitionReportFiltersType) {
    setLoading(true);
    setError(null);

    const result = await getAcquisitionReportAction(filters);

    if (!result.success) {
      setError(result.message);
      setLoading(false);
      return;
    }

    setAcquisitions(result.data);
    setLoading(false);
  }

  return (
    <div className="space-y-6">
      <AcquisitionReportFilters
        acquisitionMethods={acquisitionMethods}
        onFilter={handleFilter}
      />

      {error && (
        <div className="rounded-lg border border-danger bg-danger-surface px-4 py-3 text-sm text-danger">
          {error}
        </div>
      )}

      <div className="relative">
        {loading && (
          <div className="absolute inset-0 z-10 flex items-start justify-center rounded-lg bg-surface/70 pt-8 backdrop-blur-[1px]">
            <div className="rounded-md border border-border bg-surface px-4 py-2 shadow-sm">
              <p className="text-sm font-medium text-muted-foreground">
                Loading report...
              </p>
            </div>
          </div>
        )}

        <AcquisitionReportTable acquisitions={acquisitions} />
      </div>
    </div>
  );
}
