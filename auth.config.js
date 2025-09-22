// Configuration for authentication pages and callbacks
export const authConfig = {
  pages: {
    signIn: '/login', // Custom sign-in page
  },
  callbacks: {
    // Authorization callback for protected routes
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/ui');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to the login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/ui/dashboard', nextUrl));
      }
      return true;
    },
  },
  providers: [], // No providers defined yet
};
