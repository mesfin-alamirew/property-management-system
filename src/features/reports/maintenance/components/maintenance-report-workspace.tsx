'use client';

import { useState, useTransition } from 'react';

import { getMaintenanceReportAction } from '../actions/maintenance.actions';
import type {
  MaintenanceReportFilters as MaintenanceReportFiltersType,
  MaintenanceReportRow,
} from '../types/maintenance.types';
import { MaintenanceReportFilters } from './maintenance-report-filters';
import { MaintenanceReportTable } from './maintenance-report-table';

type MaintenanceReportWorkspaceProps = {
  initialRows: MaintenanceReportRow[];
  assets: {
    id: string;
    assetCode: string;
    assetTag: string | null;
    name: string;
  }[];
  assignedUsers: {
    id: string;
    displayName: string;
  }[];
};

export function MaintenanceReportWorkspace({
  initialRows,
  assets,
  assignedUsers,
}: MaintenanceReportWorkspaceProps) {
  const [rows, setRows] = useState(initialRows);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleApplyFilters(filters: MaintenanceReportFiltersType) {
    setError(null);

    startTransition(async () => {
      const result = await getMaintenanceReportAction(filters);

      if (!result.success) {
        setError(result.message);
        return;
      }

      setRows(result.data);
    });
  }

  return (
    <div className="space-y-6">
      <MaintenanceReportFilters
        assets={assets}
        assignedUsers={assignedUsers}
        onApply={handleApplyFilters}
      />

      {error && (
        <div className="rounded-lg border border-danger bg-danger-surface px-4 py-3 text-sm text-danger">
          {error}
        </div>
      )}

      {isPending && (
        <div className="rounded-lg border border-border bg-surface-muted px-4 py-3">
          <p className="text-sm font-medium text-muted-foreground">
            Loading maintenance report...
          </p>
        </div>
      )}

      <MaintenanceReportTable rows={rows} />
    </div>
  );
}
