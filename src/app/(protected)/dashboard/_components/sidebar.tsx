import * as React from 'react';
import Link from 'next/link';
import { ArrowUpCircleIcon } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { getUser } from '@/data/user';
import { User } from '@/lib/types';
import { serializeDataToProps } from '@/lib/utils';
import { AccountMenu } from './account-menu';
import { UserMenu } from './user-menu';

export async function DashboardSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  let user: User | null = null;
  let userData: User | null = null;

  try {
    user = await getUser();
    userData = serializeDataToProps(user);
  } catch (error) {
    console.error(error);
    return null;
  }

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <Link href="/">
                <ArrowUpCircleIcon className="h-5 w-5" />
                <span className="text-base font-semibold">Acme Inc.</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarSeparator className="w-auto!" />
      <SidebarContent>
        <AccountMenu />
      </SidebarContent>
      <SidebarFooter>{userData && <UserMenu user={userData} />}</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
