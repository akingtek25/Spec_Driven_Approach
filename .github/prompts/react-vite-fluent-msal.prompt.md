---
mode: agent
description: Scaffold a React 18 + Vite 5 + TypeScript app using Fluent UI and MSAL auth
---

# Goal
Create a production-ready front-end starter using:
- React 18
- Vite 5
- TypeScript (strict)
- @fluentui/react-components (latest stable) with a custom theme scaffold
- MSAL (@azure/msal-browser + @azure/msal-react) for Azure AD authentication

# Deliverables
Generate / modify files to produce a runnable project in `frontend/` (create folder if absent):
1. `frontend/package.json` with scripts & pinned deps
2. `frontend/tsconfig.json` (strict) and `tsconfig.node.json`
3. `frontend/vite.config.ts` with path aliases (@/*) and JSX runtime set
4. Source structure:
   - `src/main.tsx` (bootstraps FluentProvider + MsalProvider + Router placeholder)
   - `src/App.tsx` minimal shell with authenticated & unauthenticated views
   - `src/auth/authConfig.ts` MSAL configuration (reads VITE_ env vars)
   - `src/auth/useAuth.ts` small hook exposing login/logout/user/loading
   - `src/components/layout/AppLayout.tsx` with a Fluent UI `Toolbar` / `Navigation` placeholder
   - `src/theme/index.ts` custom theme override example (colors, fonts)
   - `src/pages/Home.tsx` public page
   - `src/pages/Dashboard.tsx` protected page example
   - `src/router/ProtectedRoute.tsx` simple guard (or hook) demonstrating auth
5. `.env.example` with required variables
6. ESLint + Prettier config (typescript + react hooks) (e.g. `.eslintrc.cjs`, `.prettierrc`)
7. `README.md` usage section (install, run, build, env setup)
8. Optional: `.gitignore` (node, logs, dist, env local)

# Environment Variables (.env)
Provide `.env.example` listing (no secrets):
```
VITE_AAD_CLIENT_ID=
VITE_AAD_TENANT_ID=
VITE_AAD_REDIRECT_URI=http://localhost:5173
```
Derived values inside config (authority uses tenant id):
`authority = https://login.microsoftonline.com/${VITE_AAD_TENANT_ID}`

# Auth Expectations
- Use `PublicClientApplication` with redirect interaction.
- Export `msalInstance` from `authConfig.ts`.
- Wrap app with `<MsalProvider instance={msalInstance}>`.
- Demonstrate login via `loginPopup` (fallback to `loginRedirect` if popup blocked).
- Provide a `ProtectedRoute` (either wrapper component or route element) that:
  - If authenticated: renders children
  - Else: triggers login and shows a loading shimmer/spinner

# Fluent UI Expectations
- Use `@fluentui/react-components` latest.
- Provide a custom theme override snippet (e.g. `brandColors` adjustment) via `createLightTheme` clone and modifications.
- Wrap root with `<FluentProvider theme={appTheme}>`.
- Include at least one Fluent component in `AppLayout` (e.g., `Toolbar`, `Button`, `Link`).

# Routing
- If adding React Router: install `react-router-dom@^6`.
- Define routes: `/` -> Home (public), `/dashboard` -> Protected.
- Show nav links in layout.

# Scripts (package.json)
Include (exact names):
- `dev`: `vite`
- `build`: `tsc -b && vite build`
- `preview`: `vite preview`
- `lint`: `eslint . --ext .ts,.tsx`
- `typecheck`: `tsc --noEmit`

# Dependencies
Core dependencies (exact major versions, use latest minor):
- react@18.x
- react-dom@18.x
- @fluentui/react-components (specify exact version resolved at generation time)
- @azure/msal-browser
- @azure/msal-react
- (optional if router is used) react-router-dom@6.x

Dev dependencies:
- typescript (>=5.4)
- vite@5.x
- @types/react, @types/react-dom
- eslint, @typescript-eslint/parser, @typescript-eslint/eslint-plugin, eslint-plugin-react, eslint-plugin-react-hooks, eslint-plugin-import, prettier, eslint-config-prettier
- (optional) @vitejs/plugin-react

# TypeScript Config
- "strict": true
- Path alias: `"@/*": ["./src/*"]`
- JSX: `react-jsx`
- ModuleResolution: `bundler`

# Code Patterns / Examples
Provide concise code (not pseudo) for key files. Examples:
`authConfig.ts`:
```ts
import { PublicClientApplication, type Configuration } from '@azure/msal-browser';

const clientId = import.meta.env.VITE_AAD_CLIENT_ID as string;
const tenantId = import.meta.env.VITE_AAD_TENANT_ID as string;
const redirectUri = import.meta.env.VITE_AAD_REDIRECT_URI as string;

export const msalConfig: Configuration = {
  auth: {
    clientId,
    authority: `https://login.microsoftonline.com/${tenantId}`,
    redirectUri,
  },
  cache: { cacheLocation: 'localStorage', storeAuthStateInCookie: false },
};

export const msalInstance = new PublicClientApplication(msalConfig);
```

`useAuth.ts`:
```ts
import { useMsal, useIsAuthenticated } from '@azure/msal-react';
import { useEffect, useState } from 'react';

export function useAuth() {
  const { instance, accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const [loading, setLoading] = useState(false);

  const login = async () => {
    setLoading(true);
    try {
      await instance.loginPopup({ scopes: ['User.Read'] }).catch(() => instance.loginRedirect({ scopes: ['User.Read'] }));
    } finally { setLoading(false); }
  };
  const logout = () => instance.logoutRedirect();
  const user = accounts[0];
  return { isAuthenticated, user, login, logout, loading };
}
```

`ProtectedRoute.tsx` (if router used):
```ts
import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, login, loading } = useAuth();
  if (!isAuthenticated && !loading) { void login(); }
  if (!isAuthenticated) return <div>Authenticating...</div>;
  return <>{children}</>;
};
```

# Quality
- Ensure project starts with `npm install && npm run dev` (document in README).
- Lint passes initially.
- Typecheck passes.

# README Section (summarize)
Add: Overview, Tech stack, Quick Start, Env Vars, Auth Flow, Theming pointers.

# Ordering
1. Create folder & config files
2. Add package.json & install (assume npm) (agent may defer actual install if environment unsupported)
3. Add ts configs, Vite config
4. Add source files
5. Add lint / prettier configs
6. Add README & env example
7. Final validation notes

# Output Style
Make actual files directly (do NOT just describe). Keep code concise & working.

# Do Not
- Add state management libs (Redux, Zustand) unless explicitly asked later.
- Add test frameworks yet.
- Include secrets in repo.

# Completion Criteria
All listed files present, dev server would run with placeholder content, and auth scaffold compiles.
