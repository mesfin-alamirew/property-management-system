import { prisma } from '@/lib/prisma';

export async function getEmployees() {
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

export async function getEmployeeById(id: string) {
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
