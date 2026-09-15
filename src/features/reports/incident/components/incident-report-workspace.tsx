'use client';

import { useState, useTransition } from 'react';

import { getIncidentReportAction } from '../actions/incident.actions';
import type {
  IncidentReportFilters as IncidentReportFiltersType,
  IncidentReportRow,
} from '../types/incident.types';
import { IncidentReportFilters } from './incident-report-filters';
import { IncidentReportTable } from './incident-report-table';

type IncidentReportWorkspaceProps = {
  initialRows: IncidentReportRow[];
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

export function IncidentReportWorkspace({
  initialRows,
  assets,
  users,
}: IncidentReportWorkspaceProps) {
  const [rows, setRows] = useState<IncidentReportRow[]>(initialRows);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleApplyFilters(filters: IncidentReportFiltersType) {
    setError(null);

    startTransition(async () => {
      const result = await getIncidentReportAction(filters);

      if (!result.success) {
        setError(result.message);
        return;
      }

      setRows(result.data);
    });
  }

  return (
    <div className="space-y-6">
      <IncidentReportFilters
        assets={assets}
        users={users}
        onApply={handleApplyFilters}
      />

      {error && (
        <div className="rounded-lg border border-danger-surface bg-danger-surface px-4 py-3">
          <p className="text-sm font-medium text-danger">{error}</p>
        </div>
      )}

      {isPending && (
        <div className="rounded-md border border-border bg-surface-muted px-4 py-3">
          <p className="text-sm text-muted-foreground">
            Loading incident report...
          </p>
        </div>
      )}

      <IncidentReportTable rows={rows} />
    </div>
  );
}
