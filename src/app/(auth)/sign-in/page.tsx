import { AUTH_NAV_LINKS } from '@/lib/constants';
import { AuthNav } from '../_components/auth-nav';
import { AuthWelcome } from '../_components/auth-welcome';
import { SignInForm } from '../_components/sign-in-form';

export default function SignInPage() {
  return (
    <>
      <AuthWelcome title="Welcome" description="Sign in to your account or create a new one" />
      <AuthNav links={AUTH_NAV_LINKS} />
      <SignInForm />
    </>
  );
}
