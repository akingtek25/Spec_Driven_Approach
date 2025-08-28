import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Button, Text, makeStyles, tokens, mergeClasses } from '@fluentui/react-components';
import {
  Navigation20Filled,
  Home20Regular,
  Home20Filled,
  DataUsage20Regular,
  DataUsage20Filled,
  ChevronLeft20Regular,
  ChevronRight20Regular,
} from '@fluentui/react-icons';

import { useNavigation } from '@/context/NavigationContext';

/**
 * Props for the NavigationSidebar component
 */
interface NavigationSidebarProps {
  /** Additional CSS class names to apply to the root element */
  className?: string;
}

/**
 * Interface defining a navigation item structure
 * This makes it easy for junior developers to add new navigation items
 */
interface NavigationItem {
  /** Unique identifier for the navigation item */
  id: string;
  /** Display label for the navigation item */
  label: string;
  /** Route path for navigation */
  path: string;
  /** Icon to display when item is not active/selected */
  icon: React.ReactElement;
  /** Icon to display when item is active/selected */
  iconFilled: React.ReactElement;
  /** Whether this item should be displayed (for future conditional rendering) */
  visible?: boolean;
}

// Define navigation items - easy to extend for future pages
const navigationItems: NavigationItem[] = [
  {
    id: 'home',
    label: 'Home',
    path: '/home',
    icon: <Home20Regular />,
    iconFilled: <Home20Filled />,
    visible: true,
  },
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/dashboard',
    icon: <DataUsage20Regular />,
    iconFilled: <DataUsage20Filled />,
    visible: true,
  },
  // Future navigation items can be added here easily:
  // {
  //   id: 'reports',
  //   label: 'Reports',
  //   path: '/reports',
  //   icon: <Document20Regular />,
  //   iconFilled: <Document20Filled />,
  //   visible: true,
  // },
];

/**
 * Styles for the NavigationSidebar component
 * Uses Fluent UI design tokens for consistent theming
 */
const useStyles = makeStyles({
  // Root container for the sidebar
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: tokens.colorNeutralBackground3,
    borderRight: `1px solid ${tokens.colorNeutralStroke2}`,
    height: '100vh',
    position: 'fixed',
    left: 0,
    top: 0,
    zIndex: 1000,
    transition: 'width 0.3s ease-in-out, transform 0.3s ease-in-out',
    overflowX: 'hidden',
  },
  // Expanded state (default width)
  expanded: {
    width: '240px',
  },
  // Collapsed state (narrow width)
  collapsed: {
    width: '60px',
  },
  // Mobile hidden state
  mobileHidden: {
    transform: 'translateX(-100%)',
  },
  // Header section containing the toggle button
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 12px',
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    minHeight: '60px',
  },
  // Logo/title area
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    overflow: 'hidden',
  },
  // Logo text that shows/hides based on collapsed state
  logoText: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorBrandForeground1,
    whiteSpace: 'nowrap',
    opacity: 1,
    transition: 'opacity 0.2s ease-in-out',
  },
  // Hidden logo text in collapsed state
  logoTextHidden: {
    opacity: 0,
    width: 0,
  },
  // Toggle button styling
  toggleButton: {
    minWidth: '32px',
    minHeight: '32px',
    padding: '4px',
  },
  // Navigation items container
  nav: {
    flex: 1,
    padding: '8px 4px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  // Individual navigation item styling
  navItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 16px',
    borderRadius: tokens.borderRadiusMedium,
    textDecoration: 'none',
    color: tokens.colorNeutralForeground1,
    transition: 'all 0.2s ease-in-out',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      color: tokens.colorBrandForeground1,
    },
    ':focus': {
      outline: `2px solid ${tokens.colorBrandStroke1}`,
      outlineOffset: '2px',
    },
  },
  // Active navigation item styling
  navItemActive: {
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorBrandForeground1,
    ':hover': {
      backgroundColor: tokens.colorBrandBackground2Hover,
    },
  },
  // Icon container within navigation items
  navIcon: {
    minWidth: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Text label within navigation items
  navLabel: {
    marginLeft: '12px',
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightMedium,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    opacity: 1,
    transition: 'opacity 0.2s ease-in-out',
  },
  // Hidden label in collapsed state
  navLabelHidden: {
    opacity: 0,
    width: 0,
    marginLeft: 0,
  },
  // Main content area adjustment when sidebar is present
  contentShift: {
    marginLeft: '240px',
    transition: 'margin-left 0.3s ease-in-out',
  },
  // Content shift for collapsed sidebar
  contentShiftCollapsed: {
    marginLeft: '60px',
  },
  // No content shift on mobile (sidebar overlays)
  contentShiftMobile: {
    marginLeft: 0,
  },
});

