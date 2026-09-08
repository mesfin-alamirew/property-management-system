import type { AuthenticatedUser, AuthIdentity } from './auth.types';

import { findUserByIdentity } from './user-identity.repository';
import { createUserWithIdentity } from './user-provisioning.repository';

export async function resolveAuthenticatedUser(
  identity: AuthIdentity,
): Promise<AuthenticatedUser> {
  const existingUser = await findUserByIdentity(
    identity.provider,
    identity.externalId,
  );

  if (existingUser) {
    return existingUser;
  }

  if (!identity.username) {
    throw new Error('Authenticated identity does not contain a username');
  }

  const displayName = identity.displayName ?? identity.username;

  return createUserWithIdentity({
    provider: identity.provider,
    externalId: identity.externalId,
    username: identity.username,
    displayName,
  });
}
