'use client';

import { useState, useTransition } from 'react';

import { getAccountabilityReportAction } from '../actions/accountability.actions';
import { AccountabilityReportFilters } from './accountability-report-filters';
import { AccountabilityReportTable } from './accountability-report-table';
import type {
  AccountabilityExceptionSeverity,
  AccountabilityExceptionType,
  AccountabilityReportFilters as ReportFilters,
  AccountabilityReportRow,
} from '../types/accountability.types';

type LookupOption = {
  id: string;
  code: string;
  name: string;
};

type AccountabilityReportWorkspaceProps = {
  initialRows: AccountabilityReportRow[];
  lookups: {
    organizationUnits: LookupOption[];
    locations: LookupOption[];
    assetTypes: LookupOption[];
    assetStatuses: LookupOption[];
    exceptionTypes: Array<{
      value: AccountabilityExceptionType;
      label: string;
    }>;
    severities: Array<{
      value: AccountabilityExceptionSeverity;
      label: string;
    }>;
  };
};

export function AccountabilityReportWorkspace({
  initialRows,
  lookups,
}: AccountabilityReportWorkspaceProps) {
  const [rows, setRows] = useState(initialRows);
  const [filters, setFilters] = useState<ReportFilters>({});
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleFiltersChange(nextFilters: ReportFilters) {
    setFilters(nextFilters);
    setError(null);

    startTransition(async () => {
      const result = await getAccountabilityReportAction(nextFilters);

      if (!result.success) {
        setError(result.error);
        return;
      }

      setRows(result.data);
    });
  }

  const hasActiveFilters = Object.values(filters).some(
    (value) => value !== undefined && value !== '',
  );

  return (
    <div className="space-y-6">
      <AccountabilityReportFilters
        filters={filters}
        lookups={lookups}
        onChange={handleFiltersChange}
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
          Loading accountability exceptions...
        </div>
      )}

      <AccountabilityReportTable
        rows={rows}
        hasActiveFilters={hasActiveFilters}
      />
    </div>
  );
}
