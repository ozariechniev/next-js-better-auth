import { AUTH_NAV_LINKS } from '@/lib/constants';
import { AuthNav } from '../_components/auth-nav';
import { AuthWelcome } from '../_components/auth-welcome';
import { SignUpForm } from '../_components/sign-up-form';

export default function SignUpPage() {
  return (
    <>
      <AuthWelcome title="Welcome" description="Sign in to your account or create a new one" />
      <AuthNav links={AUTH_NAV_LINKS} />
      <SignUpForm />
    </>
  );
}
