import { prisma } from '@/lib/prisma';

export async function getAssetAssignments() {
  return prisma.assetAssignment.findMany({
    orderBy: {
      assignedAt: 'desc',
    },

    include: {
      asset: {
        select: {
          id: true,
          assetCode: true,
          assetTag: true,
          name: true,
        },
      },

      employee: {
        select: {
          id: true,
          employeeNumber: true,
          firstName: true,
          middleName: true,
          lastName: true,
        },
      },

      assignedByUser: {
        select: {
          id: true,
          username: true,
          displayName: true,
        },
      },

      returnedByUser: {
        select: {
          id: true,
          username: true,
          displayName: true,
        },
      },
    },
  });
}

export async function getAssetAssignmentById(id: string) {
  return prisma.assetAssignment.findUnique({
    where: {
      id,
    },

    include: {
      asset: {
        select: {
          id: true,
          assetCode: true,
          assetTag: true,
          name: true,
        },
      },

      employee: {
        select: {
          id: true,
          employeeNumber: true,
          firstName: true,
          middleName: true,
          lastName: true,
        },
      },

      assignedByUser: {
        select: {
          id: true,
          username: true,
          displayName: true,
        },
      },

      returnedByUser: {
        select: {
          id: true,
          username: true,
          displayName: true,
        },
      },
    },
  });
}

export async function getCurrentAssetAssignment(assetId: string) {
  return prisma.assetAssignment.findFirst({
    where: {
      assetId,
      returnedAt: null,
    },

    orderBy: {
      assignedAt: 'desc',
    },

    include: {
      asset: {
        select: {
          id: true,
          assetCode: true,
          assetTag: true,
          name: true,
        },
      },

      employee: {
        select: {
          id: true,
          employeeNumber: true,
          firstName: true,
          middleName: true,
          lastName: true,
        },
      },

      assignedByUser: {
        select: {
          id: true,
          username: true,
          displayName: true,
        },
      },

      returnedByUser: {
        select: {
          id: true,
          username: true,
          displayName: true,
        },
      },
    },
  });
}

export async function getEmployeeAssetAssignments(employeeId: string) {
  return prisma.assetAssignment.findMany({
    where: {
      employeeId,
    },

    orderBy: {
      assignedAt: 'desc',
    },

    include: {
      asset: {
        select: {
          id: true,
          assetCode: true,
          assetTag: true,
          name: true,
        },
      },

      employee: {
        select: {
          id: true,
          employeeNumber: true,
          firstName: true,
          middleName: true,
          lastName: true,
        },
      },

      assignedByUser: {
        select: {
          id: true,
          username: true,
          displayName: true,
        },
      },

      returnedByUser: {
        select: {
          id: true,
          username: true,
          displayName: true,
        },
      },
    },
  });
}

export async function getActiveEmployees() {
  return prisma.employee.findMany({
    where: {
      isActive: true,
    },

    orderBy: [
      {
        firstName: 'asc',
      },
      {
        lastName: 'asc',
      },
    ],

    select: {
      id: true,
      employeeNumber: true,
      firstName: true,
      middleName: true,
      lastName: true,
    },
  });
}

export async function getAvailableAssets() {
  return prisma.asset.findMany({
    where: {
      assetAssignments: {
        none: {
          returnedAt: null,
        },
      },
    },

    orderBy: {
      name: 'asc',
    },

    select: {
      id: true,
      assetCode: true,
      assetTag: true,
      name: true,
    },
  });
}
