import { redirect } from 'next/navigation';
import { getUser, getUserSessions } from '@/data/user';
import { ACCESS_DENIED_URL } from '@/lib/constants';
import { UserProfile } from './_components/user-profile';
import { UserSessions } from './_components/user-sessions';
import { UserSettings } from './_components/user-settings';

export default async function AccountPage() {
  const user = await getUser();
  const sessions = await getUserSessions();

  if (!user || !sessions) {
    redirect(ACCESS_DENIED_URL);
  }

  return (
    <div className="p-4 lg:p-6">
      <h1 className="mb-5 text-2xl">User Profile</h1>
      <div className="@container">
        <div className="mb-5 grid grid-cols-1 gap-6 overflow-hidden @lg:grid-cols-[3fr_1fr]">
          <UserProfile user={user} />
          <UserSettings />
        </div>
        <UserSessions active={user.sessionId} sessions={sessions} />
      </div>
    </div>
  );
}
