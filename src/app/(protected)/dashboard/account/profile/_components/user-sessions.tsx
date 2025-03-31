'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Monitor, Smartphone } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { authClient } from '@/lib/auth-client';
import { SessionDetails } from '@/lib/types';
import { dateToRelative, getUAInfo } from '@/lib/utils';

export function UserSessions({ active, sessions }: { active: string; sessions: SessionDetails[] }) {
  const router = useRouter();
  const sessionsWithUA = sessions
    .filter((session) => session.userAgent)
    .sort((a, b) => {
      if (a.id === active) return -1;
      if (b.id === active) return 1;

      return +new Date(b.createdAt) - +new Date(a.createdAt);
    });
  const [isRevoking, setIsRevoking] = useState(false);

  const handleRevokeSession = async (token: string) => {
    setIsRevoking(true);

    const response = await authClient.revokeSession({
      token,
    });

    if (response.error) {
      toast.error(response.error.message);
    } else {
      toast.success('Session revoked successfully');
    }

    router.refresh();
    setIsRevoking(false);
  };

  return (
    <Card className="font-mono">
      <CardHeader>
        <CardTitle>Active Sessions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="max-h-[400px] overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[60px]">Device</TableHead>
                <TableHead>User Agent</TableHead>
                <TableHead className="w-[200px]">Created At</TableHead>
                <TableHead className="w-[100px]">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sessionsWithUA.map((session) => {
                const ua = getUAInfo(session.userAgent || '');

                return (
                  <TableRow key={session.id}>
                    <TableCell>
                      {ua.deviceType === 'mobile' ? (
                        <Smartphone className="text-muted-foreground h-5 w-5" />
                      ) : (
                        <Monitor className="text-muted-foreground h-5 w-5" />
                      )}
                    </TableCell>
                    <TableCell className="font-medium">
                      {ua.browserName}, {ua.osName}
                    </TableCell>
                    <TableCell>{dateToRelative(session.createdAt)}</TableCell>
                    <TableCell>
                      {session.id === active ? (
                        <Badge className="w-full py-2" variant="outline">
                          Current
                        </Badge>
                      ) : (
                        <Button
                          disabled={isRevoking}
                          variant="destructive"
                          size="sm"
                          className="w-full"
                          onClick={() => handleRevokeSession(session.token)}
                        >
                          {isRevoking ? <Loader2 className="h-4 w-4 animate-spin" /> : <span>Revoke</span>}
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
