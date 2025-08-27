import { PropsWithChildren } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button, Toolbar, ToolbarButton, makeStyles, tokens } from '@fluentui/react-components';
import { useAuth } from '@/auth/useAuth';

const useStyles = makeStyles({
  root: { display: 'flex', flexDirection: 'column', minHeight: '100vh' },
  toolbar: { borderBottom: `1px solid ${tokens.colorNeutralStroke2}`, padding: '0 8px' },
  main: { flex: 1, padding: '16px', width: '100%', maxWidth: '1200px', margin: '0 auto' },
  grow: { flexGrow: 1 },
  navLink: {
    color: tokens.colorBrandForegroundLink,
    textDecoration: 'none',
    fontWeight: 500,
    ':hover': { textDecoration: 'underline' },
    marginRight: '16px',
  },
  active: { textDecoration: 'underline' },
});

const AppLayout = ({ children }: PropsWithChildren) => {
  const styles = useStyles();
  const { isAuthenticated, user, login, logout, loading } = useAuth();
  const { pathname } = useLocation();

  const hideToolbar = pathname === '/' || pathname.startsWith('/login');

  return (
    <div className={styles.root}>
      {!hideToolbar && (
        <Toolbar className={styles.toolbar}>
        <Link to="/" className={styles.navLink + (pathname === '/' ? ' ' + styles.active : '')}>
          Home
        </Link>
        <Link
          to="/dashboard"
          className={
            styles.navLink + (pathname.startsWith('/dashboard') ? ' ' + styles.active : '')
          }
        >
          Dashboard
        </Link>
        <div className={styles.grow} />
        {isAuthenticated ? (
          <>
            <span style={{ marginRight: 8 }}>{user?.username || user?.name}</span>
            <ToolbarButton appearance="primary" onClick={logout} disabled={loading}>
              Logout
            </ToolbarButton>
          </>
        ) : (
          <Button appearance="primary" onClick={() => void login()} disabled={loading}>
            Sign In
          </Button>
        )}
        </Toolbar>
      )}
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default AppLayout;
