'use client';

import { useState } from 'react';
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
import { ChangePasswordForm } from './change-password-form';
import { EditProfileForm } from './edit-profile-form';

export function UserSettings() {
  const [openDeleteProfile, setOpenDeleteProfile] = useState(false);

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
            <DialogHeader>
              <DialogTitle>Delete Profile</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete your profile? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="confirm">Type &quot;DELETE&quot; to confirm</Label>
                <Input id="confirm" placeholder="DELETE" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpenDeleteProfile(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={() => setOpenDeleteProfile(false)}>
                Delete Profile
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
