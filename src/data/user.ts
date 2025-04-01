import 'server-only';
import { cache } from 'react';
import { redirect } from 'next/navigation';
import { ACCESS_DENIED_URL } from '@/lib/constants';
import { userRoleEnum, userSchema } from '@/lib/definitions';
import { User } from '@/lib/types';
import { getUserSession } from './session';

/**
 * ----------------------------------------------------------------------------
 * Return user details from session
 * ----------------------------------------------------------------------------
 */
export const getUser = cache(async () => {
  const session = await getUserSession();

  if (!session || !session.user || !session.session) {
    return null;
  }

  const { user: userData, session: sessionData } = session;

  const result = userSchema.safeParse({
    name: userData.name,
    email: userData.email,
    emailVerified: userData.emailVerified,
    image: userData.image,
    role: userData.role,
    sessionId: sessionData.id,
  });

  if (!result.success) {
    return null;
  }

  return result.data;
});

/**
 * ----------------------------------------------------------------------------
 * Return user details from session or redirect to ACCESS_DENIED_URL
 * if user is not found
 * ----------------------------------------------------------------------------
 */
export const requireUser = cache(async () => {
  const user = await getUser();

  if (!user) {
    redirect(ACCESS_DENIED_URL);
  }

  return user;
});

/**
 * ----------------------------------------------------------------------------
 * Return user details from session or redirect to ACCESS_DENIED_URL
 * if user is not found or user is not admin
 * ----------------------------------------------------------------------------
 */
export const requireAdmin = cache(async () => {
  const user: User | null = await getUser();

  if (!user || user.role !== userRoleEnum.enum.admin) {
    redirect(ACCESS_DENIED_URL);
  }

  return user;
});
