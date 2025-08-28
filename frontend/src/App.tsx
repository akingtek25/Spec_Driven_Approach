import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';

import { NavigationProvider } from '@/context/NavigationContext';
import AppLayout from '@/layout/AppLayout';
import routes from '@/routing/routes';

function App() {
  const element = useRoutes(routes);
  return (
    <NavigationProvider>
      <AppLayout>
        <Suspense fallback={<div style={{ padding: 16 }}>Loading...</div>}>{element}</Suspense>
      </AppLayout>
    </NavigationProvider>
  );
}

export default App;
