import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';
import { SignInButton } from '@/components/sign-in-button';

export function Navbar() {
  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2 text-xl font-medium">
            <ShieldCheck className="size-6" />
            Acme Inc.
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <SignInButton />
        </div>
      </div>
    </header>
  );
}
