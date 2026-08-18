import { AppError } from '@/lib/errors';

import {
  findEmployeeByNumber,
  findEmployeeById,
  createEmployeeRecord,
  updateEmployeeRecord,
  deactivateEmployeeRecord,
} from '../repositories/employee.repository';

import { findOrganizationUnitById } from '@/features/administration/organization-unit/repositories/organization-unit.repository';

import type { EmployeeFormData } from '../schemas/employee.schema';

export async function createEmployee(data: EmployeeFormData) {
  const organizationUnit = await findOrganizationUnitById(
    data.organizationUnitId,
  );

  if (!organizationUnit) {
    throw new AppError(
      'Organization Unit not found',
      'ORGANIZATION_UNIT_NOT_FOUND',
    );
  }

  if (!organizationUnit.isActive) {
    throw new AppError(
      'Organization Unit is inactive',
      'ORGANIZATION_UNIT_INACTIVE',
    );
  }

  const existingEmployee = await findEmployeeByNumber(data.employeeNumber);

  if (existingEmployee) {
    throw new AppError(
      'Employee number already exists',
      'DUPLICATE_EMPLOYEE_NUMBER',
    );
  }

  return createEmployeeRecord(data);
}

export async function updateEmployee(id: string, data: EmployeeFormData) {
  const employee = await findEmployeeById(id);

  if (!employee) {
    throw new AppError('Employee not found', 'EMPLOYEE_NOT_FOUND');
  }

  const organizationUnit = await findOrganizationUnitById(
    data.organizationUnitId,
  );

  if (!organizationUnit) {
    throw new AppError(
      'Organization Unit not found',
      'ORGANIZATION_UNIT_NOT_FOUND',
    );
  }

  if (!organizationUnit.isActive) {
    throw new AppError(
      'Organization Unit is inactive',
      'ORGANIZATION_UNIT_INACTIVE',
    );
  }

  const existingEmployee = await findEmployeeByNumber(data.employeeNumber, id);

  if (existingEmployee) {
    throw new AppError(
      'Employee number already exists',
      'DUPLICATE_EMPLOYEE_NUMBER',
    );
  }

  return updateEmployeeRecord(id, data);
}

export async function deactivateEmployee(id: string) {
  const employee = await findEmployeeById(id);

  if (!employee) {
    throw new AppError('Employee not found', 'EMPLOYEE_NOT_FOUND');
  }

  return deactivateEmployeeRecord(id);
}
