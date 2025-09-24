// Server Configuration
export const SERVER_CONFIG = {
  DEFAULT_PORT: 3000,
} as const;

export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
export const USERS_URL = "users";
export const ADMIN_URL = "admin";
