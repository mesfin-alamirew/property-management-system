import { requirePermission } from '@/lib/authorization/authorization.service';
import { prisma } from '@/lib/prisma';

export async function getEmployees(userId: string) {
  await requirePermission({
    userId,
    permissionCode: 'EMPLOYEE:READ',
  });

  return prisma.employee.findMany({
    where: {
      isActive: true,
      organizationUnit: {
        isActive: true,
      },
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

export async function getEmployeeById(userId: string, id: string) {
  await requirePermission({
    userId,
    permissionCode: 'EMPLOYEE:READ',
  });

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
