import { azureAdClient } from './azure-ad.client';
import { azureAdConfig } from './azure-ad.config';

const AZURE_AD_SCOPES = ['openid', 'profile', 'email'];

export async function getAzureAdAuthorizationUrl(): Promise<string> {
  return azureAdClient.getAuthCodeUrl({
    scopes: AZURE_AD_SCOPES,
    redirectUri: azureAdConfig.redirectUri,
  });
}
