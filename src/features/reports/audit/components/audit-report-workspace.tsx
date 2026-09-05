'use client';

import { useState, useTransition } from 'react';

import { getAuditReportAction } from '../actions/audit.actions';
import { AuditReportFilters } from './audit-report-filters';
import { AuditReportTable } from './audit-report-table';
import type {
  AuditReportFilters as AuditReportFiltersType,
  AuditReportRow,
} from '../types/audit.types';

type AuditReportWorkspaceProps = {
  initialRows: AuditReportRow[];
  users: {
    id: string;
    displayName: string;
    username: string;
    isActive: boolean;
  }[];
  actions: string[];
  entityTypes: string[];
};

export function AuditReportWorkspace({
  initialRows,
  users,
  actions,
  entityTypes,
}: AuditReportWorkspaceProps) {
  const [rows, setRows] = useState<AuditReportRow[]>(initialRows);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleApply(filters: AuditReportFiltersType) {
    setError(null);

    startTransition(async () => {
      const result = await getAuditReportAction(filters);

      if (!result.success) {
        setError(result.message);
        return;
      }

      setRows(result.data);
    });
  }

  return (
    <div className="flex flex-col gap-6">
      <AuditReportFilters
        users={users}
        actions={actions}
        entityTypes={entityTypes}
        onApply={handleApply}
      />

      {error ? (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {isPending ? (
        <div className="text-sm text-gray-500">Loading audit records...</div>
      ) : null}

      <AuditReportTable rows={rows} />
    </div>
  );
}
