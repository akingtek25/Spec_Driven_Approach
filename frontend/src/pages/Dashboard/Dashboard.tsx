import { Title2 } from '@fluentui/react-components';
import { useAuth } from '@/auth/useAuth';

const Dashboard = () => {
  const { user } = useAuth();
  return (
    <div>
      <Title2>Dashboard</Title2>
      <p>Protected content. Signed in as {user?.username || user?.name || 'Unknown'}.</p>
    </div>
  );
};

export default Dashboard;
