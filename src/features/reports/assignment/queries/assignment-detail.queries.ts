import { prisma } from '@/lib/prisma';

export async function getAssignmentDetail(id: string) {
  return prisma.assetAssignment.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      assignedAt: true,
      returnedAt: true,
      notes: true,

      asset: {
        select: {
          id: true,
          assetCode: true,
          assetTag: true,
          name: true,
          description: true,
          manufacturer: true,
          model: true,
          serialNumber: true,

          assetType: {
            select: {
              id: true,
              code: true,
              name: true,
            },
          },

          status: {
            select: {
              id: true,
              code: true,
              name: true,
            },
          },

          condition: {
            select: {
              id: true,
              code: true,
              name: true,
            },
          },

          location: {
            select: {
              id: true,
              code: true,
              name: true,

              organizationUnit: {
                select: {
                  id: true,
                  code: true,
                  name: true,
                },
              },
            },
          },
        },
      },

      employee: {
        select: {
          id: true,
          employeeNumber: true,
          firstName: true,
          middleName: true,
          lastName: true,

          organizationUnit: {
            select: {
              id: true,
              code: true,
              name: true,
            },
          },
        },
      },

      assignedByUser: {
        select: {
          id: true,
          displayName: true,
        },
      },

      returnedByUser: {
        select: {
          id: true,
          displayName: true,
        },
      },
    },
  });
}

export async function getAssignmentHistory(assetId: string) {
  return prisma.assetAssignment.findMany({
    where: {
      assetId,
    },
    select: {
      id: true,
      assignedAt: true,
      returnedAt: true,
      notes: true,

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
          displayName: true,
        },
      },

      returnedByUser: {
        select: {
          id: true,
          displayName: true,
        },
      },
    },
    orderBy: {
      assignedAt: 'desc',
    },
  });
}
