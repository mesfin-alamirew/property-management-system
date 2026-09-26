import { requirePermission } from '@/lib/authorization/authorization.service';
import { prisma } from '@/lib/prisma';

export async function getAssignmentEmployees(userId: string) {
  await requirePermission({
    userId,
    permissionCode: 'REPORT_ASSIGNMENT:READ',
  });
  return prisma.employee.findMany({
    where: {
      isActive: true,
    },
    select: {
      id: true,
      employeeNumber: true,
      firstName: true,
      middleName: true,
      lastName: true,
    },
    orderBy: [
      {
        lastName: 'asc',
      },
      {
        firstName: 'asc',
      },
    ],
  });
}

export async function getAssignmentOrganizationUnits(userId: string) {
  await requirePermission({
    userId,
    permissionCode: 'REPORT_ASSIGNMENT:READ',
  });
  return prisma.organizationUnit.findMany({
    where: {
      isActive: true,
    },
    select: {
      id: true,
      code: true,
      name: true,
    },
    orderBy: {
      name: 'asc',
    },
  });
}

export async function getAssignmentAssetTypes(userId: string) {
  await requirePermission({
    userId,
    permissionCode: 'REPORT_ASSIGNMENT:READ',
  });
  return prisma.assetType.findMany({
    where: {
      isActive: true,
    },
    select: {
      id: true,
      code: true,
      name: true,
    },
    orderBy: {
      name: 'asc',
    },
  });
}
