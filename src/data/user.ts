'use server';

import { cache } from 'react';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { ACCESS_DENIED_URL } from '@/lib/constants';
import { userDTOSchema } from '@/lib/definitions';

export const getUser = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect(ACCESS_DENIED_URL);
  }

  const result = userDTOSchema.safeParse({
    name: session.user.name,
    email: session.user.email,
    emailVerified: session.user.emailVerified,
    image: session.user.image,
  });

  if (!result.success) {
    console.error('User data validation failed:', result.error.flatten());
    redirect(ACCESS_DENIED_URL);
  }

  return result.data;
});
