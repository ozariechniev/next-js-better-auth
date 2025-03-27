import { headers } from 'next/headers';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getUser } from '@/data/user';
import { DASHBOARD_LABEL, DASHBOARD_URL, SIGN_IN_LABEL, SIGN_IN_URL } from '@/lib/constants';

function checkOptimisticSession(headers: Headers) {
  const optimisticSession =
    headers.get('cookie')?.includes('better-auth.session') ||
    headers.get('cookie')?.includes('__Secure-better-auth.session-token');

  return !!optimisticSession;
}

export async function SignInButton() {
  const user = await getUser();

  return user ? (
    <Button asChild>
      <Link href={DASHBOARD_URL}>{DASHBOARD_LABEL}</Link>
    </Button>
  ) : (
    <Button variant="outline">
      <Link href={SIGN_IN_URL}>{SIGN_IN_LABEL}</Link>
    </Button>
  );
}

export async function SignInOptimisticButton() {
  const guessIsSignIn = checkOptimisticSession(await headers());

  return guessIsSignIn ? (
    <Button asChild>
      <Link href={DASHBOARD_URL}>{DASHBOARD_LABEL}</Link>
    </Button>
  ) : (
    <Button variant="outline">
      <Link href={SIGN_IN_URL}>{SIGN_IN_LABEL}</Link>
    </Button>
  );
}
