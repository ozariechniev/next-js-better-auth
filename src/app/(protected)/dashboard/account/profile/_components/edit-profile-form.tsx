'use client';

import { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ErrorContext } from '@better-fetch/fetch';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Trash2 } from 'lucide-react';
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
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth-client';
import { editProfileSchema } from '@/lib/definitions';
import { convertToBase64 } from '@/lib/utils';

export function EditProfileForm() {
  const router = useRouter();
  const [openEditProfile, setOpenEditProfile] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof editProfileSchema>>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      name: undefined,
      image: undefined,
    },
  });

  const onSubmit = async (formData: z.infer<typeof editProfileSchema>) => {
    const data = {
      name: formData.name,
      image: formData.image ? await convertToBase64(formData.image) : undefined,
    };

    const fetchOptions = {
      onResponse: () => {
        setSubmitting(false);
      },
      onRequest: () => {
        setSubmitting(true);
      },
      onSuccess: () => {
        setImagePreview(null);
        setOpenEditProfile(false);
        form.reset();
        router.refresh();
        toast.success('Personal information updated successfully');
      },
      onError: (ctx: ErrorContext) => {
        toast.error(ctx.error.message ?? 'An error occurred, please try again.');
      },
    };

    if (!data.name && !data.image) {
      toast.error('Please provide at least one field to update.');
      return;
    }

    if (data?.image && !data.image.startsWith('data:image/')) {
      toast.error('Invalid image format. Please upload a valid image.');
      return;
    }

    await authClient.updateUser(data, fetchOptions);
  };

  const handleImageChange = (e: File | null) => {
    if (e) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(e);
    } else {
      setImagePreview(null);
    }
  };

  const handleImageDelete = () => {
    form.setValue('image', undefined);
    setImagePreview(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
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
              {/* Image */}
              <Controller
                control={form.control}
                name="image"
                render={({ field: { onChange } }) => (
                  <FormField
                    control={form.control}
                    name="image"
                    render={() => (
                      <FormItem>
                        <FormLabel>Profile Picture</FormLabel>
                        <FormControl>
                          <div className="space-y-4">
                            <Input
                              ref={fileInputRef}
                              type="file"
                              accept="image/jpeg,image/jpg,image/png,image/webp"
                              onChange={(e) => {
                                const file = e.target.files?.[0] ?? null;
                                onChange(file);
                                handleImageChange(file);
                              }}
                            />
                            {imagePreview && (
                              <div className="relative h-32 w-32 rounded-full">
                                <Image
                                  src={imagePreview}
                                  alt="Profile preview"
                                  className="border object-cover p-1"
                                  fill
                                />
                                <button
                                  type="button"
                                  className="text-destructive hover:bg-destructive/10 absolute -top-1 -right-8 rounded-full p-1"
                                  onClick={handleImageDelete}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            )}
                          </div>
                        </FormControl>
                        <FormDescription>
                          Accepted formats: jpg, jpeg, png, webp, gif. <br /> Max file size: 2MB.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              />
            </div>
            <DialogFooter>
              <Button disabled={submitting} type="submit">
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <span>Updating...</span>
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
