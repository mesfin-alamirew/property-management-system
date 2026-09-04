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
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {isPending && (
        <p className="text-sm text-gray-500">Loading maintenance report...</p>
      )}

      <MaintenanceReportTable rows={rows} />
    </div>
  );
}
