import {
  ConfidentialClientApplication,
  type Configuration,
} from '@azure/msal-node';

import { azureAdConfig } from './azure-ad.config';

const msalConfig: Configuration = {
  auth: {
    clientId: azureAdConfig.clientId,
    clientSecret: azureAdConfig.clientSecret,
    authority: azureAdConfig.authority,
  },
};

export const azureAdClient = new ConfidentialClientApplication(msalConfig);
