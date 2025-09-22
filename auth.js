// Import necessary modules from next-auth and other libraries
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import { users } from './src/app/lib/placeholder-data';

// Helper function to find a user by email
function getUser(email) {
  return users.find((user) => user.email === email);
}

// Export authentication handlers
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      // Authorization logic for credentials provider
      async authorize(credentials) {
        // Validate credentials using zod schema
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = getUser(email);
          if (!user) return null;
          // Check password match
          if (user.password === password) return user;
        }
        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});
