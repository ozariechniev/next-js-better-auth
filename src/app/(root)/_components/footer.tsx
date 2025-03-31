import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t py-6">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between">
          <h3 className="text-lg font-medium">
            <Link href="/" className="text-foreground">
              Acme Inc.
            </Link>
          </h3>
          <p className="text-muted-foreground">&copy; {new Date().getFullYear()} Acme Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
