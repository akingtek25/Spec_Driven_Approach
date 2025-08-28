import { Button, Title1, Caption1 } from '@fluentui/react-components';
import { useAuth } from '@/auth/useAuth';
import { useNavigate } from 'react-router-dom';

const AUTH_BYPASS = import.meta.env.VITE_AUTH_BYPASS === 'true';

const Home = () => {
  const { isAuthenticated, isBypass } = useAuth();
  const navigate = useNavigate();
  return (
    <div>
      <Title1>Welcome</Title1>
      <p>
        This is a public page. {isAuthenticated ? 'You are signed in.' : 'You are not signed in.'}
      </p>
      {AUTH_BYPASS && (
        <Caption1 color="brand">
          Dev credential mode enabled. Use the Login page to authenticate with mock credentials.
        </Caption1>
      )}
      {!isAuthenticated && !AUTH_BYPASS && (
        <Button appearance="primary" onClick={() => navigate('/login')}>
          Sign In
        </Button>
      )}
    </div>
  );
};

export default Home;
