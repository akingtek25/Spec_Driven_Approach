import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render } from '@testing-library/react';
import ProtectedRoute from './ProtectedRoute';

vi.mock('@/auth/useAuth', () => ({
  useAuth: () => ({ isAuthenticated: false, login: vi.fn(), loading: false }),
}));

describe('ProtectedRoute', () => {
  it('redirects unauthenticated users to login (null render here)', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <Routes>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <div>Secret</div>
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<div>Login Page</div>} />
        </Routes>
      </MemoryRouter>
    );
    // Because navigation to /login happens, the protected content shouldn't be present.
    expect(container.innerHTML).not.toContain('Secret');
  });
});
