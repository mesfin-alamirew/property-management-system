'use server';

import { redirect } from 'next/navigation';

import { getSessionCookie } from './session-cookie';
import { endUserSession } from './session-manager';

export async function logoutAction() {
  const sessionId = await getSessionCookie();

  if (sessionId) {
    await endUserSession(sessionId);
  }

  redirect('/login');
}
