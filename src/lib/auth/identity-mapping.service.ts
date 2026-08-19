import type { AuthenticatedUser, AuthIdentity } from './auth.types';

import { findUserByIdentity } from './user-identity.repository';

export async function resolveAuthenticatedUser(
  identity: AuthIdentity,
): Promise<AuthenticatedUser | null> {
  return findUserByIdentity(identity.provider, identity.externalId);
}
