import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

const Home = lazy(() => import('@/pages/Home/Home'));
const Dashboard = lazy(() => import('@/pages/Dashboard/Dashboard'));
const Login = lazy(() => import('@/pages/Login/Login'));

const routes: RouteObject[] = [
  // Serve login at root to greet user first
  { path: '/', element: <Login /> },
  { path: '/login', element: <Login /> },
  { path: '/home', element: <Home /> },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
];

export default routes;
