import { CallToAction } from './_components/call-to-action';
import { Features } from './_components/features';
import { Footer } from './_components/footer';
import { Hero } from './_components/hero';
import { Navbar } from './_components/navbar';

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="relative flex min-h-screen flex-col">
        <div className="dot-background"></div>
        <main className="relative z-10 flex-1">
          <Hero />
          <Features />
          <CallToAction />
        </main>
      </div>
      <Footer />
    </>
  );
}
