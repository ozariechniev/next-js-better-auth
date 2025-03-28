'use client';

import Image from 'next/image';
import { BadgeAlert, BadgeCheck, UserIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User } from '@/lib/types';

export function UserProfile({ user }: { user: User }) {
  return (
    <Card className="font-mono">
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        <div className="bg-muted relative size-24 overflow-hidden rounded-full">
          {user.image ? (
            <Image src={user.image} alt={user.name} layout="fill" objectFit="cover" />
          ) : (
            <UserIcon className="h-full w-full p-4" />
          )}
        </div>
        <div className="text-center">
          <h2 className="mb-4 text-xl font-semibold">{user.name}</h2>
          <div className="flex items-center justify-center space-x-2">
            <span className="text-muted-foreground text-sm">{user.email}</span>
            {user.emailVerified ? (
              <Badge className="bg-green-500 text-white">
                <BadgeCheck className="mr-1 size-5!" /> Verified
              </Badge>
            ) : (
              <Badge className="bg-orange-500 text-white">
                <BadgeAlert className="mr-1 size-5!" />
                Unverified
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
