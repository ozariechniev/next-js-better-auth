import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SIGN_IN_LABEL, SIGN_IN_URL, SIGN_UP_LABEL, SIGN_UP_URL } from '@/lib/constants';

export function Navbar() {
  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <Link href="/" className="text-xl font-bold">
            Acme Inc.
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="outline" asChild>
            <Link href={SIGN_IN_URL}>{SIGN_IN_LABEL}</Link>
          </Button>
          <Button asChild>
            <Link href={SIGN_UP_URL}>{SIGN_UP_LABEL}</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
