'use server';

import { redirect } from 'next/navigation';

import { getAzureAdAuthorizationUrl } from './azure-ad.authorization';

export async function azureAdLoginAction() {
  const authorizationUrl = await getAzureAdAuthorizationUrl();

  redirect(authorizationUrl);
}
