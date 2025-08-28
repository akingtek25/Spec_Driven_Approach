/**
 * Navigation components barrel export
 *
 * This file provides a centralized export point for all navigation-related components.
 * Following the frontend folder contract, this makes imports cleaner and more organized.
 *
 * For junior developers:
 * - Import navigation components like: import { NavigationSidebar } from '@/components/Navigation';
 * - Add new navigation components to this file as they are created
 */

export { default as NavigationSidebar, useContentShift } from './NavigationSidebar';

// Future navigation components can be exported here:
// export { default as Breadcrumb } from './Breadcrumb';
// export { default as TabNavigation } from './TabNavigation';
