import { prisma } from '@/lib/prisma';

import type { EmployeeFormData } from '../schemas/employee.schema';

export async function findEmployees() {
  return prisma.employee.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      lastName: 'asc',
    },
    include: {
      organizationUnit: {
        select: {
          id: true,
          code: true,
          name: true,
        },
      },
    },
  });
}

export async function findEmployeeById(id: string) {
  return prisma.employee.findUnique({
    where: {
      id,
    },
    include: {
      organizationUnit: {
        select: {
          id: true,
          code: true,
          name: true,
        },
      },
    },
  });
}

export async function findEmployeeByNumber(
  employeeNumber: string,
  excludeId?: string,
) {
  return prisma.employee.findFirst({
    where: {
      employeeNumber,
      NOT: excludeId
        ? {
            id: excludeId,
          }
        : undefined,
    },
  });
}

export async function findActiveEmployeeById(id: string) {
  return prisma.employee.findFirst({
    where: {
      id,
      isActive: true,
    },
  });
}

export async function createEmployeeRecord(data: EmployeeFormData) {
  return prisma.employee.create({
    data: {
      employeeNumber: data.employeeNumber,
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
      organizationUnitId: data.organizationUnitId,
    },
  });
}

export async function updateEmployeeRecord(id: string, data: EmployeeFormData) {
  return prisma.employee.update({
    where: {
      id,
    },
    data: {
      employeeNumber: data.employeeNumber,
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
      organizationUnitId: data.organizationUnitId,
    },
  });
}

export async function deactivateEmployeeRecord(id: string) {
  return prisma.employee.update({
    where: {
      id,
    },
    data: {
      isActive: false,
    },
  });
}
