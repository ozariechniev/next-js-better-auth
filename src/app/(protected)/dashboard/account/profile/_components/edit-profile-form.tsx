'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
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
import { editProfileSchema } from '@/lib/definitions';

export function EditProfileForm() {
  const router = useRouter();
  const [openEditProfile, setOpenEditProfile] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<z.infer<typeof editProfileSchema>>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = async (formData: z.infer<typeof editProfileSchema>) => {
    await authClient.updateUser(
      {
        name: formData.name,
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
          setOpenEditProfile(false);
          toast.success('Personal information updated successfully');
        },
        onError: (ctx) => {
          toast.error(ctx.error.message ?? 'An error occurred, please try again.');
        },
      }
    );
  };

  return (
    <Dialog open={openEditProfile} onOpenChange={setOpenEditProfile}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
              <DialogDescription>Update your name and profile picture.</DialogDescription>
            </DialogHeader>
            <div className="my-6 flex flex-col space-y-6">
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
            </div>
            <DialogFooter>
              <Button disabled={submitting} type="submit" onClick={() => setOpenEditProfile(false)}>
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <span className="animate-spin">Updating...</span>
                  </>
                ) : (
                  <span>Update Profile</span>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
