import { prisma } from '@/lib/prisma';

export async function createSession(userId: string, expiresAt: Date) {
  return prisma.session.create({
    data: {
      userId,
      expiresAt,
    },
    select: {
      id: true,
      userId: true,
      expiresAt: true,
    },
  });
}

export async function findSessionById(sessionId: string) {
  return prisma.session.findUnique({
    where: {
      id: sessionId,
    },
    select: {
      id: true,
      userId: true,
      expiresAt: true,
      user: {
        select: {
          id: true,
          employeeId: true,
          username: true,
          displayName: true,
          isActive: true,
        },
      },
    },
  });
}

export async function deleteSession(sessionId: string) {
  return prisma.session.delete({
    where: {
      id: sessionId,
    },
  });
}
