import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { SIGN_IN_URL } from '@/lib/constants';

export default function AccessDeniedPage() {
  return (
    <div className="relative flex min-h-dvh items-center justify-center p-4">
      <div className="dot-background absolute inset-0" />
      <div className="relative z-10 w-full max-w-md">
        <Card className="rounded-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Access Denied</CardTitle>
            <CardDescription>You don&apos;t have permission to access this page</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">Please sign in with an authorized account to continue.</p>
            <p className="text-muted-foreground text-sm">
              If you believe this is a mistake or need assistance, please contact our support team.
            </p>
          </CardContent>
          <CardFooter className="grid grid-cols-2 gap-4">
            <Button asChild className="w-full">
              <Link href={SIGN_IN_URL}>Sign In</Link>
            </Button>
            <Button variant="outline" asChild className="w-full">
              <Link href="/">Return to Homepage</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
