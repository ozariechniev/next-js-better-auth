export const SIGN_IN_LABEL = 'Sign In';
export const SIGN_IN_URL = '/sign-in';

export const SIGN_UP_LABEL = 'Sign Up';
export const SIGN_UP_URL = '/sign-up';

export const FORGOT_PASSWORD_LABEL = 'Forgot password?';
export const FORGOT_PASSWORD_URL = '/forgot-password';

export const RESET_PASSWORD_LABEL = 'Reset password';
export const RESET_PASSWORD_URL = '/reset-password';

export const DASHBOARD_LABEL = 'Dashboard';
export const DASHBOARD_URL = '/dashboard';

export const DASHBOARD_PROFILE_LABEL = 'Profile';
export const DASHBOARD_PROFILE_URL = '/dashboard/profile';

export const DASHBOARD_SETTINGS_LABEL = 'Settings';
export const DASHBOARD_SETTINGS_URL = '/dashboard/settings';

export const ACCESS_DENIED_URL = '/access-denied';

export const AUTH_NAV_LINKS = [
  { name: SIGN_IN_LABEL, href: SIGN_IN_URL },
  { name: SIGN_UP_LABEL, href: SIGN_UP_URL },
] as const;

export const USER_ROLE = ['user', 'admin'] as const;
