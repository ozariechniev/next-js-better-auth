'use client';

import { Fragment, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

type Segment = {
  label: string;
  path: string;
};

function generateBreadcrumbs(pathname: string): Segment[] {
  const path = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
  const segments = path.split('/').filter(Boolean);

  return segments.map((segment, index) => {
    const path = `/${segments.slice(0, index + 1).join('/')}`;

    const label = segment
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    return { label, path };
  });
}

export function Breadcrumbs() {
  const pathname = usePathname();
  const breadcrumbs = useMemo(() => generateBreadcrumbs(pathname), [pathname]);

  if (breadcrumbs.length === 0) return null;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((segment, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return (
            <Fragment key={segment.path}>
              {index > 0 && <BreadcrumbSeparator />}
              <BreadcrumbItem>
                {isLast ? (
                  <span className="text-muted-foreground">{segment.label}</span>
                ) : (
                  <BreadcrumbLink href={segment.path}>{segment.label}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
