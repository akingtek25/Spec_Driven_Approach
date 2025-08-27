---
applyTo: 'frontend/**'
---
# Frontend Scaffold Instruction (React 18 + Vite 5 + TypeScript + Fluent UI + MSAL)

Goal: Generate a production-ready starter using React 18, Vite 5, TypeScript, @fluentui/react-components, and @azure/msal-browser. Enforce a clean modular folder layout and consistent naming.

## Tech requirements
- React 18 + Vite 5 + TypeScript (strict)
- Package manager: npm (unless specified otherwise)
- UI: @fluentui/react-components (theming + consistent components)
- Auth: MSAL PublicClientApplication (SPA, redirect or popup)
- Routing: react-router-dom v6
- State: lightweight (React context + hooks). Avoid Redux unless explicitly requested.
- Lint/format: ESLint (typescript + react hooks), Prettier
- Testing: vitest + @testing-library/react (optional gate; stub tests if requested)
- Absolute imports via tsconfig paths (@components, @hooks, etc.)

## Folder contract (must create exactly once)
src/
  assets/        (static images, svg, global styles, design tokens)
  components/    (reusable presentational + small stateful UI units)
    <DomainName>/
      <ComponentName>.tsx
      index.ts
  pages/         (route-level views; each in its own folder)
    <PageName>/<PageName>.tsx
  hooks/         (ONLY custom hooks: useXyz.ts)
  context/       (React contexts: <Feature>Context.tsx)
  layout/        (AppShell / nav / layout frames)
  routing/       (route config + guards)
  auth/          (MSAL config, AuthProvider, hooks)
  utils/         (pure helpers: formatting, parsing)
  services/      (API clients, fetch wrappers; no direct UI imports)
  types/         (shared TypeScript types & interfaces)
  theme/         (Fluent UI theme setup + tokens)
  data/          (static JSON or mock seeds)
  config/        (env mapping, constants)
  tests/         (optional shared test utils)
  main.tsx       (Vite entry)
  App.tsx        (App root wiring providers, routing)

Never import upward across layers (pages may use components/hooks/services; services never import from components/pages).

## Naming rules
- Files: camelCase for utils/hooks (useAuth.ts), PascalCase for components/pages.
- Index barrel only when it adds clarity (components, hooks, services).
- Do not create a hook unless it starts with use and returns state/behavior.
- Components exporting a single element: default export + named props interface.
- Avoid deep nesting > 3 levels inside src/.

## Component pattern
ComponentName.tsx:
  - Top: imports (react, libs, local absolute, relative last)
  - Props interface
  - const ComponentName = (props: Props) => { hooks -> handlers -> render }
  - Export default + (optional) named secondary exports
Add an accompanying test only if logic (branching, conditional render) or custom hook used.

## Hooks pattern
- Each hook in its own file in hooks/
- Must document return tuple/object via JSDoc
- No direct DOM query selectors; rely on React.

## Auth (MSAL)
- Create auth/msalConfig.ts exporting msalConfig (clientId, authority, cache)
- Wrap App with <AuthProvider> that initializes PublicClientApplication
- Provide hook: useAuth() { login, logout, accounts, inProgress }
- Protect routes with <ProtectedRoute> in routing/ that checks account presence.

## Fluent UI
- Create theme/createTheme.ts (compose brand colors)
- Wrap providers in App.tsx: FluentProvider (theme) outside Router.
- Prefer Fluent primitives over raw HTML where available.
- Centralize design tokens (spacing, colors) in theme/tokens.ts.

## Routing
- routing/routes.tsx: export an array of RouteObject (lazy loaded pages).
- Use Suspense + lazy(() => import('../pages/...')) for each page.
- Keep route paths centralized; avoid hard-coded paths in components.

## Services & API
- services/httpClient.ts: fetch wrapper with abort + JSON handling.
- services/<feature>Service.ts: pure functions returning typed promises.
- No direct window.fetch in pages/components.

## Environment config
- config/env.ts: read import.meta.env.VITE_* vars; never access import.meta.env directly elsewhere.
- Document required vars in README (e.g., VITE_AAD_CLIENT_ID).

## Index wiring order (main.tsx)
Strict order: MSAL/AuthProvider -> Query/State providers (if later added) -> FluentProvider -> Router -> App.

## Testing (optional if requested)
- vitest setup: test/setup.ts config for RTL
- Data-testid only when semantic role insufficient.

## Example tasks the agent should perform
1. Scaffold base folders even if empty (use .gitkeep where needed).
2. Implement MSAL provider and protected route guard.
3. Add a sample page (Home) with a sign-in button using useAuth().
4. Add a reusable Button wrapper component using Fluent UI Button.
5. Add a sample custom hook (useIsMobile) demonstrating hook conventions.
6. Configure tsconfig paths (@components/* -> ./src/components/*, etc.).
7. Add lint + format scripts and pre-commit hook suggestion (no execution unless asked).

## Prohibited
- No inline any type.
- No mixing default + anonymous exports.
- No business logic inside JSX map callbacks (extract helpers).
- No direct localStorage/sessionStorage access outside services or a dedicated util.

## Output expectations
When asked to add a feature:
1. Identify target layer (page, component, hook, service).
2. Create/modify only minimal necessary files.
3. Update relevant barrel exports.
4. Provide code diffs in separate fenced blocks.

Acknowledge constraints if request violates structure; suggest compliant alternative.

End of instruction.