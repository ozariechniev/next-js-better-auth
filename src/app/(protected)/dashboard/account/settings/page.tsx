import { requireUser } from '@/data/user';

export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
  await requireUser();

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <h1 className="text-2xl">User Settings</h1>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="bg-muted/50 aspect-video rounded-xl" />
        <div className="bg-muted/50 aspect-video rounded-xl" />
        <div className="bg-muted/50 aspect-video rounded-xl" />
      </div>
      <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
    </div>
  );
}
