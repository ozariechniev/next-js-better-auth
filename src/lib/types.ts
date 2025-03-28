import { z } from 'zod';
import { userSchema } from '@/lib/definitions';
import { auth } from './auth';

export type Session = typeof auth.$Infer.Session;
export type SessionDetails = Session['session'];
export type User = z.infer<typeof userSchema>;
