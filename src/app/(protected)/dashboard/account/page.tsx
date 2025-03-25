import { getUser } from '@/data/user';

export default async function AccountPage() {
  await getUser();

  return (
    <div className="px-4 py-8">
      <h1 className="text-2xl">Account</h1>
    </div>
  );
}
