import { loadEnvConfig } from '@next/env';

loadEnvConfig(process.cwd());

async function main() {
  const { prisma } = await import('../src/lib/prisma');

  const {
    createUserSession,
    getAuthenticatedUserFromSession,
    destroyUserSession,
  } = await import('../src/lib/auth/session.service');

  const user = await prisma.user.findUnique({
    where: {
      username: 'dev.user',
    },
  });

  if (!user) {
    throw new Error('Development user not found');
  }

  console.log('Development user:', {
    id: user.id,
    username: user.username,
  });

  const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

  const session = await createUserSession(user.id, expiresAt);

  console.log('Session created:', {
    id: session.id,
    userId: session.userId,
    expiresAt: session.expiresAt,
  });

  const authenticatedUser = await getAuthenticatedUserFromSession(session.id);

  console.log('Authenticated user from session:', authenticatedUser);

  await destroyUserSession(session.id);

  const deletedSessionUser = await getAuthenticatedUserFromSession(session.id);

  console.log(
    'Authenticated user after session destruction:',
    deletedSessionUser,
  );

  await prisma.$disconnect();
}

main().catch(async (error) => {
  console.error(error);
  process.exit(1);
});
