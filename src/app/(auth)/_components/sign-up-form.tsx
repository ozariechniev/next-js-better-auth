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
import { SIGN_UP_LABEL } from '@/lib/constants';
import { signUpSchema } from '@/lib/definitions';
import { SignUpMessage } from './sign-up-message';

export function SignUpForm() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (formData: z.infer<typeof signUpSchema>) => {
    const data = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
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
        toast.error(ctx.error.message ?? 'Internal server error. Please, try again later.');
      },
    };

    await authClient.signUp.email(data, fetchOptions);
  };

  if (submitted) {
    return <SignUpMessage />;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <Card className="rounded-sm">
          {/* Header */}
          <CardHeader>
            <CardTitle>{SIGN_UP_LABEL}</CardTitle>
            <CardDescription>Create a new account to get started</CardDescription>
          </CardHeader>
          {/* Content */}
          <CardContent className="space-y-6">
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Example Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <span>Signing up...</span>
                </>
              ) : (
                SIGN_UP_LABEL
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
