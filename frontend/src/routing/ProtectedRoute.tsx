import { type ReactNode, useEffect } from 'react';
import { useAuth } from '@/auth/useAuth';

const AUTH_BYPASS = import.meta.env.VITE_AUTH_BYPASS === 'true';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, login, loading } = useAuth();

  useEffect(() => {
    if (AUTH_BYPASS) return; // skip real login
    if (!isAuthenticated && !loading) void login();
  }, [isAuthenticated, loading, login]);
  if (!isAuthenticated && !AUTH_BYPASS) return <div style={{ padding: 16 }}>Authenticating...</div>;
  return <>{children}</>;
};

export default ProtectedRoute;
