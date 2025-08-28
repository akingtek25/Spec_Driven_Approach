import { PropsWithChildren } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Button, Toolbar, ToolbarButton, makeStyles, tokens } from '@fluentui/react-components';

import { useAuth } from '@/auth/useAuth';
import { NavigationSidebar } from '@/components/Navigation';
import { useNavigation } from '@/context/NavigationContext';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    position: 'relative',
  },
  toolbar: {
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    padding: '0 8px',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: tokens.colorNeutralBackground1,
    zIndex: 1001, // Above sidebar
    transition: 'left 0.3s ease-in-out',
  },
  toolbarWithSidebar: {
    // Toolbar shifts with sidebar on desktop
  },
  toolbarMobile: {
    left: 0, // Always full width on mobile
  },
  main: {
    flex: 1,
    padding: '80px 16px 16px', // Top padding for fixed toolbar
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    transition: 'margin-left 0.3s ease-in-out',
  },
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
  const { isCollapsed, isMobile } = useNavigation();

  const hideNavigation = pathname === '/' || pathname.startsWith('/login');

  // Calculate toolbar positioning based on sidebar state
  const getToolbarStyle = () => {
    if (hideNavigation || isMobile) {
      return {};
    }
    return {
      left: isCollapsed ? '60px' : '240px',
    };
  };

  // Calculate main content margin
  const getMainStyle = () => {
    if (hideNavigation) {
      return { marginLeft: 0 };
    }
    if (isMobile) {
      return { marginLeft: 0 };
    }
    return {
      marginLeft: isCollapsed ? '60px' : '240px',
    };
  };

  return (
    <div className={styles.root}>
      {/* Navigation Sidebar - only show when authenticated and not on login pages */}
      {!hideNavigation && <NavigationSidebar />}

      {/* Top Toolbar */}
      {!hideNavigation && (
        <Toolbar className={styles.toolbar} style={getToolbarStyle()}>
          {/* Legacy navigation links - can be removed once sidebar is primary */}
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

      {/* Main Content Area */}
      <main className={styles.main} style={getMainStyle()}>
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
