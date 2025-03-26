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
});

export const requireUser = async () => {
  const user = await getUser();

  if (!user) {
    redirect(ACCESS_DENIED_URL);
  }
};

export const requireAdmin = async () => {
  const user = await getUser();

  if (!user || user.role !== 'admin') {
    redirect(ACCESS_DENIED_URL);
  }
};
