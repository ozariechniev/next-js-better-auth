import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t py-6">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between">
          <Link href="/" className="text-foreground flex items-center gap-2 font-medium">
            <ShieldCheck />
            Acme Inc.
          </Link>
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} Acme Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
