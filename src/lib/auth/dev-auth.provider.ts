import type { AuthIdentity, AuthProviderAdapter } from './auth.types';

import { AuthProvider } from '@/generated/prisma/client';

export class DevAuthProvider implements AuthProviderAdapter {
  async getCurrentIdentity(): Promise<AuthIdentity | null> {
    const externalId = process.env.DEV_AUTH_EXTERNAL_ID;

    if (!externalId) {
      return null;
    }

    return {
      provider: AuthProvider.LOCAL,
      externalId,
    };
  }
}
