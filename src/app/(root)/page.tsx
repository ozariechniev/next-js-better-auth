import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';
import { CallToAction } from './_components/call-to-action';
import { Features } from './_components/features';

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="relative flex min-h-screen flex-col">
        <div className="dot-background"></div>
        <main className="relative z-10 flex-1">
          <Features />
          <CallToAction />
        </main>
      </div>
      <Footer />
    </>
  );
}
