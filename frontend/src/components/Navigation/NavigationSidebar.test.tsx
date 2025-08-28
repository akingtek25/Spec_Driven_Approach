import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { FluentProvider } from '@fluentui/react-components';

import { appTheme } from '@/theme/createTheme';
import { NavigationProvider } from '@/context/NavigationContext';
import { NavigationSidebar } from '@/components/Navigation';

// Helper to render with required providers
const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <FluentProvider theme={appTheme}>
      <BrowserRouter>
        <NavigationProvider>
          {component}
        </NavigationProvider>
      </BrowserRouter>
    </FluentProvider>
  );
};

describe('NavigationSidebar', () => {
  it('renders navigation items correctly', () => {
    renderWithProviders(<NavigationSidebar />);
    
    // Check that navigation items are present
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Navigation')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    renderWithProviders(<NavigationSidebar />);
    
    // Check for proper ARIA attributes
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('aria-label', 'Main navigation');
    
    // Check that navigation items are properly structured
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(2); // Home and Dashboard
  });

  it('renders toggle button with correct accessibility label', () => {
    renderWithProviders(<NavigationSidebar />);
    
    // Check for toggle button
    const toggleButton = screen.getByRole('button');
    expect(toggleButton).toHaveAttribute('aria-label');
  });
});
