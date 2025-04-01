import { requireUserSessions } from '@/data/session';
import { requireUser } from '@/data/user';
import { UserProfile } from './_components/user-profile';
import { UserSessions } from './_components/user-sessions';
import { UserSettings } from './_components/user-settings';

export const dynamic = 'force-dynamic';

export default async function ProfilePage() {
  const user = await requireUser();
  const sessions = await requireUserSessions();

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
