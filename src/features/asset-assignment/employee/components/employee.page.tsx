import { getEmployees } from '../queries/employee.queries';
import { getOrganizationUnits } from '@/features/administration/organization-unit/queries/organization-unit.queries';

import { EmployeeWorkspace } from './employee-workspace';

export async function EmployeePage() {
  const [employees, organizationUnits] = await Promise.all([
    getEmployees(),
    getOrganizationUnits(),
  ]);

  return (
    <EmployeeWorkspace
      employees={employees}
      organizationUnits={organizationUnits}
    />
  );
}
