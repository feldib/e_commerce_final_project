// Image upload constraints
export const MAX_IMAGE_SIZE = 102400; //100KB

export const VALID_IMAGE_EXTENSIONS = [
  "jpg",
  "gif",
  "png",
  "jpeg",
  "svg",
  "webp",
] as const;

// UI Dimensions
export const UI_DIMENSIONS = {
  THUMBNAIL_SIZE: 100,
  CARD_IMAGE_WIDTH: 500,
  CAROUSEL_INTERVAL: 3000,
} as const;

// Tag related constants
const KEY_CODES = {
  comma: 188,
  enter: 13,
  space: 32,
} as const;

export const TAG_DELIMITERS = [
  KEY_CODES.comma,
  KEY_CODES.enter,
  KEY_CODES.space,
] as const;

// For new react-tags separators prop (v7+)
export const TAG_SEPARATORS = [",", "Enter", " "] as const;

export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
export const USERS_URL = "users";
export const ADMIN_URL = "admin";
