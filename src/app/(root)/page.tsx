import Link from 'next/link';
import { Globe, LayoutDashboard, LogIn, LogOut } from 'lucide-react';
import { Navbar } from '@/components/navbar';

export default function Home() {
  return (
    <div className="container mx-auto">
      <Navbar />
      <div className="flex flex-col space-y-4 py-4">
        <Link href="/api/auth/reference" className="flex items-center gap-3">
          <Globe className="w-6" />
          API
        </Link>
        <Link href="/dashboard" className="flex items-center gap-3">
          <LayoutDashboard className="w-6" />
          Dashboard
        </Link>
        <Link href="/sign-in" className="flex items-center gap-3">
          <LogIn className="w-6" />
          Sign-in
        </Link>
        <Link href="/sign-up" className="flex items-center gap-3">
          <LogOut className="w-6" />
          Sign-up
        </Link>
      </div>
    </div>
  );
}
