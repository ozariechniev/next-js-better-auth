import { useRouter } from 'next/navigation';
import { ArrowLeft, Mail } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { SIGN_IN_LABEL, SIGN_IN_URL } from '@/lib/constants';

export function SignUpMessage() {
  const router = useRouter();

  return (
    <Card className="rounded-sm">
      <CardHeader>
        <CardTitle>Check your email</CardTitle>
        <CardDescription>
          We&apos;ve sent a verification link to your email. Please, check your email and click the link to verify your
          account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Alert variant="default">
          <Mail className="h-4 w-4" />
          <AlertTitle>Please, pay attention</AlertTitle>
          <AlertDescription>
            If you don&apos;t see the email, check your spam folder. If you still don&apos;t see it, please contact
            support.
          </AlertDescription>
        </Alert>
      </CardContent>
      <CardFooter>
        <Button className="h-12 w-full" onClick={() => router.push(SIGN_IN_URL)}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to {SIGN_IN_LABEL}
        </Button>
      </CardFooter>
    </Card>
  );
}
