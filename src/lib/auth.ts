import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { nextCookies } from 'better-auth/next-js';
import { admin } from 'better-auth/plugins';
import { resetPasswordEmailHTML } from '@/app/(auth)/_components/email/reset-password-email';
import { signUpEmailHTML } from '@/app/(auth)/_components/email/sign-up-email';
import { db } from '@/db/drizzle';
import { schema } from '@/db/schema';
import { sendEmail } from './send-email';

export const auth = betterAuth({
  appName: 'NEXT.JS Better Auth',
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema,
  }),
  rateLimit: {
    enabled: false,
    storage: 'database',
    window: 10,
    max: 100,
  },
  emailAndPassword: {
    enabled: false,
    requireEmailVerification: true,
    async sendResetPassword({ user, url }) {
      const emailHTML = await resetPasswordEmailHTML({ url, userEmail: user.email });

      await sendEmail({
        to: user.email,
        subject: 'Reset your password',
        html: emailHTML,
      });
    },
  },
  emailVerification: {
    autoSignInAfterVerification: true,
    expiresIn: 3600,
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url }) => {
      const emailHTML = await signUpEmailHTML({ url });

      await sendEmail({
        to: user.email,
        subject: 'Verify your email address',
        html: emailHTML,
      });
    },
  },
  plugins: [admin(), nextCookies()],
});
