import { getAssignmentReport } from '@/features/reports/assignment/queries/assignment.queries';
import {
  getAssignmentAssetTypes,
  getAssignmentEmployees,
  getAssignmentOrganizationUnits,
} from '@/features/reports/assignment/queries/assignment-lookup.queries';

import { AssignmentReportPage } from '@/features/reports/assignment/components/assignment-report-page';

export default async function AssignmentsReportRoute() {
  const [employees, organizationUnits, assetTypes, initialRows] =
    await Promise.all([
      getAssignmentEmployees(),
      getAssignmentOrganizationUnits(),
      getAssignmentAssetTypes(),
      getAssignmentReport({
        status: 'CURRENT',
      }),
    ]);

  return (
    <AssignmentReportPage
      employees={employees}
      organizationUnits={organizationUnits}
      assetTypes={assetTypes}
      initialRows={initialRows}
    />
  );
}
