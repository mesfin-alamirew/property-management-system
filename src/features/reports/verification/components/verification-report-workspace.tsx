'use client';

import { useState, useTransition } from 'react';

import { getPhysicalVerificationReportAction } from '../actions/verification.actions';
import { VerificationReportFilters } from './verification-report-filters';
import { VerificationReportTable } from './verification-report-table';

import type {
  PhysicalVerificationReportFilters,
  PhysicalVerificationReportRow,
} from '../types/verification.types';

type OrganizationUnitOption = {
  id: string;
  code: string;
  name: string;
};

type LocationOption = {
  id: string;
  code: string;
  name: string;
};

type VerificationReportWorkspaceProps = {
  organizationUnits: OrganizationUnitOption[];
  locations: LocationOption[];
  initialRows: PhysicalVerificationReportRow[];
};

export function VerificationReportWorkspace({
  organizationUnits,
  locations,
  initialRows,
}: VerificationReportWorkspaceProps) {
  const [rows, setRows] =
    useState<PhysicalVerificationReportRow[]>(initialRows);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleApply(filters: PhysicalVerificationReportFilters) {
    setError(null);

    startTransition(async () => {
      const result = await getPhysicalVerificationReportAction(filters);

      if (!result.success) {
        setError(result.message);
        return;
      }

      setRows(result.data);
    });
  }

  return (
    <div className="space-y-6">
      <VerificationReportFilters
        organizationUnits={organizationUnits}
        locations={locations}
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
          Loading physical verification report...
        </div>
      ) : (
        <VerificationReportTable rows={rows} />
      )}
    </div>
  );
}
