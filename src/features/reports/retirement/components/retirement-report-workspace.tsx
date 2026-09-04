'use client';

import { useState, useTransition } from 'react';

import { RetirementReportFilters } from './retirement-report-filters';
import { RetirementReportTable } from './retirement-report-table';
import type {
  RetirementReportFilters as RetirementReportFiltersType,
  RetirementReportRow,
} from '../types/retirement.types';
import { getRetirementReportAction } from '../actions/retirement.actions';

type RetirementReportWorkspaceProps = {
  initialRows: RetirementReportRow[];
  assets: {
    id: string;
    assetCode: string;
    assetTag: string | null;
    name: string;
  }[];
  conditions: {
    id: string;
    name: string;
  }[];
  users: {
    id: string;
    displayName: string;
  }[];
};

export function RetirementReportWorkspace({
  initialRows,
  assets,
  conditions,
  users,
}: RetirementReportWorkspaceProps) {
  const [rows, setRows] = useState(initialRows);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleApply(filters: RetirementReportFiltersType) {
    setError(null);

    startTransition(async () => {
      const result = await getRetirementReportAction(filters);

      if (!result.success) {
        setError(result.message);
        return;
      }

      setRows(result.data);
    });
  }

  return (
    <div className="space-y-6">
      <RetirementReportFilters
        assets={assets}
        conditions={conditions}
        users={users}
        onApply={handleApply}
      />

      {error && (
        <div
          role="alert"
          className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      {isPending && (
        <div className="text-sm text-gray-500">
          Loading retirement report...
        </div>
      )}

      <RetirementReportTable rows={rows} />
    </div>
  );
}
