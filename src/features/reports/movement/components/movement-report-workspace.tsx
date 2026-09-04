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
          className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      {isPending && (
        <div className="text-sm text-gray-500">
          Loading asset movement report...
        </div>
      )}

      <MovementReportTable rows={rows} />
    </div>
  );
}
