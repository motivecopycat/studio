# **App Name**: KikaSite

## Core Features:

- Google Authentication: Enable users to log in using their Google account via Firebase Authentication, storing user data (name, email, profile photo) in localStorage and redirecting them to the dashboard.
- Leenux Guest Account: Implement a temporary guest login feature that generates a random username and UUID, stores it in localStorage, and redirects the user to the dashboard. Shows a toast message to indicate guest login.
- Dashboard UI: Create a dashboard accessible after login with a header (logo/title, language selector, theme switcher, user menu with profile and logout) and a sidebar (Home, Campaigns, Analytics, Settings).
- Language Selection: Offer language selection via a dropdown in the header, allowing users to switch between English, Tamil, Hindi, etc.
- Theme Switcher: Implement a theme switcher in the header for toggling between light and dark mode.
- Route Protection: Implement route protection that redirects unauthenticated users to the login page, ensuring only logged-in users can access the dashboard.
- Personalized Welcome Message: Show different welcome messages on the dashboard based on the login type (Google or guest).

## Style Guidelines:

- Primary color: Light gray (#D3D3D3) to complement the modern, minimal black and white theme, providing a subtle contrast against darker elements.
- Background color: White (#FFFFFF) to maintain a clean and spacious feel. Desaturated to 20% of primary hue.
- Accent color: Dark Gray (#4A4A4A) used sparingly for interactive elements such as buttons and active menu items, analogous to the primary, offering high contrast.
- Font: 'Inter' sans-serif for both headlines and body text, due to its modern, objective look suitable for UI and readable text.
- Maintain a clean, minimal layout with consistent spacing and padding. Ensure responsiveness across desktop, tablet, and mobile devices.
- Incorporate subtle animations for transitions, hover effects, and loading states to enhance the user experience without being intrusive.
- Use minimal icons for navigation and interactive elements to reinforce usability without adding visual clutter.