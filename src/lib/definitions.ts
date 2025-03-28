import { z } from 'zod';

const getNameSchema = () =>
  z.string().min(1, { message: 'Name is required' }).max(50, { message: 'Name must be less than 50 characters' });
const getEmailSchema = () => z.string().email({ message: 'Invalid email address' });
const getPasswordSchema = () => z.string().min(8, { message: 'Password must be at least 8 characters long' });
const getConfirmPasswordSchema = () =>
  z.string().min(8, { message: 'Confirm password is required' }).max(128, {
    message: 'Confirm password must be less than 128 characters',
  });
const getRememberMeSchema = () => z.boolean().default(false).optional();

const USER_ROLE = ['user', 'admin'] as const;

/**
 * ----------------------------------------------------------------------------
 * Sign In Schema
 * ----------------------------------------------------------------------------
 */

export const signInSchema = z.object({
  email: getEmailSchema(),
  password: getPasswordSchema(),
  rememberMe: getRememberMeSchema(),
});

/**
 * ----------------------------------------------------------------------------
 * Sign Up Schema
 * ----------------------------------------------------------------------------
 */

export const signUpSchema = z
  .object({
    name: getNameSchema(),
    email: getEmailSchema(),
    password: getPasswordSchema(),
    confirmPassword: getConfirmPasswordSchema(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

/**
 * ----------------------------------------------------------------------------
 * Forgot Password Schema
 * ----------------------------------------------------------------------------
 */

export const forgotPasswordSchema = z.object({
  email: getEmailSchema(),
});

/**
 * ----------------------------------------------------------------------------
 * Reset Password Schema
 * ----------------------------------------------------------------------------
 */

export const resetPasswordSchema = z
  .object({
    password: getPasswordSchema(),
    confirmPassword: getConfirmPasswordSchema(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

/**
 * ----------------------------------------------------------------------------
 * User Schema
 * ----------------------------------------------------------------------------
 */

export const userRoleEnum = z.enum(USER_ROLE);

export const userSchema = z.object({
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string().nullable(),
  role: userRoleEnum,
  sessionId: z.string(),
});
