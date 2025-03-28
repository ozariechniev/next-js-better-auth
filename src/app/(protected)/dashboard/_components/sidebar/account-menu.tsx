'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Settings, User } from 'lucide-react';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import {
  DASHBOARD_PROFILE_LABEL,
  DASHBOARD_PROFILE_URL,
  DASHBOARD_SETTINGS_LABEL,
  DASHBOARD_SETTINGS_URL,
} from '@/lib/constants';

export function AccountMenu() {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Account</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link
              href={DASHBOARD_PROFILE_URL}
              className={pathname.startsWith(DASHBOARD_PROFILE_URL) ? 'bg-sidebar-accent' : ''}
            >
              <User />
              {DASHBOARD_PROFILE_LABEL}
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link
              href={DASHBOARD_SETTINGS_URL}
              className={pathname.startsWith(DASHBOARD_SETTINGS_URL) ? 'bg-sidebar-accent' : ''}
            >
              <Settings />
              {DASHBOARD_SETTINGS_LABEL}
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
