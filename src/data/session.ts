import 'server-only';
import { cache } from 'react';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { ACCESS_DENIED_URL } from '@/lib/constants';
import { Session, SessionDetails } from '@/lib/types';

/**
 * ----------------------------------------------------------------------------
 * Get user session
 *
 * @returns {Promise<Session | null>}
 * ----------------------------------------------------------------------------
 */
export const getUserSession = cache(async () => {
  let session: Session | null = null;

  try {
    session = await auth.api.getSession({
      headers: await headers(),
    });
  } catch (error) {
    console.error('Error fetching user session:', error);
  }

  return session;
});

/**
 * ----------------------------------------------------------------------------
 * Return user session or redirect to ACCESS_DENIED_URL if session is not found
 *
 * @returns {Promise<Session> | never}
 * ----------------------------------------------------------------------------
 */
export const requireUserSession = cache(async () => {
  const session = await getUserSession();

  if (!session) {
    redirect(ACCESS_DENIED_URL);
  }

  return session;
});

/**
 * ----------------------------------------------------------------------------
 * Return a list of sessions that are active for the user
 *
 * @returns {Promise<SessionDetails[] | null>}
 * ----------------------------------------------------------------------------
 */
export const getUserSessions = cache(async () => {
  let sessions: SessionDetails[] | null = null;

  try {
    sessions = await auth.api.listSessions({
      headers: await headers(),
    });
  } catch (error) {
    console.error('Error fetching user sessions:', error);
  }

  return sessions;
});

/**
 * ----------------------------------------------------------------------------
 * Return a list of sessions that are active for the user or redirect
 * to ACCESS_DENIED_URL if sessions are not found
 *
 * @returns {Promise<SessionDetails[]> | never}
 * ----------------------------------------------------------------------------
 */
export const requireUserSessions = cache(async () => {
  const sessions = await getUserSessions();

  if (!sessions) {
    redirect(ACCESS_DENIED_URL);
  }

  return sessions;
});
