import { type ReactNode, useEffect } from 'react';
import { useAuth } from '@/auth/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';

const AUTH_BYPASS = import.meta.env.VITE_AUTH_BYPASS === 'true';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (AUTH_BYPASS) return;
    if (!isAuthenticated && !loading) {
      navigate('/login', { replace: true, state: { from: location.pathname } });
    }
  }, [isAuthenticated, loading, navigate, location]);
  if (!isAuthenticated && !AUTH_BYPASS) return null; // navigation happening
  return <>{children}</>;
};

export default ProtectedRoute;
