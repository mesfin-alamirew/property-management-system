import { prisma } from '@/lib/prisma';

import type { CreateRoleInput, UpdateRoleInput } from '../types/role.types';

export async function findRoles() {
  return prisma.role.findMany({
    orderBy: {
      name: 'asc',
    },
  });
}

export async function findRoleById(id: string) {
  return prisma.role.findUnique({
    where: {
      id,
    },
    include: {
      rolePermissions: true,
      userRoles: {
        where: {
          removedAt: null,
        },
      },
    },
  });
}

export async function findRoleByCode(code: string) {
  return prisma.role.findUnique({
    where: {
      code,
    },
  });
}

export async function createRoleRecord(data: CreateRoleInput) {
  return prisma.role.create({
    data: {
      code: data.code,
      name: data.name,
      description: data.description,
    },
  });
}

export async function updateRoleRecord(id: string, data: UpdateRoleInput) {
  return prisma.role.update({
    where: {
      id,
    },
    data: {
      name: data.name,
      description: data.description,
    },
  });
}
export async function activateRoleRecord(id: string) {
  return prisma.role.update({
    where: {
      id,
    },
    data: {
      isActive: true,
    },
  });
}
export async function deactivateRoleRecord(id: string) {
  return prisma.role.update({
    where: {
      id,
    },
    data: {
      isActive: false,
    },
  });
}

export async function findRolePermissions(roleId: string) {
  return prisma.rolePermission.findMany({
    where: {
      roleId,
    },
    include: {
      permission: true,
    },
    orderBy: {
      permission: {
        resource: 'asc',
      },
    },
  });
}

export async function findRolePermission(roleId: string, permissionId: string) {
  return prisma.rolePermission.findUnique({
    where: {
      roleId_permissionId: {
        roleId,
        permissionId,
      },
    },
  });
}

export async function createRolePermissionRecord(
  roleId: string,
  permissionId: string,
) {
  return prisma.rolePermission.create({
    data: {
      roleId,
      permissionId,
    },
  });
}

export async function deleteRolePermissionRecord(
  roleId: string,
  permissionId: string,
) {
  return prisma.rolePermission.delete({
    where: {
      roleId_permissionId: {
        roleId,
        permissionId,
      },
    },
  });
}

export async function findActiveUserRole(userId: string, roleId: string) {
  return prisma.userRole.findFirst({
    where: {
      userId,
      roleId,
      removedAt: null,
    },
  });
}
export async function findActiveSystemAdminRole(userId: string) {
  return prisma.userRole.findFirst({
    where: {
      userId,
      removedAt: null,

      role: {
        code: 'SYSTEM_ADMIN',
      },
    },
  });
}
export async function findUserRoles(userId: string) {
  return prisma.userRole.findMany({
    where: {
      userId,
    },
    include: {
      role: true,
      assignedByUser: true,
      removedByUser: true,
    },
    orderBy: {
      assignedAt: 'desc',
    },
  });
}

export async function createUserRoleRecord(
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

export async function removeUserRoleRecord(
  id: string,
  removedByUserId: string,
) {
  return prisma.userRole.update({
    where: {
      id,
    },
    data: {
      removedAt: new Date(),
      removedByUserId,
    },
  });
}
export async function findPermissions() {
  return prisma.permission.findMany({
    where: {
      isActive: true,
    },
    orderBy: [
      {
        resource: 'asc',
      },
      {
        action: 'asc',
      },
    ],
  });
}
export async function findRoleUsers(roleId: string) {
  return prisma.userRole.findMany({
    where: {
      roleId,
      removedAt: null,
    },
    include: {
      user: true,
      assignedByUser: true,
      removedByUser: true,
      role: true,
    },
    orderBy: {
      assignedAt: 'desc',
    },
  });
}
export async function findActiveUsers() {
  return prisma.user.findMany({
    where: {
      isActive: true,

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
