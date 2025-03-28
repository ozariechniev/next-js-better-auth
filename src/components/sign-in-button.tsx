'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import { DASHBOARD_LABEL, DASHBOARD_URL, SIGN_IN_LABEL, SIGN_IN_URL } from '@/lib/constants';

export function SignInButton() {
  const { data: session, isPending, error } = authClient.useSession();

  if (!session || isPending || error) {
    return null;
  }

  return session?.user ? (
    <Button asChild>
      <Link href={DASHBOARD_URL}>{DASHBOARD_LABEL}</Link>
    </Button>
  ) : (
    <Button variant="outline">
      <Link href={SIGN_IN_URL}>{SIGN_IN_LABEL}</Link>
    </Button>
  );
}
