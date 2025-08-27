import { useEffect } from 'react';
import { Button, Title1, Body1, makeStyles, tokens, Caption1 } from '@fluentui/react-components';
import { useAuth } from '@/auth/useAuth';
import { useNavigate } from 'react-router-dom';

const AUTH_BYPASS = import.meta.env.VITE_AUTH_BYPASS === 'true';

const useStyles = makeStyles({
  root: {
    maxWidth: '420px',
    margin: '64px auto',
    padding: '32px',
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusLarge,
    background: tokens.colorSubtleBackground,
    boxShadow: tokens.shadow4,
  },
  header: { textAlign: 'center', marginBottom: '24px' },
  field: { marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '4px' },
  actions: { display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' },
  logoWrap: { display: 'flex', justifyContent: 'center', marginBottom: '12px' },
  logo: { width: '48px', height: '48px' },
});

const Login = () => {
  const styles = useStyles();
  const { login, loading, isAuthenticated, isBypass, devExpectedEmail, devExpectedPassword } = useAuth() as any;
  const navigate = useNavigate();

  // Redirect any already-authenticated user away from login (avoid navigation during render)
  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard');
  }, [isAuthenticated, navigate]);

  const handleMsal = () => {
    void login();
  };

  return (
    <div className={styles.root} aria-label="Login Panel">
      <header className={styles.header}>
        <div className={styles.logoWrap}>
          {/* Simple SVG placeholder logo */}
          <svg className={styles.logo} viewBox="0 0 64 64" role="img" aria-label="App Logo">
            <circle cx="32" cy="32" r="30" fill={tokens.colorBrandBackground} opacity={0.15} />
            <path
              d="M18 40 L32 16 L46 40 Z"
              fill={tokens.colorBrandBackground}
              stroke={tokens.colorBrandForeground1}
              strokeWidth={2}
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <Title1>Welcome Back</Title1>
        <Body1>Sign in to continue</Body1>
        {AUTH_BYPASS && (
          <Caption1 color="brand">Auth bypass ENABLED – form is decorative only.</Caption1>
        )}
      </header>
      <div className={styles.actions}>
        {isBypass && (
          <Button
            type="button"
            appearance="primary"
            disabled={loading}
            onClick={() => void login(devExpectedEmail, devExpectedPassword)}
          >
            {loading ? 'Entering…' : 'Enter (Bypass Mode)'}
          </Button>
        )}
        {!isBypass && (
          <Button type="button" appearance="primary" disabled={loading} onClick={handleMsal}>
            {loading ? 'Starting sign-in…' : 'Sign in with Microsoft'}
          </Button>
        )}
        {isBypass && (
          <Caption1 color="brand">
            Using bypass credentials. Set VITE_AUTH_BYPASS=false and restart dev server to use Microsoft
            sign-in.
          </Caption1>
        )}
      </div>
    </div>
  );
};

export default Login;