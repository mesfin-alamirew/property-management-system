import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { AppError } from '@/lib/errors';
import { AccessDenied } from '@/components/ui/access-denied';

import { getAssignmentReport } from '@/features/reports/assignment/queries/assignment.queries';
import {
  getAssignmentAssetTypes,
  getAssignmentEmployees,
  getAssignmentOrganizationUnits,
} from '@/features/reports/assignment/queries/assignment-lookup.queries';

import { AssignmentReportPage } from '@/features/reports/assignment/components/assignment-report-page';

export default async function AssignmentsReportRoute() {
  const user = await requireCurrentUser();

  let initialRows;

  try {
    const [employees, organizationUnits, assetTypes, rows] = await Promise.all([
      getAssignmentEmployees(),
      getAssignmentOrganizationUnits(),
      getAssignmentAssetTypes(),
      getAssignmentReport(user.id, {
        status: 'CURRENT',
      }),
    ]);

    initialRows = {
      employees,
      organizationUnits,
      assetTypes,
      rows,
    };
  } catch (error) {
    if (error instanceof AppError && error.code === 'PERMISSION_DENIED') {
      return <AccessDenied />;
    }

    throw error;
  }

  return (
    <AssignmentReportPage
      employees={initialRows.employees}
      organizationUnits={initialRows.organizationUnits}
      assetTypes={initialRows.assetTypes}
      initialRows={initialRows.rows}
    />
  );
}
