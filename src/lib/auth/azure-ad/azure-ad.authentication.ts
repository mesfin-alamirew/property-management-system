import { AuthProvider } from '@/generated/prisma/client';

import type { AuthIdentity } from '@/lib/auth/auth.types';

import { azureAdClient } from './azure-ad.client';
import { azureAdConfig } from './azure-ad.config';

export async function authenticateAzureAd(
  authorizationCode: string,
): Promise<AuthIdentity> {
  const result = await azureAdClient.acquireTokenByCode({
    code: authorizationCode,
    scopes: ['openid', 'profile', 'email'],
    redirectUri: azureAdConfig.redirectUri,
  });

  if (!result.idTokenClaims) {
    throw new Error('Azure AD authentication did not return identity claims');
  }

  const claims = result.idTokenClaims as Record<string, unknown>;

  const externalId = claims.oid;

  if (typeof externalId !== 'string' || !externalId) {
    throw new Error('Azure AD identity does not contain an object identifier');
  }

  return {
    provider: AuthProvider.AZURE_AD,
    externalId,
    username:
      typeof claims.preferred_username === 'string'
        ? claims.preferred_username
        : undefined,
    displayName: typeof claims.name === 'string' ? claims.name : undefined,
  };
}
