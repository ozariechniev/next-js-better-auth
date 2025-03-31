'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { ChevronsUpDown, LayoutDashboard, LogOut, Settings, UserIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';
import { authClient } from '@/lib/auth-client';
import {
  DASHBOARD_LABEL,
  DASHBOARD_PROFILE_LABEL,
  DASHBOARD_PROFILE_URL,
  DASHBOARD_SETTINGS_LABEL,
  DASHBOARD_SETTINGS_URL,
  DASHBOARD_URL,
} from '@/lib/constants';
import { User } from '@/lib/types';

export function UserMenu({ user }: { user: User }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isMobile } = useSidebar();
  const [signingOut, setSigningOut] = useState(false);

  const onSignOut = () => {
    setSigningOut(true);
    authClient.signOut({
      fetchOptions: {
        onSuccess() {
          router.push('/');
        },
      },
    });
    setSigningOut(false);
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage className="object-cover" src={user.image || undefined} alt={user.name} />
                <AvatarFallback className="rounded-lg">{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage className="object-cover" src={user.image || undefined} alt={user.name} />
                  <AvatarFallback className="rounded-lg">{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                className={pathname === DASHBOARD_URL ? 'bg-sidebar-accent' : ''}
                onClick={() => router.push(DASHBOARD_URL)}
              >
                <LayoutDashboard />
                {DASHBOARD_LABEL}
              </DropdownMenuItem>
              <DropdownMenuItem
                className={pathname.startsWith(DASHBOARD_PROFILE_URL) ? 'bg-sidebar-accent' : ''}
                onClick={() => router.push(DASHBOARD_PROFILE_URL)}
              >
                <UserIcon />
                {DASHBOARD_PROFILE_LABEL}
              </DropdownMenuItem>
              <DropdownMenuItem
                className={pathname.startsWith(DASHBOARD_SETTINGS_URL) ? 'bg-sidebar-accent' : ''}
                onClick={() => router.push(DASHBOARD_SETTINGS_URL)}
              >
                <Settings />
                {DASHBOARD_SETTINGS_LABEL}
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" disabled={signingOut} onClick={onSignOut}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
