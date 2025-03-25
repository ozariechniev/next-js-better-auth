import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

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
              If you believe this is a mistake or need assistance, please contact our support team at{' '}
              <a href="mailto:support@example.com" className="text-primary hover:underline">
                support@example.com
              </a>
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="h-12 w-full">
              <Link href="/">Return to Homepage</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
