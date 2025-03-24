import type { ReactNode } from 'react';

export default async function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-dvh items-center justify-center p-4">
      <div className="dot-background absolute inset-0" />
      <div className="relative z-10 w-full max-w-md space-y-8">{children}</div>
    </div>
  );
}
