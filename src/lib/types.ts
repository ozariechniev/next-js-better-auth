import { z } from 'zod';
import { userDTOSchema } from '@/lib/definitions';

export type UserDTO = z.infer<typeof userDTOSchema>;
