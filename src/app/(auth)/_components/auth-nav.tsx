'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import type { AUTH_NAV_LINKS } from '../_constants';

type AuthLink = (typeof AUTH_NAV_LINKS)[number];

type AuthNavProps = {
  links: readonly AuthLink[];
};

type AuthNavItemProps = {
  isActive: boolean;
  href: string;
  children: ReactNode;
};

const classes = {
  active:
    'bg-background text-base text-foreground flex h-12 w-full items-center justify-center rounded-sm px-4 py-2 font-bold',
  link: 'font-bold text-base h-12 w-full items-center justify-center',
};

export function AuthNav({ links }: AuthNavProps) {
  const pathname = usePathname();

  return (
    <div className="bg-muted text-muted-foreground grid w-full gap-2 rounded-sm p-1 sm:grid-cols-2">
      {links.map(({ name, href }) => (
        <AuthNavItem key={href} isActive={pathname === href} href={href}>
          {name}
        </AuthNavItem>
      ))}
    </div>
  );
}

export function AuthNavItem({ isActive, href, children }: AuthNavItemProps) {
  return (
    <>
      {isActive ? (
        <div className={classes.active}>{children}</div>
      ) : (
        <Button variant="ghost" className={classes.link} asChild>
          <Link href={href}>{children}</Link>
        </Button>
      )}
    </>
  );
}
