import {
  Title1,
  Subtitle2,
  Badge,
  tokens,
  Card,
  CardHeader,
  CardPreview,
} from '@fluentui/react-components';
import { useAuth } from '@/auth/useAuth';

const Dashboard = () => {
  const { user } = useAuth();
  const username = user?.username || user?.name || 'Unknown';
  return (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Title1>Dashboard</Title1>
        <Badge color="brand" appearance="outline">
          Protected
        </Badge>
      </div>
      <Subtitle2 style={{ color: tokens.colorNeutralForeground2 }}>
        You are signed in as <strong>{username}</strong>
      </Subtitle2>
      <Card appearance="filled-alternative" style={{ maxWidth: 480 }}>
        <CardHeader header={<span>Environment</span>} />
        <CardPreview>
          <div style={{ fontSize: 12, lineHeight: 1.4 }}>
            <div>
              Auth Mode:{' '}
              <code>{import.meta.env.VITE_AUTH_BYPASS === 'true' ? 'Bypass (Mock)' : 'MSAL'}</code>
            </div>
            {import.meta.env.VITE_AUTH_BYPASS === 'true' && (
              <div style={{ marginTop: 8 }}>
                Using mock credentials. Change <code>VITE_DEV_LOGIN_EMAIL</code> /{' '}
                <code>VITE_DEV_LOGIN_PASSWORD</code> in <code>.env</code> to adjust.
              </div>
            )}
          </div>
        </CardPreview>
      </Card>
    </div>
  );
};

export default Dashboard;
