import { Button, Title1, Caption1 } from '@fluentui/react-components';
import { useAuth } from '@/auth/useAuth';

const AUTH_BYPASS = import.meta.env.VITE_AUTH_BYPASS === 'true';

const Home = () => {
  const { isAuthenticated, login } = useAuth();
  return (
    <div>
      <Title1>Welcome</Title1>
      <p>This is a public page. {isAuthenticated ? 'You are signed in.' : 'You are not signed in.'}</p>
      {AUTH_BYPASS && (
        <Caption1 color="brand">Auth bypass is ENABLED (VITE_AUTH_BYPASS=true). Real sign-in disabled.</Caption1>
      )}
      {!isAuthenticated && !AUTH_BYPASS && (
        <Button appearance="primary" onClick={() => void login()}>
          Sign In
        </Button>
      )}
    </div>
  );
};

export default Home;
