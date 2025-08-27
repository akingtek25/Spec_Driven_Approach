import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

const Home = lazy(() => import('@/pages/Home/Home'));
const Dashboard = lazy(() => import('@/pages/Dashboard/Dashboard'));
const Login = lazy(() => import('@/pages/Login/Login'));

const routes: RouteObject[] = [
  { path: '/', element: <Home /> },
  { path: '/login', element: <Login /> },
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
