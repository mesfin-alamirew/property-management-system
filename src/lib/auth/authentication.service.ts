import type { AuthenticatedUser, AuthProviderAdapter } from './auth.types';

import { resolveAuthenticatedUser } from './identity-mapping.service';

export class AuthenticationService {
  constructor(private readonly provider: AuthProviderAdapter) {}

  async getCurrentUser(): Promise<AuthenticatedUser | null> {
    const identity = await this.provider.getCurrentIdentity();

    if (!identity) {
      return null;
    }

    return resolveAuthenticatedUser(identity);
  }
}
