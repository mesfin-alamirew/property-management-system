import { prisma } from '@/lib/prisma';

export async function hasPermission(
  userId: string,
  permissionCode: string,
): Promise<boolean> {
  const userRole = await prisma.userRole.findFirst({
    where: {
      userId,
      removedAt: null,

      user: {
        isActive: true,
      },

      role: {
        isActive: true,

        rolePermissions: {
          some: {
            permission: {
              code: permissionCode,
              isActive: true,
            },
          },
        },
      },
    },

    select: {
      id: true,
    },
  });

  return userRole !== null;
}
