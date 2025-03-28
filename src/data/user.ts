import 'server-only';
import { cache } from 'react';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { ACCESS_DENIED_URL } from '@/lib/constants';
import { userRoleEnum, userSchema } from '@/lib/definitions';
import { Session } from '@/lib/types';

export const getUser = cache(async () => {
  const session: Session | null = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return null;
  }

  const { user, session: userSession } = session;

  const result = userSchema.safeParse({
    name: user.name,
    email: user.email,
    emailVerified: user.emailVerified,
    image: user.image,
    role: user.role,
    sessionId: userSession.id,
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

  return user;
};

export const requireAdmin = async () => {
  const user = await getUser();

  if (!user || user.role !== userRoleEnum.enum.admin) {
    redirect(ACCESS_DENIED_URL);
  }

  return user;
};
