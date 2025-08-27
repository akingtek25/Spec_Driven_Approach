import { FormEvent, useEffect, useState } from 'react';
import {
  Button,
  Title1,
  Body1,
  Link as FluentLink,
  makeStyles,
  tokens,
  Label,
  Input,
  Caption1,
} from '@fluentui/react-components';
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
  links: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '8px',
  },
  msDivider: {
    textAlign: 'center',
    margin: '16px 0 8px',
    fontSize: '12px',
    color: tokens.colorNeutralForeground3,
  },
});

const Login = () => {
  const styles = useStyles();
  const { login, loading, isAuthenticated, isBypass, devExpectedEmail, devExpectedPassword } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Redirect any already-authenticated user away from login (avoid navigation during render)
  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard');
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (isBypass) {
      const result = await login(email.trim(), password);
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.error || 'Login failed');
      }
      return;
    }
    void login(); // real MSAL
  };

  return (
    <div className={styles.root} aria-label="Login Panel">
      <header className={styles.header}>
        <Title1>Sign in</Title1>
        <Body1>Access your workspace</Body1>
        {AUTH_BYPASS && (
          <Caption1 color="brand">Auth bypass ENABLED – form is decorative only.</Caption1>
        )}
      </header>
      <form onSubmit={handleSubmit} noValidate>
        <div className={styles.field}>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder={devExpectedEmail || 'you@example.com'}
            required
            value={email}
            onChange={(_, v) => setEmail(v.value)}
            disabled={!isBypass}
          />
        </div>
        <div className={styles.field}>
          <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder={devExpectedPassword || 'Password'}
              required
              value={password}
              onChange={(_, v) => setPassword(v.value)}
              disabled={!isBypass}
            />
        </div>
        <div className={styles.actions}>
          <Button type="submit" appearance="primary" disabled={loading}>
            {loading ? 'Signing in…' : 'Login'}
          </Button>
          {/* Microsoft account sign-in button (MSAL) */}
          <Button
            type="button"
            appearance="secondary"
            onClick={() => void login()}
            disabled={loading}
            aria-label="Sign in with Microsoft account"
          >
            {/* Inline SVG Microsoft logo (4-square) following brand colors */}
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <span
                aria-hidden="true"
                style={{
                  width: 16,
                  height: 16,
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gridTemplateRows: 'repeat(2, 1fr)',
                  gap: 2,
                }}
              >
                <span style={{ background: '#F25022' }} />
                <span style={{ background: '#7FBA00' }} />
                <span style={{ background: '#00A4EF' }} />
                <span style={{ background: '#FFB900' }} />
              </span>
              <span>Sign in with Microsoft</span>
            </span>
          </Button>
        </div>
        {error && (
          <Caption1 style={{ color: tokens.colorPaletteRedForeground3 }}>{error}</Caption1>
        )}
        <div className={styles.links}>
          <FluentLink href="#">Forgot Password?</FluentLink>
          <FluentLink href="#">Sign Up</FluentLink>
        </div>
        <div className={styles.msDivider}>or use your Microsoft account</div>
      </form>
    </div>
  );
};

export default Login;