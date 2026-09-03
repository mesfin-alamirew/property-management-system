import type { AssignmentReportRow } from '../types/assignment.types';

import { AssignmentReportWorkspace } from './assignment-report-workspace';

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

type AssignmentReportPageProps = {
  employees: EmployeeOption[];
  organizationUnits: OrganizationUnitOption[];
  assetTypes: AssetTypeOption[];
  initialRows: AssignmentReportRow[];
};

export function AssignmentReportPage({
  employees,
  organizationUnits,
  assetTypes,
  initialRows,
}: AssignmentReportPageProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Asset Assignment Report</h1>

        <p className="mt-1 text-sm text-muted-foreground">
          View current and historical asset assignments, including assigned
          employees and organizational locations.
        </p>
      </div>

      <AssignmentReportWorkspace
        employees={employees}
        organizationUnits={organizationUnits}
        assetTypes={assetTypes}
        initialRows={initialRows}
      />
    </div>
  );
}
