import { prisma } from '@/lib/prisma';

export async function findSystemAdminRole() {
  return prisma.role.findUnique({
    where: {
      code: 'SYSTEM_ADMIN',
    },
  });
}

export async function findActiveSystemAdministrators() {
  return prisma.userRole.findMany({
    where: {
      removedAt: null,
      role: {
        code: 'SYSTEM_ADMIN',
        isActive: true,
      },
      user: {
        isActive: true,
      },
    },
    include: {
      user: true,
      assignedByUser: true,
    },
    orderBy: {
      assignedAt: 'asc',
    },
  });
}

export async function findActiveSystemAdministrator(targetUserId: string) {
  return prisma.userRole.findFirst({
    where: {
      userId: targetUserId,
      removedAt: null,
      role: {
        code: 'SYSTEM_ADMIN',
      },
    },
    include: {
      role: true,
      user: true,
      assignedByUser: true,
    },
  });
}

export async function findUserForSystemAdministratorAssignment(userId: string) {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      identities: {
        select: {
          id: true,
          provider: true,
        },
      },
    },
  });
}

export async function countActiveSystemAdministrators() {
  return prisma.userRole.count({
    where: {
      removedAt: null,
      role: {
        code: 'SYSTEM_ADMIN',
        isActive: true,
      },
      user: {
        isActive: true,
      },
    },
  });
}

export async function findAssignableSystemAdministratorUsers() {
  return prisma.user.findMany({
    where: {
      isActive: true,
      identities: {
        some: {
          provider: 'AZURE_AD',
        },
      },
      userRolesAssigned: {
        none: {
          removedAt: null,
          role: {
            code: 'SYSTEM_ADMIN',
          },
        },
      },
    },
    select: {
      id: true,
      username: true,
      displayName: true,
    },
    orderBy: {
      displayName: 'asc',
    },
  });
}

export async function createSystemAdministratorAssignment(
  userId: string,
  roleId: string,
  assignedByUserId: string,
) {
  return prisma.userRole.create({
    data: {
      userId,
      roleId,
      assignedByUserId,
    },
  });
}

export type RemoveSystemAdministratorResult =
  | {
      status: 'NOT_FOUND';
    }
  | {
      status: 'LAST_ADMIN';
    }
  | {
      status: 'REMOVED';
      assignment: {
        id: string;
      };
    };

export async function removeSystemAdministratorAssignment(
  targetUserId: string,
  removedByUserId: string,
): Promise<RemoveSystemAdministratorResult> {
  return prisma.$transaction(
    async (tx) => {
      const existingAssignment = await tx.userRole.findFirst({
        where: {
          userId: targetUserId,
          removedAt: null,
          role: {
            code: 'SYSTEM_ADMIN',
          },
        },
      });

      if (!existingAssignment) {
        return {
          status: 'NOT_FOUND',
        };
      }

      const activeSystemAdministratorCount = await tx.userRole.count({
        where: {
          removedAt: null,
          role: {
            code: 'SYSTEM_ADMIN',
            isActive: true,
          },
          user: {
            isActive: true,
          },
        },
      });

      if (activeSystemAdministratorCount <= 1) {
        return {
          status: 'LAST_ADMIN',
        };
      }

      const assignment = await tx.userRole.update({
        where: {
          id: existingAssignment.id,
        },
        data: {
          removedAt: new Date(),
          removedByUserId,
        },
        select: {
          id: true,
        },
      });

      return {
        status: 'REMOVED',
        assignment,
      };
    },
    {
      isolationLevel: 'Serializable',
    },
  );
}
