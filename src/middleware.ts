import { NextRequest, NextResponse } from 'next/server';
import { betterFetch } from '@better-fetch/fetch';
import { Session } from '@/lib/auth-types';
import {
  ACCESS_DENIED_URL,
  DASHBOARD_URL,
  FORGOT_PASSWORD_URL,
  RESET_PASSWORD_URL,
  SIGN_IN_URL,
  SIGN_UP_URL,
} from '@/lib/constants';

const protectedRoutes = [DASHBOARD_URL];
const guestRoutes = [SIGN_IN_URL, SIGN_UP_URL, RESET_PASSWORD_URL, FORGOT_PASSWORD_URL];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const { data: session } = await betterFetch<Session>('/api/auth/get-session', {
    baseURL: request.nextUrl.origin,
    headers: {
      cookie: request.headers.get('cookie') || '',
    },
  });

  if (session && guestRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL(DASHBOARD_URL, request.url));
  }

  if (!session && protectedRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL(ACCESS_DENIED_URL, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
};
