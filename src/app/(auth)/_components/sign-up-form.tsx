'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Loader2, Mail } from 'lucide-react';
import type { z } from 'zod';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { signUpSchema } from '@/lib/definitions';
import { SIGN_UP_LABEL } from '../_constants';

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

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setSubmitting(true);
    console.log(data);
  };

  if (submitted) {
    return (
      <Card className="rounded-sm">
        <CardHeader>
          <CardTitle>Check your email</CardTitle>
          <CardDescription>
            We&apos;ve sent a verification link to your email. Please, check your email and click the link to verify
            your account.
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
          <Button className="h-12 w-full" onClick={() => setSubmitted(false)}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to sign up
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
