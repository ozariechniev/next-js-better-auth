export const SIGN_IN_LABEL = 'Sign In';
export const SIGN_IN_URL = '/sign-in';

export const SIGN_UP_LABEL = 'Sign Up';
export const SIGN_UP_URL = '/sign-up';

export const AUTH_NAV_LINKS = [
  { name: SIGN_IN_LABEL, href: SIGN_IN_URL },
  { name: SIGN_UP_LABEL, href: SIGN_UP_URL },
] as const;
