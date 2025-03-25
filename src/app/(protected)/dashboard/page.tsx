import { Navbar } from '@/components/navbar';
import { getUser } from '@/data/user';

export default async function DashboardPage() {
  const user = await getUser();

  return (
    <div className="container mx-auto">
      <Navbar />
      <div className="flex flex-col space-y-4 py-4">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <div className="rounded-lg border p-4">
          <h2 className="text-xl font-medium">Welcome, {user.name}!</h2>
          <p className="text-muted-foreground">Email: {user.email}</p>
          <p className="text-muted-foreground">Email Verified: {user.emailVerified ? 'Yes' : 'No'}</p>
        </div>
      </div>
    </div>
  );
}
