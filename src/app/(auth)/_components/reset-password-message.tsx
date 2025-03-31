'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FORGOT_PASSWORD_LABEL, FORGOT_PASSWORD_URL } from '@/lib/constants';

export function ResetPasswordMessage() {
  const router = useRouter();

  return (
    <Card className="rounded-sm">
      <CardHeader>
        <CardTitle>Invalid token</CardTitle>
        <CardDescription>Token is invalid or has expired. Please request a new password reset link.</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className="h-12 w-full" onClick={() => router.push(FORGOT_PASSWORD_URL)}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to {FORGOT_PASSWORD_LABEL}
        </Button>
      </CardFooter>
    </Card>
  );
}
