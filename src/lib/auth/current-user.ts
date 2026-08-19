import type { AuthenticatedUser } from './auth.types';

import { getSessionCookie } from './session-cookie';
import { getAuthenticatedUserFromSession } from './session.service';

export async function getCurrentUser(): Promise<AuthenticatedUser | null> {
  const sessionId = await getSessionCookie();

  if (!sessionId) {
    return null;
  }

  return getAuthenticatedUserFromSession(sessionId);
}
