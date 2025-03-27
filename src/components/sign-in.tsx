'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import { DASHBOARD_LABEL, DASHBOARD_URL, SIGN_IN_LABEL, SIGN_IN_URL } from '@/lib/constants';

export function SignInClientButton() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return null;
  }

  return session ? (
    <Button asChild>
      <Link href={DASHBOARD_URL}>{DASHBOARD_LABEL}</Link>
    </Button>
  ) : (
    <Button variant="outline">
      <Link href={SIGN_IN_URL}>{SIGN_IN_LABEL}</Link>
    </Button>
  );
}
