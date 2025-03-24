import Link from 'next/link';

export function Navbar() {
  return (
    <div className="flex items-center justify-between border-b py-4">
      <span className="text-3xl font-semibold">
        <Link href="/">NEXT.JS</Link>
      </span>
    </div>
  );
}
