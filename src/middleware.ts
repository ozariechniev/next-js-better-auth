import { NextRequest, NextResponse } from 'next/server';
import { betterFetch } from '@better-fetch/fetch';
import { Session } from '@/lib/auth-types';
import { ACCESS_DENIED_URL } from '@/lib/constants';

const protectedRoutes = ['/dashboard'];
const guestRoutes = ['/sign-in', '/sign-up', '/reset-password', '/forgot-password'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const { data: session } = await betterFetch<Session>('/api/auth/get-session', {
    baseURL: request.nextUrl.origin,
    headers: {
      cookie: request.headers.get('cookie') || '',
    },
  });

  if (session && guestRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (!session && protectedRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL(ACCESS_DENIED_URL, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
};
