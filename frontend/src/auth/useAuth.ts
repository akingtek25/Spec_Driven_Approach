import { useMsal, useIsAuthenticated } from '@azure/msal-react';
import { useEffect, useState } from 'react';

// TEMP AUTH BYPASS FEATURE FLAG
// Set VITE_AUTH_BYPASS=true (or toggle below) to disable real MSAL flows during local dev.
const AUTH_BYPASS = import.meta.env.VITE_AUTH_BYPASS === 'true';

/**
 * useAuth exposes authentication helpers and the primary account.
 */
export function useAuth() {
  if (AUTH_BYPASS) {
    // Return a mocked auth state so the rest of the app can function without Azure AD.
    return {
      isAuthenticated: true,
      user: { username: 'dev.user@example.com', name: 'Dev User (Bypassed Auth)' },
      login: async () => void 0,
      logout: () => void 0,
      loading: false,
    } as const;
  }

  const { instance, accounts, inProgress } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const [loading, setLoading] = useState(false);

  const login = async () => {
    setLoading(true);
    try {
      await instance
        .loginPopup({ scopes: ['User.Read'] })
        .catch(() => instance.loginRedirect({ scopes: ['User.Read'] }));
    } finally {
      setLoading(false);
    }
  };

  const logout = () => instance.logoutRedirect();
  const user = accounts[0];

  // Attempt silent account acquisition on mount if no account (optional pattern)
  useEffect(() => {
    if (!accounts.length) {
      void instance.handleRedirectPromise();
    }
  }, [accounts.length, instance]);

  return { isAuthenticated, user, login, logout, loading: loading || inProgress !== 'none' } as const;
}
