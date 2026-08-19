import type { AuthenticatedUser } from './auth.types';

import {
  createSession,
  findSessionById,
  deleteSession,
} from './session.repository';

export async function createUserSession(userId: string, expiresAt: Date) {
  return createSession(userId, expiresAt);
}

export async function getAuthenticatedUserFromSession(
  sessionId: string,
): Promise<AuthenticatedUser | null> {
  const session = await findSessionById(sessionId);

  if (!session) {
    return null;
  }

  if (session.expiresAt <= new Date()) {
    await deleteSession(session.id);
    return null;
  }

  if (!session.user.isActive) {
    return null;
  }

  return {
    id: session.user.id,
    employeeId: session.user.employeeId,
    username: session.user.username,
    displayName: session.user.displayName,
  };
}

export async function destroyUserSession(sessionId: string) {
  await deleteSession(sessionId);
}
