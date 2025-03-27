import { requireUser } from '@/data/user';
import { UserProfile } from '../_components/profile/user-profile';
import { UserSessions } from '../_components/profile/user-sessions';
import { UserSettings } from '../_components/profile/user-settings';

export default async function AccountPage() {
  await requireUser();

  return (
    <div className="p-4 lg:p-6">
      <h1 className="mb-5 text-2xl">User Profile</h1>
      <div className="@container">
        <div className="mb-5 grid grid-cols-1 gap-6 overflow-hidden @lg:grid-cols-[3fr_1fr]">
          <UserProfile />
          <UserSettings />
        </div>
        <UserSessions />
      </div>
    </div>
  );
}
