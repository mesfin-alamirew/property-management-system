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
        <div className="rounded-md border p-4 text-sm">{error}</div>
      ) : null}

      {isPending ? (
        <div className="text-sm text-muted-foreground">
          Loading assignments...
        </div>
      ) : null}

      <AssignmentReportTable rows={rows} />
    </div>
  );
}
