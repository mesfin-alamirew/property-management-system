import type {
  AuthenticatedUser,
  AuthIdentity,
  AuthProviderAdapter,
} from './auth.types';

import { resolveAuthenticatedUser } from './identity-mapping.service';

export class AuthenticationService {
  constructor(private readonly provider: AuthProviderAdapter) {}

  async getCurrentUser(): Promise<AuthenticatedUser | null> {
    const identity = await this.provider.getCurrentIdentity();

    if (!identity) {
      return null;
    }

    return this.resolveIdentity(identity);
  }

  async resolveIdentity(
    identity: AuthIdentity,
  ): Promise<AuthenticatedUser | null> {
    return resolveAuthenticatedUser(identity);
  }
}
