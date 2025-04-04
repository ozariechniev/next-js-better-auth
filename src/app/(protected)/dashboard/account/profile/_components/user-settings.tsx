'use client';

import { useState } from 'react';
import { ErrorContext } from '@better-fetch/fetch';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authClient } from '@/lib/auth-client';
import { ChangePasswordForm } from './change-password-form';
import { EditProfileForm } from './edit-profile-form';

export function UserSettings() {
  const [openDeleteProfile, setOpenDeleteProfile] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deleteConfirmed, setDeleteConfirmed] = useState(false);
  const [deleteRequested, setDeleteRequested] = useState(false);
  const [confirm, setConfirm] = useState('');

  const onSubmit = async () => {
    const fetchOptions = {
      onRequest: () => {
        setSubmitting(true);
      },
      onResponse: () => {
        setSubmitting(false);
        setConfirm('');
        setDeleteConfirmed(false);
      },
      onSuccess: () => {
        setDeleteRequested(true);
      },
      onError: (ctx: ErrorContext) => {
        setSubmitting(false);
        toast.error(ctx.error.message ?? 'Failed to delete profile. Please try again later.');
      },
    };

    await authClient.deleteUser({}, fetchOptions);
  };

  const handleConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirm(e.target.value);
    setDeleteConfirmed(e.target.value === 'DELETE');
  };

  return (
    <Card className="font-mono">
      <CardHeader>
        <CardTitle>User Settings</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col space-y-4">
        <EditProfileForm />
        <ChangePasswordForm />
        <Dialog open={openDeleteProfile} onOpenChange={setOpenDeleteProfile}>
          <DialogTrigger asChild>
            <Button variant="destructive" className="w-full">
              Delete Profile
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            {deleteRequested ? (
              <>
                <DialogHeader>
                  <DialogTitle>Profile Deletion Requested</DialogTitle>
                  <DialogDescription className="pt-4">
                    We&apos;ve sent you an email with a link to confirm your profile deletion. Please check your inbox
                    and follow the instructions.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setOpenDeleteProfile(false)}>
                    Close
                  </Button>
                </DialogFooter>
              </>
            ) : (
              <>
                <DialogHeader>
                  <DialogTitle>Delete Profile</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete your profile? This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="confirm">Type &quot;DELETE&quot; to confirm</Label>
                    <Input id="confirm" placeholder="DELETE" value={confirm} onChange={handleConfirmChange} />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setOpenDeleteProfile(false)}>
                    Cancel
                  </Button>
                  <Button disabled={!deleteConfirmed || submitting} variant="destructive" onClick={onSubmit}>
                    Delete Profile
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
