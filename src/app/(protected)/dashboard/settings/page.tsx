import { getUser } from '@/data/user';

export default async function SettingsPage() {
  await getUser();

  return (
    <div className="px-4 py-8">
      <h1 className="text-2xl">Settings</h1>
    </div>
  );
}
