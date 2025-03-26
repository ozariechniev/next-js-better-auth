import * as React from 'react';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar';
import { getUser } from '@/data/user';
import { UserMenu } from './user-menu';

export async function DashboardSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = await getUser();

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <UserMenu user={JSON.parse(JSON.stringify(user))} />
      </SidebarHeader>
      <SidebarContent></SidebarContent>
      <SidebarFooter></SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
