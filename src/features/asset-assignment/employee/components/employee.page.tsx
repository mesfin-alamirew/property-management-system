import { getEmployees } from '../queries/employee.queries';
import { getOrganizationUnits } from '@/features/administration/organization-unit/queries/organization-unit.queries';

import { EmployeeWorkspace } from './employee-workspace';
import { requireCurrentUser } from '@/lib/auth/require-current-user';
export async function EmployeePage() {
  const user = await requireCurrentUser();

  const [employees, organizationUnits] = await Promise.all([
    getEmployees(),
    getOrganizationUnits(user.id),
  ]);

  return (
    <EmployeeWorkspace
      employees={employees}
      organizationUnits={organizationUnits}
    />
  );
}
