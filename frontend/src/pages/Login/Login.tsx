import { FormEvent } from 'react';
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
  const { login, loading, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) {
    // If already authenticated (including bypass), send user to dashboard.
    navigate('/dashboard');
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (AUTH_BYPASS) {
      // No-op; bypass means user is considered logged in globally.
      navigate('/dashboard');
      return;
    }
    void login();
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
          <Input id="email" type="email" placeholder="you@example.com" required disabled={!AUTH_BYPASS} />
        </div>
        <div className={styles.field}>
          <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="Password" required disabled={!AUTH_BYPASS} />
        </div>
        <div className={styles.actions}>
          <Button type="submit" appearance="primary" disabled={loading}>
            {loading ? 'Signing in...' : 'Login'}
          </Button>
          <Button
            type="button"
            appearance="secondary"
            onClick={() => void login()}
            disabled={loading}
          >
            Sign in with Microsoft
          </Button>
        </div>
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