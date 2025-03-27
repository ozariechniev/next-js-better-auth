'use client';

import { useState } from 'react';
import { User } from 'lucide-react';
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

const user = {
  name: 'John Doe',
  verified: true,
  email: 'test@test.com',
};

export function UserSettings() {
  const [openEditProfile, setOpenEditProfile] = useState(false);
  const [openDeleteProfile, setOpenDeleteProfile] = useState(false);
  const [openChangePassword, setOpenChangePassword] = useState(false);

  return (
    <Card className="font-mono">
      <CardHeader>
        <CardTitle>User Settings</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col space-y-4">
        {/* Edit Profile Button & Dialog - Now first and outlined */}
        <Dialog open={openEditProfile} onOpenChange={setOpenEditProfile}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full">
              Edit Profile
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
              <DialogDescription>Update your name and profile picture.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex flex-col items-center gap-4">
                <div className="bg-muted relative h-24 w-24 overflow-hidden rounded-full">
                  <User className="h-full w-full p-4" />
                </div>
                <div className="grid w-full gap-2">
                  <Label htmlFor="picture">Profile Picture</Label>
                  <Input id="picture" type="file" accept="image/*" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue={user.name} />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={() => setOpenEditProfile(false)}>
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Change Password Button & Dialog - Now second and already outlined */}
        <Dialog open={openChangePassword} onOpenChange={setOpenChangePassword}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full">
              Change Password
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Change Password</DialogTitle>
              <DialogDescription>Update your password to a new secure one.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" placeholder="Enter current password" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" placeholder="Enter new password" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input id="confirm-password" type="password" placeholder="Confirm new password" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={() => setOpenChangePassword(false)}>
                Update Password
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Profile Button & Dialog - Now last and still destructive */}
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
