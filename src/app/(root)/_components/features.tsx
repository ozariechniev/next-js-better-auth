import { ReactNode } from 'react';
import { FileText, KeyRound, Mail, Palette, Shield, UserPlus } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const data = [
  {
    title: 'User Registration',
    description: 'Secure sign-up process with email/password authentication.',
    icon: <UserPlus className="size-6" aria-hidden />,
  },
  {
    title: 'Email Confirmation',
    description: 'Users must verify their email before accessing their account.',
    icon: <Mail className="size-6" aria-hidden />,
  },
  {
    title: 'Password Recovery',
    description: 'Forgot password & reset password workflows.',
    icon: <KeyRound className="size-6" aria-hidden />,
  },
  {
    title: 'Secure Authentication',
    description: 'Protected routes & session management.',
    icon: <Shield className="size-6" aria-hidden />,
  },
  {
    title: 'Modern UI',
    description: 'Built with Tailwind CSS & shadcn/ui components.',
    icon: <Palette className="size-6" aria-hidden />,
  },
  {
    title: 'Email Templates',
    description: 'Customizable email templates with JSX Email.',
    icon: <FileText className="size-6" aria-hidden />,
  },
];

export function Features() {
  return (
    <section id="features" className="md:py-32t py-16">
      <div className="@container mx-auto max-w-5xl px-6">
        <div className="text-center">
          <h2 className="text-4xl font-semibold text-balance lg:text-5xl">Features</h2>
          <p className="mt-4">Everything you need for a complete authentication system</p>
        </div>
        <div className="mx-auto mt-8 grid max-w-sm gap-6 *:text-center md:mt-16 @min-4xl:max-w-full @min-4xl:grid-cols-3">
          {data.map(({ title, description, icon }) => (
            <Card key={title} className="group gap-4 shadow-zinc-950/5">
              <CardHeader className="pb-3">
                <CardDecorator>{icon}</CardDecorator>
                <h3 className="mt-6 font-semibold">{title}</h3>
              </CardHeader>
              <CardContent>
                <p className="mb-3 text-sm">{description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

const CardDecorator = ({ children }: { children: ReactNode }) => (
  <div className="relative mx-auto size-36 duration-200 [--color-border:color-mix(in_oklab,var(--color-zinc-950)10%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--color-zinc-950)20%,transparent)] dark:[--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)] dark:group-hover:bg-white/5 dark:group-hover:[--color-border:color-mix(in_oklab,var(--color-white)20%,transparent)]">
    <div
      aria-hidden
      className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px]"
    />
    <div aria-hidden className="to-background absolute inset-0 bg-radial from-transparent to-75%" />
    <div className="bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-t border-l">
      {children}
    </div>
  </div>
);
