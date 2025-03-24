import { Navbar } from '@/components/navbar';

export default function DashboardPage() {
  return (
    <div className="container mx-auto">
      <Navbar />
      <div className="flex flex-col space-y-4 py-4">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
      </div>
    </div>
  );
}
