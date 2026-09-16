export const AUTH_CLIENT = 'AUTH_CLIENT';
export const USER_TOKENS_CLIENT = 'USER_TOKENS_CLIENT';
export const TOKEN_VALUES_CLIENT = 'TOKEN_VALUES_CLIENT';

export const AUTH_PATTERNS = {
  SIGNUP: 'auth.signup',
  LOGIN: 'auth.login',
  VALIDATE: 'auth.validate',
} as const;

export const TOKENS_PATTERNS = {
  FOLLOW: 'tokens.follow',
  LIST: 'tokens.list',
} as const;

export const PRICES_PATTERNS = {
  GET_LATEST: 'prices.getLatest',
} as const;
