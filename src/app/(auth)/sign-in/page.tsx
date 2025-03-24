import { AuthNav } from '../_components/auth-nav';
import { AuthWelcome } from '../_components/auth-welcome';
import { AUTH_NAV_LINKS } from '../_constants';

export default function SignInPage() {
  return (
    <>
      <AuthWelcome title="Welcome" description="Sign in to your account or create a new one" />
      <AuthNav links={AUTH_NAV_LINKS} />
    </>
  );
}
