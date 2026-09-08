import type { AuthProvider } from '@/generated/prisma/client';

import { prisma } from '@/lib/prisma';

type CreateUserWithIdentityInput = {
  provider: AuthProvider;
  externalId: string;
  username: string;
  displayName: string;
};

export async function createUserWithIdentity(
  input: CreateUserWithIdentityInput,
) {
  return prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        username: input.username,
        displayName: input.displayName,
      },
      select: {
        id: true,
        employeeId: true,
        username: true,
        displayName: true,
      },
    });

    await tx.userIdentity.create({
      data: {
        userId: user.id,
        provider: input.provider,
        externalId: input.externalId,
      },
    });

    return user;
  });
}
