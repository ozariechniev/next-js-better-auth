'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ErrorContext } from '@better-fetch/fetch';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth-client';
import { RESET_PASSWORD_LABEL, RESET_PASSWORD_URL } from '@/lib/constants';
import { forgotPasswordSchema } from '@/lib/definitions';
import { ForgotPasswordMessage } from './forgot-password-message';

export function ForgotPasswordForm() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (formData: z.infer<typeof forgotPasswordSchema>) => {
    const data = {
      email: formData.email,
      redirectTo: RESET_PASSWORD_URL,
    };

    const fetchOptions = {
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
      onError: (ctx: ErrorContext) => {
        toast.error(ctx.error.message ?? 'An error occurred, please try again.');
      },
    };

    await authClient.forgetPassword(data, fetchOptions);
  };

  if (submitted) {
    return <ForgotPasswordMessage />;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
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
