import { loadEnvConfig } from '@next/env';

loadEnvConfig(process.cwd());

async function main() {
  const { prisma } = await import('../src/lib/prisma');

  const {
    createUserSession,
    getAuthenticatedUserFromSession,
    destroyUserSession,
  } = await import('../src/lib/auth/session.service');

  const { authorize, requirePermission } =
    await import('../src/lib/authorization/authorization.service');

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

  const createAuthorization = await authorize({
    userId: user.id,
    permissionCode: 'BUILDING:CREATE',
  });

  console.log('BUILDING:CREATE authorization:', createAuthorization);

  const deleteAuthorization = await authorize({
    userId: user.id,
    permissionCode: 'BUILDING:DELETE',
  });

  console.log('BUILDING:DELETE authorization:', deleteAuthorization);

  try {
    await requirePermission({
      userId: user.id,
      permissionCode: 'BUILDING:CREATE',
    });

    console.log('BUILDING:CREATE requirePermission: ALLOWED');
  } catch (error) {
    console.log('BUILDING:CREATE requirePermission: DENIED', error);
  }

  try {
    await requirePermission({
      userId: user.id,
      permissionCode: 'BUILDING:DELETE',
    });

    console.log('BUILDING:DELETE requirePermission: ALLOWED');
  } catch {
    console.log('BUILDING:DELETE requirePermission: DENIED');
  }

  await prisma.$disconnect();
}

main().catch(async (error) => {
  console.error(error);
  process.exit(1);
});
