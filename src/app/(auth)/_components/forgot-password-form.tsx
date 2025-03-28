'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Loader2, Mail } from 'lucide-react';
import { toast } from 'sonner';
import { z } from 'zod';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth-client';
import { RESET_PASSWORD_LABEL, RESET_PASSWORD_URL, SIGN_IN_LABEL, SIGN_IN_URL } from '@/lib/constants';
import { forgotPasswordSchema } from '@/lib/definitions';

export function ForgotPasswordMessage() {
  const router = useRouter();

  return (
    <Card className="rounded-sm">
      <CardHeader>
        <CardTitle>Check your email</CardTitle>
        <CardDescription>We&apos;ve sent a password reset link to your email.</CardDescription>
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

export function ForgotPasswordForm() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof forgotPasswordSchema>) => {
    await authClient.forgetPassword(
      {
        email: data.email,
        redirectTo: RESET_PASSWORD_URL,
      },
      {
        onResponse: () => {
          setSubmitting(false);
        },
        onRequest: () => {
          setSubmitting(true);
        },
        onSuccess: () => {
          form.reset();
          setSubmitted(true);
        },
        onError: (ctx) => {
          toast.error(ctx.error.message ?? 'An error occurred, please try again.');
        },
      }
    );
  };

  if (submitted) {
    return <ForgotPasswordMessage />;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="rounded-sm">
          {/* Header */}
          <CardHeader>
            <CardTitle>Forgot your Password?</CardTitle>
            <CardDescription>Enter your email below to reset your password</CardDescription>
          </CardHeader>
          {/* Content */}
          <CardContent className="space-y-6">
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="name@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          {/* Footer */}
          <CardFooter>
            <Button disabled={submitting} type="submit" className="h-12 w-full">
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <span>Resetting password...</span>
                </>
              ) : (
                RESET_PASSWORD_LABEL
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
