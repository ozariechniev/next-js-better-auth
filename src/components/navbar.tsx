import Link from 'next/link';
import { SignInButton } from '@/components/sign-in-button';

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
          <SignInButton />
        </div>
      </div>
    </header>
  );
}
