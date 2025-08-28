import React, { createContext, useContext, useState, ReactNode } from 'react';

import { useIsMobile } from '@/hooks/useIsMobile';

/**
 * Interface for the Navigation Context state
 */
interface NavigationContextState {
  /** Whether the sidebar is collapsed (desktop) or hidden (mobile) */
  isCollapsed: boolean;
  /** Whether the mobile sidebar is visible */
  isMobileVisible: boolean;
  /** Toggle the sidebar state */
  toggle: () => void;
  /** Close the mobile sidebar (useful for navigation clicks) */
  closeMobile: () => void;
  /** Whether the current viewport is mobile */
  isMobile: boolean;
}

/**
 * Props for the NavigationProvider component
 */
interface NavigationProviderProps {
  children: ReactNode;
}

// Create the context with default values
const NavigationContext = createContext<NavigationContextState | undefined>(undefined);

/**
 * NavigationProvider Component
 *
 * Provides sidebar state management throughout the application.
 * This context ensures that the sidebar collapse state is shared between
 * the NavigationSidebar component and any components that need to adjust
 * their layout based on the sidebar state.
 *
 * For junior developers:
 * - Wrap your app with this provider (usually in App.tsx)
 * - Use the useNavigation hook to access sidebar state anywhere in the app
 * - The provider automatically handles mobile vs desktop behavior
 *
 * @param props - Component props containing children to provide context to
 * @returns JSX element that provides navigation context to its children
 */
export const NavigationProvider: React.FC<NavigationProviderProps> = ({ children }) => {
  const isMobile = useIsMobile();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileVisible, setIsMobileVisible] = useState(false);

  /**
   * Toggles the sidebar state
   * On mobile: controls visibility
   * On desktop: controls collapsed state
   */
  const toggle = () => {
    if (isMobile) {
      setIsMobileVisible(!isMobileVisible);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  /**
   * Closes the mobile sidebar
   * Useful when navigating to a new page
   */
  const closeMobile = () => {
    if (isMobile) {
      setIsMobileVisible(false);
    }
  };

  const contextValue: NavigationContextState = {
    isCollapsed,
    isMobileVisible,
    toggle,
    closeMobile,
    isMobile,
  };

  return <NavigationContext.Provider value={contextValue}>{children}</NavigationContext.Provider>;
};

/**
 * Custom hook to access navigation context
 *
 * This hook provides access to the navigation state and actions.
 * It includes error handling to ensure it's used within a NavigationProvider.
 *
 * For junior developers:
 * ```tsx
 * const MyComponent = () => {
 *   const { isCollapsed, toggle, isMobile } = useNavigation();
 *
 *   return (
 *     <div style={{ marginLeft: isMobile ? 0 : (isCollapsed ? '60px' : '240px') }}>
 *       <button onClick={toggle}>Toggle Sidebar</button>
 *       Content here...
 *     </div>
 *   );
 * };
 * ```
 *
 * @returns NavigationContextState object with current state and actions
 * @throws Error if used outside of NavigationProvider
 */
export const useNavigation = (): NavigationContextState => {
  const context = useContext(NavigationContext);

  if (context === undefined) {
    throw new Error(
      'useNavigation must be used within a NavigationProvider. ' +
        'Please wrap your component tree with <NavigationProvider>.'
    );
  }

  return context;
};

export default NavigationProvider;
