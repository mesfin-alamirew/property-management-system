import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { AccessDenied } from '@/components/ui/access-denied';
import { AppError } from '@/lib/errors';

import { getOrganizationUnits } from '@/features/administration/organization-unit/queries/organization-unit.queries';

import { getEmployees } from '../queries/employee.queries';

import { EmployeeWorkspace } from './employee-workspace';

export async function EmployeePage() {
  const user = await requireCurrentUser();

  let employees;
  let organizationUnits;

  try {
    [employees, organizationUnits] = await Promise.all([
      getEmployees(user.id),
      getOrganizationUnits(user.id),
    ]);
  } catch (error) {
    if (error instanceof AppError && error.code === 'PERMISSION_DENIED') {
      return <AccessDenied />;
    }

    throw error;
  }

  return (
    <EmployeeWorkspace
      employees={employees}
      organizationUnits={organizationUnits}
    />
  );
}
