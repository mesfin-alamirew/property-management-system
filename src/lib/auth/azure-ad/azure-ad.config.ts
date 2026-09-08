function getRequiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

const tenantId = getRequiredEnv('AZURE_AD_TENANT_ID');

export const azureAdConfig = {
  clientId: getRequiredEnv('AZURE_AD_CLIENT_ID'),
  clientSecret: getRequiredEnv('AZURE_AD_CLIENT_SECRET'),
  tenantId,
  redirectUri: getRequiredEnv('AZURE_AD_REDIRECT_URI'),
  authority: `https://login.microsoftonline.com/${tenantId}`,
};
