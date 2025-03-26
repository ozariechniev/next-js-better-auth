import { Suspense } from 'react';
import { AuthWelcome } from '../_components/auth-welcome';
import { ResetPasswordForm } from '../_components/reset-password-form';
import { ResetPasswordFormFallback } from '../_components/reset-password-form-fallback';

export default function ResetPasswordPage() {
  return (
    <>
      <AuthWelcome title="Welcome" description="Reset your account password" />
      <Suspense fallback={<ResetPasswordFormFallback />}>
        <ResetPasswordForm />
      </Suspense>
    </>
  );
}
