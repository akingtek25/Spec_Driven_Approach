---
mode: agent
---
# Prompt: Create a Collapsible Navigation Toolbar for Dashboard Layout

Please implement a collapsible navigation toolbar for the dashboard page that meets the following requirements:

## Core Requirements

1. **Collapsible Sidebar Navigation**: Create a sidebar that can be collapsed/expanded with a toggle button
2. **Navigation Items**: Include navigation links for:
   - Home page
   - Dashboard page
   - Placeholder structure for future pages that may be added later
3. **Responsive Design**: Ensure the toolbar works well on different screen sizes
4. **Smooth Transitions**: Add appropriate animations for collapse/expand functionality

## Technical Requirements

- **Language**: Write all code in TypeScript
- **Framework**: Use React with Fluent UI components
- **Node Version**: Compatible with node v23.3.0
- **Code Quality**: Ensure code passes `npm lint` and `npm format` checks
- **Comments**: Include comprehensive comments for junior developers' understanding

## Styling and Theme Requirements

- **Theme Adherence**: Strictly follow the application's existing themes and styles
- **Fluent UI Integration**: Use Fluent UI design system components and styling patterns
- **Consistency**: Maintain visual consistency with existing application components
- **Accessibility**: Ensure proper ARIA labels and keyboard navigation support

## Architecture Guidelines

- **Component Structure**: Create reusable components that can accommodate future navigation items
- **State Management**: Implement proper state management for collapse/expand functionality
- **Performance**: Optimize for high performance as per application guidelines
- **Maintainability**: Write clean, well-structured, and maintainable code

## Documentation Requirements

- **Code Comments**: Add detailed comments explaining functionality for junior developers
- **Props Documentation**: Document all component props and their purposes
- **Usage Examples**: Include examples of how to add new navigation items
- **Changelog**: Update the frontend changelog.md with all modifications made

## Frontend Instruction Compliance

- Follow all guidelines specified in the `.github/instructions/main.instructions.md` file
- Ensure backwards compatibility is NOT assumed - treat as new development
- Maintain high code quality and follow best practices
- Use ESLint and Prettier for code formatting
- Prioritize built-in Fluent UI functionality over custom implementations

## Implementation Notes

- The toolbar should be easily extensible for future pages
- Consider mobile-first responsive design
- Implement proper error boundaries and loading states
- Ensure the layout doesn't break existing dashboard functionality
- Create simple, concrete examples for junior developers to understand

## Success Criteria

- [ ] Collapsible sidebar with smooth animations
- [ ] Navigation links for Home and Dashboard pages
- [ ] Extensible structure for future pages
- [ ] Fluent UI theme compliance
- [ ] Responsive design
- [ ] Code passes lint and format checks
- [ ] Comprehensive comments for junior developers
- [ ] Updated changelog documentation

Please implement this solution following all specified guidelines and provide a complete, production-ready implementation with clear explanations for junior developers.