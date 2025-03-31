'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ErrorContext } from '@better-fetch/fetch';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth-client';
import { DASHBOARD_URL, FORGOT_PASSWORD_LABEL, FORGOT_PASSWORD_URL, SIGN_IN_LABEL } from '@/lib/constants';
import { signInSchema } from '@/lib/definitions';

export function SignInForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (formData: z.infer<typeof signInSchema>) => {
    const data = {
      email: formData.email,
      password: formData.password,
      rememberMe: formData.rememberMe,
    };

    const fetchOptions = {
      onResponse: () => {
        setSubmitting(false);
      },
      onRequest: () => {
        setSubmitting(true);
      },
      onSuccess: () => {
        router.push(DASHBOARD_URL);
      },
      onError: (ctx: ErrorContext) => {
        toast.error(ctx.error.message ?? 'An error occurred, please try again.');
      },
    };

    await authClient.signIn.email(data, fetchOptions);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="rounded-sm">
          {/* Header */}
          <CardHeader>
            <CardTitle>{SIGN_IN_LABEL}</CardTitle>
            <CardDescription>Enter your email and password below to sign in to your account</CardDescription>
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
            <div className="flex items-center justify-between">
              {/* Remember me */}
              <FormField
                control={form.control}
                name="rememberMe"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} className="size-5" />
                    </FormControl>
                    <FormLabel>Remember me</FormLabel>
                  </FormItem>
                )}
              />
              {/* Forgot Password */}
              <Link className="text-sm font-bold hover:underline" href={FORGOT_PASSWORD_URL}>
                {FORGOT_PASSWORD_LABEL}
              </Link>
            </div>
          </CardContent>
          {/* Footer */}
          <CardFooter>
            <Button disabled={submitting} type="submit" className="h-12 w-full">
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                SIGN_IN_LABEL
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
