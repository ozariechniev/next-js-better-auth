import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { nextCookies } from 'better-auth/next-js';
import { admin, openAPI } from 'better-auth/plugins';
import { db } from '@/db/drizzle';
import { schema } from '@/db/schema';

export const auth = betterAuth({
  appName: 'NEXT.JS Better Auth',
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema,
  }),
  plugins: [admin(), openAPI(), nextCookies()],
});
