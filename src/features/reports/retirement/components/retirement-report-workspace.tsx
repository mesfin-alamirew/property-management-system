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
          className="rounded-lg border border-danger-surface bg-danger-surface px-4 py-3 text-sm text-danger"
        >
          {error}
        </div>
      )}

      {isPending && (
        <div className="rounded-md border border-border bg-surface-muted px-4 py-3 text-sm text-muted-foreground">
          Loading retirement report...
        </div>
      )}

      <RetirementReportTable rows={rows} />
    </div>
  );
}
