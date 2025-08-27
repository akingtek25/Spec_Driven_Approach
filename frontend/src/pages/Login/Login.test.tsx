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
  expect(screen.getAllByText(/sign in/i).length).toBeGreaterThan(0);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });
});