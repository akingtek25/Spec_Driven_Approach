import { PublicClientApplication, type Configuration } from '@azure/msal-browser';

const clientId = import.meta.env.VITE_AAD_CLIENT_ID as string;
const tenantId = import.meta.env.VITE_AAD_TENANT_ID as string;
const redirectUri = import.meta.env.VITE_AAD_REDIRECT_URI as string;

export const msalConfig: Configuration = {
  auth: {
    clientId,
    authority: `https://login.microsoftonline.com/${tenantId}`,
    redirectUri,
  },
  cache: { cacheLocation: 'localStorage', storeAuthStateInCookie: false },
};

export const msalInstance = new PublicClientApplication(msalConfig);
