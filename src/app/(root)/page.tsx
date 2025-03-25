import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="relative flex min-h-screen flex-col">
        <div className="dot-background"></div>
        <main className="relative z-10 flex-1">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
              {/* Featured block - spans 2 columns and 2 rows */}
              <div className="h-64 rounded-xl bg-neutral-100 p-6 md:col-span-2 md:row-span-2 md:h-auto"></div>

              {/* Regular blocks */}
              <div className="h-48 rounded-xl bg-neutral-100 p-6"></div>
              <div className="h-48 rounded-xl bg-neutral-100 p-6"></div>

              {/* Wide block - spans 2 columns */}
              <div className="h-48 rounded-xl bg-neutral-100 p-6 md:col-span-2"></div>

              {/* Tall block - spans 2 rows */}
              <div className="h-64 rounded-xl bg-neutral-100 p-6 md:row-span-2 md:h-auto"></div>

              {/* Regular blocks */}
              <div className="h-48 rounded-xl bg-neutral-100 p-6"></div>
              <div className="h-48 rounded-xl bg-neutral-100 p-6"></div>

              {/* Wide block - spans 3 columns */}
              <div className="h-48 rounded-xl bg-neutral-100 p-6 md:col-span-3"></div>

              {/* Medium blocks - each spans 1.5 columns */}
              <div className="h-48 rounded-xl bg-neutral-100 p-6 md:col-span-1"></div>
              <div className="h-48 rounded-xl bg-neutral-100 p-6 md:col-span-1"></div>
              <div className="h-48 rounded-xl bg-neutral-100 p-6 md:col-span-1"></div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
