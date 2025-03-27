'use client';

import { Monitor, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const sessions = [
  {
    id: '1',
    deviceType: 'desktop',
    userAgent: 'Chrome on Windows',
    createdAt: '2023-04-15 10:30',
    lastActive: '2023-05-01 14:30',
  },
  {
    id: '2',
    deviceType: 'mobile',
    userAgent: 'Safari on iPhone',
    createdAt: '2023-04-20 15:45',
    lastActive: '2023-05-02 09:15',
  },
  {
    id: '3',
    deviceType: 'desktop',
    userAgent: 'Firefox on MacOS',
    createdAt: '2023-04-25 08:20',
    lastActive: '2023-05-03 16:45',
  },
];

export function UserSessions() {
  const handleRevokeSession = (sessionId: string) => {
    console.log(`Revoke session with id: ${sessionId}`);
  };

  return (
    <Card className="font-mono">
      <CardHeader>
        <CardTitle>Active Sessions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="max-h-[400px] overflow-auto">
          {/* Update the sessions table in the Column 2 section */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[60px]">Device</TableHead>
                <TableHead>User Agent</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead className="w-[100px]">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sessions.map((session) => (
                <TableRow key={session.id}>
                  <TableCell>
                    {session.deviceType === 'mobile' ? (
                      <Smartphone className="text-muted-foreground h-5 w-5" />
                    ) : (
                      <Monitor className="text-muted-foreground h-5 w-5" />
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{session.userAgent}</TableCell>
                  <TableCell>{session.createdAt}</TableCell>
                  <TableCell>
                    <Button variant="destructive" size="sm" onClick={() => handleRevokeSession(session.id)}>
                      Revoke
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
