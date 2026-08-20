'use server';

import { redirect } from 'next/navigation';

import { AppError } from '@/lib/errors';

import { AuthenticationService } from './authentication.service';
import { DevAuthProvider } from './dev-auth.provider';
import { startUserSession } from './session-manager';

export async function devLoginAction() {
  try {
    const provider = new DevAuthProvider();

    const authenticationService = new AuthenticationService(provider);

    const user = await authenticationService.getCurrentUser();

    if (!user) {
      throw new AppError(
        'Development authentication failed',
        'UNAUTHENTICATED',
      );
    }

    await startUserSession(user.id);
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError(
      'Unable to start development session',
      'AUTHENTICATION_FAILED',
    );
  }

  redirect('/buildings');
}
