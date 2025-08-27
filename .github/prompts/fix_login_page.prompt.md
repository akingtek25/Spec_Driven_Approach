---
mode: agent
---
# Goal
- Fix the login page to properly handle authentication bypass mode.
- Redirect users to the dashboard upon successful login in bypass mode.
- Update the micosoft account login button to use the msal library provided button with microsofts logo

# Implementation Steps
1. Update the `handleSubmit` function in the `Login` component to navigate to the dashboard upon successful login in bypass mode.
2. Ensure that the `useAuth` hook provides the necessary state and functions to support this behavior.
3. Ensure that the user is greeted by the login page first by updating the routing of the application
4. Update the `ProtectedRoute` component to allow access to the dashboard when in bypass mode.
5. Update the Microsoft account login button to use the MSAL library provided button with Microsoft's logo.