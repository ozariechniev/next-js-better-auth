import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CallToAction() {
  return (
    <section className="pt-16 pb-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center">
          <h2 className="text-4xl font-semibold text-balance lg:text-5xl">Ready to Get Started?</h2>
          <p className="mt-4">Implement secure authentication in your Next.js application in minutes</p>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link href="https://github.com/ozariechniev/next-js-better-auth">
                <span>Get Started</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
