'use client';

import { CheckCircle, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const user = {
  name: 'John Doe',
  verified: true,
  email: 'test@test.com',
};

export function UserProfile() {
  return (
    <Card className="font-mono">
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        <div className="bg-muted relative h-24 w-24 overflow-hidden rounded-full">
          <User className="h-full w-full p-4" />
        </div>
        <div className="text-center">
          <h2 className="mb-4 text-xl font-semibold">{user.name}</h2>
          <div className="flex items-center justify-center space-x-2">
            <span className="text-muted-foreground text-sm">{user.email}</span>
            {user.verified && (
              <Badge className="bg-green-500 text-white">
                <CheckCircle className="mr-1 h-3 w-3" /> Verified
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
