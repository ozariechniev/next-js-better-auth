'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth-client';
import { changePasswordSchema } from '@/lib/definitions';

export function ChangePasswordForm() {
  const router = useRouter();
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      signOutFromOtherDevices: false,
    },
  });

  const onSubmit = async (formData: z.infer<typeof changePasswordSchema>) => {
    await authClient.changePassword(
      {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
        revokeOtherSessions: formData.signOutFromOtherDevices,
      },
      {
        onResponse: () => {
          setSubmitting(false);
        },
        onRequest: () => {
          setSubmitting(true);
        },
        onSuccess: () => {
          router.refresh();
          form.reset();
          setOpenChangePassword(false);
          toast.success('Password changed successfully');
        },
        onError: (ctx) => {
          toast.error(ctx.error.message ?? 'An error occurred, please try again.');
        },
      }
    );
  };

  return (
    <Dialog open={openChangePassword} onOpenChange={setOpenChangePassword}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          Change Password
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
            <DialogHeader>
              <DialogTitle>Change Password</DialogTitle>
              <DialogDescription>Update your password to a new secure one.</DialogDescription>
            </DialogHeader>
            <div className="my-6 flex flex-col space-y-6">
              {/* Current password */}
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* New password */}
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Confirm password */}
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
              {/* Sign out */}
              <FormField
                control={form.control}
                name="signOutFromOtherDevices"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} className="size-5" />
                    </FormControl>
                    <FormLabel>Sign out from other devices</FormLabel>
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit">
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <span>Updating...</span>
                  </>
                ) : (
                  <span>Update Password</span>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
