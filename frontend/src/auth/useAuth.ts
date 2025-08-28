import { useMsal, useIsAuthenticated } from '@azure/msal-react';
import { useEffect, useState, useCallback } from 'react';

// DEV AUTH MODE
// Set VITE_AUTH_BYPASS=true to enable a simple username/password mock login instead of MSAL.
const AUTH_BYPASS = import.meta.env.VITE_AUTH_BYPASS === 'true';
const DEV_EMAIL = import.meta.env.VITE_DEV_LOGIN_EMAIL || 'dev.user@example.com';
const DEV_PASSWORD = import.meta.env.VITE_DEV_LOGIN_PASSWORD || 'P@ssword1!';

/**
 * useAuth exposes authentication helpers and the primary account.
 */
export function useAuth() {
  // Local dev auth path (credential based mock) -- singleton store shared across all hook consumers
  // (Avoid per-hook state so different components reflect same login status.)
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  type DevAuthState = { authed: boolean; user: { username: string; name: string } | null };
  // Module-level singleton (attached to globalThis to preserve across HMR in dev)
  const globalKey = '__DEV_AUTH_SINGLETON__';
  const singleton: {
    state: DevAuthState;
    setState: (s: DevAuthState) => void;
    listeners: (() => void)[];
  } =
    // @ts-expect-error augment global
    (globalThis[globalKey] ||= {
      state: { authed: false, user: null },
      listeners: [],
      setState(next: DevAuthState) {
        this.state = next;
        this.listeners.forEach((l: () => void) => l());
      },
    });

  const [rev, setRev] = useState(0); // revision to trigger re-render when singleton updates
  const [loadingBypass, setLoadingBypass] = useState(false);

  useEffect(() => {
    if (!AUTH_BYPASS) return; // only subscribe in bypass mode
    const listener = () => setRev((r) => r + 1);
    singleton.listeners.push(listener);
    return () => {
      singleton.listeners = singleton.listeners.filter((l) => l !== listener);
    };
  }, []);

  const devLogin = useCallback(async (email?: string, password?: string) => {
    setLoadingBypass(true);
    try {
      await new Promise((r) => setTimeout(r, 120));
      if (email === DEV_EMAIL && password === DEV_PASSWORD) {
        singleton.setState({ authed: true, user: { username: DEV_EMAIL, name: 'Dev User' } });
        return { success: true } as const;
      }
      return { success: false, error: 'Invalid credentials' } as const;
    } finally {
      setLoadingBypass(false);
    }
  }, []);

  const devLogout = useCallback(() => {
    singleton.setState({ authed: false, user: null });
  }, []);

  if (AUTH_BYPASS) {
    return {
      isAuthenticated: singleton.state.authed,
      user: singleton.state.user,
      login: devLogin,
      logout: devLogout,
      loading: loadingBypass,
      isBypass: true as const,
      devExpectedEmail: DEV_EMAIL,
      devExpectedPassword: DEV_PASSWORD,
      _rev: rev, // internal (debug) not used externally; forces re-render when state changes
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

  return {
    isAuthenticated,
    user,
    login,
    logout,
    loading: loading || inProgress !== 'none',
    isBypass: false as const,
  } as const;
}
