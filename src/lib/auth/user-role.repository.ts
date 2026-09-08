import { prisma } from '@/lib/prisma';

export async function hasActiveRole(userId: string): Promise<boolean> {
  const userRole = await prisma.userRole.findFirst({
    where: {
      userId,
      removedAt: null,

      role: {
        isActive: true,
      },
    },

    select: {
      id: true,
    },
  });

  return userRole !== null;
}
