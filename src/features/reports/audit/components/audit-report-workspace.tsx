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
    <div className="space-y-6">
      <AuditReportFilters
        users={users}
        actions={actions}
        entityTypes={entityTypes}
        onApply={handleApply}
      />

      {error ? (
        <div
          role="alert"
          className="rounded-lg border border-danger-surface bg-danger-surface px-4 py-3 text-sm text-danger"
        >
          {error}
        </div>
      ) : null}

      {isPending ? (
        <div className="rounded-md border border-border bg-surface-muted px-4 py-3 text-sm text-muted-foreground">
          Loading audit records...
        </div>
      ) : null}

      <AuditReportTable rows={rows} />
    </div>
  );
}
