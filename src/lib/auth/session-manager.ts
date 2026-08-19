import { createUserSession, destroyUserSession } from './session.service';

import { setSessionCookie, clearSessionCookie } from './session-cookie';

const SESSION_DURATION_MS = 8 * 60 * 60 * 1000;

export async function startUserSession(userId: string) {
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);

  const session = await createUserSession(userId, expiresAt);

  await setSessionCookie(session.id, session.expiresAt);

  return session;
}

export async function endUserSession(sessionId: string) {
  await destroyUserSession(sessionId);

  await clearSessionCookie();
}
