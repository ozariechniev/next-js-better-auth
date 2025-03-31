import { z } from 'zod';
import { USER_ROLE } from './constants';

const getNameSchema = () =>
  z.string().min(1, { message: 'Name is required' }).max(50, { message: 'Name must be less than 50 characters' });
const getEmailSchema = () => z.string().email({ message: 'Invalid email address' });
const getPasswordSchema = () => z.string().min(8, { message: 'Password must be at least 8 characters long' });
const getConfirmPasswordSchema = () =>
  z.string().min(8, { message: 'Confirm password must be at least 8 characters long' }).max(128, {
    message: 'Confirm password must be less than 128 characters',
  });
const getRememberMeSchema = () => z.boolean().default(false).optional();
const getSignOutFromAllDevicesSchema = () => z.boolean().default(false).optional();

/**
 * ----------------------------------------------------------------------------
 * Auth: Sign In Schema
 * ----------------------------------------------------------------------------
 */

export const signInSchema = z.object({
  email: getEmailSchema(),
  password: getPasswordSchema(),
  rememberMe: getRememberMeSchema(),
});

/**
 * ----------------------------------------------------------------------------
 * Auth: Sign Up Schema
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
 * Auth: Forgot Password Schema
 * ----------------------------------------------------------------------------
 */

export const forgotPasswordSchema = z.object({
  email: getEmailSchema(),
});

/**
 * ----------------------------------------------------------------------------
 * Auth: Reset Password Schema
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
 * Auth: Edit Profile Schema
 * ----------------------------------------------------------------------------
 */

export const editProfileSchema = z.object({
  name: getNameSchema(),
});

/**
 * ----------------------------------------------------------------------------
 * Auth: Change Profile Password Schema
 * ----------------------------------------------------------------------------
 */

export const changePasswordSchema = z
  .object({
    currentPassword: getPasswordSchema(),
    newPassword: getPasswordSchema(),
    confirmPassword: getConfirmPasswordSchema(),
    signOutFromOtherDevices: getSignOutFromAllDevicesSchema(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
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
