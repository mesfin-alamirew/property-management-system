import { requirePermission } from '@/lib/authorization/authorization.service';
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
import { AUDIT_ACTIONS, AUDIT_ENTITY_TYPES } from '@/lib/audit/audit.types';
import { recordAuditEvent } from '@/lib/audit/audit.service';
import { prisma } from '@/lib/prisma';
export async function createEmployee(userId: string, data: EmployeeFormData) {
  await requirePermission({
    userId,
    permissionCode: 'EMPLOYEE:CREATE',
  });

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

  return prisma.$transaction(async (tx) => {
    const employee = await createEmployeeRecord(tx, data);

    await recordAuditEvent(tx, {
      userId,
      action: AUDIT_ACTIONS.EMPLOYEE_CREATED,
      entityType: AUDIT_ENTITY_TYPES.EMPLOYEE,
      entityId: employee.id,
      description: `Employee ${employee.employeeNumber} created`,
      newValue: {
        employeeNumber: employee.employeeNumber,
        firstName: employee.firstName,
        middleName: employee.middleName,
        lastName: employee.lastName,
        organizationUnitId: employee.organizationUnitId,
        isActive: employee.isActive,
      },
    });

    return employee;
  });
}

export async function updateEmployee(
  userId: string,
  id: string,
  data: EmployeeFormData,
) {
  await requirePermission({
    userId,
    permissionCode: 'EMPLOYEE:UPDATE',
  });

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

  return prisma.$transaction(async (tx) => {
    const updatedEmployee = await updateEmployeeRecord(tx, id, data);

    await recordAuditEvent(tx, {
      userId,
      action: AUDIT_ACTIONS.EMPLOYEE_UPDATED,
      entityType: AUDIT_ENTITY_TYPES.EMPLOYEE,
      entityId: updatedEmployee.id,
      description: `Employee ${updatedEmployee.employeeNumber} updated`,
      oldValue: {
        employeeNumber: employee.employeeNumber,
        firstName: employee.firstName,
        middleName: employee.middleName,
        lastName: employee.lastName,
        organizationUnitId: employee.organizationUnitId,
        isActive: employee.isActive,
      },
      newValue: {
        employeeNumber: updatedEmployee.employeeNumber,
        firstName: updatedEmployee.firstName,
        middleName: updatedEmployee.middleName,
        lastName: updatedEmployee.lastName,
        organizationUnitId: updatedEmployee.organizationUnitId,
        isActive: updatedEmployee.isActive,
      },
    });

    return updatedEmployee;
  });
}

export async function deactivateEmployee(userId: string, id: string) {
  await requirePermission({
    userId,
    permissionCode: 'EMPLOYEE:DEACTIVATE',
  });

  const employee = await findEmployeeById(id);

  if (!employee) {
    throw new AppError('Employee not found', 'EMPLOYEE_NOT_FOUND');
  }

  return prisma.$transaction(async (tx) => {
    const deactivatedEmployee = await deactivateEmployeeRecord(tx, id);

    await recordAuditEvent(tx, {
      userId,
      action: AUDIT_ACTIONS.EMPLOYEE_DEACTIVATED,
      entityType: AUDIT_ENTITY_TYPES.EMPLOYEE,
      entityId: deactivatedEmployee.id,
      description: `Employee ${deactivatedEmployee.employeeNumber} deactivated`,
      oldValue: {
        employeeNumber: employee.employeeNumber,
        firstName: employee.firstName,
        middleName: employee.middleName,
        lastName: employee.lastName,
        organizationUnitId: employee.organizationUnitId,
        isActive: employee.isActive,
      },
      newValue: {
        employeeNumber: deactivatedEmployee.employeeNumber,
        firstName: deactivatedEmployee.firstName,
        middleName: deactivatedEmployee.middleName,
        lastName: deactivatedEmployee.lastName,
        organizationUnitId: deactivatedEmployee.organizationUnitId,
        isActive: deactivatedEmployee.isActive,
      },
    });

    return deactivatedEmployee;
  });
}