/**
 * NavigationSidebar Component
 *
 * A collapsible sidebar navigation component that provides:
 * - Smooth expand/collapse functionality
 * - Responsive design for mobile devices
 * - Active state highlighting
 * - Easy extensibility for future navigation items
 * - Full accessibility support with ARIA labels and keyboard navigation
 *
 * For Junior Developers:
 * To add a new navigation item:
 * 1. Add a new object to the `navigationItems` array above
 * 2. Include the required properties: id, label, path, icon, iconFilled
 * 3. Import the appropriate icons from @fluentui/react-icons
 * 4. The component will automatically render the new item
 *
 * @param props - Component props
 * @returns JSX element representing the navigation sidebar
 */
const NavigationSidebar: React.FC<NavigationSidebarProps> = ({ className }) => {
  const styles = useStyles();
  const location = useLocation();
  const { isCollapsed, isMobileVisible, toggle, closeMobile, isMobile } = useNavigation();

  /**
   * Determines if a navigation item is currently active
   * @param path - The path to check against current location
   * @returns boolean indicating if the path is active
   */
  const isActivePath = (path: string): boolean => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  // Calculate the CSS classes for the sidebar container
  const sidebarClasses = mergeClasses(
    styles.sidebar,
    isMobile
      ? isMobileVisible
        ? styles.expanded
        : styles.mobileHidden
      : isCollapsed
        ? styles.collapsed
        : styles.expanded,
    className
  );

  return (
    <>
      {/* Sidebar Container */}
      <nav className={sidebarClasses} role="navigation" aria-label="Main navigation">
        {/* Header Section with Logo and Toggle Button */}
        <div className={styles.header}>
          <div className={styles.logo}>
            <Navigation20Filled />
            <Text
              className={mergeClasses(
                styles.logoText,
                isCollapsed && !isMobile ? styles.logoTextHidden : ''
              )}
            >
              Navigation
            </Text>
          </div>

          <Button
            appearance="subtle"
            size="small"
            className={styles.toggleButton}
            onClick={toggle}
            aria-label={
              isMobile
                ? isMobileVisible
                  ? 'Close navigation'
                  : 'Open navigation'
                : isCollapsed
                  ? 'Expand navigation'
                  : 'Collapse navigation'
            }
            icon={
              isMobile ? (
                isMobileVisible ? (
                  <ChevronLeft20Regular />
                ) : (
                  <ChevronRight20Regular />
                )
              ) : isCollapsed ? (
                <ChevronRight20Regular />
              ) : (
                <ChevronLeft20Regular />
              )
            }
          />
        </div>

        {/* Navigation Items */}
        <div className={styles.nav} role="list">
          {navigationItems
            .filter((item) => item.visible !== false) // Only show visible items
            .map((item) => {
              const isActive = isActivePath(item.path);

              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className={mergeClasses(styles.navItem, isActive ? styles.navItemActive : '')}
                  role="listitem"
                  aria-current={isActive ? 'page' : undefined}
                  onClick={() => {
                    // Close mobile sidebar when navigating
                    if (isMobile) {
                      closeMobile();
                    }
                  }}
                >
                  <div className={styles.navIcon}>{isActive ? item.iconFilled : item.icon}</div>
                  <span
                    className={mergeClasses(
                      styles.navLabel,
                      isCollapsed && !isMobile ? styles.navLabelHidden : ''
                    )}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
        </div>
      </nav>

      {/* Mobile Overlay */}
      {isMobile && isMobileVisible && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            zIndex: 999,
          }}
          onClick={() => closeMobile()}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default NavigationSidebar;

/**
 * Hook to get the content shift class for main content area
 * This ensures the main content adjusts properly when the sidebar state changes
 *
 * Usage example for junior developers:
 * ```tsx
 * const ContentArea = () => {
 *   const contentShiftClass = useContentShift();
 *   return <div className={contentShiftClass}>Main content here</div>;
 * };
 * ```
 */
export const useContentShift = () => {
  const styles = useStyles();
  const { isCollapsed, isMobile } = useNavigation();

  if (isMobile) {
    return styles.contentShiftMobile;
  }

  return isCollapsed ? styles.contentShiftCollapsed : styles.contentShift;
};
