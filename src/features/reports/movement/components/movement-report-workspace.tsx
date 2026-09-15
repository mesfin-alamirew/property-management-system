'use client';

import { useState, useTransition } from 'react';

import { getMovementReportAction } from '../actions/movement.actions';
import { MovementReportFilters } from './movement-report-filters';
import { MovementReportTable } from './movement-report-table';
import type {
  MovementReportFilters as MovementReportFiltersType,
  MovementReportRow,
} from '../types/movement.types';

type MovementReportWorkspaceProps = {
  initialRows: MovementReportRow[];
  assets: {
    id: string;
    assetCode: string;
    assetTag: string | null;
    name: string;
  }[];
  locations: {
    id: string;
    name: string;
  }[];
  users: {
    id: string;
    displayName: string;
  }[];
};

export function MovementReportWorkspace({
  initialRows,
  assets,
  locations,
  users,
}: MovementReportWorkspaceProps) {
  const [rows, setRows] = useState(initialRows);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleApply(filters: MovementReportFiltersType) {
    setError(null);

    startTransition(async () => {
      const result = await getMovementReportAction(filters);

      if (!result.success) {
        setError(result.message);
        return;
      }

      setRows(result.data);
    });
  }

  return (
    <div className="space-y-6">
      <MovementReportFilters
        assets={assets}
        locations={locations}
        users={users}
        onApply={handleApply}
      />

      {error && (
        <div
          role="alert"
          className="rounded-lg border border-danger bg-danger-surface px-4 py-3 text-sm text-danger"
        >
          {error}
        </div>
      )}

      <div className="relative">
        {isPending && (
          <div className="absolute inset-0 z-10 flex items-start justify-center rounded-lg bg-surface/70 pt-8 backdrop-blur-[1px]">
            <div className="rounded-md border border-border bg-surface px-4 py-2 shadow-sm">
              <p className="text-sm font-medium text-muted-foreground">
                Loading asset movement report...
              </p>
            </div>
          </div>
        )}

        <MovementReportTable rows={rows} />
      </div>
    </div>
  );
}
