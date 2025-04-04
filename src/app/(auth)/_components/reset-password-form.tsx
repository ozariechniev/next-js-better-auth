'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
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
import { RESET_PASSWORD_LABEL, SIGN_IN_URL } from '@/lib/constants';
import { resetPasswordSchema } from '@/lib/definitions';
import { ResetPasswordMessage } from './reset-password-message';

export function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const [submitting, setSubmitting] = useState(false);
  const token = searchParams.get('token');
  const router = useRouter();

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (formData: z.infer<typeof resetPasswordSchema>) => {
    const data = {
      token: token || undefined,
      newPassword: formData.password,
    };

    const fetchOptions = {
      onResponse: () => {
        setSubmitting(false);
      },
      onRequest: () => {
        setSubmitting(true);
      },
      onSuccess: () => {
        toast.success('Password reset successfully');
        router.push(SIGN_IN_URL);
      },
      onError: (ctx: ErrorContext) => {
        toast.error(ctx.error.message ?? 'An error occurred, please try again.');
      },
    };

    await authClient.resetPassword(data, fetchOptions);
  };

  if (!token) {
    return <ResetPasswordMessage />;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <Card className="rounded-sm">
          {/* Header */}
          <CardHeader>
            <CardTitle>Reset Password</CardTitle>
            <CardDescription>Enter new password and confirm it to reset your password</CardDescription>
          </CardHeader>
          {/* Content */}
          <CardContent className="space-y-6">
            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Confirm Password */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
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
                  <Loader2 className="size-4 animate-spin" />
                  Resetting...
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
