interface Env {
  aadClientId: string;
  aadTenantId: string;
  aadRedirectUri: string;
  // Whether auth is bypassed (dev only)
  authBypass?: boolean;
}

export const env: Env = {
  aadClientId: import.meta.env.VITE_AAD_CLIENT_ID as string,
  aadTenantId: import.meta.env.VITE_AAD_TENANT_ID as string,
  aadRedirectUri: import.meta.env.VITE_AAD_REDIRECT_URI as string,
  authBypass: import.meta.env.VITE_AUTH_BYPASS === 'true',
};
