import { ReactNode } from 'react';
import Link from 'next/link';
import { Separator } from '@radix-ui/react-separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { DashboardSidebar } from './_components/sidebar';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SidebarProvider>
        <DashboardSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="h-8" />
            <h1 className="text-lg font-semibold">
              <Link href="/">Acme Inc.</Link>
            </h1>
          </header>
          {children}
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
