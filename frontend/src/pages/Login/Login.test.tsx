import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Login from './Login';

vi.mock('@/auth/useAuth', () => ({
  useAuth: () => ({ isAuthenticated: false, login: vi.fn(), loading: false }),
}));

describe('Login Page', () => {
  it('renders login form elements', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
  expect(screen.getAllByText(/welcome back/i).length).toBeGreaterThan(0);
    // No traditional form fields
    expect(screen.queryByLabelText(/email/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/password/i)).not.toBeInTheDocument();
  const msalBtn = screen.queryByRole('button', { name: /sign in with microsoft/i });
  const bypassBtn = screen.queryByRole('button', { name: /enter \(bypass mode\)/i });
  expect(msalBtn || bypassBtn).not.toBeNull();
  });
});