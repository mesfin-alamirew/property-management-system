'use client';

import { useState, useTransition } from 'react';

import { getAssignmentReportAction } from '../actions/assignment.actions';
import { AssignmentReportFilters } from './assignment-report-filters';
import { AssignmentReportTable } from './assignment-report-table';
import type {
  AssignmentReportFilters as AssignmentReportFiltersType,
  AssignmentReportRow,
} from '../types/assignment.types';

type EmployeeOption = {
  id: string;
  employeeNumber: string;
  firstName: string;
  middleName: string | null;
  lastName: string;
};

type OrganizationUnitOption = {
  id: string;
  code: string;
  name: string;
};

type AssetTypeOption = {
  id: string;
  code: string;
  name: string;
};

type AssignmentReportWorkspaceProps = {
  employees: EmployeeOption[];
  organizationUnits: OrganizationUnitOption[];
  assetTypes: AssetTypeOption[];
  initialRows: AssignmentReportRow[];
};

export function AssignmentReportWorkspace({
  employees,
  organizationUnits,
  assetTypes,
  initialRows,
}: AssignmentReportWorkspaceProps) {
  const [rows, setRows] = useState<AssignmentReportRow[]>(initialRows);

  const [error, setError] = useState<string | null>(null);

  const [isPending, startTransition] = useTransition();

  function handleApply(filters: AssignmentReportFiltersType) {
    setError(null);

    startTransition(async () => {
      const result = await getAssignmentReportAction(filters);

      if (!result.success) {
        setError(result.message);
        return;
      }

      setRows(result.data);
    });
  }

  return (
    <div className="space-y-6">
      <AssignmentReportFilters
        employees={employees}
        organizationUnits={organizationUnits}
        assetTypes={assetTypes}
        onApply={handleApply}
      />

      {error ? (
        <div
          role="alert"
          className="rounded-lg border border-danger bg-danger-surface px-4 py-3 text-sm text-danger"
        >
          {error}
        </div>
      ) : null}

      <div className="relative">
        {isPending ? (
          <div className="absolute inset-0 z-10 flex items-start justify-center rounded-lg bg-surface/70 pt-8 backdrop-blur-[1px]">
            <div className="rounded-md border border-border bg-surface px-4 py-2 shadow-sm">
              <p className="text-sm font-medium text-muted-foreground">
                Loading assignments...
              </p>
            </div>
          </div>
        ) : null}

        <AssignmentReportTable rows={rows} />
      </div>
    </div>
  );
}
