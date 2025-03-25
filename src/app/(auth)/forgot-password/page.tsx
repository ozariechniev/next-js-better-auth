import { AuthWelcome } from '../_components/auth-welcome';
import { ForgotPasswordForm } from '../_components/forgot-password-form';

export default function ForgotPasswordPage() {
  return (
    <>
      <AuthWelcome title="Welcome" description="Reset your account password" />
      <ForgotPasswordForm />
    </>
  );
}
