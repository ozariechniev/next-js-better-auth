import Link from 'next/link';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white/50 py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-8">
            <div className="dark:bg-muted inline-flex max-w-60 items-center rounded-lg bg-blue-100 px-3 py-1 text-sm">
              <ShieldCheck className="mr-1 h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="text-blue-700 dark:text-blue-300">Secure Authentication System</span>
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter text-slate-900 sm:text-5xl xl:text-6xl/none dark:text-slate-50">
                Modern Authentication for Next.js Applications
              </h1>
              <p className="dark:text-muted-foreground max-w-[600px] text-slate-700 md:text-xl">
                A complete authentication solution with email verification, password recovery, and secure session
                management.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg">
                <Link href="https://github.com/ozariechniev/next-js-better-auth">
                  <span>Get Started</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-[350px] w-[350px] md:h-[450px] md:w-[450px]">
              <div className="dark:bg-primary/10 absolute inset-0 rounded-full bg-blue-50 blur-xl"></div>
              <div className="dark:bg-background absolute inset-4 rounded-full bg-white p-8 shadow-sm">
                <div className="dark:border-primary/50 dark:bg-background h-full w-full rounded-full border-2 border-blue-100 bg-white p-6 shadow-md">
                  <div className="dark:bg-background flex h-full w-full flex-col items-center justify-center rounded-full bg-white p-6">
                    <ShieldCheck className="dark:text-primary h-16 w-16 text-blue-600" />
                    <h3 className="mt-4 text-xl font-semibold text-slate-900 dark:text-slate-50">
                      Built with Better Auth
                    </h3>
                    <p className="dark:text-muted-foreground mt-2 text-center text-sm text-slate-600">
                      Secure, Simple, Modern
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
