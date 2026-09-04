'use client';

import { useState, useTransition } from 'react';

import { getDisposalReportAction } from '../actions/disposal.actions';
import { DisposalReportFilters } from './disposal-report-filters';
import { DisposalReportTable } from './disposal-report-table';
import type {
  DisposalReportFilters as DisposalReportFiltersType,
  DisposalReportRow,
} from '../types/disposal.types';

type DisposalReportWorkspaceProps = {
  initialRows: DisposalReportRow[];
  assets: {
    id: string;
    assetCode: string;
    assetTag: string | null;
    name: string;
  }[];
  users: {
    id: string;
    displayName: string;
  }[];
};

export function DisposalReportWorkspace({
  initialRows,
  assets,
  users,
}: DisposalReportWorkspaceProps) {
  const [rows, setRows] = useState(initialRows);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleApply(filters: DisposalReportFiltersType) {
    setError(null);

    startTransition(async () => {
      const result = await getDisposalReportAction(filters);

      if (!result.success) {
        setError(result.message);
        return;
      }

      setRows(result.data);
    });
  }

  return (
    <div className="space-y-6">
      <DisposalReportFilters
        assets={assets}
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
        <div className="text-sm text-gray-500">Loading disposal report...</div>
      )}

      <DisposalReportTable rows={rows} />
    </div>
  );
}
