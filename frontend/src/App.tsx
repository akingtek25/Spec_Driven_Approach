import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';

import routes from '@/routing/routes';
import AppLayout from '@/layout/AppLayout';

function App() {
  const element = useRoutes(routes);
  return (
    <AppLayout>
      <Suspense fallback={<div style={{ padding: 16 }}>Loading...</div>}>{element}</Suspense>
    </AppLayout>
  );
}

export default App;
