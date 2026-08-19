import type { AuthenticatedUser } from './auth.types';

import type { AuthProvider } from '@/generated/prisma/client';

import { prisma } from '@/lib/prisma';

export async function findUserByIdentity(
  provider: AuthProvider,
  externalId: string,
): Promise<AuthenticatedUser | null> {
  const identity = await prisma.userIdentity.findUnique({
    where: {
      provider_externalId: {
        provider,
        externalId,
      },
    },
    select: {
      user: {
        select: {
          id: true,
          employeeId: true,
          username: true,
          displayName: true,
        },
      },
    },
  });

  return identity?.user ?? null;
}
