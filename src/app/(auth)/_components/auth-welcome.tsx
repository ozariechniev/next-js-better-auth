import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

type AuthWelcomeProps = {
  title: string;
  description: string;
};

export function AuthWelcome({ title, description }: AuthWelcomeProps) {
  return (
    <>
      <div className="flex justify-end">
        <Button variant="ghost" asChild>
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Homepage
          </Link>
        </Button>
      </div>
      <div className="mb-4 text-center">
        <h1 className="mb-2 text-4xl font-bold tracking-tight">{title}</h1>
        <p>{description}</p>
      </div>
    </>
  );
}
