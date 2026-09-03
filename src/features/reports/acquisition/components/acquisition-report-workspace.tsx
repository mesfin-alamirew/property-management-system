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
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="relative">
        {loading && (
          <div className="absolute inset-0 z-10 flex items-start justify-center bg-white/60 pt-8">
            <p className="text-sm text-gray-600">Loading report...</p>
          </div>
        )}

        <AcquisitionReportTable acquisitions={acquisitions} />
      </div>
    </div>
  );
}
