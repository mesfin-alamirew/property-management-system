export type EmployeeWithRelations = {
  id: string;

  employeeNumber: string;

  firstName: string;
  middleName: string | null;
  lastName: string;

  organizationUnitId: string;

  isActive: boolean;

  createdAt: Date;
  updatedAt: Date;

  organizationUnit: {
    id: string;
    code: string;
    name: string;
  };
};
