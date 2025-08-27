import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { MsalProvider } from '@azure/msal-react';
import { FluentProvider } from '@fluentui/react-components';
import { BrowserRouter } from 'react-router-dom';

import { msalInstance } from '@/auth/authConfig';
import App from './App';
import { appTheme } from '@/theme/createTheme';

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MsalProvider instance={msalInstance}>
      <FluentProvider theme={appTheme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </FluentProvider>
    </MsalProvider>
  </React.StrictMode>
);
