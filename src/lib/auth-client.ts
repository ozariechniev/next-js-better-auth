import { adminClient, inferAdditionalFields } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';
import { userDTOSchema } from '@/lib/definitions';
import type { auth } from './auth.js';

export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL,
  plugins: [inferAdditionalFields<typeof auth>(), adminClient()],
});

export const getAuthClientUser = () => {
  const { data: session } = authClient.useSession();

  if (!session?.user) {
    return null;
  }

  const result = userDTOSchema.safeParse({
    name: session.user.name,
    email: session.user.email,
    emailVerified: session.user.emailVerified,
    image: session.user.image,
    role: session.user.role,
  });

  if (!result.success) {
    return null;
  }

  return result.data;
};
