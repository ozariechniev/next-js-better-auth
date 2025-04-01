import { z } from 'zod';
import { EDIT_PROFILE_ACCEPTED_FILE_TYPES, EDIT_PROFILE_MAX_FILE_SIZE, USER_ROLE } from './constants';

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
 * Profile: Edit Profile Schema
 * ----------------------------------------------------------------------------
 */

export const editProfileSchema = z.object({
  name: z.string().max(50, { message: 'Name must be less than 50 characters' }).optional(),
  image: z
    .custom<File>()
    .refine((file) => !file || file instanceof File, 'Must be a valid file')
    .refine((file) => !file || file.size <= EDIT_PROFILE_MAX_FILE_SIZE, 'File size must be less than 2MB')
    .refine(
      (file) => !file || EDIT_PROFILE_ACCEPTED_FILE_TYPES.includes(file.type),
      'Only .jpg, .jpeg, .png, .gif and .webp files are accepted'
    )
    .transform((file) => (!file ? null : file))
    .optional(),
});

/**
 * ----------------------------------------------------------------------------
 * Profile: Change Profile Password Schema
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
 * Dashboard: User Schema
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
