import { AuthWelcome } from '../_components/auth-welcome';
import { ResetPasswordForm } from '../_components/reset-password-form';

export default function ResetPasswordPage() {
  return (
    <>
      <AuthWelcome title="Welcome" description="Reset your account password" />
      <ResetPasswordForm />
    </>
  );
}
